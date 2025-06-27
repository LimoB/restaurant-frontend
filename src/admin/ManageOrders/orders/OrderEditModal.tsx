import { useEffect, useState } from "react";
import type { Order } from "../../../types/order";
import { fetchOrderById, updateOrder } from "../../../services/ordersServices";
import { toast } from "react-toastify";

interface Props {
    orderId: number;
    onClose: () => void;
    onOrderUpdated: () => void;
}

const OrderEditModal = ({ orderId, onClose, onOrderUpdated }: Props) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [rateLimited, setRateLimited] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchOrderById(orderId);
                setOrder(data);
            } catch (err) {
                console.error("Failed to fetch order:", err);
                toast.error("Failed to load order.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [orderId]);

    const handleSubmit = async () => {
        if (!order || submitting) return;

        setSubmitting(true);
        try {
            await updateOrder(orderId, {
                status: order.status,
                comment: order.comment,
                actual_delivery_time: order.actual_delivery_time || undefined,
            });

            toast.success("Order updated successfully!");
            onOrderUpdated();
            onClose();
        } catch (err: any) {
            console.error("Failed to update order:", err);

            if (err?.response?.status === 429) {
                toast.error("You're sending requests too fast. Please wait a moment.");
                setRateLimited(true);
                setTimeout(() => setRateLimited(false), 5000); // optional 5s cooldown
            } else {
                toast.error("Failed to update order.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !order) return <div className="p-4">Loading...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] shadow-md">
                <h2 className="text-lg font-semibold mb-4">Edit Order #{order.id}</h2>

                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    className="w-full border p-2 mb-4"
                    value={order.status}
                    onChange={(e) =>
                        setOrder({ ...order, status: e.target.value as Order["status"] })
                    }
                >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="delivered">Delivered</option>
                </select>

                <label className="block text-sm font-medium mb-1">Comment</label>
                <textarea
                    className="w-full border p-2 mb-4"
                    value={order.comment ?? ""}
                    onChange={(e) => setOrder({ ...order, comment: e.target.value })}
                />

                <label className="block text-sm font-medium mb-1">Actual Delivery Time</label>
                <input
                    type="datetime-local"
                    className="w-full border p-2 mb-4"
                    value={
                        order.actual_delivery_time
                            ? new Date(order.actual_delivery_time).toISOString().slice(0, 16)
                            : ""
                    }
                    onChange={(e) =>
                        setOrder({
                            ...order,
                            actual_delivery_time: e.target.value,
                        })
                    }
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || rateLimited}
                        className={`px-4 py-2 text-white rounded ${submitting || rateLimited
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {submitting ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderEditModal;
