export type Role = 'admin' | 'staff' | 'customer';

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'served' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Cafe {
  id: string; // The Cafe's unique slug/identifier (e.g., 'blue-tokai-1')
  name: string;
  logoUrl?: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  createdAt: number;
}

export interface MenuItem {
  id: string;
  cafeId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  isVeg?: boolean;
}

export interface Category {
  id: string;
  cafeId: string;
  name: string;
  order: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  cafeId: string;
  tableNumber: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  createdAt: number;
  updatedAt: number;
  doNotDisturb: boolean;
}

export interface ChatRequest {
  id: string;
  cafeId: string;
  tableNumber: string;
  type: 'water' | 'bill' | 'waiter' | 'help';
  status: 'pending' | 'resolved';
  createdAt: number;
  resolvedAt?: number;
}
