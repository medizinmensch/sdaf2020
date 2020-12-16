const { verifyToken } = require('./jwt.js');
const { getDriver } = require('../helpers/neo4j');

async function getContext({ req }) {
    let user = null
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (token) {
        const currentUser = verifyToken(token);
        user = await findUserFromToken(currentUser.userId);
    }
    return { user, driver: getDriver() }
}

async function findUserFromToken(user_id) {
    const session = getDriver().session()
    try {
        const result = await session.run(
            'MATCH (u:User) WHERE u.id = $id RETURN u',
            { id: user_id }
        )
        return result.records[0].get(0).properties
    } finally {
        await session.close()
    }
    return null
}

module.exports.getContext = getContext;