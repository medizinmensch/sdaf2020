const Server = require('./src/server');

server = new Server()

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})