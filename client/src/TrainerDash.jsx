import React from 'react';
import BookingTable from './booking.jsx';
import Pending from './pending.jsx';
import Confirmed from './confirmed.jsx';
import _ from 'lodash';
import $ from 'jquery';
import css from './home.css';

import TrainerProfileEditor from './trainerProfile.jsx';

class TrainerDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: [],
      pending: [],
      update: false,
      profileImage: ''
    };
  }

  updateBookings(cb) {
    var outer = this;
    $.get('/api/bookings').done((bookings) => {
      if (bookings === 'no email') {
        window.location.href = '#/';
      } else {
        var confirmedBookings = [];
        var pendingBookings = [];
        bookings.forEach(function(booking) {
          if (booking.isBooked) {
            confirmedBookings.push(booking);
          } else {
            pendingBookings.push(booking);
          }
        });
        outer.setState({
          confirmed: confirmedBookings,
          pending: pendingBookings
        }, cb);   
      }
    });
  }

  getTrainerProfile() {
    $.get('/api/getProfile').done((profile) => {
      this.state.profileImage = profile.profilepic;
    });
  }
   
  componentWillMount() {
    this.updateBookings();
    this.getTrainerProfile();
  }

  componentDidUpdate(props, state) {
    if (state.update !== this.state.update) {
      this.updateBookings();
    }

    var prevCState = JSON.stringify(state.confirmed);
    var newCState = JSON.stringify(this.state.confirmed);
    var prevPState = JSON.stringify(state.pending);
    var newPState = JSON.stringify(this.state.pending);
    if (prevCState !== newCState || prevPState !== newPState) {
      this.updateBookings();
    }
  }

  submitRequest(cb) {
    var outer = this;
    this.setState({
      update: !this.state.update
    }, function() {
      outer.updateBookings(cb);
    });
  }

  acceptRequest(bookingId) {
    const props = this.props;
    let outer = this;
    $.ajax({
      url: props.endpoint,
      type: 'PUT',
      ContentType: 'application/json',
      data: {
        _id: bookingId
      }
    }).done(function(response) {
      outer.updateBookings();
    }).fail(function(response) {
      console.log('Failed to accept request');
    });
  }

  rejectRequest(bookingId) {
    const props = this.props;
    let outer = this;
    $.ajax({
      url: props.endpoint,
      type: 'DELETE',
      ContentType: 'application/json',
      data: {
        _id: bookingId
      }
    }).done(function(response) {
      outer.updateBookings();
    }).fail(function(response) {
      console.log('Failed to reject request');
    });
  }

  logout() {
    $.ajax({
      url: '/api/logout',
      type: 'POST'
    }).then(function() {
      window.location.href = '#/';
    });
  }

  render() {
    return (
      <div className="dash-body">
        <button onClick={this.logout.bind(this)}>Logout</button>

        <div id="profileImage">
          <img className="profile-image" src={this.state.profileImage} />
        </div>

        <div className="w-form">
          <form className="update-profile-wrapper w-clearfix" id="email-form">
            <input className="signupbutton w-button" type="submit" value="Update Your Profile" onClick={this.props.editProfile} />
          </form>
        </div>
        
        <div className="dash-container w-col w-col-6" id="confirmed">
          <h1 id="center" onClick={this.acceptRequest.bind(this)}>Confirmed</h1>
          <BookingTable booking={this.state.confirmed} RequestType={Confirmed} submitRequest={this.submitRequest.bind(this)} />
        </div>

        <div className="dash-container w-col-6" id="pending">
          <h1 id="center">Pending</h1>
          <BookingTable booking={this.state.pending} RequestType={Pending} acceptRequest={this.acceptRequest.bind(this)} rejectRequest={this.rejectRequest.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default TrainerDash;
