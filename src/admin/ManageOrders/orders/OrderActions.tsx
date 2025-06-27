import type { Order } from "../../../types/order";
import { Button } from "../../../components/ui/button";

interface Props {
  order: Order;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Order["status"]) => void;
  onEdit: (id: number) => void;
  disabled?: boolean;
}

const OrderActions = ({
  order,
  onDelete,
  onStatusChange,
  onEdit,
  disabled = false,
}: Props) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select
        className="text-sm px-2 py-1 rounded-md border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-orange-300 disabled:opacity-50"
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

      <Button
        size="sm"
        variant="outline"
        onClick={() => onEdit(order.id)}
        disabled={disabled}
        className="border-orange-300 text-orange-700 hover:bg-orange-50"
        aria-label="Edit order"
      >
        Edit
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(order.id)}
        disabled={disabled}
        aria-label="Delete order"
      >
        Delete
      </Button>
    </div>
  );
};

export default OrderActions;
