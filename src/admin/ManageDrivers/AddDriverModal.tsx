import { useEffect, useState } from "react";
import { createDriver, type Driver } from "../../services/driver";
import { fetchAllUsers, type User } from "../../services/users";
import { Button } from "../../components/ui/button";
import Modal from "../../components/Modal";

interface DriverFormModalProps {
  open: boolean;
  onClose: () => void;
  onDriverCreated: () => void;
}

const initialFormState: Omit<Driver, "id" | "user" | "name"> = {
  user_id: undefined,
  car_make: "",
  car_model: "",
  car_year: "",
  license_plate: "",
  active: true,
};

const DriverFormModal = ({
  open,
  onClose,
  onDriverCreated,
}: DriverFormModalProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchAllUsers()
        .then(setUsers)
        .catch((err) => setError((err as Error).message));
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "user_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.user_id) {
      setError("Please select a user");
      return;
    }

    try {
      setLoading(true);
      await createDriver(formData);
      onDriverCreated();
      onClose();
      setFormData(initialFormState);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={open} onClose={onClose} title="Add New Driver">
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🔹 User Select */}
        <div>
          <label className="block mb-1 font-medium text-sm">Select User</label>
          <select
            name="user_id"
            value={formData.user_id ?? ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          >
            <option value="" disabled>
              -- Choose a user --
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Car Make */}
        <input
          required
          name="car_make"
          placeholder="e.g. Toyota"
          value={formData.car_make}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* 🔹 Car Model */}
        <input
          required
          name="car_model"
          placeholder="e.g. Forester"
          value={formData.car_model}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* 🔹 Car Year */}
        <input
          required
          name="car_year"
          placeholder="e.g. 2019"
          value={formData.car_year}
          onChange={handleChange}
          maxLength={4}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* 🔹 License Plate */}
        <input
          required
          name="license_plate"
          placeholder="e.g. KDA 123X"
          value={formData.license_plate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* 🔹 Submit Button */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Create Driver"}
        </Button>
      </form>
    </Modal>
  );
};

export default DriverFormModal;
