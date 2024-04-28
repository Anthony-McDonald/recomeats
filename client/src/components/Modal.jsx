import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RegisterModal from './RegisterModal';

const Modal = () => {
  const [showRegister, setShowRegister] = useState(false);

  const switchReg = () => {
    console.log("switching reg")
    event.preventDefault();
    setShowRegister(!showRegister); // Toggle the state of showRegister
  };

  return (
    <>
      <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Sign in
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Sign in</h5>
              <button type="button" className="header-button btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" value="" />
                </div>
                <div className="submit-register">
                  <button type="submit" className="header-button btn btn-primary">Submit</button>
                  <div className="register-div">
                    <a href="" onClick={switchReg} data-bs-toggle="modal" data-bs-target="#innerModal" className="register">Register</a>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="header-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal></RegisterModal>
    </>
  );
};

export default Modal;
