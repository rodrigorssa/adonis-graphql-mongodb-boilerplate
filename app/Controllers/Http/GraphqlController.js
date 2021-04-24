const { graphqlAdonis, graphiqlAdonis} = require('apollo-server-adonis');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const schemaFactory = require('../../Factories/Schema');
const resolverFactory = require('../../Factories/Resolvers');
module.exports = class GraphQlController {

  static graphql(){
    return graphqlAdonis({
      schema: makeExecutableSchema({
      typeDefs: schemaFactory,
      resolvers: resolverFactory
    })
    });
  }

  static graphiQl(endpointURL){
    return graphiqlAdonis({ endpointURL })
  }
}