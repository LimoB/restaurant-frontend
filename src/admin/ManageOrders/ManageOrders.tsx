import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OrderEditModal from "./orders/OrderEditModal";
import OrderTable from "./orders/OrderTable";
import {
  fetchAllOrders,
  deleteOrder,
  updateOrder,
  fetchOrderById,
} from "../../services/ordersServices";
import type { Order } from "../../types/order";

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const orders = await fetchAllOrders();
      setOrders(orders);
    } catch {
      toast.error("❌ Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setActionLoading(true);
    try {
      await deleteOrder(id);
      toast.success("🗑️ Order deleted successfully!");
      await loadOrders();
    } catch {
      toast.error("❌ Failed to delete the order");
    } finally {
      setActionLoading(false);
    }
  };


  
  const handleStatusChange = async (id: number, status: Order["status"]) => {
    setActionLoading(true);
    try {
      await updateOrder(id, { status });
      toast.success(`✅ Status updated to "${status}"`);
      await loadOrders();
    } catch {
      toast.error("❌ Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleDetails = async (id: number) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null);
    } else {
      try {
        await fetchOrderById(id); // preload
        setExpandedOrderId(id);
      } catch {
        toast.error("❌ Failed to fetch order details");
      }
    }
  };

  const handleEdit = async (id: number) => {
    setActionLoading(true);
    try {
      const order = await fetchOrderById(id);
      setEditingOrder(order);
      setShowEditModal(true);
    } catch {
      toast.error("❌ Failed to fetch order for editing");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-xl relative">
      <ToastContainer position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4a2d16]">Manage Orders</h2>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400 italic">No orders found.</p>
      ) : (
        <OrderTable
          orders={orders}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onViewDetails={handleToggleDetails}
          onEdit={handleEdit}
          expandedOrderId={expandedOrderId}
          actionLoading={actionLoading}
        />
      )}

      {showEditModal && editingOrder && (
        <OrderEditModal
          orderId={editingOrder.id}
          onClose={() => {
            setShowEditModal(false);
            setEditingOrder(null);
          }}
          onOrderUpdated={loadOrders}
        />
      )}
    </div>
  );
};

export default ManageOrders;
