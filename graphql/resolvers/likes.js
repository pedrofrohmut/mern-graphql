const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    toggleLikePost: async (_, { postId }, context) => {
      const { userName } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const isLiked = post.likes.some(like => like.userName === userName);
        console.log("IS LIKED", isLiked);
        if (isLiked) {
          post.likes = post.likes.filter(like => like.userName !== userName);
        } else {
          post.likes.push({
            userName,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Not Found", {
          errors: { post: "Post not found with the passed Id" }
        });
      }
    }
  }
};
