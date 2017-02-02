import React from 'react';
import css from './home.css';

class Pending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  // renderActions() {
  //   return (
  //      <td>
  //       <button onClick={this.props.rejectBooking.bind(this, this.props.service)}>Reject</button>
  //     </td>
  //   );
  // }
  componentWillMount() {
    console.log('pending props', this.props);
    if (this.props.user) {
      this.setState({
        userType: 'Trainer',
        name: this.props.trainerName,
        visibility: {display: 'none'},
        width: 'w-col w-col-3'
      });
    } else {
      this.setState({
        userType: 'Client',
        name: this.props.userFirstname + ' ' + this.props.userLastname,
        visibility: {},
        width: 'w-col w-col-2'
      });
    }
  }

  render() {
    console.log('-----bookingrow', this.props);    
    return (
      <div id="pendingBooking">
        <li className="testimonial-row" id="pendingBooking">
          <div className="w-row">
            <div className="booking-column w-col w-col-2">
              <div className="booking-row-title">
                <h4>{this.state.userType}</h4>
                <div>{this.state.name}</div>
              </div>
            </div>
            <div className={this.state.width}>
              <h4>Service</h4>
              <div>{this.props.service}</div>
            </div>
            <div className={this.state.width}>
              <h4>Duration</h4>
              <div>{this.props.duration}</div>
            </div>
            <div className="w-col w-col-3">
              <h4>Date / Time</h4>
              <div>Feb. 12 - 10:30am</div>
            </div>
            <div id="right">
              <img id="accept" src="./assets/greencheck.png" style={this.state.visibility} onClick={() => this.props.acceptRequest(this.props.bookingId)}/>
              <img id="reject" src="./assets/redx.png" style={this.state.visibility} onClick={() => this.props.rejectRequest(this.props.bookingId)}/>
            </div>
          </div>
        </li>
      </div>
    );
  }
}


export default Pending;




