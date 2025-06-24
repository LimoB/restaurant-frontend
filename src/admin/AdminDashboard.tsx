import { Link } from "react-router-dom";
import { Users, Store, PackageSearch } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Jun 13", "Jun 14", "Jun 15", "Jun 16", "Jun 17", "Jun 18", "Jun 19"],
  datasets: [
    {
      label: "Orders",
      data: [82, 94, 68, 46, 92, 87, 63],
      backgroundColor: "#ea580c",
    },
    {
      label: "Revenue",
      data: [662.39, 1735.47, 625.16, 1032.5, 788.43, 1364.56, 614.76],
      backgroundColor: "#f59e0b",
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#fdf6eb] text-[#442c1c] px-6 py-8">
      <h1 className="text-3xl font-bold mb-10 text-center">Welcome Back, Admin</h1>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Stats */}
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
              <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 h-[300px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Weekly Performance</h3>
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
              scales: {
                y: {
                  ticks: {
                    color: "#4b5563",
                  },
                },
                x: {
                  ticks: {
                    color: "#4b5563",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          to="/admin/users"
          className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col items-center border border-gray-200"
        >
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
            <Users size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Users</h2>
        </Link>

        <Link
          to="/admin/restaurants"
          className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col items-center border border-gray-200"
        >
          <div className="bg-green-100 text-green-600 rounded-full p-3 mb-4">
            <Store size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Restaurants</h2>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col items-center border border-gray-200"
        >
          <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mb-4">
            <PackageSearch size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
        </Link>
      </div>
    </div>
  );
}
