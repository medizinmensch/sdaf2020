const { DataSource } = require("apollo-datasource")
const User = require('./models/User.js')
const Post = require('./models/Post.js')

module.exports = class CustomDataSource extends DataSource {
    constructor(dbClient) {
        super()
        this.posts = []
        this.users = []
    }

    getUsers(){
        return this.users;
    }

    getPosts(){
        return this.posts;
    }

    createUser(data) {
        const user = new User(data)
        this.users.push(user)
        return user
    }

    createPost(data) {
        const post = new Post(data)
        this.posts.push(post)
        return post
    }

    deletePost(deletedPost) {
        this.post = this.posts.filter(el => el.id !== deletedPost.id)
    }

    deletedUser(deletedUser) {
        this.user = this.users.filter(el => el.id !== deletedUser.id)
    }

}