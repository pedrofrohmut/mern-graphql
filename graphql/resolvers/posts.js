const Post = require("../../models/Post");

module.exports = {
  Query: {
    async allPost() {
      try {
        return await Post.find();
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
