const { verifyToken } = require('./jwt.js');
const { driver } = require('./driver');

const User = require('../db/entities/User')

async function context({ req }) {
    
    let user = null
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    
    if (token) {
        const user_uuid = verifyToken(token);
        user = await User.first({ id: user_uuid })
    }
    
    if (!!user) console.log("user.name", user.name);
    return { user, driver }
}

module.exports = context;