import React from 'react';
import "../css/ai-recipe.css"
import { useState,useEffect } from 'react';
import AiRecipeBox from './AiRecipeBox';

const AiRecipe = ({setAuth, cuisinePreferences, addRecipe}) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientInputValue, setIngredientInputValue] = useState("");
  const [ingredients, setIngredients] = useState(["potatoes", "cheese", "garlic"]);
  const [isLoading, setLoading] = useState(false);

  const url = 'http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/chat/foods?ingredients=' + ingredients.join(',');

  useEffect(() => {
    verifyAuthentication();
  }, []);


  const enterPressed = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (ingredientInputValue !== '') {
          addIngredient(ingredientInputValue);
          setIngredientInputValue('');
        }

    }
}

const handleIngredientInputValue = (e) => {
  setIngredientInputValue(e.target.value);
};

const addIngredient = (ingredient) => {
  const recipeIngredientsClone = [...ingredients];
  recipeIngredientsClone.push(ingredient);
  setIngredients(recipeIngredientsClone);
}

const removeClicked = (i) => {
  const ingredientCopy = [...ingredients];
  ingredientCopy.splice(i, 1);
  setIngredients(ingredientCopy);
}



  async function getRecipes() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {token: localStorage.getItem("token")}
      });

      const parseRes = await response.json();
      const recommendations = JSON.parse(parseRes.reccomendations);
const recipes = recommendations.recipes.map(recipeData => ({
    recipe_name: recipeData.recipe_name,
    recipe_description: recipeData.recipe_description,
    recipe_ingredients: recipeData.recipe_ingredients.split('|'),
    recipe_instructions: recipeData.recipe_instructions,
}));
      

      setRecipes(recipes);

      setLoading(false);

    } catch (err) {
      console.error("Problem fetching data:", err);
    }
  }

  const handleRecipeClick = () => {
    setLoading(true);
    setRecipes([]);
    getRecipes();
  }

    

    async function verifyAuthentication() {
        try {
        const response = await fetch("http://ec2-13-60-10-44.eu-north-1.compute.amazonaws.com:5000/users/is-verify", {
          method: "GET",
          headers: {token: localStorage.getItem("token")}
        });
    
        const parseRes = await response.json();
    
        parseRes === true ? setAuth(true) : setAuth(false)
    
    
      } catch (err) {
        console.error(err.message);
      }
      }
  return (
    <div id="ai-recipe">
      <div className="top-bar">
      <div className="ai-text">
        <h1 className="text-big playfair-display">You have came to the right place</h1>

        <h3 className='text-mid playfair-display'> Let us guide you into culinary delicecence</h3>
      </div>
      <a href="/"><button className='btn btn-primary home-btn'> Back to home</button></a>

      </div>

      <h5 className='text-small playfair-display'> Your current cuisine preferences are:</h5>
      <h5 className='explanation'>(If you want to add more, click back to home at the top right of your screen and go to the cuisines tab)</h5>
      <div className="cuisine-preferences">
      {cuisinePreferences.map((text, index) => (
        <h5 className='playfair-display text-tiny' key={index}>{text}</h5>
      ))}
      </div>
      
      <div className="recipe-box">
        <form>

            <div className="mb-3 ingredient-input-area">
                <label htmlFor="ingredientInputBox" className="form-label">Ingredients:</label>
                <input className="ingredient-input" type="text" value={ingredientInputValue} onChange={handleIngredientInputValue} onKeyDown={enterPressed} placeholder='Type your ingredient and press enter!' className="form-control" id="ingredientInputBox" />
                <ul className="group-wrap mt-2">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="d-flex align-items-center ingred-entry">
                            <div className='ingred-div'>
                            {ingredient}
                            <button type='button' className="btn btn-danger btn-sm edit-recipe-button" onClick={() => removeClicked(index)}>X</button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </form>

        <button className='btn btn-primary gen-recipe-btn' onClick={handleRecipeClick}> Generate Recipes</button>
        {isLoading ? (
          <div className="recipes-below-text">

<h1 className='playfair-display text-big recipe-break'>Loading...</h1>
          </div>

      ) : null}
            {recipes.length === 0  || isLoading ? null : (
        <>
        <div className="recipes-below-text">
        <h1 className='playfair-display text-big recipe-break'>Recipes Below ↓</h1>
        </div>

        </>
      )}
      </div>




      <div className="suggested-recipes">
        {recipes.map((recipe, index) => (
          <h5 key={index}> <AiRecipeBox recipeName={recipe.recipe_name} recipeDescription={recipe.recipe_description} recipeIngredients={recipe.recipe_ingredients} recipeInstructions={recipe.recipe_instructions} addRecipe={addRecipe}/> </h5>
        ))}

        </div>
      
    </div>
  );
};

export default AiRecipe;