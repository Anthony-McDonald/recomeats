const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authorisation = require("../middleware/authorise");
const pool = require("../db");

const { DateTime } = require("luxon");




// Create new thread

router.post("/newthread", authorisation, asyncHandler(async (req, res) => {
    const { title, body, recipe_id, image_store } = req.body;
    const user_id = req.user.id;
    let newImageId = null

    if (image_store != null) {
        const newImage = await pool.query("INSERT INTO Images (image_store) VALUES ($1) RETURNING *",
        [image_store]);
        newImageId = newImage.rows[0].image_id;
    }

    const newPost = await pool.query("INSERT INTO Posts (user_id, recipe_id, title, body, image_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [user_id, recipe_id, title, body, newImageId ]);


    const response = {
        newImage: newImageId,
        newPost: newPost.rows[0]
    };

    res.json(response);
}));

// Delete thread

router.delete("/deletethread", authorisation, asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const { post_id } = req.body;
    const row_to_delete = await pool.query("SELECT user_id, image_id FROM Posts WHERE post_id = $1",[post_id])
    
    const rtd_image_id = row_to_delete.rows[0].image_id
    const rtd_user_id = row_to_delete.rows[0].user_id

    if (user_id === rtd_user_id) {
        await pool.query("DELETE FROM Posts WHERE post_id = $1",[post_id])
        await pool.query("DELETE FROM Images WHERE image_id = $1",[rtd_image_id])
    }
    res.send()
}));


// Get Threads

router.get("/threadlist", authorisation, asyncHandler(async (req, res) => {
    const posts = await pool.query("SELECT * FROM posts")
    const response = posts.rows.map(post => ({
        title: post.title,
        body: post.body,
        image_id: post.image_id,
        upvotes: post.upvotes,
        created_at: DateTime.fromJSDate(post.created_at).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }));

    // Send the response
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