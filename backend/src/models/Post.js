module.exports = {
	id: {
		primary: true,
		type: 'uuid',
		required: true
	},
	title: {
		type: 'string'
	},
	wrote: {
		type: 'relationship',
		target: 'User',
		relationship: 'wrote',
		direction: 'in'
	}
}