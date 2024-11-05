import React from "react";
import { positions } from "../data/data";

const Positions = () => {
  return (
    <>
      <h3 style={{ fontFamily: 'Roboto, sans-serif', color: "black", margin: '20px 0', fontWeight: '600' }}>
       Stakes ({positions.length})
      </h3>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)', marginBottom: '20px' }}>
        <table style={{ width: '100%', color: '#e0e0e0', borderCollapse: 'collapse', fontFamily: 'Roboto, sans-serif' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: '#e0e0e0' }}>
              <th style={{ fontWeight: '500' }}>Product</th>
              <th style={{ fontWeight: '500' }}>Ticker</th>
              <th style={{ fontWeight: '500' }}>Shares</th>
              <th style={{ fontWeight: '500' }}>Avg. Cost Price</th>
              <th style={{ fontWeight: '500' }}>Last Trade Price</th>
              <th style={{ fontWeight: '500' }}>P&L</th>
              <th style={{ fontWeight: '500' }}>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnlValue = curValue - stock.avg * stock.qty; // Calculate P&L value

              // Convert stock.day to a number safely
              const dayChange = typeof stock.day === 'number' ? stock.day : parseFloat(stock.day) || 0;

              return (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#1a1a1a' }}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td style={{ color: pnlValue < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                    {pnlValue.toFixed(2)}
                  </td>
                  <td style={{ color: dayChange < 0 ? '#ff3d00' : '#00e676', fontWeight: '500' }}>
                    {dayChange.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
