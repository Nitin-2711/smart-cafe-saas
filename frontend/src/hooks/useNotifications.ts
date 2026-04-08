"use client";
import { useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useAdminStore } from "@/store/useAdminStore";

export function useNotifications() {
  const { cafeId } = useAuthStore();
  const { updateOrderStatus } = useAdminStore();

  useEffect(() => {
    if (!cafeId) return;

    // Listen for new orders
    const ordersQuery = query(
      collection(db, "orders"),
      where("cafeId", "==", cafeId),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const order = change.doc.data();
          // Avoid triggering on initial load of historical orders
          if (Date.now() - order.createdAt.toMillis() < 5000) {
            toast.success("New Order Received!", {
              description: `Order #${change.doc.id.slice(-6)} for ${order.totalAmount}`,
            });
            // Play sound notification if needed
          }
        }
      });
    });

    return () => {
      unsubscribeOrders();
    };
  }, [cafeId]);
}
