import React from 'react';
import '../css/recipes.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBox from './RecipeBox'; 
import { useEffect, useState } from 'react';
import AddRecipeForm from './AddRecipeForm';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  useEffect(() => {
    getRecipes();
  }, []); 

  async function getRecipes() {
    try {
      const response = await fetch("http://localhost:5000/getrecipes/", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();

      console.log(parseRes);

      setRecipes(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function editRecipe() {
    // try {
    //   const response = await fetch("http://localhost:5000/getrecipes/", {
    //     method: "GET",
    //     headers: { token: localStorage.getItem("token") }
    //   });

    //   const parseRes = await response.json();

    //   console.log(parseRes);

    //   setRecipes(parseRes);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  }

  function addRecipeManually() {
    setIsAddingRecipe(true);
  }
  async function deleteRecipe(recipeId) {
    try {
       await fetch(`http://localhost:5000/deleterecipe/${recipeId}`, {
        method: "DELETE",
        headers: { token: localStorage.getItem("token") }
      });
  
      getRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  }
  
  return (
    <div id="recipes">
      <div className="desc-div">
      <h3>Here are some of your saved recipes:</h3>
      <button onClick={addRecipeManually} >Add a recipe manually</button>
      </div>
        <div className="recipe-boxes">
        {isAddingRecipe ? <AddRecipeForm setRecipeForm={setIsAddingRecipe}/> : null}

          {recipes.map((recipe, index) => (
            <RecipeBox key={index} recipe={recipe} editRecipe={editRecipe} deleteRecipe={deleteRecipe}></RecipeBox>
          ))}
        </div>
    </div>
  );
};

export default Recipes;
