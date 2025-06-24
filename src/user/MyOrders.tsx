import { useEffect, useState } from "react";

interface Order {
  id: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: number;
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate fetching orders
    const mockOrders: Order[] = [
      {
        id: "ORD001",
        date: "2025-06-21",
        status: "Delivered",
        total: 59.99,
        items: 3,
      },
      {
        id: "ORD002",
        date: "2025-06-18",
        status: "Shipped",
        total: 34.5,
        items: 2,
      },
      {
        id: "ORD003",
        date: "2025-06-15",
        status: "Cancelled",
        total: 15.0,
        items: 1,
      },
    ];
    setOrders(mockOrders);
  }, []);

  const statusColor = {
    Pending: "text-yellow-500",
    Shipped: "text-blue-500",
    Delivered: "text-green-600",
    Cancelled: "text-red-500",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-orange-700 mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-base">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-gradient-to-r from-orange-100 to-pink-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-orange-50 transition-colors duration-150"
                >
                  <td className="px-5 py-3 font-medium">{order.id}</td>
                  <td className="px-5 py-3">{order.date}</td>
                  <td className={`px-5 py-3 font-semibold ${statusColor[order.status]}`}>
                    {order.status}
                  </td>
                  <td className="px-5 py-3">{order.items}</td>
                  <td className="px-5 py-3">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
