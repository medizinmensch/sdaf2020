const { gql } = require("apollo-server")


// Schema
// Collection of type definitions (hence "typeDefs") that together define the "shape" of queries that are executed against your data.
module.exports = gql`
  #  Define data structures
  type Post {
    title: String
    author: User
  }

  type User{
      name: String
      email: String
  }

  # Query
  # Define what clients can query and their return type
  # Here, the "books" query returns an array of 0+ or more Books (defined above)
  type Query {
    users: [User],
    posts: [Post]
  }
`;