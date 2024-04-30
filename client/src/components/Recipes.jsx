import React from 'react';
import '../css/recipes.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBox from './RecipeBox'; 
import { useEffect } from 'react';

const Recipes = () => {
  useEffect(() => {
    getIDs();
  }, []); 

  async function getIDs() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();

      console.log(parseRes);

      setName(parseRes.user_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div id="recipes">
        <h3>Here are some of your saved recipes:</h3>
        <div className="recipe-boxes">
          <RecipeBox></RecipeBox>
        </div>
    </div>
  );
};

export default Recipes;
