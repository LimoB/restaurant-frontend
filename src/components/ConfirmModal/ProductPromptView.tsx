// components/ConfirmModal/ProductPromptView.tsx

interface Props {
  product: { name: string };
}

const ProductPromptView = ({ product }: Props) => {
  return (
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Add <span className="text-indigo-600 font-bold">{product.name}</span> to your cart?
    </h2>
  );
};

export default ProductPromptView;
