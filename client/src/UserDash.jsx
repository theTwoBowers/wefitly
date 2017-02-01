import React from 'react';
import TrainerTable from './trainerTable.jsx';
import css from './home.css';
//This is just a placeholder for the userdashboard. Signing in/up for a user should redirect them to the trainer table componenet.
const UserDash = (props) => (
  <div className="dash-body">
    <div className="dash-container w-container">
      <h1>Your Dashboard</h1>
      <TrainerTable />
    </div>
  </div>
);

export default UserDash;