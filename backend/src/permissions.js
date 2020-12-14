const { rule, shield, allow } = require('graphql-shield');

// Rules

const isAuthenticated = rule({ cache: 'contextual' })(
	async (parent, args, ctx, info) => {
		console.log("Authenticated?", ctx.user !== null)
		return !!ctx.user
	},
)

// Permissions
const permissions = shield({
	Query: {
		posts: allow,
		users: allow
	},
	Mutation: {
		write: isAuthenticated,
		login: allow
	},
})

module.exports.permissions = permissions
module.exports.isAuthenticated = isAuthenticated