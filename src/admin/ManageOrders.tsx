// src/pages/ManageOrders.tsx
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderCreateModal from "../components/OrderCreateModal";
import {
  fetchAllOrders,
  deleteOrder,
  updateOrder,
  fetchOrderById,
} from "../services/orders";
import { statusColors } from "../utils/orderStatusColors";
import type { Order } from "../types/order";

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = async () => {
    try {
      const orders = await fetchAllOrders();
      setOrders(orders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
        toast.success("Order deleted!");
        await loadOrders();
      } catch {
        toast.error("Failed to delete order");
      }
    }
  };

  const handleStatusChange = async (id: number, status: Order["status"]) => {
    try {
      await updateOrder(id, { status });
      toast.success("Status updated");
      await loadOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const openOrderDetails = async (id: number) => {
    try {
      const order = await fetchOrderById(id);
      setSelectedOrder(order);
      console.log(order);
    } catch {
      toast.error("Failed to fetch order details");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <ToastContainer position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4a2d16]">Manage Orders</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#7b3e19] hover:bg-[#5a2c13] text-white px-4 py-2 rounded shadow"
        >
          + Create Order
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm bg-[#fffaf0]">
            <thead className="bg-[#f5e1c8]">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Restaurant</th>
                <th className="p-2 border">Driver</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Discount</th>
                <th className="p-2 border">Final</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center hover:bg-[#fff3e0]">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.user?.name || "N/A"}</td>
                  <td className="p-2 border">{order.restaurant?.name || "N/A"}</td>
                  <td className="p-2 border">{order.driver?.name || "N/A"}</td>
                  <td className="p-2 border">
                    {order.delivery_address
                      ? `${order.delivery_address.city.name}, ${order.delivery_address.city.state.name}`
                      : "N/A"}
                  </td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 border">${order.price}</td>
                  <td className="p-2 border">${order.discount}</td>
                  <td className="p-2 border font-semibold">${order.final_price}</td>
                  <td className="p-2 border">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border space-y-1 flex flex-col items-center">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => openOrderDetails(order.id)}
                    >
                      View
                    </button>
                    <select
                      className="text-sm border rounded p-1"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as Order["status"])
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button
                      className="text-red-500 underline"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateModal && (
        <OrderCreateModal
          onClose={() => setShowCreateModal(false)}
          onOrderCreated={loadOrders}
        />
      )}
    </div>
  );
};

export default ManageOrders;
