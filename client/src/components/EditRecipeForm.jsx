import React from 'react';
import '../css/add-recipe-form.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from 'react';

const EditRecipeForm = ({editRecipeName, editRecipeDescription, setRecipeForm, setRecipeName, setRecipeDescription, setRecipeIngredients, recipeIngredients , submitFunction}) => {
    const [ingredientInputValue, setIngredientInputValue] = useState("");


    const handleIngredientInputValue = (e) => {
        setIngredientInputValue(e.target.value);
      };
    
    const handleNameInputValue = (e) => {
    setRecipeName(e.target.value);
    };

    const handleDescriptionInputValue = (e) => {
    setRecipeDescription(e.target.value);
    };

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient(ingredientInputValue);
            setIngredientInputValue('');
        }
    }

    const addIngredient = (ingredient) => {
        const recipeIngredientsClone = [...recipeIngredients];
        recipeIngredientsClone.push(ingredient)
        setRecipeIngredients(recipeIngredientsClone);
    } 

    const removeClicked = (i) => {
        const ingredientCopy = [...recipeIngredients];
        ingredientCopy.splice(i, 1);
        setRecipeIngredients(ingredientCopy)
    }
    const handleCloseForm = () => {
        setRecipeForm(false);
    }
  return (
    <div id="add-recipe-div">
        <form>
  <div className="mb-3">
    <label htmlFor="recipeFormInput" className="form-label">Recipe Name</label>
    <input type="text" value={editRecipeName} onChange={handleNameInputValue} className="form-control" id="recipeFormInput" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="recipeDescriptionInput" className="form-label">Description</label>
    <input type="text" value={editRecipeDescription} onChange={handleDescriptionInputValue} className="form-control" id="recipeDescriptionInput"/>
  </div>
    <div className="mb-3">
    <label htmlFor="recipeIngredientsInput" className="form-label">Ingredients</label>
    <input type="text" value={ingredientInputValue} onChange={handleIngredientInputValue} onKeyDown={enterPressed} placeholder='Type your ingredient and press enter!' className="form-control" id="recipeIngredientsInput"/>
    {recipeIngredients.map((ingredient, index) => (
        <li key={index}> {ingredient}
        <button type='button' onClick={() => removeClicked(index)}>X</button>
         </li>
    ))}
  </div>
  <button type="submit" onClick={submitFunction} className="btn btn-primary">Submit</button>
</form>
        <button onClick={handleCloseForm}> close form</button>
    </div>
  );
};

export default EditRecipeForm;
