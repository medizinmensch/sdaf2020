const uuid = require('uuid')

module.exports = class Post {
	constructor(data, author_id, id = uuid.v4()) {
		if (!!author_id) {
			this.id = id
			this.votes = 0
			this.upvoters = new Set()
			this.author = author_id
			Object.assign(this, data)
		}
	}
}
