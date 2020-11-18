const Posts = [
    {
        title: 'Post1: The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'Post2: City of Glass',
        author: 'Paul Auster',
    },
];

const Users = [
    {
        name: 1,
        email: 'a@a.a',
        
    }
]



// Resolver
// Define the technique for fetching the types defined in the schema
// This resolver retrieves books from the "books" array above.
module.exports = {
    Query: {
        posts: () => Posts,
        users: () => Users,
    },
};