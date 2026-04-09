export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

export interface Cafe {
  id: string;
  name: string;
  ownerId: string;
  logoUrl?: string;
  createdAt: any;
}

export interface MenuItem {
  id: string;
  cafeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  cafeId: string;
  tableId?: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  status: OrderStatus;
  totalAmount: number;
  paymentId?: string;
  paymentStatus?: "pending" | "completed" | "failed";
  createdAt: any;
}

export interface Notification {
  id: string;
  cafeId: string;
  message: string;
  read: boolean;
  type: "new_order" | "status_update";
  createdAt: any;
}
