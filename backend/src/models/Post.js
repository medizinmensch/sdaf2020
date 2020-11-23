const uuid = require('uuid')

exports.modules = class Post {
	constructor (data) {
		this.id = uuid.v4
		Object.assign(this, data)
	}
}
