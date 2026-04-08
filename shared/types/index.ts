export type OrderStatus = 'pending' | 'accepted' | 'ready' | 'delivered' | 'cancelled';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  cafeId: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  cafeId: string;
  tableId?: string;
  items: OrderItem[];
  totalAmount: number;
  paymentId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
}

export interface Cafe {
  id: string;
  name: string;
  ownerId: string;
  logo?: string;
  address: string;
  settings: {
    currency: string;
    isAcceptingOrders: boolean;
    dndMode: boolean; // Privacy-first "Do Not Disturb"
  };
}
