
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    doc: {
      type: String, 
      default: null,
    },
    username: {
      type: String,
      required: false, 
    },
  }, { timestamps: true });
  

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
