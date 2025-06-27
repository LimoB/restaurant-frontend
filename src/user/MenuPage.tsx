import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useCartActions } from "../hooks/useCartActions";
import { getMenuItems } from "../services/menu";

const MenuPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { cart } = useCart();
  const { addToCart, increment, decrement } = useCartActions();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getMenuItems();
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

  return (
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

                  {/* Cart control remains inline, but no floating cart button */}
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
  );
};

export default MenuPage;
