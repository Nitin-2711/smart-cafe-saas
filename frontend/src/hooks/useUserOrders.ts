"use client";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { Order } from "@/types";

export function useUserOrders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      setOrders(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching user orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { orders, loading };
}
