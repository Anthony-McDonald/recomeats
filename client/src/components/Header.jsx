import React from 'react';
import Modal from './Modal';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Header = ({setAuth}) => {
  return (
    <div id="header">
        <img className='recomeats' src="../../../public/images/recomeats.png" alt="reco-logo" />
        <Modal setAuth={setAuth}></Modal>
    </div>
  );
};

export default Header;
