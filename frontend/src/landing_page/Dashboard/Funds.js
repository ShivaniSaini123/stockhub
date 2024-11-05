import React from "react";
import { Link } from "react-router-dom";
import './Funds.css'; // Assuming you're using a separate CSS file

const Funds = () => {
  return (
    <>
      <div className="funds">
        <div className="funds-container">
          <h1 className="titlex" >Funds Overview</h1>
          <div className="row">
            <div className="col">
              <p>Your Funds</p>
              <Link to="/add-fund" className="btn">Add Fund</Link>
              <Link to="/withdraw-fund" className="btn">Withdraw Fund</Link>
            </div>
            <div className="col">
              {/* Add more fund-related info here if needed */}
            </div>
          </div>
          <div className="table">
            <div className="data">
              <p>Fund Name</p>
              <p>Amount</p>
            </div>
            <hr />
            {/* Repeat for each fund */}
            <div className="data">
              <p>Sample Fund</p>
              <p>$1,000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
