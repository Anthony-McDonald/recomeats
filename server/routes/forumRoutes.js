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
    const { post_id, body } = req.body;
    const user_id = req.user.id;

    const newComment = await pool.query("INSERT INTO Comments (user_id, post_id, body) VALUES ($1,$2,$3) RETURNING *",
    [user_id, post_id, body]);


    const response = {
        newComment: newComment.rows[0]
    };

    res.json(response);
}));

// Delete comment

router.delete("/deletecomment", authorisation, asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const { comment_id } = req.body;
    const row_to_delete = await pool.query("SELECT user_id FROM Comments WHERE comment_id = $1",[comment_id])
    
    const rtd_user_id = row_to_delete.rows[0].user_id

    if (user_id === rtd_user_id) {
        await pool.query("DELETE FROM Comments WHERE comment_id = $1",[comment_id])
    }
    res.send()
}));

// Get Comments

router.get("/commentlist", authorisation, asyncHandler(async (req, res) => {
    const { post_id } = req.body;
    const comments = await pool.query("SELECT * FROM Comments WHERE post_id = $1",[post_id])
    const response = comments.rows.map(comment => ({
        user_id: comment.user_id,
        body: comment.body,
        upvotes: comment.upvotes,
        created_at: DateTime.fromJSDate(comment.created_at).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }));

    // Send the response
    res.json(response);
}));


// Create new reply

router.post("/newreply", authorisation, asyncHandler(async (req, res) => {
    const { parent_id, parent_type, body } = req.body;
    const user_id = req.user.id;

    if (parent_type === "comment" || parent_type === "reply") {
        const newReply = await pool.query("INSERT INTO Replies (parent_id, parent_type, user_id, body) VALUES ($1,$2,$3,$4) RETURNING *",
            [parent_id, parent_type, user_id, body]);
        
            const response = {
                newReply: newReply.rows[0]
            };
        
            res.json(response);
    } else {
        res.json("incorrect parent type")
    }


}));

// Delete reply

router.delete("/deletereply", authorisation, asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const { reply_id } = req.body;
    const row_to_delete = await pool.query("SELECT user_id FROM Replies WHERE reply_id = $1",[reply_id])
    
    const rtd_user_id = row_to_delete.rows[0].user_id

    if (user_id === rtd_user_id) {
        await pool.query("DELETE FROM Replies WHERE reply_id = $1",[reply_id])
    }
    res.send()
}));

// Get Replies

router.get("/replylist", authorisation, asyncHandler(async (req, res) => {
    const { parent_id } = req.body;
    const replies = await pool.query("SELECT * FROM Replies WHERE parent_id = $1",[parent_id])
    const response = replies.rows.map(reply => ({
        user_id: reply.user_id,
        body: reply.body,
        upvotes: reply.upvotes,
        created_at: DateTime.fromJSDate(reply.created_at).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }));

    // Send the response
    res.json(response);
}));


// Other user-related routes...

module.exports = router;