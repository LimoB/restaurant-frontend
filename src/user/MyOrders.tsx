import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { fetchOrdersByUserId } from "../services/ordersServices";
import type { Order } from "../types/order";
import { statusColors } from "../types/orderStatus";

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
        setOrders(fetchedOrders);
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
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-6xl mx-auto">
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
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Restaurant</th>
                <th className="p-3">Items</th>
                <th className="p-3">Delivery Location</th>
                <th className="p-3">Delivery Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => {
                const total = (order.orderMenuItems || []).reduce((sum, item) => {
                  const price = parseFloat(item.price);
                  const quantity = item.quantity ?? 1;
                  return sum + (isNaN(price) ? 0 : price * quantity);
                }, 0);

                const deliveryTime =
                  order.delivery_time || order.expected_delivery || "N/A";
                const restaurantName = order.restaurant?.name || "Unknown";

                const deliveryAddress =
                  order.delivery_address?.city?.name &&
                    order.delivery_address?.city?.state?.name
                    ? `${order.delivery_address.city.name}, ${order.delivery_address.city.state.name}`
                    : "N/A";

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-orange-50 transition-colors duration-150 align-top"
                  >
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">{restaurantName}</td>
                    <td className="p-3 space-y-2">
                      {(order.orderMenuItems || []).map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.item_name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium">{item.item_name}</p>
                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="p-3">{deliveryAddress}</td>
                    <td className="p-3 text-sm">
                      {typeof deliveryTime === "string"
                        ? deliveryTime
                        : new Date(deliveryTime).toLocaleTimeString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">${total.toFixed(2)}</td>
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




// Add clickable links for restaurants or items.

// Format delivery times as "in 45 mins".

// Add cancel buttons for pending orders.