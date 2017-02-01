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
    console.log('your bookings', this.state.bookings);
    $.get('/api/bookings').done((data) => {
      this.setState({
        bookings: data
      });
    });
  }

  handleRequest(verb) {
    const props = this.props;
    e.preventDefault();

    $.ajax({
      url: props.endpoint,
      type: verb,
      ContentType: 'application/json',
      data: {
        _id: props.bookings._id
      }
    }).done(function(response) {
      console.log('handled booking request');
    }).fail(function(response) {
      console.log('something wrong - booking request');
    });
  }

  acceptRequest(e) {
    //handleRequest('PUT');
    console.log('hi');
    return 'yes';
  }

  denyRequest(e) {
    //handleRequest('DELETE');
    console.log('NOOOOOOO');
    return 'no';
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
          <BookingTable booking={this.state.bookings} RequestType={Pending} acceptRequest={this.acceptRequest.bind(this)} denyRequest={this.denyRequest.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default TrainerDash;
