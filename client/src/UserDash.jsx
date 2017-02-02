import React from 'react';
import BookingTable from './booking.jsx';
import TrainerTable from './trainerTable.jsx';
import Pending from './pending.jsx';
import Confirmed from './confirmed.jsx';
import _ from 'lodash';
import $ from 'jquery';
import css from './home.css';

//This is just a placeholder for the userdashboard. Signing in/up for a user should redirect them to the trainer table componenet.
class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: [],
      pending: [],
      update: false
    };
  }
     
  updateBookings() {
    $.get('/api/userBookings').done((bookings) => {
      var confirmedBookings = [];
      var pendingBookings = [];
      bookings.forEach(function(booking) {
        if (booking.isBooked) {
          confirmedBookings.push(booking);
        } else {
          pendingBookings.push(booking);
        }
      });
      this.setState({
        confirmed: confirmedBookings,
        pending: pendingBookings
      });
    });
  }

  componentWillMount() {
    this.updateBookings();
  }

  componentDidUpdate(props, state) {
    var prevUState = JSON.stringify(state.update);
    var newUState = JSON.stringify(this.state.update);
    if (prevUState !== newUState) {
      this.updateBookings();
    }
  }  
 
  submitRequest() {
    this.setState({
      update: !this.state.update
    });
  }

  rejectRequest(bookingId) {
    const props = this.props;
    console.log(props);
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
      console.log('Deleted booking request');
    }).fail(function(response) {
      console.log('Failed to delete request');
    });
  }

  render() {
    return (
      <div>
        <div className="dash-body">
          <div className="dash-container w-container">
            <h1>Your Dashboard</h1>
            <TrainerTable submitRequest={this.submitRequest.bind(this)} />
          </div>
        </div>

        <h2>Bookings</h2>
        <div className="dash-container w-col w-col-6" id="confirmed">
          <center><h1 id="pendingTitle">Confirmed Bookings</h1></center>
          <BookingTable booking={this.state.confirmed} RequestType={Confirmed} type={'user'} /> 
        </div>

        <div className="dash-container w-col-6" id="pending">
          <center><h1 id="pendingTitle">Pending Bookings</h1></center>
          <BookingTable booking={this.state.pending} RequestType={Pending} type={'user'} rejectRequest={this.rejectRequest.bind(this)} />   
        </div> 
      </div>
    ); 
  }  
}
export default UserDash;