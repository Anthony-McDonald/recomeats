import React from 'react';
import '../css/recipe-box.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeBox = ({ recipe, deleteRecipe, editRecipe }) => {
    const { recipe_id, recipe_name, recipe_description } = recipe;

    const handleDelete = () => {
        deleteRecipe(recipe_id);
    }

    return (
        <div id="recipe-box" className="card">
            <div className="card-body recipe-info">
                <h5 className="card-title recipe-name">{recipe_name}</h5>
                <p className="card-text recipe-description">{recipe_description}</p>
            </div>
            <div className="control-div card-footer">
                <button className="btn btn-danger recipe-box-del" onClick={handleDelete}>Delete</button>
                <button className="btn btn-primary" onClick={() => editRecipe(recipe_id)}>Edit</button>
            </div>
        </div>
    );
};

export default RecipeBox;
