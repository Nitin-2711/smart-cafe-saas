"use client";
import { useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAdminStore } from "@/store/useAdminStore";

export function useOrders(cafeId: string | null) {
  const { setOrders } = useAdminStore();

  useEffect(() => {
    if (!cafeId) return;

    const ordersQuery = query(
      collection(db, "orders"),
      where("cafeId", "==", cafeId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      
      setOrders(orders);
    }, (error) => {
      console.error("Error fetching orders:", error);
    });

    return () => unsubscribe();
  }, [cafeId, setOrders]);
}
