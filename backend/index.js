// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const multer = require("multer");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

// Import Mongoose models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

// Import route handlers
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require('./routes/PostRoutes.js');

// Set the port and MongoDB URI
const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URL;

// Create an Express application
const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: "http://localhost:3000", // Adjust according to your frontend origin
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use(bodyParser.json());

// Retrieve the Alpha Vantage API key from environment variables
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Register route handlers
app.use("/api/v1/users", userRoutes);
app.use("/api/posts", postRoutes);

// Endpoint to get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({}); // Fetch all holdings from the database
    res.json(allHoldings); // Return holdings as JSON
  } catch (error) {
    console.error("Error fetching all holdings:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

// Endpoint to get all positions
app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({}); // Fetch all positions from the database
    res.json(allPositions); // Return positions as JSON
  } catch (error) {
    console.error("Error fetching all positions:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

// Endpoint to create a new order
app.post("/newOrder", async (req, res) => {
  try {
    // Create a new order using the request body data
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save(); // Save the order to the database
    res.send("Order saved!"); // Send success response
  } catch (error) {
    console.error("Error saving new order:", error);
    res.status(500).send("Error saving order."); // Handle errors
  }
});

// Chatbot endpoint to fetch stock data
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided in the request body." });
  }

  // Extract stock symbol from the message
  const stockSymbol = message.split(" ").pop().toUpperCase();

  try {
    // Fetch stock data from Alpha Vantage API
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: `${stockSymbol}`,
        interval: '5min',
        apikey: ALPHA_VANTAGE_API_KEY,
      }
    });

    const data = response.data;
    console.log("API Response:", data); // Log the API response

    // Check if the data contains time series information
    if (data["Time Series (5min)"]) {
      const latestKey = Object.keys(data["Time Series (5min)"])[0]; // Get the latest time key
      const latestData = data["Time Series (5min)"][latestKey]; // Get the latest stock data
      const reply = `The latest price for ${stockSymbol} is ₹${latestData["1. open"]}.`; // Construct the reply
      res.json({ reply }); // Send the reply as JSON
    } else if (data["Note"]) {
      res.json({ reply: "API call limit reached. Please try again later." }); // Handle API rate limit
    } else {
      res.json({ reply: "I'm sorry, I couldn't find that stock symbol." }); // Handle invalid stock symbol
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      res.json({ reply: "There was an error fetching the stock data. Please check the stock symbol or try again later." });
    } else {
      res.json({ reply: "Network error. Please try again later." });
    }
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri); // Connect to MongoDB
  console.log("DB started!");
  console.log(`started on port ${PORT}`); // Log the server port
});
