import { useState, useEffect } from "react";
import { Order } from "@/types";
import { subscribeToOrders, updateOrderStatus as updateStatus } from "@/services/firebase/orders";

export const useOrders = (cafeId: string | null) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cafeId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToOrders(cafeId, (fetchedOrders) => {
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [cafeId]);

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    if (!cafeId) return;
    try {
      await updateStatus(cafeId, orderId, status);
    } catch (err) {
      console.error("Failed to update order status:", err);
      throw err;
    }
  };

  return { orders, loading, error, updateOrderStatus };
};
