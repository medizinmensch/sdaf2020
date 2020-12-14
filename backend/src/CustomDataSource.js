const { DataSource } = require('apollo-datasource')
const User = require('./models/User.js')
const Post = require('./models/Post.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const salt = 9001
const secret = "mySecret"

module.exports = class CustomDataSource extends DataSource {
	constructor() {
		super()
		this.posts = []
		this.users = []
	}

	getUsers() {
		return this.users
	}

	getPosts() {
		return this.posts
	}

	createUser(data) {
		if (this.users.find(u => u.email === data.email) === undefined) {
			const user = new User(data)
			this.users.push(user)
			return `Successfully created user with email ${data.email}`
		}
		else {
			return "There is already an account with that email. Forgot your password?"
		}
	}

	createPost({title, user}) {
		this.posts.push(new Post({ title }, user.id))
		return p
	}

	updatePost(data) {
		this.posts = this.posts.map(p => p.id === data.id ? data : p)
		return data
	}

	deletePost(deletedPost) {
		this.post = this.posts.filter(el => el.id !== deletedPost.id)
	}

	deletedUser(deletedUser) {
		this.user = this.users.filter(el => el.id !== deletedUser.id)
	}

	login(data) {
		const u = this.users.find(el => el.email === data.email)
		if (bcrypt.compareSync(data.password, u.pw)) {
			return jwt.sign({ userId: u.id }, secret);
		}
		return "Username or password not found"
	}
}
