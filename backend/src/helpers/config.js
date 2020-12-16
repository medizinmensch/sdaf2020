require('dotenv').config()

const { NEO4J_USER, NEO4J_PASSWORD, NEO4J_URI, JWT_SECRET } = process.env

module.exports = { NEO4J_USER, NEO4J_PASSWORD, NEO4J_URI, JWT_SECRET }