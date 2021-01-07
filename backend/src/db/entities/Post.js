const uuid = require('uuid');
const neode = require('../../dataSources/neode')

module.exports = class Post {
	constructor(data) {
		this.id = uuid.v4()
		this.upvoters = new Set()
		this.votes = () => this.upvoters.size
		Object.assign(this, data)
	}

	getVoteCount() {
		return this.upvoters.size
	}

	async save() {
		console.log("this (post)", this);
		if (!(this.author && this.author.node)) {
			console.log("Author node is missing");
			return 'Cannot save Post. Author node is missing!';
		}
		const node = await neode.create('Post', this);
		Object.assign(this, { ...node.properties(), node });
		await node.relateTo(this.author.node, 'wrote');
		return this;
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
