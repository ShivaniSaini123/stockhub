import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/allHoldings").then((res) => {
      // console.log(res.data);
      setAllHoldings(res.data);
    });
  }, []);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)", // You can adjust this if needed
      },
    ],
  };

  // Helper function to convert percentage string to a number
  const parsePercentage = (percentStr) => {
    if (typeof percentStr === "string") {
      const parsed = parseFloat(percentStr.replace('%', '').trim());
      return isNaN(parsed) ? 0 : parsed; // Return 0 if parsing fails
    }
    return percentStr; // Return as is if already a number
  };

  return (
    <>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', color: "black", margin: '20px 0', fontWeight: '600' }}>
        Holdings ({allHoldings.length})
      </h3>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)', marginBottom: '20px' }}>
        <table style={{ width: '100%', color: '#e0e0e0', borderCollapse: 'collapse', fontFamily: 'Roboto, sans-serif' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#e0e0e0' }}>
              <th style={{ fontWeight: '500' }}>Ticker</th>
              <th style={{ fontWeight: '500' }}>Shares</th>
              <th style={{ fontWeight: '500' }}>Avg. Cost Price</th>
              <th style={{ fontWeight: '500' }}>Last Trade Price</th>
              <th style={{ fontWeight: '500' }}>Cur. Val</th>
              <th style={{ fontWeight: '500' }}>P&L</th>
              <th style={{ fontWeight: '500' }}>Net Chg.</th>
              <th style={{ fontWeight: '500' }}>Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnlValue = curValue - stock.avg * stock.qty; // Calculate P&L value

              // Convert percentage strings to numbers
              const netChange = parsePercentage(stock.net);
              const dayChange = parsePercentage(stock.day);

              return (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#1a1a1a' }}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td style={{ color: pnlValue < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                    {pnlValue.toFixed(2)}
                  </td>
                  <td style={{ color: netChange < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                    {netChange.toFixed(2)}% {/* Display percentage */}
                  </td>
                  <td style={{ color: dayChange < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                    {dayChange.toFixed(2)}% {/* Display percentage */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '8px', flex: '1', margin: '0 10px' }}>
          <h5 style={{ color: "black", fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>Total Investment</h5>
          <p style={{ color: "grey", fontSize: '1.5rem', fontWeight: '600' }}>29,875.<span>55</span></p>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '8px', flex: '1', margin: '0 10px' }}>
          <h5 style={{ color: "black", fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>Current Value</h5>
          <p style={{ color: "grey", fontSize: '1.5rem', fontWeight: '600' }}>31,428.<span>95</span></p>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '8px', flex: '1', margin: '0 10px' }}>
          <h5 style={{ color: "black", fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>P&L</h5>
          <p style={{ color: "grey", fontSize: '1.5rem', fontWeight: '600' }}>1,553.40 (+5.20%)</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
