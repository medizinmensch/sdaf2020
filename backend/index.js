const { ApolloServer } = require('apollo-server')
const Server = require('./src/server');

const playground = {
	settings: {
		'scheam.polling.enable': false
	}
};

(async () => {
	const server = await Server(ApolloServer, { playground })
	const { url } = await server.listen()
	console.log(`🚀 Server ready at ${url}`)
})()