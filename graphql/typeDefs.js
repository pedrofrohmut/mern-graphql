const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
  }

  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type User {
    id: ID
    email: String
    token: String
    userName: String
    createdAt: String
  }

  type Query {
    allPost: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
