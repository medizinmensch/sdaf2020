const { ApolloServer, gql } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const dataSources = require('./demoData')
const CustomDataSource = require('./src/CustomDataSource')
const { getContext } = require('./helpers/context')

// 1. Setup your server (as in index.js)
const db = new CustomDataSource()
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({ db })
})

// 2. get query and mutate objects from `createTestClient`
// important! described in linked doc
// https://www.apollographql.com/docs/apollo-server/testing/testing/
const { query, mutation } = createTestClient(server)

// 3. gql queries for fetching your data
const qUsers = gql`
	query {
		users {
			name
			email
		}
}`

const mPost = gql`
	mutation{
		write(post:{
		title: "A sample title",
		author:{
			name: "John"
		}
		}){
			title
			votes
		}
}`

const mUpvote = gql`
mutation{
  upvote(
    id: "1"
    voter:{
      id: "1"
    })
  {
    title
    votes
  }
}
`

// 4. write the tests
it('Get all users', async () => {
	const { data } = await query({ query: qUsers })
	// assert
	expect(data).toEqual(
		{
			users: [
				{ email: 'john@snow.org', name: 'John' },
				{ email: 'emilia@clark.org', name: 'Emilia' }]
		}
	)
})

it("creates a single post", async () => {
	const exp = {
		"write": {
			"title": "A sample title",
			"votes": 0
		}
	}
	const { data } = await query({ mutation: mPost })
	expect(data).toEqual(exp)
})

it("upvotes a post", async () => {
	const exp = {
		"upvote": {
			"title": "title 1",
			"votes": 0
		}
	}

	const { data } = await query({ mutation: mUpvote })
	expect(data).toEqual(exp)
})