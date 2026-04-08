import { create } from "zustand";
import { MenuItem, Order } from "@/types";

interface AdminState {
  menuItems: MenuItem[];
  orders: Order[];
  setMenuItems: (items: MenuItem[]) => void;
  setOrders: (orders: Order[]) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  menuItems: [],
  orders: [],
  setMenuItems: (menuItems) => set({ menuItems }),
  setOrders: (orders) => set({ orders }),
  updateOrderStatus: (orderId, status) => 
    set((state) => ({
      orders: state.orders.map((o) => 
        o.id === orderId ? { ...o, status: status as any } : o
      )
    })),
}));
