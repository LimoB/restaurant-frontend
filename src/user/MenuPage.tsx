import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";
import { getMenuItems } from "../services/menu";
import { ShoppingCart } from "lucide-react";
import CartPanel from "../components/CartPanel";
import ConfirmModal from "../components/ConfirmOrderModal";

const MenuPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const { cart } = useCart();
  const { addToCart, increment, decrement, clearCart } = useCartActions();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getMenuItems();
        console.log("📦 Raw menu data:", data); // Debug output

        const sanitized = data.map((item: any): Product => ({
          id: String(item.id),
          name: item.name,
          price: Number(item.price),
          image:
            item.image_url && item.image_url.trim() !== ""
              ? item.image_url
              : "/fallback.jpg",
          ingredients:
            item.ingredients && item.ingredients.trim() !== ""
              ? item.ingredients
              : "No ingredients listed",
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

  const handleOrderNowClick = () => {
    setShowConfirmModal(true);
    setOrderConfirmed(false);
  };

  const handleConfirmOrder = () => {
    clearCart();
    setOrderConfirmed(true);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    closeCart();
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 text-base"
      >
        <ShoppingCart size={20} />
        {totalItems === 0 ? "My Cart" : `${totalItems} item${totalItems > 1 ? "s" : ""}`}
      </button>

      {/* Products Grid */}
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
                      ${product.price.toFixed(2)}
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
                        onClick={() => {
                          addToCart(product);
                          openCart();
                        }}
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

        {/* Cart Panel */}
        <CartPanel
          open={cartOpen}
          onClose={closeCart}
          onOrderNowClick={handleOrderNowClick}
        />

        {/* Confirmation Modal */}
        <ConfirmModal
          show={showConfirmModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmOrder}
          product={null}
          cart={cart}
          total={total}
          orderConfirmed={orderConfirmed}
        />
      </section>
    </>
  );
};

export default MenuPage;
