import React from 'react';
import $ from 'jquery';
import css from './home.css';

class Confirmed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ['Trainer: hello', 'Warrior: hello...', 'Trainer: ready to work hard?', 'Warrior: no.'],
      visibility: {display: 'none'}
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
    console.log(this.state.visibility.display);
    if (this.state.visibility.display === 'none') {
      this.setState({
        visibility: {display: 'unset'}
      });
    } else {
      this.setState({
        visibility: {display: 'none'}
      });
    }
  }

  writeMessage(e) {
    e.preventDefault();
    var outer = this;
    console.log(outer.props.submitRequest());
    $.ajax({
      url: '/api/chat',
      type: 'PUT',
      data: {
        _id: outer.props.bookingId,
        message: outer.state.sender + outer.refs.message.value
      }
    }).done(function() {
      console.log(outer.props.submitRequest());
      outer.props.submitRequest();
    }).fail(function() {
      console.log('you fail');
    });

    outer.refs.message.value = '';
  }

  render() {
    console.log(this.props);
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
            <span onClick={this.toggleMessages.bind(this)}>Messages</span>
          </div>
          <div className="w-row" style={this.state.visibility}>
            <div className="w-col w-col-12" id="bookingMessages">
              {this.props.messages.reverse().map((message, i) =>
                <p key={i}>{message}</p>
              )}
              <form onSubmit={this.writeMessage.bind(this)}>
                <input id="bookingInput" ref="message"></input>
                <button>Write message</button>
              </form>
            </div>
          </div>
        </li>
      </div>
    );
  }
}


export default Confirmed;




