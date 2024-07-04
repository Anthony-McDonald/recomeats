import React from 'react';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/similar-recipe.css'
import Interactions from './Interactions';

const SimilarRecipe = () => {

  return (
    <div id="similar-recipe-div">
      <div id="recipe-name">Tomato Carba</div>
      <div id="recipe-desc">A wagga carba with tomata</div>
      <div id="shared-ingreds">
        Shared Ingredients:
      </div>
      <div id="ingredients">
            <div id='ingredient' className="ingred-div">tomato</div>
            <div id='ingredient' className="ingred-div">tomato</div>
            <div id='ingredient' className="ingred-div">tomato</div>
        </div>
    </div>
  );
};

export default SimilarRecipe;