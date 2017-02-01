import React from 'react';
import BookingTable from './booking.jsx';
import _ from 'lodash';
import css from './home.css';

import TrainerProfileEditor from './trainerProfile.jsx';

class TrainerDash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dash-body">

        <div className="w-form">
          <form className="update-profile-wrapper w-clearfix" id="email-form">
            <input className="signupbutton w-button" type="submit" value="Update Your Profile" />
          </form>
        </div>
        
        <div className="dash-container w-col w-col-6" id="confirmed">
          <h1 id="pendingTitle">Confirmed Bookings</h1>
          <BookingTable booking={this.props.bookings} rejectBooking={this.props.rejectBooking}/>
        </div>

        <div className="dash-container w-col-6" id="pending">
          <h1 id="pendingTitle">Pending Bookings</h1>
          <BookingTable booking={this.props.bookings} rejectBooking={this.props.rejectBooking}/>
        </div>
      </div>
    );
  }
}

export default TrainerDash;
