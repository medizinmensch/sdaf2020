const neode = require('../dataSources/neode')
const User = require('../entities/User')
const Post = require('../entities/Post')


const seed = async () => {
    const alice = new User({
        name: 'Alice',
        email: 'alice@example.org',
        password: '1234'
    });
    const bob = new User({
        name: 'Bob',
        email: 'bob@example.org',
        password: '4321'
    });
    await Promise.all([alice, bob].map(p => p.save()));
    const posts = [
        new Post({ author: alice, title: 'Schema Stitching is cool!' }),
        new Post({ author: alice, title: 'Neo4J is a nice graph database!' })
    ];
    await Promise.all(posts.map(post => post.save()));
};

(async () => {
    await seed();
    await neode.driver.close();
})();