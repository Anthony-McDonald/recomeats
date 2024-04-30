import React from 'react';
import "../css/ai-recipe.css"
import { useEffect } from 'react';

const AiRecipe = (setAuth ) => {
    async function verifyAuthentication() {
        try {
        const response = await fetch("http://localhost:5000/is-verify", {
          method: "GET",
          headers: {token: localStorage.getItem("token")}
        });
    
        const parseRes = await response.json();
    
        parseRes === true ? setAuth(true) : setAuth(false)
    
        console.log(parseRes);
    
      } catch (err) {
        console.error(err.message);
      }
      }
      useEffect(() => {
        verifyAuthentication();
      }, []);
  return (
    <div id="ai-recipe">
      Ai Recipe page
    <a href="/"><button className='btn btn-primary'> Back to home</button></a>
    
    </div>
  );
};

export default AiRecipe;