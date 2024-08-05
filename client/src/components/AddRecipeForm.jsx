import { useState } from 'react';
import '../css/edit-recipe-form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddRecipeForm = ({ editRecipeName, editRecipeDescription, editRecipeInstructions, setRecipeForm, setRecipeName, setRecipeDescription, setRecipeInstructions, setRecipeIngredients, recipeIngredients, submitFunction }) => {
    const [ingredientInputValue, setIngredientInputValue] = useState('');

    // Handlers for inputs
    const handleIngredientInputValue = (e) => {
        setIngredientInputValue(e.target.value);
    };

    const handleInstructionInputValue = (e) => {
        setRecipeInstructions(e.target.value);
    };

    const handleNameInputValue = (e) => {
        setRecipeName(e.target.value);
    };

    const handleDescriptionInputValue = (e) => {
        setRecipeDescription(e.target.value);
    };

    // Enter pressed
    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredient(ingredientInputValue);
            setIngredientInputValue('');
        }
    };

    const addIngredient = (ingredient) => {
        const recipeIngredientsClone = [...recipeIngredients];
        recipeIngredientsClone.push(ingredient);
        setRecipeIngredients(recipeIngredientsClone);
    };

    const removeClicked = (i) => {
        const ingredientCopy = [...recipeIngredients];
        ingredientCopy.splice(i, 1);
        setRecipeIngredients(ingredientCopy);
    };

    const handleCloseForm = () => {
        setRecipeForm(false);
    };

    return (
        // Modal holder
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="editRecipeModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                    {/* Start of modal */}
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editRecipeModal">Edit Recipe</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/* Recipe name input area */}
                            <div className="mb-3">
                                <label htmlFor="recipeFormInput" className="form-label">Recipe Name</label>
                                <input type="text" value={editRecipeName} onChange={handleNameInputValue} className="form-control" id="recipeFormInput" />
                            </div>
                    {/* Recipe description input area*/}
                            <div className="mb-3">
                                <label htmlFor="recipeDescriptionInput" className="form-label">Description</label>
                                <input type="text" value={editRecipeDescription} onChange={handleDescriptionInputValue} className="form-control" id="recipeDescriptionInput" />
                            </div>
                    {/* Recipe instruction input area */}
                            <div className="mb-3">
                                <label htmlFor="recipeInstructionsInput" className="form-label">Instructions</label>
                                <textarea type="text" value={editRecipeInstructions} onChange={handleInstructionInputValue} className="form-control" id="recipeInstructionsInput" />
                            </div>
                    {/* Recipe ingredients input area */}
                            <div className="mb-3">
                                <label htmlFor="recipeIngredientsInput" className="form-label">Ingredients</label>
                                <input type="text" value={ingredientInputValue} onChange={handleIngredientInputValue} onKeyDown={enterPressed} placeholder="Type your ingredient and press enter!" className="form-control" id="recipeIngredientsInput" />
                                <ul className="group-wrap mt-2">
                    {/* Map over recipeIngredients and list each ingredient */}
                                    {recipeIngredients.map((ingredient, index) => (
                                        <li key={index} className="d-flex align-items-center ingred-entry">
                                            <div className='ingred-div'>
                                                {ingredient}
                                                <button type='button' className="btn btn-danger btn-sm edit-recipe-button" onClick={() => removeClicked(index)}>X</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button type="submit" onClick={submitFunction} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecipeForm;
