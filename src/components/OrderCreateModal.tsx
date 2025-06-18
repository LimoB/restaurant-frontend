// src/components/OrderCreateModal.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllUsers } from "../services/users";
import { fetchRestaurants } from "../services/restaurants";
import { fetchAllAddresses } from "../services/addresses";

import { fetchDrivers } from "../services/admin";
import { createOrder, type OrderInput } from "../services/orders";

interface Props {
  onClose: () => void;
  onOrderCreated: () => void;
}

const OrderCreateModal = ({ onClose, onOrderCreated }: Props) => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [restaurants, setRestaurants] = useState<{ id: number; name: string }[]>([]);
  const [addresses, setAddresses] = useState<{ id: number; city: { name: string; state: { name: string } } }[]>([]);
  const [drivers, setDrivers] = useState<{ id: number; name: string }[]>([]);

  const [newOrder, setNewOrder] = useState<OrderInput>({
    user_id: 1,
    restaurant_id: 1,
    delivery_address_id: 1,
    driver_id: 1,
    price: "100.00",
    discount: "0.00",
    final_price: "100.00",
    comment: "",
    status: "pending",
    actual_delivery_time: new Date().toISOString(),
  });

  useEffect(() => {
    Promise.all([
      fetchAllUsers(),
      fetchRestaurants(),
      fetchAllAddresses(),
      fetchDrivers(),
    ]).then(([userRes, restRes, addrRes, driverRes]) => {
      setUsers(userRes);
      setRestaurants(restRes);
      setAddresses(addrRes);
      setDrivers(driverRes.data);
    });
  }, []);

  const handleCreate = async () => {
    try {
      await createOrder(newOrder);
      toast.success("Order created successfully!");
      onOrderCreated();
      onClose();
    } catch (err) {
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[90%] max-w-lg space-y-4 overflow-y-auto max-h-[90vh]">
        <h3 className="text-lg font-bold">Create New Order</h3>
        <div className="grid gap-2">
          <select
            value={newOrder.user_id}
            onChange={(e) => setNewOrder({ ...newOrder, user_id: +e.target.value })}
            className="border p-2 rounded w-full"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>

          <select
            value={newOrder.restaurant_id}
            onChange={(e) => setNewOrder({ ...newOrder, restaurant_id: +e.target.value })}
            className="border p-2 rounded w-full"
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <select
            value={newOrder.delivery_address_id}
            onChange={(e) => setNewOrder({ ...newOrder, delivery_address_id: +e.target.value })}
            className="border p-2 rounded w-full"
          >
            {addresses.map((a) => (
              <option key={a.id} value={a.id}>{a.city.name}, {a.city.state.name}</option>
            ))}
          </select>

          <select
            value={newOrder.driver_id}
            onChange={(e) => setNewOrder({ ...newOrder, driver_id: +e.target.value })}
            className="border p-2 rounded w-full"
          >
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Price"
            value={newOrder.price}
            onChange={(e) => {
              const price = e.target.value;
              const final = (
                parseFloat(price || "0") - parseFloat(newOrder.discount || "0")
              ).toFixed(2);
              setNewOrder({ ...newOrder, price, final_price: final });
            }}
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Discount"
            value={newOrder.discount}
            onChange={(e) => {
              const discount = e.target.value;
              const final = (
                parseFloat(newOrder.price || "0") - parseFloat(discount || "0")
              ).toFixed(2);
              setNewOrder({ ...newOrder, discount, final_price: final });
            }}
            className="border p-2 rounded w-full"
          />

          <input
            type="datetime-local"
            value={newOrder.actual_delivery_time.slice(0, 16)}
            onChange={(e) =>
              setNewOrder({ ...newOrder, actual_delivery_time: e.target.value })
            }
            className="border p-2 rounded w-full"
          />

          <textarea
            placeholder="Comment"
            value={newOrder.comment}
            onChange={(e) => setNewOrder({ ...newOrder, comment: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <select
            value={newOrder.status}
            onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value as OrderInput["status"] })}
            className="border p-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-gray-700 border px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCreateModal;
