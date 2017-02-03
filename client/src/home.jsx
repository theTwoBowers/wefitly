import React from 'react';
import css from './home.css';

class Home extends React.Component {
  render () {
    return (
      <div> 
      <div className="navbar w-nav" data-animation="default" data-collapse="medium" data-duration="400">
          <div className="navbar w-container">
            <nav className="w-nav-menu" role="navigation"><a className="navlink w-nav-link" href="#/trainersignin">Trainer Sign In</a><a className="navlink w-nav-link" href="#/usersignin">Warrior Sign In</a>
            </nav>
            <div className="w-nav-button">
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
        <div className="banner trainer">
          <div className="w-container">
            <h1 className="hero-heading">WeFitly</h1>
            <div className="hero-subheading">Find a fitness expert near you right now</div>
          </div>
        </div>
        <div className="banner user">
          <div className="w-row">
            <div className="w-col w-col-6">
              <h1>Trainers</h1>
              <p className="trainerintro">List your profile and specializations on WeFitly, and connect to a network of local users looking to get fit!</p><a className="signupbutton w-button" href="#/trainersignup">Sign Up</a>
            </div>
            <div className="w-col w-col-6">
              <h1>Workout Warriors</h1>
              <p className="trainerintro">Gain access to a list of trainers in your area, and search for one specifically catering to your fitness needs!</p><a className="signupbutton w-button" href="#/usersignup" >Sign Up</a>
            </div>
          </div>
          </div>
        </div>
    );
  }
}

export default Home;
//this is a comment
