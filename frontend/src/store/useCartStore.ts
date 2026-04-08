"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cafeId: string | null;
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cafeId: null,
      items: [],
      addItem: (newItem) => {
        const items = get().items;
        const existing = items.find((i) => i.id === newItem.id);
        
        if (existing) {
          set({
            items: items.map((i) => 
              i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          });
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }] });
        }
      },
      removeItem: (id) => set({
        items: get().items.filter((i) => i.id !== id)
      }),
      updateQuantity: (id, delta) => {
        const items = get().items;
        set({
          items: items.map((i) => 
            i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
          ).filter(i => i.quantity > 0)
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    }),
    {
      name: "smart-cafe-cart",
    }
  )
);
