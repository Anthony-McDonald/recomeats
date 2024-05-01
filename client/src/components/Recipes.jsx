import React from 'react';
import '../css/recipes.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeBox from './RecipeBox'; 
import { useEffect, useState } from 'react';
import AddRecipeForm from './AddRecipeForm';
import EditRecipeForm from './EditRecipeForm';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [isEditingRecipe, setIsEditingRecipe] = useState(false);
  // Add recipe states
  const [addRecipeName, setAddRecipeName] = useState("");
  const [addRecipeDescription, setAddRecipeDescription] = useState("");
  const [addRecipeIngredients, setAddRecipeIngredients] = useState([]);
  // Edit recipe states
  const [editRecipeID, setEditRecipeID] = useState(0);
  const [editRecipeName, setEditRecipeName] = useState("");
  const [editRecipeDescription, setEditRecipeDescription] = useState("");
  const [editRecipeIngredients, setEditRecipeIngredients] = useState([]);
  // loading
  const [isLoading, setIsLoading] = useState(false);
  
  
  const addRecipeSubmit = (e) => {
    e.preventDefault();
    setIsAddingRecipe(false);
    addRecipe(addRecipeName, addRecipeDescription, addRecipeIngredients);
    setAddRecipeName('');
    setAddRecipeDescription('');
    setAddRecipeIngredients([]);
  }

  const editRecipeSubmit = (e) => {
    e.preventDefault();
    setIsAddingRecipe(false);
    editRecipe(editRecipeID, editRecipeName, editRecipeDescription, editRecipeIngredients);
    setEditRecipeName('');
    setEditRecipeDescription('');
    setEditRecipeIngredients([]);
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
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/getrecipes/", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();

      console.log(parseRes);

      setRecipes(parseRes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getIngredients(recipe_id) {
    try {
      const response = await fetch("http://localhost:5000/getingredients/" + recipe_id, {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();

      console.log(parseRes);

      setEditRecipeIngredients(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function editRecipe(recipe_id, recipe_name, recipe_description, recipe_ingredients)  {
    try {
      const requestBody = JSON.stringify({
        recipe_name: recipe_name,
        recipe_ingredients: recipe_ingredients,
        recipe_description: recipe_description
      })
      console.log(requestBody)
      await fetch("http://localhost:5000/changerecipe/" + recipe_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: requestBody
      });
      getRecipes()
      setIsEditingRecipe(false);

    } catch (error) {
      console.error("Error posting manual recipe:", error)
    }
  }
  

  function addRecipeManually() {
    setIsAddingRecipe(true);
    setIsEditingRecipe(false);
  }
  function editRecipeManually(recipe_id_entered) {
    setIsEditingRecipe(true);
    setIsAddingRecipe(false);
    console.log(recipe_id_entered);
  
    for (let i = 0; i < recipes.length; i++) {
      let currentRecipe = recipes[i]; // Rename the variable to avoid naming conflict
      let recipe_id = currentRecipe.recipe_id;
      if (recipe_id === recipe_id_entered) {
        setEditRecipeID(recipe_id);
        setEditRecipeName(currentRecipe.recipe_name);
        setEditRecipeDescription(currentRecipe.recipe_description); // Assuming you have this state variable
        getIngredients(recipe_id);
        break;
      }
    }
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
      <div className="recipe-buttons">
        <a href="/ai-recipe">      <button className='btn btn-primary ai-btn'> Add with AI </button></a>
      <button className='btn btn-primary' onClick={addRecipeManually} >Add a recipe manually</button>
      </div>

      </div>
        <div className="recipe-boxes">
        {isAddingRecipe ? <AddRecipeForm setRecipeForm={setIsAddingRecipe} setRecipeName={setAddRecipeName} setRecipeDescription={setAddRecipeDescription} setRecipeIngredients={setAddRecipeIngredients} recipeIngredients={addRecipeIngredients} submitFunction={addRecipeSubmit}/> : null}
        {isEditingRecipe ? <EditRecipeForm editRecipeName={editRecipeName} editRecipeDescription={editRecipeDescription} setRecipeForm={setIsEditingRecipe} setRecipeName={setEditRecipeName} setRecipeDescription={setEditRecipeDescription} setRecipeIngredients={setEditRecipeIngredients} recipeIngredients={editRecipeIngredients} submitFunction={editRecipeSubmit}/> : null}
        {isLoading ? (
          <h1 className='loading-message'>Loading...</h1>
        ) : recipes.length === 0 ? (
          <h1 className='no-recipes'>No recipes currently, but you can change that! Click on one of those handy dandy buttons on the right and get started</h1>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeBox key={index} recipe={recipe} editRecipe={editRecipeManually} deleteRecipe={deleteRecipe}></RecipeBox>
          ))
)}

        </div>
    </div>
  );
};

export default Recipes;
