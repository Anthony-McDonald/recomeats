import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RegisterModal from './RegisterModal';


const Modal = ({setAuth}) => {
  // Login modal
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const {email, password} = inputs;
    
    const onChange = (e) => {
        const updatedInputs = { ...inputs, [e.target.id]: e.target.value };
        setInputs(updatedInputs);
    };
    
    

    // Once form is submitted, attempt login with inputted details
    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {email, password}
            const response = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
            localStorage.setItem("token", parseRes.token)
            
            setAuth(true);
            document.getElementById("closeBtn").click();
            }

            
        } catch(err) {
            console.error(err.message);
        }

    };

  return (
    <>
      <button type="button" className="header-button btn btn-primary log-button" data-bs-toggle="modal" data-bs-target="#Modal">
        Sign in
      </button>

      <div className="modal fade modal-cover" id="Modal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel">Sign in</h5>
              <button type="button" className="header-button btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input onChange={onChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input onChange={onChange} type="password" className="form-control" id="password"  />
                </div>
                <div className="submit-register">
                  <button type="submit" className="header-button btn btn-primary">Login</button>
                  <div className="register-div">
                    <a href="" data-bs-toggle="modal" data-bs-target="#innerModal" className="register">Register</a>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id="closeBtn" className="header-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* Alternatively, click here to register */}
      <RegisterModal setAuth={setAuth}></RegisterModal>
    </>
  );
};

export default Modal;
