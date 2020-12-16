const { gql } = require('apollo-server')

// Schema
// Collection of type definitions (hence "typeDefs") that together define the "shape" of queries that are executed against your data.
module.exports = gql`
  type Query {
    posts: [Post]
    users: [User] @relation(name: "WROTE", direction: "IN")
  }

  type Mutation {
    write(post: PostInput!): Post
    upvote(id: ID!): Post
    # 🚀 OPTIONAL
    # downvote(id: ID!): Post
    # 🚀 OPTIONAL
    # delete(id: ID!): Post

    """
    returns a signed JWT or null
    """
    login(email: String!, password: String!): String

    """
    returns a signed JWT or null
    """
    signup(name: String!, email: String!, password: String!): String
  }

  input PostInput {
    title: String!
  }
`
