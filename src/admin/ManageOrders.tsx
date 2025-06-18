import { useEffect, useState } from "react";
import {
  fetchAllOrders,
  deleteOrder,
  updateOrder,
  fetchOrderById,
} from "../services/orders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderCreateModal from "../components/OrderCreateModal";

interface Order {
  id: number;
  status: "pending" | "accepted" | "rejected" | "delivered";
  final_price: string;
  price: string;
  discount: string;
  comment?: string;
  actual_delivery_time?: string;
  created_at: string;
  updated_at?: string; // ✅ Make this optional
  user?: { id?: number; name: string };
  restaurant?: { id?: number; name: string };
  driver?: { id?: number; name: string };
  delivery_address?: {
    id?: number;
    city: {
      name: string;
      state: { name: string };
    };
  };
}


const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
};

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
    <div className="p-6">
      <ToastContainer position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Create Order
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
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
                <tr key={order.id} className="text-center">
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
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[order.status]
                      }`}
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
                        handleStatusChange(
                          order.id,
                          e.target.value as Order["status"]
                        )
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
