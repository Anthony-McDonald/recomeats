import React from 'react';
import '../css/recipes.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBox from './RecipeBox'; 
import { useEffect, useState } from 'react';
import AddRecipeForm from './AddRecipeForm';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [addRecipeName, setAddRecipeName] = useState("test");
  const [addRecipeDescription, setAddRecipeDescription] = useState("");
  const [addRecipeIngredients, setAddRecipeIngredients] = useState([]);
  
  const addRecipeSubmit = (e) => {
    e.preventDefault();
    setIsAddingRecipe(false);
    addRecipe(addRecipeName, addRecipeDescription, addRecipeIngredients);
    setAddRecipeName('');
    setAddRecipeDescription('');
    setAddRecipeIngredients([]);
  }

  async function addRecipe(recipe_name, recipe_description, recipe_ingredients) {
    console.log("atteempting to print frm aync")
    console.log(recipe_name, recipe_description, recipe_ingredients)
    try {
      const requestBody = JSON.stringify({
        recipe_name: recipe_name,
        recipe_ingredients: recipe_ingredients,
        recipe_description: recipe_description
      })
      console.log(requestBody)
      await fetch("http://localhost:5000/addrecipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: requestBody
      });
      getRecipes()

    } catch (error) {
      console.error("Error posting manual recipe:", error)
    }
  }

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
        {isAddingRecipe ? <AddRecipeForm setRecipeForm={setIsAddingRecipe} setRecipeName={setAddRecipeName} setRecipeDescription={setAddRecipeDescription} setRecipeIngredients={setAddRecipeIngredients} recipeIngredients={addRecipeIngredients} submitFunction={addRecipeSubmit}/> : null}

          {recipes.map((recipe, index) => (
            <RecipeBox key={index} recipe={recipe} editRecipe={editRecipe} deleteRecipe={deleteRecipe}></RecipeBox>
          ))}
        </div>
    </div>
  );
};

export default Recipes;
