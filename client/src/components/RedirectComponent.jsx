import React, { useEffect } from 'react';

const RedirectComponent = ({setAuth, isAuth}) => {

    const negateAuthAndRedirect = () => {
        setAuth(false);
        window.location.href="/";
        
    }

    async function verifyAuthentication() {
        try {
        const response = await fetch("http://localhost:5000/is-verify", {
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
