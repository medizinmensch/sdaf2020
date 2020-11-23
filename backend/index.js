// https://codesandbox.io/s/5dwxp?file=/test.js

// https://stackoverflow.com/questions/9901082/what-is-this-javascript-require
// Browser JS != Node.js JS
// -> require is the Node.js way of handling this
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/typeDefs')
const resolvers = require('./src/resolvers')
const dataSources = require('./src/demo_data')

// const ShopAPI = require("./ShopAPI");

// define the data itself
// Here it's static

// const dataSources = { dataSourceA }

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, dataSources })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})

// query on localhost:4000
// {
//     books {
//       title
//       author
//     }
//   }
