import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useThemeContext } from "../../context/theme/theme_context";
import { ChartOptions } from "chart.js/auto";

interface HBarType extends ChartOptions<"bar"> {
  chartOptions: {
    title: {
      display: boolean;
      text: string;
    };
  };
  chartData: HBarDataType;
}
type HBarDataType = {
  title: string;
  value: number;
  label?: string;
}[];
type FormatedDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    barThickness?: number;
  }[];
};
const HorizontalBarChart = ({ chartData, chartOptions }: HBarType) => {
  const [data, setData] = useState<FormatedDataType>({
    labels: [],
    datasets: [
      {
        label: "Spending",
        data: [],
        backgroundColor: ["#3498db", "#9b59b6", "#e74c3c"],
      },
    ],
  }); // Store chart data
  const { isDark } = useThemeContext();
  useEffect(() => {
    // Process incoming data to match Chart.js format
    const formattedData = {
      labels: chartData.map((item) => item.title),
      datasets: [
        {
          label: chartData[0].label || "Spending",
          data: chartData.map((item) => item.value),
          backgroundColor: ["#3AC165", "#3AC165", "#3AC165"],
          barThickness: 30,
        },
      ],
    };
    setData(formattedData);
  }, [chartData]);

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "transparent",
        },
        ticks: {
          color: isDark ? "#BCBCBC" : "#333",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount Spent",
        },
        ticks: {
          color: isDark ? "#BCBCBC" : "#333",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.formattedValue}Rs`,
        },
      },
    },
    ...chartOptions,
  };

  return <Bar data={data} options={options} width={50} height={300} />;
};

const BudgetChart = ({ data }: { data: HBarDataType }) => {
  const chartData = data;
  const chartOptions = {
    title: {
      display: true,
      text: "Budget Spent Last 5 Months",
    },
  };

  return (
    <HorizontalBarChart chartData={chartData} chartOptions={chartOptions} />
  );
};

export default BudgetChart;
