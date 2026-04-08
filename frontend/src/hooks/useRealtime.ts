import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Order, MenuItem, ChatRequest } from '@/types';

export const useCafeMenu = (cafeId: string) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cafeId) return;

    const q = query(
      collection(db, 'menu'), 
      where('cafeId', '==', cafeId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setMenu(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [cafeId]);

  return { menu, loading };
};

export const useLiveOrders = (cafeId: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cafeId) return;

    const q = query(
      collection(db, 'orders'),
      where('cafeId', '==', cafeId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [cafeId]);

  return { orders, loading };
};

export const useLiveChatRequests = (cafeId: string) => {
  const [requests, setRequests] = useState<ChatRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cafeId) return;

    const q = query(
      collection(db, 'chatRequests'),
      where('cafeId', '==', cafeId),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatRequest[];
      setRequests(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [cafeId]);

  return { requests, loading };
};

export const useCustomerOrder = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const q = query(collection(db, 'orders'), where('__name__', '==', orderId));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setOrder({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Order);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  return { order, loading };
};
