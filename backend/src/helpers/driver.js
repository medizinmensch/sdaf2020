const neo4j = require('neo4j-driver');
const { NEO4J_USER, NEO4J_PASSWORD, NEO4J_URI } = require('./config')

let driver;

function getDriver(options = {}) {
    const {
        uri = NEO4J_URI,
        username = NEO4J_USER,
        password = NEO4J_PASSWORD
    } = options;
    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
    return driver
}

module.exports.driver = getDriver();
