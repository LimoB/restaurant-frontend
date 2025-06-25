import type { Order } from "../../types/order";

interface Props {
  order: Order;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Order["status"]) => void;
  onEdit: (id: number) => void;
  disabled?: boolean; // 🆕 Optional prop
}

const OrderActions = ({
  order,
  onDelete,
  onStatusChange,
  onEdit,
  disabled = false,
}: Props) => {
  return (
    <div className="flex items-center gap-3">
      <select
        className="text-sm border rounded p-1 bg-white disabled:opacity-50"
        value={order.status}
        onChange={(e) =>
          onStatusChange(order.id, e.target.value as Order["status"])
        }
        disabled={disabled}
        aria-label="Change order status"
      >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="delivered">Delivered</option>
      </select>

      <button
        className="text-green-600 underline hover:text-green-800 transition text-sm disabled:opacity-50"
        onClick={() => onEdit(order.id)}
        disabled={disabled}
        aria-label="Edit order"
      >
        Edit
      </button>

      <button
        className="text-red-500 underline hover:text-red-700 transition text-sm disabled:opacity-50"
        onClick={() => onDelete(order.id)}
        disabled={disabled}
        aria-label="Delete order"
      >
        Delete
      </button>
    </div>
  );
};

export default OrderActions;
