// import { useState } from 'react'
import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SatisfiedCustomers from './SatisfiedCustomers';
import Header from './Header';
import MainArea from './MainArea';
import ContactArea from './ContactArea';
import { useEffect } from 'react';



function App({setAuth}) {

  async function verifyAuthentication() {
    try {
    const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/users/is-verify", {
      method: "GET",
      headers: {token: localStorage.getItem("token")}
    });

    const parseRes = await response.json();

    parseRes === true ? setAuth(true) : setAuth(false)

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
      <SatisfiedCustomers className='sat-cust'></SatisfiedCustomers>
      <ContactArea></ContactArea>
    </div>
  )
}

export default App
