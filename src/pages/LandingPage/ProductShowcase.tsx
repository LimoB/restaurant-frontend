import { useState, useEffect } from "react";
import { getMenuItems } from "../../services/menu";
import type { Product } from "../../types/product";

import { useCart } from "../../context/CartContext";
import CartPanel from "../../components/CartPanel";
import { ShoppingCart } from "lucide-react";

type Props = {
  getQuantity: (id: string) => number;
  addToCart: (product: Product) => void;
  decrement: (id: string) => void;
  onOrderNowClick: () => void;
};

const ProductShowcase = ({
  getQuantity,
  addToCart,
  decrement,
  onOrderNowClick,
}: Props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getMenuItems();

        // ✅ Sanitize and normalize product structure
        const sanitizedData: Product[] = data.map((item: any) => ({
          id: String(item.id),
          name: item.name,
          price: Number(item.price),
          image: item.image_url, // 👈 map backend field to `image`
          ingredients: item.ingredients ?? "",
        }));

        setProducts(sanitizedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const handleOrderNowClick = () => {
    onOrderNowClick();
    closeCart();
  };

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

      {/* Products Section */}
      <section className="px-4 py-12 md:px-16 relative">
        <div className="w-full md:w-4/5 mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-fuchsia-700 mb-10 drop-shadow">
            Popular Dishes
          </h2>

          {loading ? (
            <p className="text-center">Loading...</p>
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
                      src={product.image || "/fallback.jpg"}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-full shadow-md mb-3"
                      loading="lazy"
                      onError={(e) =>
                        (e.currentTarget.src = "/fallback.jpg")
                      }
                    />
                    <h3 className="text-base font-semibold text-center text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {product.ingredients?.slice(0, 32)}...
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
                          onClick={() => addToCart(product)}
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
      </section>
    </>
  );
};

export default ProductShowcase;
