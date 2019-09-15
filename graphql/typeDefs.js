const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    createdAt: String!
    userName: String!
    body: String!
  }

  type Like {
    id: ID!
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
    post(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: ID!): Post!
    toggleLikePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;
