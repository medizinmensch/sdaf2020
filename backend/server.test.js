const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// 1. Setup your server (as in index.js)
const server = new ApolloServer({
	typeDefs,
	resolvers
});

// 2. get query and mutate objects from `createTestClient`
// important! described in linked doc
// https://www.apollographql.com/docs/apollo-server/testing/testing/
const { query, mutate } = createTestClient(server);


const ALL_BOOKS = gql`
    query booksQuery{
        books{
            id
						name
        }
    }
`;

```
See for for general information...



```

// 3. write the test
it('fetches single launch', async () => {
	// 3.a write gql query for fetching your data
	const FIND_USER = gql`
		query {
			posts {
			title
			author{
				name,
				email
    }
  }
		}
	`;

	console.log(await query({ query: FIND_USER }))

	// query the data
	// const {
	// 	data: { findUser }
	// } = await query({ query: FIND_USER });


	// assert
	expect(findUser).toEqual({ id: "1", name: "Name1" });
});