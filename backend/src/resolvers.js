// Resolver
// Define the technique for fetching the types defined in the schema
// This resolver retrieves books from the "books" array above.

// TODO: 
// * Query of Posts and Users
// * Upvoting


const { delegateToSchema } = require('@graphql-tools/delegate');
const { neo4jgraphql } = require('neo4j-graphql-js')
const { verifyToken, createJWTToken } = require('./helpers/jwt');

const {
	AuthenticationError,
	UserInputError,
	ForbiddenError
} = require('apollo-server')


const Post = require('./db/entities/Post')
const User = require('./db/entities/User')

module.exports = ({ subschema }) => ({
	Query: {
		profile: async (_parent, _args, ctx, info) => {
			console.log("ctx", ctx);
			const [user] = await delegateToSchema({
				schema: subschema,
				operation: 'query',
				fieldName: 'User',
				args: {
					id: ctx.user.id
				},
				context: ctx,
				info
			});
			return user;
		}
	},
	Mutation:
	{
		write: (_parent, args, { user }) => {
			const post = new Post(
				{
					title: args.post.title,
					author: user
				})
			post.save()
			return post
		},
		upvote: async (_parent, args, ctx) => {
			console.log("ctx.user", ctx.user);
			const updatedPost = await Post.first({ id: args.id })
			if (!updatedPost) throw new UserInputError('ID not found');
			console.log("updatedPost", updatedPost);
			updatedPost.upvoters.add(ctx.user.id)
			await updatedPost.save()

			return updatedPost
		},
		signup: async (_parent, { email, password, name }, ctx) => {
			const existingPerson = await User.first({ email });
			if (existingPerson) throw new UserInputError('email address not unique');
			const user = new User({ name, email, password });
			await user.save();
			return "Successfully created user."
		},
		login: async (_parent, { email, password }, ctx) => {
			const user = await User.first({ email });
			if (user && user.checkPassword(password)) {
				return createJWTToken(user.id);
			}
			throw new AuthenticationError('Wrong email/password combination!');
		},
	},
	Post: {
		author: async (parent, args, ctx) => {
			// const all = await User.all()
			// return all.find(p => p.id === parent.author.id)

			return User.first({ id: parent.author.id })
		}
	},
	User: {
		posts: (parent, args, ctx) => {
			const t = Post.all()
			return t.filter(p => p.author.id === parent.id)
		}
	}
})
