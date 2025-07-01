import OrderActions from "./OrderActions";
import { statusColors } from "../../../types/orderStatus";
import type { Order } from "../../../types/order";
import { Button } from "../../../components/ui/button";

interface Props {
  order: Order;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Order["status"]) => void;
  onViewDetails: () => void;
  onEdit: (id: number) => void;
  isExpanded: boolean;
  disabled?: boolean;
}

const OrderRow = ({
  order,
  onDelete,
  onStatusChange,
  onViewDetails,
  onEdit,
  isExpanded,
  disabled = false,
}: Props) => {
  const city = order.delivery_address?.city?.name;
  const state = order.delivery_address?.city?.state?.name;
  const driverName = order.driver?.name || order.driver?.user?.name || "N/A";
  const deliveryLocation = city && state ? `${city}, ${state}` : "N/A";

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-gray-800 dark:text-gray-200 text-sm">
      <td className="p-3 border border-gray-200 dark:border-slate-700">{order.id}</td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">{order.user?.name || "N/A"}</td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">{order.restaurant?.name || "N/A"}</td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">{driverName}</td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">{deliveryLocation}</td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">
        ${Number(order.price).toFixed(2)}
      </td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">
        ${Number(order.discount).toFixed(2)}
      </td>
      <td className="p-3 border border-gray-200 dark:border-slate-700 font-semibold">
        ${Number(order.final_price).toFixed(2)}
      </td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">
        {new Date(order.created_at).toLocaleDateString()}
      </td>
      <td className="p-3 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col items-center gap-2">
          <OrderActions
            order={order}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            disabled={disabled}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={onViewDetails}
            disabled={disabled}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 h-auto px-2 py-1 text-xs border border-gray-300 dark:border-slate-600"
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
