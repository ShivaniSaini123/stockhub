
const Post = require('../model/PostModel.js');
const multer = require('multer');

// Multer setup for file uploads--middleware for file uplod
const upload = multer({ dest: "uploads/" }); 

// Route to create a post
const createPost = async (req, res) => {
  try {
    const { content,username } = req.body;
    let docPath = null;

    // Handle file upload if a file is provided
    if (req.file) {
      docPath = req.file.path;
    }

    const newPost = new Post({ content, doc: docPath,username });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
    console.log("Post created successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Route to get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  upload,
};
