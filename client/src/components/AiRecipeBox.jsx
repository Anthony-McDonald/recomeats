import { useState } from 'react';
import '../css/ai-recipe-box.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Cuisines from './Cuisines';

const AiRecipeBox = ({recipeName, recipeDescription, recipeIngredients, recipeInstructions, addRecipe}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    addRecipe(recipeName, recipeDescription, recipeIngredients, recipeInstructions)
    setButtonClicked(true);
  }

  return (
    <div id="ai-recipe-box">
        <div className="top-recipe-box">
        <h3>{recipeName}</h3>
    
        {buttonClicked ? (<h4 className='button-clicked-alternate'> Added! </h4>) : (  <button onClick={handleButtonClick} className='btn btn-primary add-recipe-btn'>Add to Recipes</button>)}
        </div>

        <h5>{recipeDescription}</h5>
        <div className="ingredients">
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
