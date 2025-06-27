// src/admin/ManageRestaurants.tsx
import { useRestaurants } from "./useRestaurants";
import RestaurantTable from "./RestaurantTable";
import RestaurantForm from "./RestaurantForm";
import Modal from "../../components/Modal";
import { Button } from "../../components/ui/button"; // Import your Button component

export default function ManageRestaurants() {
  const {
    restaurants,
    cities,
    selectedCity,
    setSelectedCity,
    isModalOpen,
    setModalOpen,
    editing,
    form,
    setForm,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
  } = useRestaurants();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Manage Restaurants</h1>

      <div className="flex items-center gap-4 mb-4">
        <Button variant="primary" size="md" onClick={openCreateModal}>
          + New Restaurant
        </Button>

        <select
          value={selectedCity}
          onChange={(e) =>
            setSelectedCity(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <RestaurantTable
        restaurants={restaurants}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editing ? "Edit Restaurant" : "Create Restaurant"}
        </h2>

        <RestaurantForm
          form={form}
          cities={cities}
          onChange={(field, value) => setForm({ ...form, [field]: value })}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleSave}
          editing={!!editing}
        />
      </Modal>
    </div>
  );
}
