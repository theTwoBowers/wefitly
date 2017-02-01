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
        <div className="dash-container w-container">
        <img className="test-image" src={this.props.pic} />
          <h1>Pending Bookings</h1>
          <BookingTable booking={this.props.bookings} rejectBooking={this.props.rejectBooking}/>
          <div className="w-form">
            <form className="update-profile-wrapper w-clearfix" id="email-form">
              <input className="signupbutton w-button" type="submit" value="Update Your Profile" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TrainerDash;
