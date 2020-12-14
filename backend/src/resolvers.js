// Resolver
// Define the technique for fetching the types defined in the schema
// This resolver retrieves books from the "books" array above.
module.exports = {
	Query: {
		posts: (_parent, args, { dataSources }) => {
			return dataSources.db.getPosts()
		},
		users: (_parent, args, { dataSources }) => {
			console.log("users q")
			console.log(dataSources.db.getUsers())
			return dataSources.db.getUsers()
		}
	},
	Mutation:
	{
		write: (_parent, args, { user, dataSources }) => {
			console.log("mutation write: user: ", user)
			const p = dataSources.db.createPost({
				title: args["post"]["title"],
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
		}
	}
}
