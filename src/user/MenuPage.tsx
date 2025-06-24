import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";
import { ShoppingCart } from "lucide-react";
import CartPanel from "../components/CartPanel";
import ConfirmModal from "../components/ConfirmModal";

const MenuPage = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const { cart } = useCart();
  const { addToCart, increment, decrement, clearCart } = useCartActions();

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const getQuantity = (id: string) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="px-4 py-10 md:px-16 flex flex-col md:flex-row gap-10 bg-[#fffaf0] min-h-screen">
      {/* Products */}
      <div className="w-full md:w-2/3">
        <h2 className="text-4xl font-extrabold mb-10 text-orange-700 drop-shadow">
          🍴 Menu
        </h2>

        <div className="flex flex-wrap gap-8">
          {products.map((product) => {
            const quantity = getQuantity(product.id);

            return (
              <div
                key={product.id}
                className="w-[180px] bg-white/90 backdrop-blur rounded-3xl p-5 flex flex-col items-center shadow-xl hover:shadow-2xl transition border border-gray-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-full shadow mb-3"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-center text-gray-800">{product.name}</h3>
                <span className="text-sm text-gray-500 text-center mb-2 leading-tight">
                  {product.desc.slice(0, 28)}...
                </span>
                <span className="text-orange-600 font-bold text-xl mb-3">
                  ${product.price.toFixed(2)}
                </span>

                {quantity > 0 ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrement(product.id)}
                      className="text-base px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-full"
                    >
                      −
                    </button>
                    <span className="text-base font-medium">{quantity}</span>
                    <button
                      onClick={() => increment(product.id)}
                      className="text-base px-3 py-1 bg-green-100 text-green-600 hover:bg-green-200 rounded-full"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-full mt-2"
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white px-5 py-4 rounded-full shadow-2xl z-50 flex items-center gap-3 text-base md:text-lg"
      >
        <ShoppingCart size={22} />
        {totalItems === 0 ? "My Cart" : `${totalItems} item${totalItems > 1 ? "s" : ""}`}
      </button>

      {/* Cart Panel */}
      <div className="z-40">
        <CartPanel
          open={cartOpen}
          onClose={closeCart}
          onOrderNowClick={handleOrderNowClick}
        />
      </div>

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
  );
};

export default MenuPage;
