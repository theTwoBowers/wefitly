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
      bookings: []
    };
  }

  componentWillMount() {
    $.get('/api/bookings').done((data) => {
      this.setState({
        bookings: data
      });
    });
  }

  acceptRequest(bookingId) {
    const props = this.props;

    $.ajax({
      url: props.endpoint,
      type: 'PUT',
      ContentType: 'application/json',
      data: {
        _id: bookingId
      }
    }).done(function(response) {
      console.log('Accepted booking request');
    }).fail(function(response) {
      console.log('Failed to accept request');
    });
  }

  rejectRequest(bookingId) {
    const props = this.props;

    $.ajax({
      url: props.endpoint,
      type: 'DELETE',
      ContentType: 'application/json',
      data: {
        _id: bookingId
      }
    }).done(function(response) {
      console.log('Rejected booking request');
    }).fail(function(response) {
      console.log('Failed to reject request');
    });
  }

  render() {
    return (
      <div className="dash-body">
        <div className="w-form">
          <form className="update-profile-wrapper w-clearfix" id="email-form">
            <input className="signupbutton w-button" type="submit" value="Update Your Profile" onClick={this.props.editProfile} />
          </form>
        </div>
        
        <div className="dash-container w-col w-col-6" id="confirmed">
          <h1 id="pendingTitle" onClick={this.acceptRequest.bind(this)}>Confirmed Bookings</h1>
          <BookingTable booking={this.state.bookings} RequestType={Confirmed} />
        </div>

        <div className="dash-container w-col-6" id="pending">
          <h1 id="pendingTitle">Pending Bookings</h1>
          <BookingTable booking={this.state.bookings} RequestType={Pending} acceptRequest={this.acceptRequest.bind(this)} rejectRequest={this.rejectRequest.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default TrainerDash;
