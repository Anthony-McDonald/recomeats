const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authorisation = require("../middleware/authorise");
const pool = require("../db");

// Add Recipe To User 

router.post("/addrecipe", authorisation, asyncHandler(async(req, res, next) => {
    const user_id = req.user.id;
    const { recipe_name, recipe_ingredients, recipe_description, recipe_instructions } = req.body;
    const addedIngredients = [];

    // Insert new recipe
    const newRecipe = await pool.query("INSERT INTO Recipes (user_id, recipe_name, recipe_description, recipe_instructions) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, recipe_name, recipe_description, recipe_instructions]);

    // Insert ingredients for the recipe
    for (let i = 0; i < recipe_ingredients.length; i++) {
        const ingredient = recipe_ingredients[i];
        const newIngredient = await pool.query("INSERT INTO RecipeIngredients (recipe_id, ingredient_name) VALUES ($1, $2) RETURNING *",
        [newRecipe.rows[0].recipe_id, ingredient]);
        addedIngredients.push(newIngredient.rows[0]); 
    }


    const response = {
        recipe: newRecipe.rows[0], 


        ingredients: addedIngredients.map(ingredient => {
            return {
                ingredient_id: ingredient.ingredient_id,
                ingredient_name: ingredient.ingredient_name
            };
        })
    };

    res.json(response);
}));


// Delete Recipe From User

router.delete("/deleterecipe/:recipe_id", authorisation, asyncHandler(async(req, res, next) => {
    const user_id = req.user.id;
    const recipe_id = req.params.recipe_id;

    await pool.query("DELETE FROM RecipeIngredients WHERE recipe_id = $1", [recipe_id]);

    await pool.query("DELETE FROM Recipes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);

    res.send();

}))


// Change existing recipe

router.post("/changerecipe/:recipe_id", authorisation, asyncHandler(async(req, res, next) => {
    const user_id = req.user.id;
    const recipe_id = req.params.recipe_id;
    const { recipe_name, recipe_ingredients, recipe_description, recipe_instructions } = req.body;
    const addedIngredients = [];

        await pool.query(
            "UPDATE Recipes SET user_id = $1, recipe_name = $2, recipe_description = $3, recipe_instructions = $4 WHERE recipe_id = $5",
            [user_id, recipe_name, recipe_description, recipe_instructions, recipe_id]
        );

        await pool.query("DELETE FROM RecipeIngredients WHERE recipe_id = $1", [recipe_id]);

        // Insert new recipe ingredients
        for (const ingredient of recipe_ingredients) {
            const newIngredient = await pool.query(
                "INSERT INTO RecipeIngredients (recipe_id, ingredient_name) VALUES ($1, $2) RETURNING *",
                [recipe_id, ingredient]
            );
            addedIngredients.push(newIngredient.rows[0]); 
        }

        const response = {
            recipe: {
                recipe_id: recipe_id,
                user_id: user_id,
                recipe_name: recipe_name,
                recipe_description: recipe_description
            },
            ingredients: addedIngredients.map(ingredient => {
                return {
                    ingredient_id: ingredient.ingredient_id,
                    ingredient_name: ingredient.ingredient_name
                };
            })
        };

        res.json(response);
}));



// Get User Recipes

router.get("/getrecipes", authorisation, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;

    const result = await pool.query("SELECT recipe_id, recipe_name, recipe_description, recipe_instructions FROM recipes WHERE user_id = $1", [userId]);

    // Map the result array to create the response array
    const response = result.rows.map(recipe => ({
        recipe_id: recipe.recipe_id,
        recipe_name: recipe.recipe_name,
        recipe_description: recipe.recipe_description,
        recipe_instructions: recipe.recipe_instructions
    }));

    res.json(response);
}));

// Get Recipe Directions

router.get("/getdirections/", asyncHandler(async(req, res, next) => {
    const recipe_id = req.query.recipe_id;

    const result = await pool.query("SELECT recipe_instructions FROM Recipes WHERE recipe_id = $1", [recipe_id]);
    const instruction = result.rows[0];

    res.json(instruction);
}));


// Get Recipe Ingredients

router.get("/getingredients/:recipe_id", asyncHandler(async(req, res, next) => {
    const recipe_id = req.params.recipe_id;

    const result = await pool.query("SELECT ingredient_name FROM recipeingredients WHERE recipe_id = $1", [recipe_id]);
    const ingredients = result.rows.map(row => row.ingredient_name); 

    res.json(ingredients);
}));

module.exports = router;
