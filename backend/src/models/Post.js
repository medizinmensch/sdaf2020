module.exports = {
	id: {
		primary: true,
		type: uuid,
		required: true
	},
	title: {
		type: 'string'
	},
	votes: {
		type: 'number'
	},
	author: {
		type: 'relationship',
		target: 'User',
		relationship: 'WROTE',
		direction: 'in'
	}
}