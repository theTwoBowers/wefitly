import React from 'react';
import css from './home.css';

class Pending extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({
        userType: 'Trainer',
        name: this.props.trainerName,
        style: {width: '85%'},
        visibility: {display: 'none'}
      });
    } else {
      this.setState({
        userType: 'Client',
        name: this.props.userFirstname + ' ' + this.props.userLastname,
        style: {},
        visibility: {}
      });
    }
  }

  correctDate(date) {
    var d = date.substr(4, 1);
    var c = date.substr(0, 4);
    var out = date.substr(5, 5).concat(-c);
    return out;
  } 

  render() {
    return (
      <div id="pendingBooking">
        <li className="testimonial-row" id="pendingBooking" style={this.state.style}>
          <div className="w-row">
            <div className="booking-column w-col w-col-2">
              <div className="booking-row-title">
                <h4>{this.state.userType}</h4>
                <div>{this.state.name}</div>
              </div>
            </div>
            <div className='w-col w-col-2'>
              <h4>Service</h4>
              <div>{this.props.service}</div>
            </div>
            <div className='w-col w-col-2'>
              <h4>Duration</h4>
              <div>{this.props.duration}</div>
            </div>
            <div className="w-col w-col-3">
              <h4>Date / Time</h4>
              <div>{this.correctDate(this.props.date)}</div>
            </div>
            <div id="right">
              <img id="accept" src="./assets/greencheck.png" style={this.state.visibility} onClick={() => this.props.acceptRequest(this.props.bookingId)}/>
              <img id="reject" src="./assets/redx.png" onClick={() => this.props.rejectRequest(this.props.bookingId)}/>
            </div>
          </div>
        </li>
      </div>
    );
  }
}


export default Pending;




