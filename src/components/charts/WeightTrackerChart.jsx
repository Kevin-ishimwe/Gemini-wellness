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

function WeightTrackerChart({ weightData }) {
  const sortedData = weightData.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const labels = sortedData.map((entry) =>
    new Date(entry.date).toLocaleDateString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Weight (kg)",
        data: sortedData.map((entry) => entry.weight),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "BMI",
        data: sortedData.map((entry) => entry.bmi),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Body Fat %",
        data: sortedData.map((entry) => entry.bodyFatPercentage),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y2",
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
        text: "Weight Management Tracker",
      },
      tooltip: {
        callbacks: {
          afterBody: function (context) {
            const index = context[0].dataIndex;
            const measurements = sortedData[index].measurements;
            return `Waist: ${measurements.waist}cm\nChest: ${measurements.chest}cm\nHips: ${measurements.hips}cm`;
          },
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 18.5,
            yMax: 18.5,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            label: {
              content: "Underweight",
              enabled: true,
              position: "start",
            },
          },
          line2: {
            type: "line",
            yMin: 24.9,
            yMax: 24.9,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            label: {
              content: "Normal weight",
              enabled: true,
              position: "start",
            },
          },
          line3: {
            type: "line",
            yMin: 29.9,
            yMax: 29.9,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            label: {
              content: "Overweight",
              enabled: true,
              position: "start",
            },
          },
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Weight (kg)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "BMI",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Body Fat %",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Weight Management Tracker</h2>
      <Line options={options} data={data} />
    </div>
  );
}

export default WeightTrackerChart;
