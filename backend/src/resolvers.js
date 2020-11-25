// Resolver
// Define the technique for fetching the types defined in the schema
// This resolver retrieves books from the "books" array above.
module.exports = {
	Query: {
		posts: (_parent, args, { dataSources }) => {
			// console.log(dataSources.db)
			console.log(dataSources.db.getPosts())
			// console.log(typeof( dataSources.db.getUsers()))
			return dataSources.db.getPosts()
		},
		users: (_parent, args, { dataSources }) => {
			return dataSources.db.getUsers()
		}
	},
	Mutation:
	{
		write: (_parent, args, { dataSources }) => {
			p = dataSources.db.createPost({
				title: args["post"]["title"],
				user: "test"
			})
			return p;
		},
		upvote: (_parent, args, { dataSources }) => {
			const updatedPost = dataSources.db.posts.find(post => post.id === args.id)
			const user = dataSources.db.users.find(e => e.id === args.voter.id)
			// if (!updatedPost) return null
			updatedPost.upvoters.add(user.id)
			console.log("test")
			dataSources.db.updatePost(updatedPost)
			return updatedPost
		},
		signup: (_parent, args, { dataSources }) => {
			if (args.password.length >= 8) {
				const nu = {
					name: args.name,
					email: args.email,
					password: args.password
				}
				console.log(nu)
				const message = dataSources.db.createUser(nu)
				return message
			}
			else {
				return "Password to short"
			}
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
