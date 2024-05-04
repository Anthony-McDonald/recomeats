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
  const [addRecipeInstructions, setAddRecipeInstructions] = useState("");
  // Edit recipe states
  const [editRecipeID, setEditRecipeID] = useState(0);
  const [editRecipeName, setEditRecipeName] = useState("");
  const [editRecipeDescription, setEditRecipeDescription] = useState("");
  const [editRecipeIngredients, setEditRecipeIngredients] = useState([]);
  const [editRecipeInstructions, setEditRecipeInstructions] = useState("");
  // loading
  const [isLoading, setIsLoading] = useState(false);
  // misc
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3; 

  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  
  const addRecipeSubmit = (e) => {
    e.preventDefault();
    setIsAddingRecipe(false);
    if (addRecipeName != "" && addRecipeDescription != "" && addRecipeIngredients != [] && addRecipeInstructions != "") {
      addRecipe(addRecipeName, addRecipeDescription, addRecipeIngredients, addRecipeInstructions);
      setAddRecipeName('');
      setAddRecipeDescription('');
      setAddRecipeIngredients([]);
      setAddRecipeInstructions('');
    } else {
      console.log("parameters not all full")
    }
    

  }

  const editRecipeSubmit = (e) => {
    e.preventDefault();
    setIsEditingRecipe(false);
    if (editRecipeName != "" && editRecipeDescription != "" && editRecipeIngredients != [] && editRecipeInstructions != "") {
      editRecipe(editRecipeID, editRecipeName, editRecipeDescription, editRecipeIngredients, editRecipeInstructions);
      setEditRecipeName('');
      setEditRecipeDescription('');
      setEditRecipeInstructions('');
      setEditRecipeIngredients([]);
    } else {
      console.log("parameters not full")
    }

  }

  async function addRecipe(recipe_name, recipe_description, recipe_ingredients, recipe_instructions) {
    try {
      const requestBody = JSON.stringify({
        recipe_name: recipe_name,
        recipe_ingredients: recipe_ingredients,
        recipe_description: recipe_description,
        recipe_instructions: recipe_instructions,
      })
      await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/recipes/addrecipe/", {
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
      const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/recipes/getrecipes/", {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setRecipes(parseRes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getIngredients(recipe_id) {
    try {
      const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/recipes/getingredients/" + recipe_id, {
        method: "GET",
        headers: { token: localStorage.getItem("token") }
      });

      const parseRes = await response.json();


      setEditRecipeIngredients(parseRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function editRecipe(recipe_id, recipe_name, recipe_description, recipe_ingredients, recipe_instructions)  {
    try {
      const requestBody = JSON.stringify({
        recipe_name: recipe_name,
        recipe_ingredients: recipe_ingredients,
        recipe_description: recipe_description,
        recipe_instructions: recipe_instructions,
      })
      await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/recipes/changerecipe/" + recipe_id, {
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
  
    for (let i = 0; i < recipes.length; i++) {
      let currentRecipe = recipes[i]; 
      let recipe_id = currentRecipe.recipe_id;
      if (recipe_id === recipe_id_entered) {
        setEditRecipeID(recipe_id);
        setEditRecipeName(currentRecipe.recipe_name);
        setEditRecipeDescription(currentRecipe.recipe_description); 
        setEditRecipeInstructions(currentRecipe.recipe_instructions);
        getIngredients(recipe_id);
        break;
      }
    }
  }


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  async function deleteRecipe(recipeId) {
    try {
       await fetch(`http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/recipes/deleterecipe/${recipeId}`, {
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
      <p>Page: {currentPage} of {totalPages}</p>
      <div className="buttons">
      <div className="recipe-buttons">
        <a href="/ai-recipe">      <button className='btn btn-primary ai-btn'> Add with AI </button></a>
      <button className='btn btn-primary man-btn' onClick={addRecipeManually} >Add a recipe manually</button>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button className='btn btn-primary' onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button className='btn btn-primary' onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
      </div>

      </div>
        <div className="recipe-boxes">
        {isAddingRecipe ? <AddRecipeForm setRecipeForm={setIsAddingRecipe} setRecipeName={setAddRecipeName} setRecipeDescription={setAddRecipeDescription} setRecipeIngredients={setAddRecipeIngredients} setRecipeInstructions={setAddRecipeInstructions} recipeIngredients={addRecipeIngredients} submitFunction={addRecipeSubmit}/> : null}
        {isEditingRecipe ? <EditRecipeForm editRecipeName={editRecipeName} editRecipeDescription={editRecipeDescription} editRecipeInstructions={editRecipeInstructions} setRecipeInstructions={setEditRecipeInstructions} setRecipeForm={setIsEditingRecipe} setRecipeName={setEditRecipeName} setRecipeDescription={setEditRecipeDescription} setRecipeIngredients={setEditRecipeIngredients} recipeIngredients={editRecipeIngredients} recipeInstructions={editRecipeInstructions} submitFunction={editRecipeSubmit}/> : null}
        {isLoading ? (
        <h1 className='loading-message'>Loading...</h1>
      ) : recipes.length === 0 ? (
        <h1 className='no-recipes'>No recipes currently, but you can change that! Click on one of those handy dandy buttons on the right and get started</h1>
      ) : currentRecipes.length === 0 ? (
        <>
          {prevPage()}
          <h1 className='no-recipes'>No recipes on this page</h1>
        </>
      ) : (
        currentRecipes.map((recipe, index) => (
          <RecipeBox key={index} recipe={recipe} editRecipe={editRecipeManually} deleteRecipe={deleteRecipe}></RecipeBox>
        ))
)}

        </div>
    </div>
  );
};

export default Recipes;
