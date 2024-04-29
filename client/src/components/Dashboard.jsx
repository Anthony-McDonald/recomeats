import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("basename");

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  useEffect(() => {
    getName();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();

      console.log(parseRes);

      setName(parseRes.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <h1>Dashboard for {name}</h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
};



export default Dashboard;
