import React from 'react';
import $ from 'jquery';
import css from './home.css';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBooking(e) {

    e.preventDefault();
    $.post('/api/bookings', {
      isBooked: true,
      trainerName: this.props.firstName + ' ' + this.props.lastName,
      trainerEmail: this.props.email,
      service: this.refs.service.value,
      duration: this.refs.duration.value
    }).done((results) => {
    });
    this.refs.service.value = '';
    this.refs.duration.value = '';
  }   
  

  render() {
    return ( 
    <div>
      <li className="testimonial-row">
        <div className="row-container w-clearfix">
          <div className="row-column w-clearfix"><img className="test-image" src={this.props.pic} />
          </div>
          <div className="extended-row-column w-clearfix">
            <div className="services-container w-clearfix">
              <p className="dashboard-paragraph">Bio: {this.props.bio}</p>
            </div>
            <div className="services-container">
              <ul className="services-list w-list-unstyled">
                <li className="services-list-item">Name: {this.props.firstName + ' ' + this.props.lastName}</li>
                <li className="services-list-item">Location: {this.props.location}</li>
                <li className="services-list-item">{this.props.services}</li>
              </ul>
            </div>
          </div>
          <div className="booking-div">
            <div className="booking-wrapper w-form">
              <form onSubmit={this.handleBooking.bind(this)} className="booking-wrapper w-clearfix">
                <input className="book-button-alignment signupbutton w-button" type="submit" value="Book"/>
                <input className="booking-input green-focus w-input" placeholder="How Long?" type="text" required ref='duration'/>
                <input className="booking-input green-focus w-input" placeholder="Which Service?" type="text" required ref='service' />
              </form>
            </div>
          </div>
        </div>
      </li>
    </div>
    );
  }
}

export default TableRow;



