// components/ConfirmModal/ProductPrompt.tsx
type Props = {
  product: { name: string };
};

const ProductPrompt = ({ product }: Props) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Add <span className="text-indigo-600 font-bold">{product.name}</span> to your cart?
  </h2>
);

export default ProductPrompt;
