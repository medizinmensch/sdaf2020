const { verifyToken } = require('./jwt.js');
const { driver } = require('./driver');

async function getContext({ req }) {
    let user = null
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (token) {
        const currentUser = verifyToken(token);
        user = await findUserFromToken(currentUser.userId);
    }
    return { user, driver }
}

async function findUserFromToken(user_id) {
    const session = driver.session()
    try {
        const result = await session.run(
            'MATCH (u:User) WHERE u.id = $id RETURN u',
            { id: user_id }
        )
        return result.records[0].get(0).properties
    } finally {
        await session.close()
    }
}

module.exports.getContext = getContext;