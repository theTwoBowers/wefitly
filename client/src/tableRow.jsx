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
      this.props.submitRequest();
    });
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
              
              <span> Hourly Rate: {this.props.rate}</span>
            </div>
            <div className="services-container">
              <ul className="services-list w-list-unstyled">
                <li className="services-list-item">Name: {this.props.firstName + ' ' + this.props.lastName}</li>
                <li className="services-list-item">Location: {this.props.location}</li>
              </ul>
            </div>
          </div>
          <div className="booking-div">
            <div className="booking-wrapper w-form">
              <form onSubmit={this.handleBooking.bind(this)} className="booking-wrapper w-clearfix">
                <input className="book-button-alignment signupbutton w-button" type="submit" value="Book"/>
                <input className="booking-input green-focus w-input" placeholder="How Long?" type="text" required ref='duration'/>
                <select className="booking-input green-focus w-input" placeholder="Which Service?" required ref='service'>
                  <option value="" disabled selected>Pick your service</option>
                  {this.props.services.split('/').map(function(service, i) {
                    return <option required ref='service' value={service} className="services-list-item" key={i}>{service}</option>;
                  })}</select> 
                <input type="date" />
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



