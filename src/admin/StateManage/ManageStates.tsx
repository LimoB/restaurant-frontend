import { useStates } from "./useStates";
import StateTable from "./StateTable";
import StateForm from "./StateForm";
import { Button } from "../../components/ui/button";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageStates() {
  const {
    states,
    totalCount,
    loading,
    form,
    editingState,
    showFormModal,
    showDeleteModal,
    scrollRef,
    search,
    setSearch,
    openAdd,
    openEdit,
    setForm,
    setShowFormModal,
    setShowDeleteModal,
    setDeletingId,
    handleFormSubmit,
    handleDelete,
  } = useStates();

  function handleInlineUpdate(_id: number, _updated: { name: string; code: string; }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-6 space-y-6" ref={scrollRef}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Manage States <span className="text-sm text-gray-500">({totalCount})</span>
        </h1>
        <Button onClick={openAdd}>+ Add State</Button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border rounded px-3 py-2 mb-4"
        />
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
          onInlineUpdate={handleInlineUpdate}
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
