const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQuery = require('./schemas/queries');
const RootMutation = require('./schemas/mutations');


module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: RootMutation
})