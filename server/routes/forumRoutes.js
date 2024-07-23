const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authorisation = require("../middleware/authorise");
const pool = require("../db");




// Create new thread

router.post("/newthread", authorisation, asyncHandler(async (req, res) => {
    const { title, body, recipe_id, image_store } = req.body;
    const userId = req.user.id;
    let newImageId = null

    if (image_store != null) {
        const newImage = await pool.query("INSERT INTO Images (image_store) VALUES ($1) RETURNING *",
        [image_store]);
        newImageId = newImage.rows[0].image_id;
    }

    const newPost = await pool.query("INSERT INTO Posts (user_id, recipe_id, title, body, image_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [userId, recipe_id, title, body, newImageId ]);


    const response = {
        newImage: newImageId,
        newPost: newPost.rows[0]
    };

    res.json(response);
}));


// Create new comment

router.post("/newcomment", authorisation, asyncHandler(async (req, res) => {
    const { cuisine_name } = req.body;

    const newCuisine = await pool.query("INSERT INTO CuisinePreferences (preference_name) VALUES ($1) RETURNING *",
    [cuisine_name]);

    res.json(newCuisine);
}));

// Create new reply

router.post("/newreply", authorisation, asyncHandler(async (req, res) => {
    const { cuisine_name } = req.body;

    const newCuisine = await pool.query("INSERT INTO CuisinePreferences (preference_name) VALUES ($1) RETURNING *",
    [cuisine_name]);

    res.json(newCuisine);
}));



// Other user-related routes...

module.exports = router;