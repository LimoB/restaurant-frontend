import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";
import { getMenuItems } from "../services/menu";
import { createOrder } from "../services/ordersServices";
import { toast } from "react-toastify";

import CartPanel from "../components/CartPanel";
import Modal from "../components/Modal";
import ConfirmedMessage from "../components/ConfirmModal/ConfirmedMessage";
import type { OrderInput } from "../types/order";

const MenuPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { cart, clearCart } = useCart();
  const { addToCart, increment, decrement } = useCartActions();





  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getMenuItems();

        const sanitized = data.map((item: any): Product => ({
          id: String(item.id),
          name: item.name,
          price: String(item.price), // ✅ Convert to string to match Product type
          image: item.image_url?.trim() ? item.image_url : "/fallback.jpg",
          ingredients: item.ingredients?.trim()
            ? item.ingredients
            : "No ingredients listed",
          restaurant_id: item.restaurant?.id ?? 0,
          restaurant: item.restaurant?.id && item.restaurant?.name
            ? { id: item.restaurant.id, name: item.restaurant.name }
            : undefined,
          restaurant_name: item.restaurant?.name ?? "Unknown Restaurant",
        }));

        setProducts(sanitized);
      } catch (error) {
        console.error("❌ Failed to fetch menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const getQuantity = (id: string) =>
    cart.find((item) => item.id === id)?.quantity ?? 0;



  const handleOrderNow = async () => {
    if (cart.length === 0) {
      toast.error("🛒 Your cart is empty.");
      return;
    }

    const userString = localStorage.getItem("user");
    let user = null;
    try {
      user = JSON.parse(userString || "null");
    } catch {
      user = null;
    }

    if (!user || !user.id || !user.address_id) {
      toast.error("🔒 You must be logged in and have an address on file.");
      return;
    }

    try {
      // ✅ Convert string prices to number for calculation
      const price = cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      );
      const discount = 0;
      const final_price = price - discount;

      const payload: OrderInput = {
        user_id: user.id,
        restaurant_id: cart[0]?.restaurant_id || 1,
        delivery_address_id: user.address_id,
        driver_id: null,
        price: price.toFixed(2),
        discount: discount.toFixed(2),
        final_price: final_price.toFixed(2),
        status: "pending",
        cart: cart.map((item) => ({
          menu_item_id: Number(item.id),
          item_name: item.name,
          quantity: item.quantity,
          price: Number(item.price).toFixed(2), // ✅ Convert to number then format
        })),
      };

      await createOrder(payload);
      toast.success("🎉 Order placed successfully!");
      clearCart();
      setCartOpen(false);
      setShowSuccess(true);
    } catch (error) {
      toast.error("❌ Failed to place order.");
      console.error("Order error:", error);
    }
  };

  return (
    <>

      {/* Slide-In Cart Panel */}
      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onOrderNowClick={handleOrderNow}
      />

      {/* Order Success Modal */}
      <Modal show={showSuccess} onClose={() => setShowSuccess(false)}>
        <ConfirmedMessage onClose={() => setShowSuccess(false)} />
      </Modal>

      {/* Menu List */}
      <section className="px-4 py-12 md:px-16 min-h-screen bg-[#fffaf0]">
        <div className="w-full md:w-4/5 mx-auto">
          <h2 className="text-4xl font-extrabold text-orange-700 text-center mb-10 drop-shadow">
            🍴 Menu
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No menu items found.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {products.map((product) => {
                const quantity = getQuantity(product.id);
                return (
                  <div
                    key={product.id}
                    className="w-44 bg-white/80 backdrop-blur-md p-4 rounded-3xl flex flex-col items-center shadow-xl hover:shadow-2xl transition border border-gray-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-full shadow-md mb-3"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                    />
                    <h3 className="text-base font-semibold text-center text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 text-center italic mb-1">
                      {product.restaurant_name}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {product.ingredients}
                    </p>


                    <span className="text-orange-600 font-bold text-lg mb-2">
                      ${Number(product.price).toFixed(2)}
                    </span>


                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(product.id)}
                          className="text-sm px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-full"
                        >
                          −
                        </button>
                        <span className="text-sm">{quantity}</span>
                        <button
                          onClick={() => increment(product.id)}
                          className="text-sm px-3 py-1 bg-green-100 text-green-600 hover:bg-green-200 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-full mt-2"
                      >
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MenuPage;
