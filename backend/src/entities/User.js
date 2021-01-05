// const uuid = require('uuid')
const bcrypt = require('bcrypt')
const neode = require('../dataSources/neode')

const salt = parseInt(process.env.SALT)

module.exports = class User {
	constructor(data) {
		Object.assign(this, data)
	}

	async save() {
		this.hashedPassword = bcrypt.hashSync(this.password, salt)
		const node = await neode.create('User', this)
		Object.assign(this, { ...node.properties(), node })
		return this
	}

	static async first(props) {
		const node = await neode.first('User', props)
		if (!node) return null
		return new User({ ...node.properties(), node })
	}

	static async currentUser(context) {
		const { user } = context;
		if (!user) return null
		return User.first({ id: user.id })
	}

	static async all() {
		const nodes = await neode.all('User')
		return nodes.map(node => new User({ ...node.properties(), node }))
	}

	checkPassword(password) {
		return bcrypt.compareSync(password, this.hashedPassword);
	  }
}