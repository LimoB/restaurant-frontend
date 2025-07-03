import { useEffect, useState } from "react";
import {
  fetchAllDrivers,
  deleteDriver,
  type Driver,
} from "../../services/driver";
import { Button } from "../../components/ui/button";
import { Loader } from "lucide-react";
import AddDriverModal from "./AddDriverModal";

const DriverManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadDrivers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllDrivers();
      setDrivers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this driver?")) return;

    try {
      setDeletingId(id);
      await deleteDriver(id);
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Driver Management</h1>
        <Button onClick={() => setShowAddModal(true)} variant="primary" size="md">
          + Add Driver
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader className="animate-spin w-4 h-4" />
          Loading drivers...
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : drivers.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">No drivers found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-md shadow">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100 dark:bg-slate-800 dark:text-gray-300 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th>Name</th>
                <th>Car</th>
                <th>Plate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
              {drivers.map((driver) => (
                <tr
                  key={driver.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="p-3">{driver.id}</td>
                  <td>{driver.user?.name || "—"}</td>
                  <td>
                    {driver.car_make} {driver.car_model} {driver.car_year}
                  </td>
                  <td>{driver.license_plate || "—"}</td>
                  <td>{driver.active ? "Active" : "Inactive"}</td>
                  <td className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert("Edit coming soon")}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(driver.id)}
                      disabled={deletingId === driver.id}
                    >
                      {deletingId === driver.id ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddDriverModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onDriverCreated={loadDrivers}
      />
    </div>
  );
};

export default DriverManagement;
