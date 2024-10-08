import React, { useEffect } from 'react';

const RedirectComponent = ({setAuth, isAuth}) => {

  // Boot user out
    const negateAuthAndRedirect = () => {
        setAuth(false);
        window.location.href="/";
        
    }

    // Check if user is logged in
    async function verifyAuthentication() {
        try {
        const response = await fetch("http://localhost:5000/users/is-verify", {
          method: "GET",
          headers: {token: localStorage.getItem("token")}
        });
    
        const parseRes = await response.json();
    
        parseRes === true ? setAuth(true) : negateAuthAndRedirect();
    
    
      } catch (err) {
        console.error(err.message);
      }
      }
      useEffect(() => {
        verifyAuthentication();
      }, []);



    return (
        <div>
            User is not authenticated, redirecting
        </div>
    );
};

export default RedirectComponent;
