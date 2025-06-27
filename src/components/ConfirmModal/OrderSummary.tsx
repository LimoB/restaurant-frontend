// components/ConfirmModal/OrderSummary.tsx
import type { CartItem } from "../../types/cart";

const OrderSummary = ({ cart, total }: { cart: CartItem[]; total: number }) => (
    <div className="rounded-xl border border-blue-200 bg-white p-4 text-sm text-left max-h-48 overflow-y-auto shadow-inner">
        {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-1 border-b last:border-none">
                <span>{item.name} × {item.quantity}</span>
                <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
            </div>
        ))}

        <div className="flex justify-between font-semibold mt-3 pt-2 border-t border-gray-300">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
        </div>
    </div>
);

export default OrderSummary;
