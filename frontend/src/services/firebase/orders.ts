import { ref, push, set, onValue, update, off, DataSnapshot } from "firebase/database";
import { rtdb } from "./config";
import { Order, OrderStatus } from "@/types";

/**
 * Places a new order in the Realtime Database
 */
export const placeOrder = async (orderData: Omit<Order, "id" | "createdAt">): Promise<string> => {
  const ordersRef = ref(rtdb, `orders/${orderData.cafeId}`);
  const newOrderRef = push(ordersRef);
  
  const orderWithId = {
    ...orderData,
    id: newOrderRef.key,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await set(newOrderRef, orderWithId);
  return newOrderRef.key as string;
};

/**
 * Updates the status of an existing order
 */
export const updateOrderStatus = async (
  cafeId: string,
  orderId: string,
  status: OrderStatus
): Promise<void> => {
  const orderRef = ref(rtdb, `orders/${cafeId}/${orderId}`);
  await update(orderRef, {
    status,
    updatedAt: Date.now(),
  });
};

/**
 * Subscribes to orders for a specific cafe in real-time
 */
export const subscribeToOrders = (
  cafeId: string,
  onUpdate: (orders: Order[]) => void
) => {
  const ordersRef = ref(rtdb, `orders/${cafeId}`);
  
  const handler = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    if (!data) {
      onUpdate([]);
      return;
    }
    
    // Convert object to array and sort by timestamp
    const ordersList: Order[] = Object.keys(data).map(key => ({
      ...data[key],
      id: key
    })).sort((a, b) => b.createdAt - a.createdAt);
    
    onUpdate(ordersList);
  };

  onValue(ordersRef, handler);
  
  // Return unsubscribe function
  return () => off(ordersRef, "value", handler);
};

/**
 * Subscribes to a single order's status
 */
export const subscribeToOrderStatus = (
  cafeId: string,
  orderId: string,
  onUpdate: (status: OrderStatus) => void
) => {
  const statusRef = ref(rtdb, `orders/${cafeId}/${orderId}/status`);
  
  const handler = (snapshot: DataSnapshot) => {
    const status = snapshot.val();
    if (status) {
      onUpdate(status);
    }
  };

  onValue(statusRef, handler);
  return () => off(statusRef, "value", handler);
};
