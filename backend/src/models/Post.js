const uuid = require('uuid')

module.exports = class Post {
	constructor(data, author_id, id = uuid.v4()) {
		console.log("!!author_id", !!author_id)
		if (!!author_id) {
			this.id = id
			this.upvoters = new Set()
			this.votes = () => {
				return this.upvoters.size
			}
			this.author = author_id

			Object.assign(this, data)
		}
		console.log(this)
	}

	getVoteCount() {
		return this.upvoters.size
	}
}
