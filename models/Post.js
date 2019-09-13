const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: String,
  body: String,
  userName: String,
  createdAt: String,
  comments: [
    {
      body: String,
      userName: String,
      createdAt: String
    }
  ],
  likes: [
    {
      userName: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  }
});

module.exports = model("Post", postSchema);
