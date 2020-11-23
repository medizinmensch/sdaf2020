const CustomDataSource = require('./CustomDataSource.js')

module.exports = function () {
	const db = new CustomDataSource()

	db.users = [
		{ name: 'John', email: 'john@snow.org', password: '12345' },
		{ name: 'Emilia', email: 'emilia@clark.org', password: '23456' }
	]
	db.posts = [
		{ title: 'title 1', author: 'john' },
		{ title: 'title 2', author: 'john' },
		{ title: 'Testy', author: 'emilia' }
	]

	return { db }
}
