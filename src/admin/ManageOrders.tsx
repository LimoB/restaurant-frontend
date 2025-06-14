// src/admin/ManageOrders.tsx
import Sidebar from "./Sidebar";

const mockOrders = [
  { id: 101, customer: "John Doe", total: 450, status: "Delivered" },
  { id: 102, customer: "Jane Smith", total: 320, status: "Pending" },
  { id: 103, customer: "Alex Kim", total: 610, status: "On the way" },
];

function ManageOrders() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">Order ID</th>
                <th className="text-left py-2 px-4">Customer</th>
                <th className="text-left py-2 px-4">Total (KES)</th>
                <th className="text-left py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4">{order.total}</td>
                  <td className="py-2 px-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
