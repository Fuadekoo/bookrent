import React from 'react';

const Statistics = () => {
  return (
    <div className="statistics mb-6">
      <h2 className="text-xl font-bold mb-4">This Month Statistics</h2>
      <p>Tue, 14 Nov, 2024, 11:30 AM</p>
      <div className="income bg-white shadow-md rounded p-4">
        <h3 className="text-lg font-bold">Income</h3>
        <p>ETB 9460.00 <span className="text-red-500">↓ 1.5%</span></p>
        <p>Compared to ETB8940 last month</p>
        <p>Last Month Income ETB 25658.00</p>
      </div>
    </div>
  );
};

export default Statistics;
