// https://codesandbox.io/s/5dwxp?file=/test.js

// https://stackoverflow.com/questions/9901082/what-is-this-javascript-require
// Browser JS != Node.js JS
// -> require is the Node.js way of handling this
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/typeDefs')
const resolvers = require('./src/resolvers')

const { permissions } = require('./src/permissions')
const { applyMiddleware } = require('graphql-middleware')
const { makeExecutableSchema } = require('graphql-tools')
const { getContext } = require('./src/helpers/context')

const ds = require("./src/CustomDataSource")
const User = require('./src/models/User.js')
const Post = require('./src/models/Post.js')

require('dotenv').config()


// const myMiddleware = {
// 	Query: {
// 		users: async (resolve, parent, args, context, info) => {
// 			console.log('args: ', args)
// 			console.log('context: ', context)
// 			const result = await resolve(parent, args, context, info)
// 			return result
// 		}
// 	},
// 	Mutation: {
// 		write: async (resolve, parent, args, context, info) => {
// 			console.log('args: ', args)
// 			console.log('context: ', context)
// 			const result = await resolve(parent, args, context, info)
// 			return result
// 		}
// 	}
// }


// The ApolloServer constructor requires at least:
// schema definition
// set of resolvers

const seed_db = new ds()
seed_db.users = [
	new User({ name: 'John', email: 'john@snow.org', password: "12345", id: "1" },),
	new User({ name: 'Emilia', email: 'emilia@clark.org', password: "23456", id: "2" })
]

seed_db.posts = [
	new Post({ title: 'title 1', author: 'john', votes: 0, id: "1" }),
	new Post({ title: 'title 2', author: 'john', votes: 0, id: "2" }),
	new Post({ title: 'Testy', author: 'emilia', votes: 0, id: "3" })
]

const executableSchema = makeExecutableSchema({ typeDefs, resolvers })

// const schema = applyMiddleware(
// 	makeExecutableSchema({
// 		typeDefs,
// 		resolvers
// 	}),
// 	myMiddleware,
// );



const schema = applyMiddleware(
	executableSchema,
	permissions
)

const server = new ApolloServer({
	schema,
	dataSources: () => {
		return {
			db: seed_db
		}
	},
	context: getContext
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})