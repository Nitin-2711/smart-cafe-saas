import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Order, ChatRequest, OrderStatus, PaymentStatus } from '@/types';

// Order Functions
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  const ordersRef = collection(db, 'orders');
  const docRef = await addDoc(ordersRef, {
    ...orderData,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return docRef.id;
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: Date.now(),
  });
};

export const updatePaymentStatus = async (orderId: string, paymentStatus: PaymentStatus, paymentId?: string) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    paymentStatus,
    paymentId,
    updatedAt: Date.now(),
  });
};

// Chat Functions
export const createChatRequest = async (requestData: Omit<ChatRequest, 'id' | 'createdAt'>) => {
  const chatRef = collection(db, 'chatRequests');
  const docRef = await addDoc(chatRef, {
    ...requestData,
    createdAt: Date.now(),
  });
  return docRef.id;
};

export const resolveChatRequest = async (requestId: string) => {
  const chatRef = doc(db, 'chatRequests', requestId);
  await updateDoc(chatRef, {
    status: 'resolved',
    resolvedAt: Date.now(),
  });
};
