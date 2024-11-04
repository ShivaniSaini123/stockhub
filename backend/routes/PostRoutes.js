// routes/postRoutes.js
const express = require('express');
const { createPost, getAllPosts, upload } = require('../controllers/postController');

const router = express.Router();

// Route to create a post
router.post("/create", upload.single("doc"), createPost);

// Route to fetch all posts
router.get("/", getAllPosts);

module.exports = router;
