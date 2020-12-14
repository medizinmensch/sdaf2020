const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')
const { makeAugmentedSchema } = require('neo4j-graphql-js');

const typeDefs = require('./src/typeDefs')
const { permissions } = require('./src/permissions')
const ds = require("./src/CustomDataSource")
const { getContext } = require('./src/helpers/context')
const resolvers = require('./src/resolvers')
const User = require('./src/models/User')
const Post = require('./src/models/Post')


require('dotenv').config()

// const database = new ds()
const seed_db = new ds()
seed_db.users = [
	new User({ name: 'John', email: 'john@snow.org', password: "12345" }, id = "1"),
	new User({ name: 'Emilia', email: 'emilia@clark.org', password: "23456" }, id = "2")
]

seed_db.posts = [
	new Post({ title: 'title 1' }, authorId = "1", id = "1"),
	new Post({ title: 'title 2' }, authorId = "2", id = "2"),
	new Post({ title: 'Testy' }, authorId = "2", id = "3")
]

const executableSchema = makeAugmentedSchema({ typeDefs, resolvers })

const schema = applyMiddleware(
	executableSchema,
	permissions
)

const server = new ApolloServer({
	schema: schema,
	dataSources: () => {
		return {
			db: seed_db
		}
	},
	context: getContext
})

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})