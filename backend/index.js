require("dotenv").config();
const multer = require("multer");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require('./routes/PostRoutes.js');
const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Adjust according to your frontend origin
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use(bodyParser.json());
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching all holdings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching all positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (error) {
    console.error("Error saving new order:", error);
    res.status(500).send("Error saving order.");
  }
});

app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided in the request body." });
  }

  const stockSymbol = message.split(" ").pop().toUpperCase();

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: `${stockSymbol}`,
        interval: '5min',
        apikey: ALPHA_VANTAGE_API_KEY,
      }
    });

    const data = response.data;
    console.log("API Response:", data);

    if (data["Time Series (5min)"]) {
      const latestKey = Object.keys(data["Time Series (5min)"])[0];
      const latestData = data["Time Series (5min)"][latestKey];
      const reply = `The latest price for ${stockSymbol} is ₹${latestData["1. open"]}.`;
      res.json({ reply });
    } else if (data["Note"]) {
      res.json({ reply: "API call limit reached. Please try again later." });
    } else {
      res.json({ reply: "I'm sorry, I couldn't find that stock symbol." });
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

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
  console.log(`started on port ${PORT}`);
});
