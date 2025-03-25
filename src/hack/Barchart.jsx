import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Barchart = ({ data }) => {
  const labels = data.map((item) => item.label);
  const scores = data.map((item) => item.score);
  const backgroundColors = data.map((item) =>
    item.label === "Real" ? "rgba(34, 197, 94, 0.8)" : "rgba(300, 68, 68, 0.9)"
  );
  const borderColors = data.map((item) =>
    item.label === "Real" ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)"
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: scores,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#fff", // Set legend text color to white
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <div className="shadow-lg rounded-xl p-6 w-full max-w-sm bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Fake vs Real Distribution
        </h2>
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
        <button className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 w-full">
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Barchart;
