const neode_lib = require('neode');
const { NEO4J_USER, NEO4J_PASSWORD, NEO4J_URI } = require('../helpers/config')

const neode = neode_lib(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD).with({
    Post: require('../models/Post'),
    User: require('../models/User')
})

module.exports = neode