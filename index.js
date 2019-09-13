require("dotenv").config()

const mongoose = require("mongoose")
const { ApolloServer, gql }  = require("apollo-server")

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => "Hello World"
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo Connected")
    return server.listen({ port })
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
