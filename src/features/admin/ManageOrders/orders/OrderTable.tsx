// import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderRow from "./OrderRow";
import type { Order } from "@/types/order";
import * as React from "react";
// import React = require("react");

interface Props {
  orders: Order[] | { data: Order[] } | null | undefined;
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
  const orderList: Order[] = Array.isArray(orders)
    ? orders
    : orders?.data && Array.isArray(orders.data)
    ? orders.data
    : [];

  return (
    <div className="overflow-auto shadow rounded-md max-h-[800px] border border-gray-200 dark:border-slate-700">
      <table className="w-full table-auto text-sm border-collapse bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-50 dark:bg-slate-800 text-left">
          <tr>
            <th className="p-3">#</th>
            <th>User</th>
            <th>Restaurant</th>
            <th>Driver</th>
            <th>Address</th>
            <th>Status</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Final</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length > 0 ? (
            orderList.map((order) => (
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
                      className="bg-gray-50 dark:bg-slate-800"
                    >
                      <td colSpan={11} className="p-4 border border-t-0 dark:border-slate-700 text-gray-700 dark:text-gray-300">
                        <div className="space-y-4 text-sm">
                          {Array.isArray(order.orderMenuItems) && order.orderMenuItems.length > 0 && (
                            <div>
                              <strong className="text-gray-800 dark:text-gray-200">Items Ordered:</strong>
                              <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-300">
                                {order.orderMenuItems.map((item) => (
                                  <li key={item.id}>
                                    {item.menu_item?.name ?? "Unknown"} (x{item.quantity}) – ${item.price}
                                    {item.comment && <> – <em>{item.comment}</em></>}
                                    {item.menu_item?.category?.name && (
                                      <> [Category: {item.menu_item.category.name}]</>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <strong className="text-gray-800 dark:text-gray-200">User Comments:</strong>
                            {Array.isArray(order.comments) && order.comments.length > 0 ? (
                              <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-300">
                                {order.comments.map((comment) => (
                                  <li key={comment.id}>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                      {comment.user?.name ?? "Unknown"}:
                                    </span>{" "}
                                    “{comment.comment_text}” ({comment.comment_type}, ⭐{comment.rating ?? "–"})
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400 italic">No comments</p>
                            )}
                          </div>

                          <div>
                            <strong className="text-gray-800 dark:text-gray-200">Status History:</strong>
                            {Array.isArray(order.statuses) && order.statuses.length > 0 ? (
                              <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-300">
                                {order.statuses.map((status) => (
                                  <li key={status.id}>
                                    {status.statusCatalog?.name ?? "Unknown"} —{" "}
                                    {status.created_at
                                      ? new Date(status.created_at).toLocaleString()
                                      : "Unknown time"}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400 italic">No status history</p>
                            )}
                          </div>

                          {order.driver && (
                            <div>
                              <strong className="text-gray-800 dark:text-gray-200">Driver Car Info:</strong>
                              <ul className="list-disc pl-5 mt-1 text-gray-600 dark:text-gray-300">
                                {order.driver.car_make && <li>Make: {order.driver.car_make}</li>}
                                {order.driver.car_model && <li>Model: {order.driver.car_model}</li>}
                                {order.driver.car_year && <li>Year: {order.driver.car_year}</li>}
                                {order.driver.license_plate && <li>License Plate: {order.driver.license_plate}</li>}
                                {!order.driver.car_make &&
                                  !order.driver.car_model &&
                                  !order.driver.car_year &&
                                  !order.driver.license_plate && (
                                    <li className="italic text-gray-500 dark:text-gray-400">
                                      No car information available
                                    </li>
                                  )}
                              </ul>
                            </div>
                          )}

                          {order.comment && (
                            <div>
                              <strong className="text-gray-800 dark:text-gray-200">Admin Comment:</strong>{" "}
                              <span className="italic text-gray-600 dark:text-gray-300">{order.comment}</span>
                            </div>
                          )}

                          {order.actual_delivery_time && (
                            <div>
                              <strong className="text-gray-800 dark:text-gray-200">Actual Delivery:</strong>{" "}
                              {new Date(order.actual_delivery_time).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={11}
                className="text-center p-4 italic text-gray-500 dark:text-gray-400"
              >
                No orders to display or invalid data format.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
