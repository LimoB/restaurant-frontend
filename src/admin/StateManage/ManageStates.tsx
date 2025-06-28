import { useStates } from "./useStates";
import StateTable from "./StateTable";
import StateForm from "./StateForm";
import { Button } from "../../components/ui/button";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageStates() {
  const {
    states,
    loading,
    form,
    editingState,
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
  } = useStates();

  return (
    <div className="p-6 space-y-6" ref={scrollRef}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage States</h1>
        <Button onClick={openAdd}>+ Add State</Button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading states...</p>
      ) : (
        <StateTable
          items={states}
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
        title={editingState ? "Edit State" : "Add State"}
      >
        <StateForm
          form={form}
          isEdit={!!editingState}
          onCancel={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
          onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
        />
      </Modal>

      <ConfirmDialog
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete State?"
        message="Are you sure you want to delete this state? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
