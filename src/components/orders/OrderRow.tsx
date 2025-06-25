import OrderActions from "./OrderActions";
import { statusColors } from "../../utils/orderStatusColors";
import type { Order } from "../../types/order";

interface Props {
    order: Order;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: Order["status"]) => void;
    onViewDetails: () => void;
    onEdit: (id: number) => void;
    isExpanded: boolean;
    disabled?: boolean; // 🆕 Optional disable flag
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
        <>
            <tr className="text-center hover:bg-[#fff3e0] transition-colors">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.user?.name || "N/A"}</td>
                <td className="p-2 border">{order.restaurant?.name || "N/A"}</td>
                <td className="p-2 border">{driverName}</td>
                <td className="p-2 border">{deliveryLocation}</td>
                <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                    </span>
                </td>
                <td className="p-2 border">${Number(order.price).toFixed(2)}</td>
                <td className="p-2 border">${Number(order.discount).toFixed(2)}</td>
                <td className="p-2 border font-semibold">${Number(order.final_price).toFixed(2)}</td>

                <td className="p-2 border">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-2 border space-y-1 flex flex-col items-center">
                    <OrderActions
                        order={order}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                        onEdit={onEdit}
                        disabled={disabled} // 🆕 pass to OrderActions
                    />
                    <button
                        onClick={onViewDetails}
                        className="text-xs text-blue-600 underline hover:text-blue-800 transition"
                        disabled={disabled}
                    >
                        {isExpanded ? "Hide Details" : "View Details"}
                    </button>
                </td>
            </tr>

            {isExpanded && (
                <tr className="bg-[#fffdf8] transition-all">
                    <td colSpan={11} className="p-4 text-left border border-t-0">
                        {order.comment && (
                            <p className="mb-2">
                                <strong>Admin Comment:</strong> {order.comment}
                            </p>
                        )}

                        {order.actual_delivery_time && (
                            <p className="mb-2">
                                <strong>Actual Delivery:</strong>{" "}
                                {new Date(order.actual_delivery_time).toLocaleString()}
                            </p>
                        )}

                        {order.driver && (
                            <div className="mb-2">
                                <strong>Driver Car Info:</strong>{" "}
                                {[
                                    order.driver.car_make,
                                    order.driver.car_model,
                                    order.driver.car_year && `(${order.driver.car_year})`,
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                {order.driver.license_plate && ` – Plate: ${order.driver.license_plate}`}
                            </div>
                        )}

                        {order.orderMenuItems?.length ? (
                            <div className="mb-2">
                                <strong>Items:</strong>
                                <ul className="list-disc pl-5">
                                    {order.orderMenuItems.map((item) => (
                                        <li key={item.id}>
                                            {item.menu_item?.name || "Unknown"} x{item.quantity} — ${Number(item.price).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No items listed.</p>
                        )}

                        {order.comments?.length ? (
                            <div className="mb-2">
                                <strong>Comments:</strong>
                                <ul className="list-disc pl-5">
                                    {order.comments.map((c) => (
                                        <li key={c.id}>
                                            {c.user?.name || "Unknown"}: {c.comment_text} ({c.comment_type}, ⭐{c.rating})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {order.statuses?.length ? (
                            <div className="mb-2">
                                <strong>Status History:</strong>
                                <ul className="list-disc pl-5">
                                    {order.statuses.map((s) => (
                                        <li key={s.id}>
                                            {new Date(s.created_at).toLocaleString()} — {s.statusCatalog?.name || "Unknown"}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </td>
                </tr>
            )}
        </>
    );
};

export default OrderRow;
