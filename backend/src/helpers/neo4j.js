const neo4j = require('neo4j-driver');
const dotenv = require("dotenv");

dotenv.config();
let driver;

function getDriver(options = {}) {
    const {
        uri = process.env.NEO4J_URI,
        username = process.env.NEO4J_USER,
        password = process.env.NEO4J_PASSWORD,
    } = options;
    if (!driver) {
        driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
    return driver
}

module.exports.getDriver = getDriver;
