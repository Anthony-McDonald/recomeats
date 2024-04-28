// import { useState } from 'react'
import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SatisfiedCustomers from './SatisfiedCustomers';
import Header from './Header';
import MainArea from './MainArea';
import ContactArea from './ContactArea';


function App() {

  return (
    <div className='whole-page'>
      <Header></Header>
      <MainArea></MainArea>
      <SatisfiedCustomers></SatisfiedCustomers>
      <ContactArea></ContactArea>
    </div>
  )
}

export default App
