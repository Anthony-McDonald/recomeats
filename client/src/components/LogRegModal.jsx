import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';
import '../css/header.css'

const LogRegModal = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  // const openRegisterModal = () => {
  //   setIsRegisterOpen(true);
  // };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // const closeRegisterModal = () => {
  //   setIsRegisterOpen(false);
  // };
  return (
    <div className='log-button-div'>
      <button className='log-button' onClick={openLoginModal}>Sign in</button>
      <Modal ariaHideApp={false} isOpen={isLoginOpen} onRequestClose={closeLoginModal}>
        <Login onClose={closeLoginModal} />
      </Modal>
    </div>
  );
};

export default LogRegModal;
