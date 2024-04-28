import React from 'react';
import LogRegModal from './LogRegModal';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Header = () => {
  return (
    <div id="header">
        <img className='recomeats' src="../../../public/images/recomeats.png" alt="reco-logo" />
        <LogRegModal></LogRegModal>
    </div>
  );
};

export default Header;
