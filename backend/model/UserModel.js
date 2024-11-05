// model/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    token: String,
});

// Create the model
const User = mongoose.model("User", userSchema, "users"); // "users" is the collection name

module.exports = { User }; // Export as an object
