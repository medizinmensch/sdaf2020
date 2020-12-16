// const { applyMiddleware } = require('graphql-middleware')
const Schema = require('./schema')
const context = require('./helpers/context');
// const { permissions } = require('./permissions')

// const schema = applyMiddleware(
// 	Schema,
// 	permissions
// )

const server = (ApolloServer, opts) => {
	const schema = Schema();
	const server = new ApolloServer({
		schema,
		context,
		...opts
	})
	return server
}

module.exports = server