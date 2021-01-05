const { stitchSchemas } = require('@graphql-tools/stitch')
const typeDefs = require('./typeDefs')
const Resolver = require('./resolvers')
const neo4jSchema = require('./neo4j-graphl-ql/schema')

module.exports = () => {
    const resolvers = Resolver({ subschema: neo4jSchema })
    return stitchSchemas({
        subschemas: [neo4jSchema],
        typeDefs,
        resolvers
    })
}
