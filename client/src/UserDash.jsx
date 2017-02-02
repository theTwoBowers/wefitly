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
<<<<<<< HEAD
      pending: [],
      update: false
=======
      pending: []
>>>>>>> Convert UserDash into class
    };
  }
     
  updateBookings() {
<<<<<<< HEAD
    var outer = this;
    $.get('/api/userBookings').done((bookings) => {
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
        });
      }
    });
  }

=======
    $.get('/api/userBookings').done((bookings) => {
      console.log('userBookings ----------------', bookings);
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
      console.log('this is the pending state--------', this.state.pending);
    });
  }
   
<<<<<<< HEAD
>>>>>>> Convert UserDash into class
  componentWillMount() {
=======
  componentDidMount() {
>>>>>>> Bookings render on user end
    this.updateBookings();
  }

<<<<<<< HEAD
  componentDidUpdate(props, state) {
    if (state.update !== this.state.update) {
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

  logout() {
    $.ajax({
      url: '/api/logout',
      type: 'POST'
    })
    .then(function() {
      window.location.href = '#/';
    });
  }
  
  render() {
    return (
      <div>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <div className="dash-body">
          <div className="dash-container w-container">
            <h1>Book a Trainer</h1>
            <TrainerTable submitRequest={this.submitRequest.bind(this)} />
          </div>
        </div>

        <div className="dash-container w-col w-col-6" id="confirmed">
          <h1 id="center">Confirmed Bookings</h1>
          <BookingTable booking={this.state.confirmed} RequestType={Confirmed} type={'user'} /> 
        </div>

        <div className="dash-container w-col-6" id="pending">
          <h1 id="center">Pending Bookings</h1>
          <BookingTable booking={this.state.pending} RequestType={Pending} type={'user'} rejectRequest={this.rejectRequest.bind(this)} />   
        </div> 
      </div>
=======
  render() {
    return (
    <div className="dash-body">
      <div className="dash-container w-container">
        <h1>Your Dashboard</h1>
        <TrainerTable />

        <h2>Bookings</h2>
        <div className="dash-container w-col w-col-6" id="confirmed">
          <h1 id="pendingTitle">Confirmed Bookings</h1>
            <BookingTable booking={this.state.confirmed} RequestType={Confirmed} /> 
        </div>

        <div className="dash-container w-col-6" id="pending">
          <h1 id="pendingTitle">Pending Bookings</h1>
            <BookingTable booking={this.state.pending} RequestType={Pending} />   
        </div> 
      </div>
    </div>
>>>>>>> Convert UserDash into class
    ); 
  }  
}
export default UserDash;