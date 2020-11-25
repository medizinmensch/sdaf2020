const uuid = require('uuid')

module.exports = class Post {
	constructor (data) {
		if (!data.id) this.id = uuid.v4()
		this.votes = 0
		this.upvoters = new Set()
		Object.assign(this, data)
	}
}
