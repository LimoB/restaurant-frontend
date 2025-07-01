import { useMenu } from "./useMenu";
import MenuTable from "./MenuTable";
import MenuForm from "./MenuForm";
import { Button } from "../../components/ui/button";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function ManageMenu() {
  const {
    menuItems,
    loading,
    form,
    editingItem,
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
    categories,
    restaurants,
  } = useMenu();

  return (
    <div
      className="p-6 space-y-6 min-h-screen bg-gray-50 text-gray-800 dark:bg-slate-900 dark:text-gray-100"
      ref={scrollRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Menu</h1>
        <Button onClick={openAdd}>➕ Add Menu Item</Button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading menu items...</p>
      ) : (
        <MenuTable
          items={menuItems}
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
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
      >
        <MenuForm
          form={form}
          isEdit={!!editingItem}
          onCancel={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
          onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
          categories={categories}
          restaurants={restaurants}
        />
      </Modal>

      <ConfirmDialog
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Menu Item?"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
}
