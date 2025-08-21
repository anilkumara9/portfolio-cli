import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsChartProps {
  isDarkMode?: boolean;
}

const SkillsChart: React.FC<SkillsChartProps> = ({ isDarkMode = false }) => {
  const data = {
    labels: [
      'Frontend Development',
      'Backend Development',
      'AI/Machine Learning',
      'Data Science',
      'Cloud Platforms',
      'Database Management',
      'DevOps & Tools',
      'Mobile Development'
    ],
    datasets: [
      {
        label: 'Skill Level',
        data: [90, 85, 95, 90, 80, 85, 75, 70], // Meda's skill levels based on resume
        backgroundColor: isDarkMode 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.1)',
        borderColor: isDarkMode 
          ? 'rgba(255, 255, 255, 0.8)' 
          : 'rgba(0, 0, 0, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: isDarkMode 
          ? 'rgba(255, 255, 255, 0.9)' 
          : 'rgba(0, 0, 0, 0.9)',
        pointBorderColor: isDarkMode ? '#fff' : '#000',
        pointHoverBackgroundColor: isDarkMode ? '#000' : '#fff',
        pointHoverBorderColor: isDarkMode ? '#fff' : '#000',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        angleLines: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        pointLabels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            size: 11,
            family: '"Source Sans 3", sans-serif',
          },
        },
        ticks: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.r}% proficiency`;
          }
        }
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic' as const,
    },
  };

  return (
    <div className="w-full h-64 flex justify-center items-center">
      <div className="w-64 h-64">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default SkillsChart;