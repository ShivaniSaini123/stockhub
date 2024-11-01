import React from "react";
import { Link } from "react-router-dom";
import './Funds.css'; // Assuming you're using a separate CSS file

const Funds = () => {
  return (
    <>
      <div className="funds">
        <div className="dashboard-container">
          <div className="content">
            {/* Content goes here */}
            <h1 className="title">Funds Overview</h1>
            <div className="row">
              <div className="col">
                <span>
                  <p>Your Funds</p>
                </span>
                <Link to="/add-fund" className="btn btn-green">Add Fund</Link>
                <Link to="/withdraw-fund" className="btn btn-blue">Withdraw Fund</Link>
              </div>
              <div className="col">
                {/* Add more fund-related info here */}
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
      </div>
    </>
  );
};

export default Funds;
