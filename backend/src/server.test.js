const { ApolloServer, gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const dataSources = require('./demo_data')

// 1. Setup your server (as in index.js)
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources
})

// 2. get query and mutate objects from `createTestClient`
// important! described in linked doc
// https://www.apollographql.com/docs/apollo-server/testing/testing/
const { query } = createTestClient(server)

// 3. gql queries for fetching your data
const qUsers = gql`
	query {
		users {
			name
			email
		}
	}`

// 4. write the tests
it('fetches single launch', async () => {
	const { data } = await query({ query: qUsers })
	console.log(data)

	// assert
	expect(data).toEqual(
		{
			users: [
				{ email: 'john@snow.org', name: 'John' },
				{ email: 'emilia@clark.org', name: 'Emilia' }]
		}
	)
})
