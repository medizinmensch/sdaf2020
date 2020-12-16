// Resolver
// Define the technique for fetching the types defined in the schema
// This resolver retrieves books from the "books" array above.

const { delegateToSchema } = require('@graphql-tools/delegate');

module.exports = () => ({
	Mutation:
	{
		write: (_parent, args, { user, dataSources }) => {
			console.log("args", args.post.title);
			const p = dataSources.db.createPost({
				title: args.post.title,
				user
			})
			return p;
		},
		upvote: (_parent, args, { user, dataSources }) => {
			const updatedPost = dataSources.db.posts.find(post => post.id === args.id)
			updatedPost.upvoters.add(user.id)
			dataSources.db.updatePost(updatedPost)
			return updatedPost
		},
		signup: (_parent, args, { dataSources }) => {
			if (args.password.length < 8) {
				return "Password to short"
			}
			return dataSources.db.createUser({
				name: args.name,
				email: args.email,
				password: args.password
			})
		},
		login: (_parent, args, { dataSources }) => {
			const user = dataSources.db.login({
				email: args.email,
				password: args.password
			})
			return user
		},
	},
	Post: {
		author: (parent, args, { dataSources }) => {
			return dataSources.db.getUsers().find(p => p.id === parent.author)
		}
	},
	User: {
		posts: (parent, args, { dataSources }) => {

			const t = dataSources.db.getPosts()
			return t.filter(p => p.author === parent.id)
		}
	}
})
