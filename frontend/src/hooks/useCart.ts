import { useCartStore } from "@/store/useCartStore";
import { placeOrder } from "@/services/firebase/orders";
import { Order } from "@/types";

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  const checkout = async (cafeId: string, tableId?: string) => {
    if (items.length === 0) throw new Error("Cart is empty");

    const orderData: Omit<Order, "id" | "createdAt"> = {
      cafeId,
      tableId: tableId || "Unknown",
      items,
      status: "pending",
      totalAmount: getTotal(),
      paymentStatus: "pending",
    };

    try {
      const orderId = await placeOrder(orderData);
      clearCart();
      return orderId;
    } catch (error) {
      console.error("Checkout failed:", error);
      throw error;
    }
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    checkout,
  };
};
