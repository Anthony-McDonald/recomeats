const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authorisation = require("../middleware/authorise");
const pool = require("../db");
const callChat = require("../middleware/openai");


// call chat api

router.get("/foods", authorisation, asyncHandler(async (req, res, next) => {
    const user_id = req.user.id;
    const { ingredients } = req.query;
    const foodPrefNames = [];

    let chatMessage = "You are a JSON API for taking in ingredients and culinary preferences. You are to return a json api that only provides a  RFC8259 compliant JSON response  following this format without deviation: {'recipe_name': 'the name of the recipe', 'recipe_description': 'a summary of the recipe','recipe_ingredients': 'a | seperated array of all ingredients neccessary to make the dish, feel free to add in extra if required'}, 'recipe_instructions':'a string of instructions to follow to make the recipe', return 10 entries";
    

    const userFoodPrefIds = await pool.query("SELECT preference_id FROM UserCuisinePreferences WHERE user_id = $1", [user_id]);
    for (let i = 0; i < userFoodPrefIds.rows.length; i++) {
        const prefId = userFoodPrefIds.rows[i].preference_id;
        const prefName = await pool.query("SELECT preference_name FROM CuisinePreferences WHERE preference_id = $1", [prefId]);
        foodPrefNames.push(prefName.rows[0].preference_name);
    }

    for (let j = 0; j < foodPrefNames.length; j++) {
        let foodPreference = foodPrefNames[j];
        chatMessage += foodPreference + ", ";
    }
    chatMessage += " food and have ";

    for (let k = 0; k < ingredients.length; k++) {
        let ingredient = ingredients[k];
        chatMessage += ingredient;
    }

    chatMessage += " in my pantry. Recommend me 10 dishes to cook. Give it to me as a csv but seperate by | instead of ,. Give me it with recipe names, descriptions and ingredients.";

    const recommendations = await callChat(chatMessage);

    const response = {
        reccomendations: recommendations.message.content,
    }
    res.json(response);
}));




module.exports = router;

