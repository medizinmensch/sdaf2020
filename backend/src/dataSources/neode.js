const neode_lib = require('neode');
const { NEO4J_USER, NEO4J_PASSWORD, NEO4J_URI } = require('../helpers/config')

const neode = new neode_lib(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD).with({
    Post: require('../db/models/Post'),
    User: require('../db/models/User')
})

module.exports = neode