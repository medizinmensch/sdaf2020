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
		},
		users: async (_parent, _args, ctx, info) => {
			return await delegateToSchema({
				schema: subschema,
				operation: 'query',
				fieldName: 'User',
				args: {},
				context: ctx,
				info
			});
		},
		posts: async (_parent, _args, ctx, info) => {
			return await delegateToSchema({
				schema: subschema,
				operation: 'query',
				fieldName: 'Post',
				args: {},
				context: ctx,
				info
			});
		},
	},
	Mutation:
	{
		write: (_parent, args, { user }) => {
			console.log("args.post.title" , args.post.title);
			console.log("user" , user);

			const post = new Post(
				{
					title: args.post.title,
					author: user
				})
			return post.save()
		},
		upvote: async (_parent, args, context, info) => {
			const user = await User.first({ id: context.user.id });
			if (!user && !user.checkPassword(password)) return new Error("User does not exist")

			let post = await Post.first({ id: args.id });
			if (!post) return new Error("Post does not exist")
			await post.upvote(user);

			const [resolvedPost] = await delegateToSchema({
				schema: subschema,
				operation: "query",
				fieldName: "Post",
				args: { id: post.id },
				context,
				info,
			});

			return resolvedPost;
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
			return User.first({ id: parent.author.id })
		},
		votes: {
			selectionSet: "{ voters { id } }",
			resolve: (post) => {
				return post.voters ? post.voters.length : 0;
			},
		},
	},
	User: {
		posts: async (parent, args, ctx) => {
			return parent.posts
		},
	}
})
