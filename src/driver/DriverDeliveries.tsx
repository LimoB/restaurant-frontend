// src/driver/DriverDeliveries.tsx
import { useEffect, useState } from "react";

interface Delivery {
  id: number;
  orderId: string;
  customer: string;
  address: string;
  status: "Pending" | "Out for Delivery" | "Delivered";
  eta: string;
}

const mockDeliveries: Delivery[] = [
  {
    id: 1,
    orderId: "ORD-001",
    customer: "Alice Wanjiku",
    address: "123 Riverside Drive, Nairobi",
    status: "Out for Delivery",
    eta: "15 mins",
  },
  {
    id: 2,
    orderId: "ORD-002",
    customer: "Brian Otieno",
    address: "Westlands Ave 45",
    status: "Pending",
    eta: "30 mins",
  },
];

export default function DriverDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setDeliveries(mockDeliveries);
    }, 500);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-orange-800">🚚 Assigned Deliveries</h1>
      {deliveries.length === 0 ? (
        <p>No deliveries assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {deliveries.map((d) => (
            <li
              key={d.id}
              className="border border-orange-200 p-4 rounded-lg shadow bg-white text-[#442c1c]"
            >
              <div className="font-semibold">Order: {d.orderId}</div>
              <div>Customer: {d.customer}</div>
              <div>Address: {d.address}</div>
              <div>Status: <span className="font-medium">{d.status}</span></div>
              <div>ETA: {d.eta}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
