const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    allPost: async () => {
      try {
        // -1 for sort descending order
        return await Post.find().sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    post: async (parent, args, context, info) => {
      const { postId } = args;
      try {
        const post = await Post.findOne({ _id: postId });
        if (!post) {
          throw new UserInputError("Not Found", {
            errors: { post: `Post not found with the passed Id = ${postId}` }
          });
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { body } = args;
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: { body: "Post body must not be empty" }
        });
      }
      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      return post;
    },
    deletePost: async (_, args, context) => {
      const { postId } = args;
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.delete();
          return `Post ${postId} Deleted`;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
