import React from 'react';
import TrainerTable from './trainerTable.jsx';
import css from './home.css';

//This is just a placeholder for the userdashboard. Signing in/up for a user should redirect them to the trainer table componenet.
class UserDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: [],
      pending: []
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

  render() {
    return (
    <div className="dash-body">
      <div className="dash-container w-container">
        <h1>Your Dashboard</h1>
        <TrainerTable />

        <h2>Bookings</h2>
        <div className="dash-container w-col w-col-6" id="confirmed">
          <h1 id="pendingTitle">Confirmed Bookings</h1>
          <TrainerTable />
        </div>

        <div className="dash-container w-col-6" id="pending">
          <h1 id="pendingTitle">Pending Bookings</h1>
          <TrainerTable />
        </div> 
      </div>
    </div>
    ); 
  }  
}
export default UserDash;