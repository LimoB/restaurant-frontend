import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { fetchOrdersByUserId } from "../services/ordersServices";
import type { Order } from "../types/order";

// ✅ Status color map
const statusColors: Record<Order["status"], string> = {
  pending: "text-yellow-500",
  accepted: "text-blue-500",
  rejected: "text-red-500",
  delivered: "text-green-600",
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user || !token) {
        setError("You must be logged in to view orders.");
        setLoading(false);
        return;
      }

      try {
        const fetchedOrders = await fetchOrdersByUserId(user.id, token);
        setOrders(fetchedOrders); // ✅ Direct use
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, token]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-orange-700 mb-6">📦 My Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
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
              {orders.map((order) => {
                console.log("🧾 Order:", {
                  id: order.id,
                  orderMenuItems: order.orderMenuItems,
                });

                const total = (order.orderMenuItems || []).reduce((sum, item) => {
                  const price = parseFloat(item.price);
                  const quantity = item.quantity ?? 1;
                  return sum + (isNaN(price) ? 0 : price * quantity);
                }, 0);

                return (
                  <tr key={order.id} className="hover:bg-orange-50 transition-colors duration-150">
                    <td className="px-5 py-3 font-medium">{order.id}</td>
                    <td className="px-5 py-3">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className={`px-5 py-3 font-semibold ${statusColors[order.status]}`}>
                      {order.status}
                    </td>
                    <td className="px-5 py-3">
                      {order.orderMenuItems?.length ?? 0}
                    </td>
                    <td className="px-5 py-3">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}


            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
