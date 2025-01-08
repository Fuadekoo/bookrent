"use client";
import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const EarningSummary = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Earnings',
          data: [12000, 15000, 10000, 14000, 13000, 16000, 17000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Earnings (ETB)'
            },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }, []);

  return (
    <div className="earning-summary p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Earning Summary</h2>
      <canvas ref={chartRef} className="w-full h-64"></canvas>
    </div>
  );
};

export default EarningSummary;
