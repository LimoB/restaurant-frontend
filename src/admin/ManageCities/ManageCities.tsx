import { useCities } from "./useCities";
import CityTable from "./CityTable";
import CityForm from "./CityForm";
import { Button } from "../../components/ui/button";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import { toast } from "react-hot-toast";

export default function ManageCities() {
  const {
    cities,
    loading,
    form,
    editingCity,
    showFormModal,
    showDeleteModal,
    scrollRef,
    openAdd,
    openEdit,
    setForm,
    setShowFormModal,
    setShowDeleteModal,
    setDeletingId,
    handleFormSubmit,
    handleDelete,
    states,
  } = useCities();

  return (
    <div className="p-6 space-y-6" ref={scrollRef}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Cities</h1>
        <Button onClick={openAdd}>+ Add City</Button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading cities...</p>
      ) : (
        <CityTable
          items={cities}
          onEdit={openEdit}
          onDelete={(id) => {
            setDeletingId(id);
            setShowDeleteModal(true);
          }}
        />
      )}

      <Modal
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={editingCity ? "Edit City" : "Add City"}
      >
        <CityForm
          form={form}
          isEdit={!!editingCity}
          onCancel={() => setShowFormModal(false)}
          onSubmit={async () => {
            try {
              await handleFormSubmit();
              toast.success(editingCity ? "City updated" : "City added");
              setShowFormModal(false);
            } catch (err: any) {
              toast.error(err?.message || "Failed to save city");
            }
          }}
          onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
          states={states}
        />
      </Modal>

      <ConfirmDialog
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          try {
            await handleDelete();
            toast.success("City deleted");
            setShowDeleteModal(false);
          } catch (err: any) {
            toast.error(err?.message || "Failed to delete city");
          }
        }}
        title="Delete City?"
        message="Are you sure you want to delete this city? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
