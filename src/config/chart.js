import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';
  
// import { Chart as ChartJS } from "react-chartjs-2";
  // Register ChartJS components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  // Default chart options
  export const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      },
      title: {
        display: true,
        text: 'Crypto Price Chart',
        color: '#fff'
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      }
    }
  };
  
  // Create default dataset
  export const createDataset = (label, data, color = '#42a5f5') => ({
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}33`,
    fill: true,
    tension: 0.4,
    pointRadius: 2,
    pointHoverRadius: 5
  });
  
  export { ChartJS };