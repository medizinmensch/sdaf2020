module.exports = {
	id: {
		primary: true,
		type: 'uuid',
		required: true
	},
	title: {
		type: 'string'
	},
	voters: {
        type: "relationship",
        target: "User",
        relationship: "UPVOTED_BY",
        direction: "out",
    },
	wrote: {
		type: 'relationship',
		target: 'User',
		relationship: 'wrote',
		direction: 'in'
	}
}