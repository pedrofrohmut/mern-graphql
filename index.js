require("dotenv").config();

// Dependency Imports
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");

// Relative Imports
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ({
    req: ctx.req
  })
});
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connected");
    return server.listen({ port });
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch(err => console.error(err));
