const uuid = require('uuid')
const bcrypt = require('bcrypt')

const salt = parseInt(process.env.SALT)

module.exports = class User {
	constructor (data, id = uuid.v4) {
		this.id = id
		this.pw = bcrypt.hashSync(data.password, salt)
		Object.assign(this, data)
	}
}