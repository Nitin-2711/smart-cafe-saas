import { create } from 'zustand';
import { CartItem, MenuItem } from '@/types';

interface AppState {
  cart: CartItem[];
  tableNumber: string;
  doNotDisturb: boolean;
  
  // Actions
  setTableNumber: (table: string) => void;
  toggleDoNotDisturb: () => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed
  getCartTotal: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  cart: [],
  tableNumber: '',
  doNotDisturb: false,

  setTableNumber: (table) => set({ tableNumber: table }),
  
  toggleDoNotDisturb: () => set((state) => ({ doNotDisturb: !state.doNotDisturb })),
  
  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    });
  },
  
  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== itemId),
    }));
  },
  
  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }));
  },
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
