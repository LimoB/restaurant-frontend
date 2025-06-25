import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import  OrderRow  from "./OrderRow";
import type { Order } from "../../types/order";

interface Props {
  orders: Order[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Order["status"]) => void;
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  expandedOrderId: number | null;
  actionLoading?: boolean;
}

const OrderTable = ({
  orders,
  onDelete,
  onStatusChange,
  onViewDetails,
  onEdit,
  expandedOrderId,
  actionLoading = false,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm bg-[#fffaf0]">
        <thead className="bg-[#f5e1c8]">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Restaurant</th>
            <th className="p-2 border">Driver</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Discount</th>
            <th className="p-2 border">Final</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <OrderRow
                order={order}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                onViewDetails={() => onViewDetails(order.id)}
                onEdit={onEdit}
                isExpanded={expandedOrderId === order.id}
                disabled={actionLoading}
              />

              <AnimatePresence initial={false}>
                {expandedOrderId === order.id && (
                  <motion.tr
                    key={`details-${order.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#fffdf8] text-left"
                  >
                    <td colSpan={11} className="p-3 border border-t-0">
                      {order.orderMenuItems?.length ? (
                        <div className="mb-2">
                          <strong>Menu Items:</strong>
                          <ul className="list-disc pl-5">
                            {order.orderMenuItems.map((item) => (
                              <li key={item.id}>
                                {item.menu_item?.name || "Unknown"} (x{item.quantity}) – ${item.price}
                                {item.comment && ` – ${item.comment}`}
                                {item.menu_item?.category?.name && ` [${item.menu_item.category.name}]`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No menu items</p>
                      )}

                      {order.comments?.length ? (
                        <div className="mb-2">
                          <strong>Comments:</strong>
                          <ul className="list-disc pl-5">
                            {order.comments.map((comment) => (
                              <li key={comment.id}>
                                <span className="font-medium">{comment.user?.name || "Unknown"}:</span>{" "}
                                "{comment.comment_text}" ({comment.comment_type}, ⭐{comment.rating})
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No comments</p>
                      )}

                      {order.statuses?.length ? (
                        <div className="mb-2">
                          <strong>Status History:</strong>
                          <ul className="list-disc pl-5">
                            {order.statuses.map((status) => (
                              <li key={status.id}>
                                {status.statusCatalog?.name || "Unknown"} at{" "}
                                {new Date(status.created_at).toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No status history</p>
                      )}

                      {order.comment && (
                        <div>
                          <strong>Order Comment:</strong> {order.comment}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
