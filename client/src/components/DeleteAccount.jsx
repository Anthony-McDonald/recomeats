import React from 'react';
import '../css/delete-account.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const DeleteAccount = ({logout}) => {


    const accountDelete = () => {
      initiateAccountDelete()
        logout()
    }

    async function initiateAccountDelete() {
        try {
          await fetch("http://localhost:5000/users/deleteuser/", {
            method: "DELETE",
            headers: { token: localStorage.getItem("token") }
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }



    return (
        <div id='privacy-div'>
            <h1>Deleting Your Account</h1>
            <p>Please note that after clicking this button, your account will be removed COMPLETELY from our systems.
                This means that your data will be irrecoverable should you change your mind and want to reinstate your account in the future.
            </p>
            <br />
            <p>If you still would like to delete your account please click on the button below</p>
            <div className='da-middle'>
            <button className='btn btn-primary' onClick={() => accountDelete()}>Delete Account</button>
            </div>

        </div>
    )
}

export default DeleteAccount;