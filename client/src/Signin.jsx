import React from 'react';
import $ from 'jquery';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: this.props.endpoint,
      type: 'POST',
      ContentType: 'application/json',
      data: {
        'email': this.refs.email.value,
        'password': this.refs.password.value
      }
    })
     .done( (response) => {
       if (response == 'success') {
         this.props.callback();
       } else {
         this.setState({error: 'username or password can\'t be found'});
       }
     })
     .fail( () => { console.log('Houston, we have a problem'); });
  }

  render () {
    return (
      <div className="bodybody">
        <div className="signincontainer w-container">
          <div className="w-form">
            <form className="signinform w-clearfix" id="email-form" name="email-form" onSubmit={this.handleSubmit.bind(this)}>
              <input className="green-focus signup-alignment w-input" data-name="Name" id="name" name="name" placeholder="Enter your email" required ref="email" type="text" />
              <input className="green-focus signup-alignment w-input" data-name="Email" id="email" name="email" placeholder="Enter Your Password" required ref="password" type="password" />
              <input className="button-alignment workout-button w-button" data-wait="Please wait..." type="submit" value="Submit" />
              <p>{this.state.error}</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
