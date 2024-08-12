import "../css/ai-recipe.css"
import { useState,useEffect } from 'react';
import AiRecipeBox from './AiRecipeBox';

const AiRecipe = ({setAuth, cuisinePreferences, addRecipe}) => {
  // States 
  const [recipes, setRecipes] = useState([]);
  const [ingredientInputValue, setIngredientInputValue] = useState("");
  const [ingredients, setIngredients] = useState(["potatoes", "cheese", "garlic"]);
  const [isLoading, setLoading] = useState(false);

  const url = 'http://localhost:5000/chat/foods?ingredients=' + ingredients.join(',');

  // Verify that user is logged in
  useEffect(() => {
    verifyAuthentication();
  }, []);

  // Enter pressed
  const enterPressed = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (ingredientInputValue !== '') {
          addIngredient(ingredientInputValue);
          setIngredientInputValue('');
        }

    }
}
  // Handle typing of ingredients
const handleIngredientInputValue = (e) => {
  setIngredientInputValue(e.target.value);
};

 // Handle addding of ingredients to array
const addIngredient = (ingredient) => {
  const recipeIngredientsClone = [...ingredients];
  recipeIngredientsClone.push(ingredient);
  setIngredients(recipeIngredientsClone);
}

// Handle removal of ingredients
const removeClicked = (i) => {
  const ingredientCopy = [...ingredients];
  ingredientCopy.splice(i, 1);
  setIngredients(ingredientCopy);
}


// Function to get recipes
  async function getRecipes() {
    try {
      // Send for response
      const response = await fetch(url, {
        method: "GET",
        headers: {token: localStorage.getItem("token")}
      });
      // Retrieve response
      const parseRes = await response.json();
      const recommendations = JSON.parse(parseRes.reccomendations);
      // Parse response into recipes
const recipes = recommendations.recipes.map(recipeData => ({
    recipe_name: recipeData.recipe_name,
    recipe_description: recipeData.recipe_description,
    recipe_ingredients: recipeData.recipe_ingredients.split('|'),
    recipe_instructions: recipeData.recipe_instructions,
}));
      
    // Return recies to recipe state
      setRecipes(recipes);

      setLoading(false);

    } catch (err) {
      console.error("Problem fetching data:", err);
    }
  }

  // On recipe click....
  const handleRecipeClick = () => {
    setLoading(true);
    setRecipes([]);
    getRecipes();
  }

    
  // Ensure user is logged in
    async function verifyAuthentication() {
        try {
        const response = await fetch("http://localhost:5000/users/is-verify", {
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

        <h3 className='text-mid playfair-display'> Let us guide you into flavour exploration</h3>
      </div>
      <a href="/"><button className='btn btn-primary home-btn'> Back to home</button></a>

      </div>

      <h5 className='text-small playfair-display'> Your current cuisine preferences are:</h5>
      <h5 className='explanation'>(If you want to add more, click back to home at the top right of your screen and go to the cuisines tab)</h5>
      <div className="cuisine-preferences">
        {/* For each cuisine preference,  display it on the screen*/}
      {cuisinePreferences.map((text, index) => (
        <h5 className='playfair-display text-tiny' key={index}>{text}</h5>
      ))}
      </div>
      
      <div className="recipe-box">
        <form>
            <div className="mb-3 ingredient-input-area">
                <label htmlFor="ingredientInputBox" className="form-label">Ingredients:</label>
                <input className="ingredient-input form-control" type="text" value={ingredientInputValue} onChange={handleIngredientInputValue} onKeyDown={enterPressed} placeholder='Type your ingredient and press enter!' id="ingredientInputBox" />
                <ul className="group-wrap mt-2">
                  {/* For each ingredient, display it on the screen */}
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
          {/* Button for generating recipes */}
        <button className='btn btn-primary gen-recipe-btn' onClick={handleRecipeClick}> Generate Recipes</button>
        {isLoading ? (
          <div className="recipes-below-text">

          {/* Show Loading... on screen whilst recipes are loading, otherwise show nothing. Once isLoading is false, show 'Recipes Below' */}
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

      {/* Map over and show all generated recipes */}
      <div className="suggested-recipes">
        {recipes.map((recipe, index) => (
          <h5 key={index}> <AiRecipeBox recipeName={recipe.recipe_name} recipeDescription={recipe.recipe_description} recipeIngredients={recipe.recipe_ingredients} recipeInstructions={recipe.recipe_instructions} addRecipe={addRecipe}/> </h5>
        ))}

        </div>
      
    </div>
  );
};

export default AiRecipe;