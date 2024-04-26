const express = require("express")
const app = express();
const cors = require("cors");
const pool = require("./db")
const asyncHandler = require("express-async-handler");
const { DateTime } = require("luxon");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// User Registration

app.post("/createuser", asyncHandler(async(req, res, next) => {

const { user_name, first_name, last_name, date_of_birth, email_address, password_hash, permission_level } = req.body;

const newUser = await pool.query(
    "INSERT INTO Users (user_name, email_address, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [user_name, email_address, password_hash]
);
const newUserProfile = await pool.query(
    "INSERT INTO UserProfiles (user_id, first_name, last_name, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *",
    [newUser.rows[0].user_id, first_name, last_name, date_of_birth]
);
const newUserPermission = await pool.query(
    "INSERT INTO UserPermissions (user_id, permission_level) VALUES ($1, $2) RETURNING *",
    [newUser.rows[0].user_id, permission_level]
);

const response = {
    user: newUser.rows[0],
    profile: newUserProfile.rows[0],
    permission: newUserPermission.rows[0]
};

res.json(response);
}));

// Delete User

app.delete("/deleteuser/:user_id", asyncHandler(async(req, res, next) => {
    const user_id = req.params.user_id;

        // Delete the user's profile from the UserProfiles table
        await pool.query(
            "DELETE FROM UserProfiles WHERE user_id = $1",
            [user_id]
        );

        // Delete the user's permission info from the UserPermissions table
        await pool.query(
            "DELETE FROM UserPermissions WHERE user_id = $1",
            [user_id]
        );

        // Delete all info regarding that particular user's food preferences
        await pool.query(
            "DELETE FROM UserCuisinePreferences WHERE user_id = $1",
            [user_id]
        );

        // Delete all info regarding that particular user's recipes
        await pool.query(
            "DELETE FROM recipes WHERE user_id = $1",
            [user_id]
        );

        // Delete the user from the Users table
        await pool.query(
            "DELETE FROM Users WHERE user_id = $1",
            [user_id]
        );

        res.send();
}));

// Change User Information

app.post("/edituser/:user_id", asyncHandler(async(req, res, next) => {
    const { user_name, first_name, last_name, date_of_birth, email_address, password_hash, permission_level } = req.body;
    const user_id = req.params.user_id;

    // Update Users table
    const updateUser = await pool.query(
        "UPDATE Users SET user_name = $1, email_address = $2, password_hash = $3 WHERE user_id = $4 RETURNING *",
        [user_name, email_address, password_hash, user_id]
    );

    // Update UserProfiles table
    const updateUserProfile = await pool.query(
        "UPDATE UserProfiles SET first_name = $1, last_name = $2, date_of_birth = $3 WHERE user_id = $4 RETURNING *",
        [first_name, last_name, date_of_birth, user_id]
    );

    // Update UserPermissions table
    const updateUserPermission = await pool.query(
        "UPDATE UserPermissions SET permission_level = $1 WHERE user_id = $2 RETURNING *",
        [permission_level, user_id]
    );

    const response = {
        user: updateUser.rows[0],
        profile: updateUserProfile.rows[0],
        permission: updateUserPermission.rows[0]
    };

    res.json(response);
}));



// Get User Information

app.get("/getuser/profile/:user_id", asyncHandler(async(req, res, next) => {
    const user_id = parseInt(req.params.user_id); 
    const result = await pool.query("SELECT first_name, last_name, date_of_birth FROM userprofiles WHERE user_id = $1", [user_id]);
    const userProfile = result.rows[0];

    const response = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        date_of_birth: DateTime.fromJSDate(userProfile.date_of_birth).toLocaleString(DateTime.DATE_SHORT),
    };

    res.json(response);
}));

// Add Cuisine

app.post("/addcuisine", asyncHandler(async(req, res, next) => {
    const { cuisine_name } = req.body;

    const newCuisine = await pool.query("INSERT INTO CuisinePreferences (preference_name) VALUES ($1) RETURNING *",
    [cuisine_name]);

    res.json(newCuisine);

}))

// Remove Cuisine

app.delete("/deletecuisine/:cuisine_id", asyncHandler(async(req, res, next) => {
    const cuisine_id = parseInt(req.params.cuisine_id); 

    await pool.query("DELETE FROM CuisinePreferences WHERE preference_id = $1",[cuisine_id]);


    res.send();

}))

// Add User Cuisine Preference

app.post("/addusercuisine/:user_id/:cuisine_id", asyncHandler(async(req, res, next) => {
    const user_id = parseInt(req.params.user_id); 
    const cuisine_id = parseInt(req.params.cuisine_id); 

    const newCuisinePreference = await pool.query("INSERT INTO UserCuisinePreferences (user_id, preference_id) VALUES ($1, $2) RETURNING *",
    [user_id, cuisine_id]);

    res.json(newCuisinePreference);

}))

// Delete User Cuisine Preference

app.delete("/deletecuisine/:user_id/:cuisine_id", asyncHandler(async(req, res, next) => {
    const user_id = parseInt(req.params.user_id); 
    const cuisine_id = parseInt(req.params.cuisine_id); 

    await pool.query("DELETE FROM UserCuisinePreferences WHERE user_id = $1 AND preference_id = $2",[user_id, cuisine_id]);


    res.send();

}))

// Get all user cuisine preferences
app.get("/getuserpreferences/:user_id", asyncHandler(async(req, res, next) => {
    const user_id = parseInt(req.params.user_id);
    const result = await pool.query("SELECT preference_id FROM UserCuisinePreferences WHERE user_id = $1", [user_id]);

    res.json(result);
}))

// Get Cuisine Name from cuisineID

app.get("/getcuisine/:cuisine_id", asyncHandler(async(req, res, next) => {
    const cuisine_id = parseInt(req.params.cuisine_id);
    const result = await pool.query("SELECT preference_name FROM CuisinePreferences WHERE preference_id = $1", [cuisine_id]);

    res.json(result);
}))


// Add Recipe To User 

app.post("/addrecipe/:user_id", asyncHandler(async(req, res, next) => {
    const user_id = req.params.user_id;
    const { recipe_name, recipe_ingredients, recipe_description } = req.body;
    const addedIngredients = [];

    // Insert new recipe
    const newRecipe = await pool.query("INSERT INTO Recipes (user_id, recipe_name, recipe_description) VALUES ($1, $2, $3) RETURNING *",
    [user_id, recipe_name, recipe_description]);

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

app.delete("/deleterecipe/:user_id/:recipe_id", asyncHandler(async(req, res, next) => {
    const user_id = req.params.user_id;
    const recipe_id = req.params.recipe_id;

    await pool.query("DELETE FROM RecipeIngredients WHERE recipe_id = $1", [recipe_id]);

    await pool.query("DELETE FROM Recipes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);

    res.send();

}))

app.post("/changerecipe/:user_id/:recipe_id", asyncHandler(async(req, res, next) => {
    const user_id = req.params.user_id;
    const recipe_id = req.params.recipe_id;
    const { recipe_name, recipe_ingredients, recipe_description } = req.body;
    const addedIngredients = [];

        await pool.query(
            "UPDATE Recipes SET user_id = $1, recipe_name = $2, recipe_description = $3 WHERE recipe_id = $4",
            [user_id, recipe_name, recipe_description, recipe_id]
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

app.get("/getrecipe/:recipe_id", asyncHandler(async(req, res, next) => {
    const recipe_id = req.params.recipe_id;

    const result = await pool.query("SELECT recipe_name, recipe_description FROM recipes WHERE recipe_id = $1", [recipe_id]);
    const recipe = result.rows[0];

    const response = {
        recipe_name: recipe.recipe_name,
        recipe_description: recipe.recipe_description
    };

    res.json(response);
}));
// Get Recipe Ingredients

app.get("/getingredients/:recipe_id", asyncHandler(async(req, res, next) => {
    const recipe_id = req.params.recipe_id;

    const result = await pool.query("SELECT ingredient_name FROM recipeingredients WHERE recipe_id = $1", [recipe_id]);
    const ingredients = result.rows.map(row => row.ingredient_name); 

    res.json(ingredients);
}));

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})