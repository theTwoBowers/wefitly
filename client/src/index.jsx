import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Router, Route, Link, hashHistory} from 'react-router';
import Home from './home.jsx';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';
import TrainerProfile from './trainerProfile.jsx';
import UserDash from './UserDash.jsx';
import TrainerDash from './TrainerDash.jsx';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onUserSignUp(postRequestData) {
    window.location.href = '#/dash';
  }

  onTrainerSignUp(postRequestData) {
    window.location.href = '#/trainerprofile';
  }

  onTrainerSignin(postRequestData) {
    window.location.href = '#/trainerdash';
  }

  render() {
    return (

      <Router history={hashHistory}>
        <Route path="/usersignup" component={()=>(
          <Signup endpoint="/api/userSignup" callback={this.onUserSignUp.bind(this)} />
        )} />
        <Route path="/trainersignup" component={()=>(
          <Signup endpoint="/api/trainerSignup" callback={this.onTrainerSignUp.bind(this)} />
        )} />
        <Route path="/trainersignin" component={()=>(
          <Signin endpoint="/api/trainerSignin" callback={this.onTrainerSignin} />
        )} />
        <Route path="/usersignin" component={()=>(
         <Signin endpoint="/api/userSignin" callback={this.onUserSignUp} />
        )} />
        <Route path="/trainerprofile" component={TrainerProfile} />
        <Route path="/trainerdash" component={() => (
          <TrainerDash endpoint="/api/bookings" editProfile={this.onTrainerSignUp.bind(this)} />
        )} />
        <Route path='/dash' component={UserDash} />
        <Route path="/" component={Home} />
      </Router>
    );

  }
}

render(<App/>, document.getElementById('app'));
