import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const RegisterModal = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        user_name: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        email_address: "",
        password: "",
    })
    const {user_name, first_name, last_name, date_of_birth, email_address, password} = inputs;
    
    const onChange = (e) => {
        const updatedInputs = { ...inputs, [e.target.id]: e.target.value };
        setInputs(updatedInputs);
    };
    
    

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = {user_name, first_name, last_name, date_of_birth, email_address, password}
            console.log(body);
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);

            const parseRes = await response.json();
            console.log(parseRes)

            localStorage.setItem("token", parseRes.jwtToken)

            setAuth(true);
            document.getElementById("closeBtn2").click();

        } catch(err) {
            console.error(err.message);
        }

    };

  return (
    <>

<div className="modal fade" id="innerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog-centered modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Register</h5>
        <button type="button" className="header-button btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* form start */}
        <form onSubmit={onSubmitForm}>
        <div className="mb-3">
    <label htmlFor="user_name" className="form-label">User Name</label>
    <input onChange={onChange} type="text" className="form-control" id="user_name"></input>
  </div>
        <div className="mb-3">
    <label htmlFor="first_name" className="form-label">First Name</label>
    <input onChange={onChange} type="text" className="form-control" id="first_name"></input>
  </div>
        <div className="mb-3">
    <label htmlFor="last_name" className="form-label">Last Name</label>
    <input onChange={onChange} type="text" className="form-control" id="last_name"></input>
  </div>
  <div className="mb-3">
    <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
    <input onChange={onChange} type="date" className="form-control" id="date_of_birth"></input>
  </div>
  <div className="mb-3">
    <label htmlFor="email_address" className="form-label">Email address</label>
    <input onChange={onChange} type="email" className="form-control" id="email_address" aria-describedby="emailHelp"></input>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input onChange={onChange} type="password" className="form-control" id="password"></input>
  </div>
  <button type="submit" className="header-button btn btn-primary">Submit</button>
</form>
        {/* form end */}
        
      </div>
      <div className="modal-footer">
        <button id="closeBtn2" type="button" className="header-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default RegisterModal;
