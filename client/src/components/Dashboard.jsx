// Dashboard.jsx

import PropTypes from 'prop-types';

const Dashboard = ({ authenticateSwitch }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={authenticateSwitch}>Dashboard</button>
    </div>
  );
};


export default Dashboard;