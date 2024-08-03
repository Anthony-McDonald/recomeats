const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authorisation = require("../middleware/authorise");
const validInfo = require("../middleware/validInfo");
const pool = require("../db");
const { DateTime } = require("luxon");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");



// Dash 

router.get("/dashboard", authorisation, asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    const user = await pool.query(
        "SELECT user_name FROM users WHERE user_id = $1",
        [user_id]
    );

    res.json(user.rows[0]);
}));


// User Registration

router.post("/register", validInfo, asyncHandler(async(req, res, next) => {

const { user_name, first_name, last_name, date_of_birth, email_address, password, permission_level } = req.body;

const salt = await bcrypt.genSalt(10);
const password_hash = await bcrypt.hash(password, salt);

const newUser = await pool.query(
    "INSERT INTO Users (user_name, email_address, password_hash, password_salt) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_name, email_address, password_hash, salt]
);``
const user_id = newUser.rows[0].user_id;
const newUserProfile = await pool.query(
    "INSERT INTO UserProfiles (user_id, first_name, last_name, date_of_birth, profile_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [user_id, first_name, last_name, date_of_birth, "1"]
);
const newUserPermission = await pool.query(
    "INSERT INTO UserPermissions (user_id, permission_level) VALUES ($1, $2) RETURNING *",
    [user_id, permission_level]
);

const jwtToken = jwtGenerator( user_id );


res.json({ jwtToken});

return res.json({ jwtToken});
}));

// Login User

router.post("/login", asyncHandler(async(req, res, next) => {

    const{email, password} = req.body;

    const user = await pool.query("SELECT * FROM Users WHERE email_address = $1",
    [email]);

    if (user.rows.length ===0) {
        return res.status(401).send("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!validPassword) {
        return res.status(401).send("Password or Email incorrect")
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({token});
}))

// Check if user login valid

router.get("/is-verify", authorisation, asyncHandler(async (req, res) => {
    res.json(true);
}))

const deleteUserFromDatabase = async (user_id) => {
    const queries = [
        "DELETE FROM UserProfiles WHERE user_id = $1",
        "DELETE FROM UserPermissions WHERE user_id = $1",
        "DELETE FROM UserCuisinePreferences WHERE user_id = $1",
        "DELETE FROM Notifications WHERE user_sent_id = $1",
        "DELETE FROM Upvotes WHERE user_id = $1",
        "DELETE FROM Replies WHERE user_id = $1",
        "DELETE FROM Comments WHERE user_id = $1",
        "DELETE FROM Posts WHERE user_id = $1",
        "DELETE FROM RecipeIngredients WHERE recipe_id IN (SELECT recipe_id FROM recipes WHERE user_id = $1)",
        "DELETE FROM NutriInfo WHERE user_id = $1",
        "DELETE FROM Recipes WHERE user_id = $1",
        "DELETE FROM Users WHERE user_id = $1"
    ];

    for (const query of queries) {
        await pool.query(query, [user_id]);
    }
};

router.delete("/deleteuser", authorisation, asyncHandler(async (req, res, next) => {
    const user_id = req.user.id;
    await deleteUserFromDatabase(user_id);
    res.send();
}));

router.delete("/deleteuserasadmin", asyncHandler(async (req, res, next) => {
    const { user_id } = req.body;
    await deleteUserFromDatabase(user_id);
    const toSend = "deleted user with id" + user_id
    res.send(toSend);
}));

const updateUser = async (user_id, user_name, email_address, password_hash) => {
    return pool.query(
        "UPDATE Users SET user_name = $1, email_address = $2, password_hash = $3 WHERE user_id = $4 RETURNING *",
        [user_name, email_address, password_hash, user_id]
    );
};

const updateUserProfile = async (user_id, first_name, last_name, date_of_birth, profile_image) => {
    return pool.query(
        "UPDATE UserProfiles SET first_name = $1, last_name = $2, date_of_birth = $3, profile_image = $4 WHERE user_id = $5 RETURNING *",
        [first_name, last_name, date_of_birth, profile_image, user_id]
    );
};

const updateUserPermission = async (user_id, permission_level) => {
    return pool.query(
        "UPDATE UserPermissions SET permission_level = $1 WHERE user_id = $2 RETURNING *",
        [permission_level, user_id]
    );
};

// Change User Information
router.put("/edituser", authorisation, asyncHandler(async (req, res, next) => {
    const { user_name, first_name, last_name, date_of_birth, email_address, password_hash, permission_level } = req.body;
    const user_id = req.user.id;

    const updateUserCall = await updateUser(user_id, user_name, email_address, password_hash);
    const updateUserProfileCall = await updateUserProfile(user_id, first_name, last_name, date_of_birth, 5);
    const updateUserPermissionCall= await updateUserPermission(user_id, permission_level);

    const response = {
        user: updateUserCall.rows[0],
        profile: updateUserProfileCall.rows[0],
        permission: updateUserPermissionCall.rows[0]
    };

    res.json(response);
}));

// Change User Profile Information
router.put("/edituserprofile", authorisation, asyncHandler(async (req, res, next) => {
    const { first_name, last_name, profile_image } = req.body;
    const user_id = req.user.id;
    const result = await pool.query("SELECT date_of_birth FROM userprofiles WHERE user_id = $1", [user_id]);
    const userProfile = result.rows[0];
    const updateUserProfileCall = await updateUserProfile(user_id, first_name, last_name, userProfile.date_of_birth, profile_image);

    const response = {
        profile: updateUserProfileCall.rows[0]
    };

    res.json(response);
}));

// Get User Name
router.get("/getuser/username", authorisation, asyncHandler(async(req, res, next) => {
    let user_id;

    if (!req.query.user_id) {
        user_id = req.user.id;
    } else {
        user_id = req.query.user_id;
    }
    const result = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [user_id]);
    const response = result.rows[0];

    res.json(response);
}))


// Get User Information

router.get("/getuser/profile", authorisation, asyncHandler(async(req, res, next) => {
    let user_id;

    if (!req.query.user_id) {
        user_id = req.user.id;
    } else {
        user_id = req.query.user_id;
    }
    const result = await pool.query("SELECT first_name, last_name, date_of_birth, profile_image FROM userprofiles WHERE user_id = $1", [user_id]);
    const userProfile = result.rows[0];

    const response = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        date_of_birth: DateTime.fromJSDate(userProfile.date_of_birth).toLocaleString(DateTime.DATE_SHORT),
        profile_image: userProfile.profile_image,
    };

    res.json(response);
}));

// Other user-related routes...

module.exports = router;