import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Bar chart data
const data = {
  labels: ["Jun 13", "Jun 14", "Jun 15", "Jun 16", "Jun 17", "Jun 18", "Jun 19"],
  datasets: [
    {
      label: "Orders",
      data: [82, 94, 68, 46, 92, 87, 63],
      backgroundColor: "#ea580c",
      barThickness: 14,
      borderRadius: 6,
    },
    {
      label: "Revenue",
      data: [662.39, 1735.47, 625.16, 1032.5, 788.43, 1364.56, 614.76],
      backgroundColor: "#f59e0b",
      barThickness: 14,
      borderRadius: 6,
    },
  ],
};

// Correct and type-safe chart options
const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#6b7280",
        font: {
          size: 12,
          weight: "bold" as const,
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        color: "#4b5563",
        font: { size: 11 },
      },
      grid: {
        color: "#e5e7eb",
      },
    },
    x: {
      ticks: {
        color: "#4b5563",
        font: { size: 11 },
      },
      grid: {
        display: false,
      },
    },
  },
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#fdf6eb] text-[#442c1c] px-6 py-10">
      {/* Welcome Message */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2">👋 Welcome Back, Admin</h1>
        <p className="text-lg text-gray-600">
          Here's an overview of what's happening in your system today.
        </p>
      </div>

      {/* Stats + Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "Total Users",
              value: "1,234",
              color: "text-blue-600",
              desc: "↗︎ 12% from last month",
            },
            {
              title: "Total Orders",
              value: "4,567",
              color: "text-yellow-600",
              desc: "↘︎ 5% from last week",
            },
            {
              title: "Total Revenue",
              value: "$13.8k",
              color: "text-green-600",
              desc: "↗︎ 22% growth",
            },
            {
              title: "Pending Approvals",
              value: "7",
              color: "text-red-600",
              desc: "Action Required",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="text-sm text-gray-500 mb-1">{stat.title}</div>
              <div className={`text-2xl font-semibold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 h-[280px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Weekly Performance
          </h3>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
