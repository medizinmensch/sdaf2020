const jwt = require('jsonwebtoken');
require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET

function verifyToken(authHeader) {
    if (authHeader != null) {
        return jwt.verify(authHeader, jwtSecret);
    }
    return null
}

function createJWTToken(user) {
    return jwt.sign(user, jwtSecret);
}

module.exports.verifyToken = verifyToken;
module.exports.createJWTToken = createJWTToken;