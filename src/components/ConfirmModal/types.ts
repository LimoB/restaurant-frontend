// components/ConfirmModal/types.ts

import type { CartItem } from "../../types/cart";

export interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  product?: { name: string } | null;
  cart?: CartItem[];
  total?: number;
  orderConfirmed?: boolean;
}

export interface OrderSummaryViewProps {
  cart: CartItem[];
  total: number;
  orderComment: string;
  setOrderComment: (value: string) => void;
  isConfirmDisabled: boolean;
  handleConfirm: () => void;
  onClose: () => void;
  isSubmitting: boolean;
  isLoggedIn: boolean;
  hasMultipleRestaurants: boolean;
}
