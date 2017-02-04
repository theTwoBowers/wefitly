import React from 'react';
import $ from 'jquery';
import css from './home.css';

class Confirmed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageVisibility: {display: 'none'}
    };
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({
        userType: 'Trainer',
        name: this.props.trainerName,
        visibility: {display: 'none'},
        sender: 'Warrior: '
      });
    } else {
      this.setState({
        userType: 'Client',
        name: this.props.userFirstname + ' ' + this.props.userLastname,
        visibility: {},
        sender: 'Trainer: '
      });
    }
  }

  correctDate(date) {
    var d = date.substr(4, 1);
    var c = date.substr(0, 4);
    var out = date.substr(5, 5).concat(-c);
    return out;
  } 

  toggleMessages() {
    if (this.state.messageVisibility.display === 'none') {
      this.setState({
        messageVisibility: {display: 'unset'}
      }, function() {
        $('#bookingMessages').scrollTop($('#bookingMessages')[0].scrollHeight);
      });
    } else {
      this.setState({
        messageVisibility: {display: 'none'}
      });
    }
  }

  getTime() {
    var date = new Date(), hours = date.getHours(), min = date.getMinutes(), dateStr = String(date).split(' '), time;
    if (min.toString().length === 1) {
      min = '0' + min;
    }
    if (hours > 12) {
      hours = hours - 12;
      hours === 0 ? time = '12:' + min + 'PM' : time = hours + ':' + min + 'PM';
    } else {
      hours === 0 ? time = '12:' + min + 'AM' : time = hours + ':' + min + 'AM';
    }
    return dateStr[1] + ' ' + dateStr[2] + ' ' + time;
  }

  writeMessage(e) {
    e.preventDefault();
    var outer = this;
    $.ajax({
      url: '/api/chat',
      type: 'PUT',
      data: {
        _id: outer.props.bookingId,
        message: [outer.state.sender + outer.refs.message.value, outer.getTime()]
      }
    }).then(function() {
      outer.props.submitRequest(function() {
        $('#bookingMessages').scrollTop($('#bookingMessages')[0].scrollHeight);
      });
    }).fail(function() {
      console.log('Failed to send message');
    });
    outer.refs.message.value = '';
  }

  render() {
    return (
      <div id="confirmedBooking">
        <li className="testimonial-row" id="confirmedBooking">
          <div className="w-row">
            <div className="booking-column w-col w-col-3">
              <div className="booking-row-title">
                <h4>{this.state.userType}</h4>
                <div>{this.state.name}</div>
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
              <div>{this.correctDate(this.props.date)}</div>
            </div>
          </div>
          <div className="w-row">
            <button id="expandMessages" onClick={this.toggleMessages.bind(this)}>Messages &#9660;</button>
          </div>
          <div className="w-row" style={this.state.messageVisibility}>
            <div className="w-col w-col-12" id="bookingMessages">
              {this.props.messages.map((message, i) =>
                <div id="message" key={i}>
                  <div id="timeStamp">
                    <span>{message[1]}</span>
                  </div>
                  <div id="messageText">
                    <span id="messageText">{message[0]}</span>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={this.writeMessage.bind(this)}>
              <input id="bookingInput" ref="message" placeholder="Write a message here." autoComplete="off"></input>
              <button>Submit message</button>
            </form>
          </div>
        </li>
      </div>
    );
  }
}


export default Confirmed;




