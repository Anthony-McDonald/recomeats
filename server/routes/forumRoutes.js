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
        await pool.query("DELETE FROM Upvotes WHERE item_id = $1 AND item_type = 'post'",[post_id])
        await pool.query("DELETE FROM Posts WHERE post_id = $1",[post_id])
        await pool.query("DELETE FROM Images WHERE image_id = $1",[rtd_image_id])
    }
    res.send()
}));


// Get Threads

router.get("/threadlist", authorisation, asyncHandler(async (req, res) => {
    const posts = await pool.query("SELECT * FROM posts")
    const response = posts.rows.map(post => ({
        post_id: post.post_id,
        user: post.user_id,
        title: post.title,
        body: post.body,
        image_id: post.image_id,
        upvotes: post.upvotes,
        created_at: DateTime.fromJSDate(post.created_at).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }));

    res.json(response);
}));

router.get("/thread/:thread_id", authorisation, asyncHandler(async (req, res) => {
    const thread_id = parseInt(req.params.thread_id);
    
    const thread = await pool.query("SELECT * FROM Posts WHERE post_id = $1", [thread_id]);

    let response = thread.rows[0]
    response = {
        user_id: response.user_id,
        recipe_id: response.recipe_id,
        title: response.title,
        body: response.body,
        image: response.image_id,
        created_at: response.created_at
    }

    res.json(response);
}))

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
        await pool.query("DELETE FROM Upvotes WHERE item_type = 'comment' AND item_id = $1", [comment_id])
        await pool.query("DELETE FROM Comments WHERE comment_id = $1",[comment_id])
    } else {
        res.send("incorrect user to delete this reply")
    }
    res.send()
}));

// Get Comments

router.get("/commentlist", authorisation, asyncHandler(async (req, res) => {
    const { post_id } = req.query;
    const comments = await pool.query("SELECT * FROM Comments WHERE post_id = $1",[post_id])
    const response = comments.rows.map(comment => ({
        comment_id: comment.comment_id,
        user_id: comment.user_id,
        body: comment.body,
        upvotes: comment.upvotes,
        created_at: DateTime.fromJSDate(comment.created_at).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }));

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
        await pool.query("DELETE FROM Upvotes WHERE item_type = 'reply' AND item_id = $1", [reply_id])
        await pool.query("DELETE FROM Replies WHERE reply_id = $1",[reply_id])
    } else {
        res.send("incorrect user to delete this reply")
    }
    res.send()
}));

// Get Replies

router.get("/replylist", authorisation, asyncHandler(async (req, res) => {
    const { comment_id } = req.query; 

    const { rows: replies } = await pool.query("SELECT * FROM Replies");

    const nestedReplies = (replies, parentId) => {
        return replies
            .filter(reply => reply.parent_id === parentId)
            .map(reply => ({
                ...reply,
                replies: nestedReplies(replies, reply.reply_id),
            }));
    };

    const nestedRepliesOut = nestedReplies(replies, parseInt(comment_id, 10));

    res.json(nestedRepliesOut);
}));

// upvote

router.put("/upvote", authorisation, asyncHandler(async (req, res) => {
const user_id = req.user.id;
const {type_upvoted, upvoted_id} = req.body
let deleteUpvote, giveUpvote
const userUpvote = await pool.query("SELECT * FROM Upvotes WHERE user_id = $1 AND item_id = $2 AND item_type = $3",[user_id, upvoted_id, type_upvoted])

if (userUpvote.rowCount > 0) {
     deleteUpvote = await pool.query("DELETE FROM Upvotes WHERE user_id = $1 AND item_id = $2 AND item_type = $3",[user_id, upvoted_id, type_upvoted])
} else {
   giveUpvote = await pool.query("INSERT INTO Upvotes (user_id, item_id, item_type) VALUES ($1, $2, $3)",[user_id, upvoted_id, type_upvoted])
}
const response = {
    upvoteDeleted: deleteUpvote,
    upvoteGiven: giveUpvote,
};
res.json(response);
}));

// Number of upvotes

router.get("/upvotecount", authorisation, asyncHandler(async (req, res) => {
    const {type_upvoted, upvoted_id} = req.query
    
    const totalUpvotes = await pool.query("SELECT COUNT(*) FROM Upvotes WHERE item_id = $1 AND item_type = $2",[upvoted_id, type_upvoted])

    res.json(totalUpvotes.rows[0])
})); 

// Has upvoted

router.get("/hasupvoted", authorisation, asyncHandler(async (req, res) => {
    user_id = req.user.id
    const {type_upvoted, upvoted_id} = req.query
    
    const upvoteRows = await pool.query("SELECT * FROM Upvotes WHERE item_id = $1 AND item_type = $2 AND user_id = $3",[upvoted_id, type_upvoted, user_id])

    if (upvoteRows.rowCount > 0) {
        res.json(true)
    } else {
        res.json(false)
    }
})); 

// get image

router.get("/getimage", authorisation, asyncHandler(async (req, res) => {
    const { image_id } = req.query;
    const posts = await pool.query("SELECT * FROM Images WHERE image_id = $1",[image_id]);
    const response = {
        imageUrl: posts.rows[0].image_store
    };
    
    res.json(response);
}));


// add a notification

router.post("/newnotif", authorisation, asyncHandler(async (req, res) => {
    const { user_notifying_id, post_id, notif_type } = req.body;
    const user_id = req.user.id;

    const newNotif = await pool.query("INSERT INTO Notifications (user_notifying_id, user_sent_id, post_id, notif_type) VALUES ($1,$2,$3,$4) RETURNING *",
        [user_notifying_id, user_id, post_id, notif_type]);
    
        const response = {
            newNotif: newNotif.rows[0]
        };
    
        res.json(response);
}));


// delete a notification

router.delete("/deletenotif", authorisation, asyncHandler(async (req, res) => {
    const { notif_id } = req.body;
    await pool.query("DELETE FROM Notifications WHERE notif_id = $1", [notif_id])
    res.send();
}));

// get a user's current notifications

router.get("/getusernotifs", authorisation, asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const posts = await pool.query("SELECT * FROM Notifications WHERE user_notifying_id = $1",[user_id]);
    const response = posts.rows
    
    res.json(response);
}));

router.get("/getuserposted", authorisation, asyncHandler(async (req, res) => {
   const {type, id} = req.query;
   let response;

   switch (type) {
    case "post":
        response = await pool.query("SELECT user_id From posts WHERE post_id = $1", [id])
        break;
    case "comment":
        response = await pool.query("SELECT user_id From comments WHERE comment_id = $1", [id])
        break;
    case "reply":
        response = await pool.query("SELECT user_id From replies WHERE reply_id = $1", [id])
        break;
    case "upvote":
        response = await pool.query("SELECT user_id FROM upvotes WHERE item_id = $1 AND item_type IN ('comment','reply','upvote')", [id]);
        break;
   }
   return res.json(response.rows[0]);
}))

module.exports = router;