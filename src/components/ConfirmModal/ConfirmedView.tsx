// components/ConfirmModal/ConfirmedView.tsx

interface Props {
  onClose: () => void;
}

const ConfirmedView = ({ onClose }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
      <p className="text-gray-700">Thank you for your order. Your food is on the way!</p>
      <button
        onClick={onClose}
        className="mt-6 w-full py-2 px-4 rounded-xl text-white bg-green-600 hover:bg-green-700 transition font-semibold"
      >
        Close
      </button>
    </div>
  );
};

export default ConfirmedView;
