"use client";
import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAdminStore } from "@/store/useAdminStore";
import { useAuthStore } from "@/store/useAuthStore";

export function useMenu() {
  const { cafeId } = useAuthStore();
  const { setMenuItems } = useAdminStore();

  useEffect(() => {
    if (!cafeId) return;

    const menuQuery = query(
      collection(db, "menu"),
      where("cafeId", "==", cafeId)
    );

    const unsubscribe = onSnapshot(menuQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, [cafeId, setMenuItems]);
}
