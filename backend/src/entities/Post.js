const uuid = require('uuid')
const neode = require('../dataSources/neode')

module.exports = class Post {
	constructor(data, author_id, id = uuid.v4()) {
		if (!!author_id) {
			this.id = id
			this.upvoters = new Set()
			this.votes = () => {
				return this.upvoters.size
			}
			this.author = author_id

			Object.assign(this, data)
		}
	}

	getVoteCount() {
		return this.upvoters.size
	}

	async save() {
		const node = await neode.create('Post', this)
		Object.assign(this, { ...node.properties(), node })
		return this
	}

	static async first(props) {
		const node = await neode.first('Post', props)
		if (!node) return null
		return new Post({ ...node.properties(), node })
	}

	static async all() {
		const nodes = await neode.all('Post')
		return nodes.map(node => new Post({ ...node.properties(), node }))
	}
}
