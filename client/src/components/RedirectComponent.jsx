import React, { useEffect } from 'react';

const RedirectComponent = ({setAuth, isAuth}) => {

    const negateAuthAndRedirect = () => {
        setAuth(false);
        window.location.href="/";
        
    }

    async function verifyAuthentication() {
        try {
        const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/users/is-verify", {
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
