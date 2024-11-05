import React, { useState } from "react"; // Import React and useState hook for managing state
import { Link } from "react-router-dom"; // Import Link for navigation between routes
import axios from "axios"; // Import Axios for making HTTP requests
import GeneralContext from "./GeneralContext"; // Import GeneralContext for closing the buy window
import "./BuyActionWindow.css"; // Import CSS for styling the component

// Define the BuyActionWindow component
const BuyActionWindow = ({ uid }) => {
  // State to hold the quantity of stocks to buy
  const [stockQuantity, setStockQuantity] = useState(1);
  // State to hold the price of the stock
  const [stockPrice, setStockPrice] = useState(0.0);

  // Function to handle the Buy button click
  const handleBuyClick = () => {
    // Send a POST request to create a new order with stock details
    axios.post("http://localhost:3003/newOrder", {
      name: uid, // User ID
      qty: stockQuantity, // Quantity of stocks
      price: stockPrice, // Price per stock
      mode: "BUY", // Mode of operation
    });

    // Close the buy window after the order is processed
    GeneralContext.closeBuyWindow();
  };

  // Function to handle the Cancel button click
  const handleCancelClick = () => {
    // Close the buy window without placing an order
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            {/* Input field for stock quantity */}
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)} // Update stock quantity on change
              value={stockQuantity} // Bind the value to state
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            {/* Input field for stock price */}
            <input
              type="number"
              name="price"
              id="price"
              step="0.05" // Allow price to be incremented in steps of 0.05
              onChange={(e) => setStockPrice(e.target.value)} // Update stock price on change
              value={stockPrice} // Bind the value to state
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span> {/* Display margin required for the order */}
        <div>
          {/* Button to submit the buy order */}
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          {/* Button to cancel the order */}
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow; // Export the component for use in other parts of the application
