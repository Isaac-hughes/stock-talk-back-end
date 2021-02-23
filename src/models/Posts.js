const mongoose = require("mongoose");
const {Comment} = require("./Comments")

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
        type: String,
        required: true
    },
    likes: [
        {username: String}
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };