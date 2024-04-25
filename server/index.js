const express = require("express")
const app = express();
const cors = require("cors");
const pool = require("./db")
const asyncHandler = require("express-async-handler");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// User Registration

app.post("/newuser", asyncHandler(async(req, res, next) => {
console.log(req.body);
}));

// Delete User

// User Profile Update

// User Permission Update?

// Add Cuisine Preference

// Remove Cuisine Preference

// Add Recipe To User 

// Delete Recipe From User

// Change Recipe Details

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})