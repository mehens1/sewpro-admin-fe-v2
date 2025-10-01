import React from "react";
import Card from "../../components/Card";
import { FaUser } from "react-icons/fa";
import ChartCard from "../../components/ChartCard";

const Dashboard = () => {
  const cardData = [
    {
      icon: <FaUser className="text-[#0f4c5c] text-xl" />,
      label: "Total Waitlist Users",
      value: 5483,
    },
    {
      icon: <FaUser className="text-[#0f4c5c] text-xl" />,
      label: "Total Users",
      value: 2859,
    },
    {
      icon: <FaUser className="text-[#0f4c5c] text-xl" />,
      label: "Staff",
      value: 5483,
    },
    {
      icon: <FaUser className="text-xl text-red-500" />,
      label: "Non-Staff",
      value: 38,
    },
  ];
  const lineChartData = {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Expense",
        data: [10000, 15000, 12000, 20000, 25000, 18000, 22000],
        fill: false,
        borderColor: "#EC6B56",
        tension: 0.4,
      },
      {
        label: "Profit",
        data: [12000, 17000, 14000, 22000, 27000, 25000, 30000],
        fill: false,
        borderColor: "#47B39C",
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const barChartData = {
    labels: [
      "Gateway str",
      "The Rustic Fox",
      "Velvet Vine",
      "Blue Harbor",
      "Nebula Novelties",
      "Crimson Crafters",
      "Tidal Treasures",
      "Whimsy Wild",
      "Mercantile",
      "Emporium",
    ],
    datasets: [
      {
        label: "Sales",
        data: [874, 721, 598, 566, 395, 344, 274, 213, 183, 170],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const barChartOptions = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full ">
      <div className="p-4 rounded-lg primary-bg">
        <h6 className="mb-2 text-sm text-white">
          {" "}
          <strong>Overview</strong>
        </h6>
        <div className="grid w-full h-full grid-cols-2 gap-4 md:grid-cols-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <ChartCard
          title="Last 6 months"
          type="line"
          data={lineChartData}
          options={lineChartOptions}
        />
        <ChartCard
          title="Top 10 Stores by Sales"
          type="bar"
          data={barChartData}
          options={barChartOptions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
