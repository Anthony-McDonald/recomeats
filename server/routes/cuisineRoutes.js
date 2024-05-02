const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const pool = require("../db");
const authorisation = require("../middleware/authorise")



// Add Cuisine

router.post("/addcuisine", asyncHandler(async(req, res, next) => {
    const { cuisine_name } = req.body;

    const newCuisine = await pool.query("INSERT INTO CuisinePreferences (preference_name) VALUES ($1) RETURNING *",
    [cuisine_name]);

    res.json(newCuisine);

}))

// Remove Cuisine

router.delete("/deletecuisine/:cuisine_id", asyncHandler(async(req, res, next) => {
    const cuisine_id = parseInt(req.params.cuisine_id); 

    await pool.query("DELETE FROM CuisinePreferences WHERE preference_id = $1",[cuisine_id]);


    res.send();

}))

// Get Cuisines

// Add User Cuisine Preference

router.post("/addusercuisine/:cuisine_id", authorisation, asyncHandler(async(req, res, next) => {
    const user_id = req.user.id;
    const cuisine_id = req.params.cuisine_id; 

    const newCuisinePreference = await pool.query("INSERT INTO UserCuisinePreferences (user_id, preference_id) VALUES ($1, $2) RETURNING *",
    [user_id, cuisine_id]);

    res.json(newCuisinePreference);

}))

// Delete User Cuisine Preference

router.delete("/deleteusercuisine/", authorisation, asyncHandler(async(req, res, next) => {
    const user_id = req.user.id;
    await pool.query("DELETE FROM UserCuisinePreferences WHERE user_id = $1",[user_id]);


    res.send();

}))

// Get all user cuisine preferences
router.get("/getuserpreferences", authorisation, asyncHandler(async(req, res, next) => {
    const user_id = req.user.id;
    const result = await pool.query("SELECT preference_id FROM UserCuisinePreferences WHERE user_id = $1", [user_id]);
    const response = result.rows.map(cuisine => ({
        preference_id: cuisine.preference_id,
        
    }));

    res.json(response);
}))

// Get Cuisine Name from cuisineID

router.get("/getcuisine/:cuisine_id", asyncHandler(async(req, res, next) => {
    const cuisine_id = parseInt(req.params.cuisine_id);
    const result = await pool.query("SELECT preference_name FROM CuisinePreferences WHERE preference_id = $1", [cuisine_id]);

    const response = result.rows.map(cuisine => ({
        preference_name: cuisine.preference_name,
    }));
    res.json(response);
}))

module.exports = router;
