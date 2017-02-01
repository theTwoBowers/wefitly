import React from 'react';
import css from './home.css';

class BookingRow extends React.Component {
  constructor(props) {
    super(props);
  }

  renderActions() {
    return (
       <td>
        <button onClick={this.props.rejectBooking.bind(this, this.props.service)}>Reject</button>
      </td>
    );
  }

  render() {
    console.log(this.props);
    return (

      <li className="testimonial-row" id="singleBooking">
        <div className="w-row">
          <div className="booking-column w-col w-col-3">
            <div className="booking-row-title">
              <h4>Client</h4>
              <div>{this.props.userFirstname + ' ' + this.props.userLastname}</div>
            </div>
          </div>
          <div className="w-col w-col-3">
            <h4>Service</h4>
            <div>{this.props.service}</div>
          </div>
          <div className="w-col w-col-3">
            <h4>Duration</h4>
            <div>{this.props.duration}</div>
          </div>
          <div className="w-col w-col-3">
            <h4>Date / Time</h4>
            <div>Feb. 12 - 10:30am</div>
          </div>
        </div>
      </li>

    );
  }
}


export default BookingRow;




