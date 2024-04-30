import React from 'react';
import '../css/add-recipe-form.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState } from 'react';

const AddRecipeForm = ({setRecipeForm}) => {
    const [ingredientInputValue, setInputValue] = useState("");
    const [ingredientList, setIngredientList] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient(ingredientInputValue);
            setInputValue('');
        }
    }

    const addIngredient = (ingredient) => {
        ingredientList.push(ingredient);
    } 

    const removeClicked = (i) => {
        const ingredientCopy = [...ingredientList];
        ingredientCopy.splice(i, 1);
        setIngredientList(ingredientCopy)
    }
    const handleCloseForm = () => {
        setRecipeForm(false);
    }
  return (
    <div id="add-recipe-div">
        <form>
  <div className="mb-3">
    <label htmlFor="recipeFormInput" className="form-label">Recipe Name</label>
    <input type="text" className="form-control" id="recipeFormInput" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="recipeDescriptionInput" className="form-label">Description</label>
    <input type="text" className="form-control" id="recipeDescriptionInput"/>
  </div>
    <div className="mb-3">
    <label htmlFor="recipeIngredientsInput" className="form-label">Ingredients</label>
    <input type="text" value={ingredientInputValue} onChange={handleInputChange} onKeyDown={enterPressed} placeholder='Type your ingredient and press enter!' className="form-control" id="recipeIngredientsInput"/>
    {ingredientList.map((ingredient, index) => (
        <li key={index}> {ingredient}
        <button type='button' onClick={() => removeClicked(index)}>X</button>
         </li>
    ))}
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        <button onClick={handleCloseForm}> close form</button>
    </div>
  );
};

export default AddRecipeForm;
