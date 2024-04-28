// LoginForm.jsx
import React from 'react';

const Login = ({ onClose }) => {
  return (
    <div>
      <h2>Login Form</h2>
      {/* Your login form JSX */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Login;
