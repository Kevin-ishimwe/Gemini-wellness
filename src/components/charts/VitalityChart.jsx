import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function VitalSignsChart({ vitalSignsData }) {
  // Sort data by date
  const sortedData = vitalSignsData.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Prepare data for the chart
  const labels = sortedData.map((entry) =>
    new Date(entry.date).toLocaleDateString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Heart Rate",
        data: sortedData.map((entry) => entry.heartRate),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y-heart-rate",
      },
      {
        label: "Systolic BP",
        data: sortedData.map((entry) => entry.bloodPressure.systolic),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y-blood-pressure",
      },
      {
        label: "Diastolic BP",
        data: sortedData.map((entry) => entry.bloodPressure.diastolic),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y-blood-pressure",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Vital Signs Over Time",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: false,
        position: "left",
      },
      "y-heart-rate": {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Heart Rate (bpm)",
        },
        min: 40,
        max: 120,
      },
      "y-blood-pressure": {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Blood Pressure (mmHg)",
        },
        min: 60,
        max: 180,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Vital Signs</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default VitalSignsChart;
