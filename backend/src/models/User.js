const uuid = require('uuid')
const bcrypt = require('bcrypt')

const salt = 9001

exports.modules = class User {
    constructor(data) {
        this.id = uuid.v4
        this.pw = bcrypt.hash(data.password, salt)
        Object.assign(this, data)
    }
}