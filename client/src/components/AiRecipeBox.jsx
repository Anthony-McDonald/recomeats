import { useState } from 'react';
import '../css/ai-recipe-box.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AiRecipeBox = ({recipeName, recipeDescription, recipeIngredients, recipeInstructions, addRecipe}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  // On button click, add recipe to the user's recipe list
  const handleButtonClick = () => {
    addRecipe(recipeName, recipeDescription, recipeIngredients, recipeInstructions)
    setButtonClicked(true);
  }

  return (
    <div id="ai-recipe-box">
        <div className="top-recipe-box">
        <h3>{recipeName}</h3>
      {/* If button is clicked, show 'Added!', otherwise show 'Add to Recipes' */}
        {buttonClicked ? (<h4 className='button-clicked-alternate'> Added! </h4>) : (  <button onClick={handleButtonClick} className='btn btn-primary add-recipe-btn'>Add to Recipes</button>)}
        </div>

        <h5>{recipeDescription}</h5>
        <div className="ingredients">
          {/* Map over each ingredient, and show it on screen */}
        {recipeIngredients.map((ingredient, index) => (
            <div className="ai-ingred-div" id="ingred" key={index}> 
                <h5 key={index}> {ingredient} </h5>
             </div>

        ))}
        </div>

    </div>


  );
};

export default AiRecipeBox;
