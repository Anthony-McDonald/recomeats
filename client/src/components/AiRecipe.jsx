import React from 'react';
import "../css/ai-recipe.css"
import { useState,useEffect } from 'react';
import AiRecipeBox from './AiRecipeBox';

const AiRecipe = ({setAuth, cuisinePreferences, addRecipe}) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientInputValue, setIngredientInputValue] = useState("");
  const [ingredients, setIngredients] = useState(["potatoes", "cheese", "garlic"]);
  const [isLoading, setLoading] = useState(false);

  const url = 'http://localhost:5000/foods?ingredients=' + ingredients.join(',');

  useEffect(() => {
    verifyAuthentication();
  }, []);


  const enterPressed = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addIngredient(ingredientInputValue);
        setIngredientInputValue('');
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
    console.log(ingredients);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {token: localStorage.getItem("token")}
      });

      const parseRes = await response.json();
      console.log(parseRes);
      const recommendations = JSON.parse(parseRes.reccomendations); 
      const recipes = Object.values(recommendations).map(recipeData => ({
          recipe_name: recipeData.recipe_name,
          recipe_description: recipeData.recipe_description,
          recipe_ingredients: recipeData.recipe_ingredients.split('|')
      }));
      console.log(recipes);
      

      setRecipes(recipes);
      console.log(recipes)
      setLoading(false);

    } catch (err) {
      console.error("Problem fetching data:", err);
    }
  }

  const handleRecipeClick = () => {
    setLoading(true);
    getRecipes();
  }

    

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
      </div>

      {isLoading ? (
        <h1 className='playfair-display text-big recipe-break'>Loading...</h1>
      ) : null}


      {recipes.length === 0 ? null : (
        <>
            <h1 className='playfair-display text-big recipe-break'>Recipes:</h1>
        </>
      )}

      <div className="suggested-recipes">
        {recipes.map((recipe, index) => (
          <h5 key={index}> <AiRecipeBox recipeName={recipe.recipe_name} recipeDescription={recipe.recipe_description} recipeIngredients={recipe.recipe_ingredients} addRecipe={addRecipe}/> </h5>
        ))}

        </div>
      
    </div>
  );
};

export default AiRecipe;