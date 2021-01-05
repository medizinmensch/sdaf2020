module.exports = {
	id: {
		primary: true,
		type: 'uuid',
		required: true
	},
	name: {
		type: 'string',
		required: true
	},
	email: {
		type: 'string',
		required: true,
		unique: true
	},
	password: {
		type: 'string',
		strip: true
	},
	hashedPassword: {
		type: 'string',
		required: true
	}
}