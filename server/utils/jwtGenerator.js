const jwt = require('jsonwebtoken');
require("dotenv").config();

function jwtGenerator(user_id) {
    const payload = {
        user: {
            id: user_id
        }
    };
    console.log(process.env.jwtSecret);
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
