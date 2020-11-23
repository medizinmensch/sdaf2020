// Resolver
// Define the technique for fetching the types defined in the schema
// This resolver retrieves books from the "books" array above.
module.exports = {
    Query: {
        posts: (_parent, args, { dataSources }) => {
            // console.log(dataSources.db)
            console.log(dataSources.db.getPosts())
            // console.log(typeof( dataSources.db.getUsers()))
            return dataSources.db.getPosts()
        },
        users: (_parent, args, { dataSources }) => {
            return dataSources.db.getUsers()
        },
    },
};