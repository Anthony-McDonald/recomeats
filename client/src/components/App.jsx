// import { useState } from 'react'
import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SatisfiedCustomers from './SatisfiedCustomers';
import Header from './Header';
import MainArea from './MainArea';
import ContactArea from './ContactArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



function App({setAuth, isAuthenticated}) {

  const navigate = useNavigate(); // Define useNavigate hook

  const location = useLocation();

  useEffect(() => {
    // Check if the user is accessing the "/dashboard" route and is not authenticated
    if (location.pathname === "/dashboard" && !isAuthenticated) {
      // Navigate to the home page "/"
      navigate("/");
    }
  }, [location, isAuthenticated, navigate]); // Add dependencies to useEffect

  async function verifyAuthentication() {
    try {
    const response = await fetch("http://localhost:5000/is-verify", {
      method: "GET",
      headers: {token: localStorage.getItem("token")}
    });

    const parseRes = await response.json();

    parseRes === true ? setAuth(true) : setAuth(false)

    console.log(parseRes);

  } catch (err) {
    console.error(err.message);
  }
  }
  useEffect(() => {
    verifyAuthentication();
  }, []);
  return (
    <div className='whole-page'>
      <Header setAuth={setAuth}></Header>
      <MainArea></MainArea>
      <SatisfiedCustomers></SatisfiedCustomers>
      <ContactArea></ContactArea>
    </div>
  )
}

export default App
