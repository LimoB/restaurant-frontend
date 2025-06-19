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
    <div className="min-h-screen bg-base-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Section */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Total Users",
              value: "1,234",
              color: "text-primary",
              desc: "↗︎ 12% from last month",
            },
            {
              title: "Total Orders",
              value: "4,567",
              color: "text-yellow-500",
              desc: "↘︎ 5% from last week",
            },
            {
              title: "Total Revenue",
              value: "$13.8k",
              color: "text-green-500",
              desc: "↗︎ 22% growth",
            },
            {
              title: "Pending Approvals",
              value: "7",
              color: "text-red-500",
              desc: "Action Required",
            },
          ].map((stat, index) => (
            <div key={index} className="stats bg-white shadow-md rounded-xl">
              <div className="stat">
                <div className="stat-title text-gray-600">{stat.title}</div>
                <div className={`stat-value ${stat.color}`}>{stat.value}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 rounded-xl shadow-md h-[300px]">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Weekly Orders</h3>
          <div className="h-full w-full">
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
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
            <Users size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Manage Users</h2>
        </Link>

        <Link
          to="/admin/restaurants"
          className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <div className="bg-green-100 text-green-600 rounded-full p-3 mb-4">
            <Store size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-700">
            Manage Restaurants
          </h2>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <div className="bg-yellow-100 text-yellow-600 rounded-full p-3 mb-4">
            <PackageSearch size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Manage Orders</h2>
        </Link>
      </div>
    </div>
  );
}
