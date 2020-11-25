const { DataSource } = require('apollo-datasource')
const User = require('./models/User.js')
const Post = require('./models/Post.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = 9001
const secret = "mySecret"

module.exports = class CustomDataSource extends DataSource {
	constructor() {
		console.log('inside CustomDataSource')
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

	createPost(data) {
		const p = new Post(data)
		this.posts.push(p)
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
		console.log("cds")
		const u = this.users.find(el => el.email === data.email)
		console.log(u.password)
		console.log(d.password)
		if (u.password === bcrypt.hash(data.password, salt)) {
			var token = jwt.sign({ userId: u.id }, secret);
			return token
		}
		return "Username or password not found"
	}
}
