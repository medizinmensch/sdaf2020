const CustomDataSource = require('./CustomDataSource.js')
const bcrypt = require('bcrypt')
const salt = 9001
const User = require('./models/User.js')
const Post = require('./models/Post.js')

module.exports = function () {
	console.log("inside demoData")

	const db = new CustomDataSource();
	if (u.password === bcrypt.hash(data.password, salt)) {

	db.users = [
		new User({ name: 'John', email: 'john@snow.org', password: "12345", id: "1" },),
		new User({ name: 'Emilia', email: 'emilia@clark.org', password: "23456", id: "2" })
	]
	db.posts = [
		new Post({ title: 'title 1', author: 'john', votes: 0, id: "1" }),
		new Post({ title: 'title 2', author: 'john', votes: 0, id: "2" }),
		new Post({ title: 'Testy', author: 'emilia', votes: 0, id: "3" })
	]

	return { db }
}