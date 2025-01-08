import Link from 'next/link';

const Statistics = () => {
  return (
    <div className="statistics">
      <div className="income">
        <h2>This Month Statistics</h2>
        <p>Tue, 14 Nov, 2024, 11:30 AM</p>
        <h3>Income</h3>
        <p>ETB 9460.00 <span className="decrease">↓ 1.5%</span></p>
        <p>Compared to ETB8940 last month</p>
        <p>Last Month Income ETB 25658.00</p>
      </div>
      <div className="available-books">
        <h3>Available Books</h3>
        <p>Today</p>
        <div className="chart">
          <p>Fiction: 54</p>
          <p>Self Help: 20</p>
          <p>Business: 26</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
