const { makeAugmentedSchema } = require('neo4j-graphql-js')
const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    # ⚠️ attributes 'id' and 'name' have changed!
    # 'id' now represents a randomly generated string, similar to 'Post.id'
    id: ID!
    name: String!
    email: String!
    posts: [Post] @relation(name: "wrote", direction: "OUT")
  }
  
   type Post {
    id: ID!
    title: String!
    votes: Int!
    author: User @relation(name: "wrote", direction: "IN")
  }
`

const schema = makeAugmentedSchema({ typeDefs })
module.exports = schema