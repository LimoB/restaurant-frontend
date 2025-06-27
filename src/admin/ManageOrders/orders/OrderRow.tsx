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
        <tr className="hover:bg-gray-50 transition-colors text-gray-800 text-sm">
            <td className="p-3 border">{order.id}</td>
            <td className="p-3 border">{order.user?.name || "N/A"}</td>
            <td className="p-3 border">{order.restaurant?.name || "N/A"}</td>
            <td className="p-3 border">{driverName}</td>
            <td className="p-3 border">{deliveryLocation}</td>
            <td className="p-3 border">
                <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}
                >
                    {order.status}
                </span>
            </td>
            <td className="p-3 border">${Number(order.price).toFixed(2)}</td>
            <td className="p-3 border">${Number(order.discount).toFixed(2)}</td>
            <td className="p-3 border font-semibold">${Number(order.final_price).toFixed(2)}</td>
            <td className="p-3 border">{new Date(order.created_at).toLocaleDateString()}</td>
            <td className="p-3 border">
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
                        className="text-blue-600 hover:text-blue-800 h-auto p-0 text-xs"
                    >
                        {isExpanded ? "Hide Details" : "View Details"}
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default OrderRow;
