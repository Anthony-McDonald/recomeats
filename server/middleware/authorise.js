require("dotenv").config('../env');
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        return res.status(403).json({msg: "authorisation denied"});
    }

    try {
        const verify = jwt.verify(token, process.env.jwtSecret);

        req.user = verify.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
};