import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchAllUsers } from "../services/users";
import { fetchAllOrders } from "../services/ordersServices";
import { format } from "date-fns";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
  });

  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [weeklyOrderData, setWeeklyOrderData] = useState<number[]>([]);
  const [statusLabels, setStatusLabels] = useState<string[]>([]);
  const [statusData, setStatusData] = useState<number[]>([]);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const users = await fetchAllUsers();
        const orders = await fetchAllOrders();

        const totalRevenue = orders.reduce(
          (sum: number, order: any) => sum + order.total_price,
          0
        );
        const pending = users.filter((u: any) => !u.isVerified).length;

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalRevenue,
          pendingApprovals: pending,
        });

        const grouped = orders.reduce((acc: Record<string, number>, order: any) => {
          const date = format(new Date(order.created_at), "MMM dd");
          acc[date] = acc[date] ? acc[date] + 1 : 1;
          return acc;
        }, {});
        setWeeklyLabels(Object.keys(grouped));
        setWeeklyOrderData(Object.values(grouped));

        const statusGrouped = orders.reduce((acc: Record<string, number>, order: any) => {
          acc[order.status] = acc[order.status] ? acc[order.status] + 1 : 1;
          return acc;
        }, {});
        setStatusLabels(Object.keys(statusGrouped));
        setStatusData(Object.values(statusGrouped));
      } catch (error) {
        console.error("❌ Failed to load dashboard data:", error);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-[#222] dark:text-white px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2">👋 Welcome Back, Admin</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Here's an overview of what's happening in your system today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "Total Users",
              value: stats.totalUsers.toLocaleString(),
              color: "text-blue-600",
              desc: "↗︎ Growth vs last month",
            },
            {
              title: "Total Orders",
              value: stats.totalOrders.toLocaleString(),
              color: "text-yellow-600",
              desc: "↘︎ Compared to last week",
            },
            {
              title: "Total Revenue",
              value: `$${stats.totalRevenue.toFixed(2)}`,
              color: "text-green-600",
              desc: "↗︎ Sales performance",
            },
            {
              title: "Pending Approvals",
              value: stats.pendingApprovals.toString(),
              color: "text-red-600",
              desc: "Users awaiting verification",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.title}</div>
              <div className={`text-2xl font-semibold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Weekly Orders Chart */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700 h-[280px]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Weekly Orders
          </h3>
          <Bar
            data={{
              labels: weeklyLabels,
              datasets: [
                {
                  label: "Orders",
                  data: weeklyOrderData,
                  backgroundColor: "#ea580c",
                  barThickness: 14,
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#cbd5e1", // text-slate-300
                    font: { size: 12, weight: "bold" },
                  },
                },
              },
              scales: {
                y: {
                  ticks: { color: "#94a3b8", font: { size: 11 } }, // text-slate-400
                  grid: { color: "#334155" },
                },
                x: {
                  ticks: { color: "#94a3b8", font: { size: 11 } },
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Orders by Status
          </h3>
          <div className="w-60 h-60 mx-auto">
            <Pie
              data={{
                labels: statusLabels,
                datasets: [
                  {
                    data: statusData,
                    backgroundColor: ["#f97316", "#facc15", "#4ade80", "#f87171"],
                    borderColor: "#fff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#cbd5e1",
                      font: { size: 12 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
