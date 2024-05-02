import React, { useEffect, useState } from 'react';
import '../css/recipe-box.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeBox = ({ recipe, deleteRecipe, editRecipe }) => {
    const { recipe_id, recipe_name, recipe_description, recipe_instructions } = recipe;
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients(recipe_id)
    },[])

    async function getIngredients(recipe_id) {
        try {
          const response = await fetch("http://localhost:5000/getingredients/" + recipe_id, {
            method: "GET",
            headers: { token: localStorage.getItem("token") }
          });
    
          const parseRes = await response.json();
    
    
          setIngredients(parseRes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


    const handleDelete = () => {
        deleteRecipe(recipe_id);
    }

    return (
        <div id="recipe-box" className="card">
            <div className="card-body recipe-info">
                <h5 className="card-title recipe-name">{recipe_name}</h5>
                <p className="card-text recipe-description">{recipe_description}</p>
                <div className="ingredient-div">
                {ingredients.map((ingredient, index) => (
            <div className="recipe-box-ingred" key={index}> 
                <h5 className="ingred-entry "key={index}> {ingredient} </h5>
             </div>
        ))}
                </div>
                <div className="instructions">
                    {recipe_instructions}
                </div>

            </div>
            <div className="control-div card-footer">
                <button className="btn btn-danger recipe-box-del" onClick={handleDelete}>Delete</button>
                <button className="btn btn-primary" onClick={() => editRecipe(recipe_id)}>Edit</button>
            </div>
        </div>
    );
};

export default RecipeBox;
