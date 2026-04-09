'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

const MENU_ITEMS = [
  { id: '1', name: 'Iced Vietnamese Latte', price: 320, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Sea Salt Caramel Mocha', price: 380, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Avocado Sourdough', price: 450, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=200' },
  { id: '4', name: 'Butter Croissant', price: 180, image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=200' },
];

export default function DemoMenu() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (item: any) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {MENU_ITEMS.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-white dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 overflow-hidden hover:shadow-xl transition-all"
        >
          <div className="aspect-square overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
          <div className="p-3">
            <h4 className="text-xs font-bold leading-tight mb-1 truncate">{item.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#6C5CE7]">₹{item.price}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAdd(item)}
                className={`p-1.5 rounded-full transition-colors ${
                  addedId === item.id 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#6C5CE7] text-white hover:bg-[#5b4dcf]'
                }`}
              >
                {addedId === item.id ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
