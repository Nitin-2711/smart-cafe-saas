'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Search, Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

const CATEGORIES = ['Coffee', 'Brew', 'Snacks', 'Desserts'];

const MENU_ITEMS = [
  { id: '1', name: 'Iced Vietnamese Latte', price: 320, category: 'Coffee', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200', popular: true },
  { id: '2', name: 'Sea Salt Caramel Mocha', price: 380, category: 'Brew', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=200', popular: false },
  { id: '3', name: 'Avocado Sourdough', price: 450, category: 'Snacks', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=200', popular: true },
  { id: '4', name: 'Butter Croissant', price: 180, category: 'Desserts', image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=200', popular: false },
];

export default function DemoMenu() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Coffee');

  const handleAdd = (item: any) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0A0A0B]">
      {/* Search Bar */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search menu..." 
            className="w-full bg-zinc-100 dark:bg-white/5 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#6C5CE7] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-6 overflow-x-auto flex gap-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-[#6C5CE7] text-white' 
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="px-6 grid grid-cols-2 gap-4 pb-10">
        {MENU_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {item.popular && (
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#6C5CE7] text-white flex items-center gap-1">
                <Star className="w-2 h-2 fill-white" />
                <span className="text-[8px] font-bold">Popular</span>
              </div>
            )}
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
              />
            </div>
            <div className="p-3">
              <h4 className="text-[11px] font-bold leading-tight mb-2 h-7 overflow-hidden">{item.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">₹{item.price}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAdd(item)}
                  className={`p-1.5 rounded-full transition-all ${
                    addedId === item.id 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                      : 'bg-[#6C5CE7] text-white hover:bg-[#5b4dcf] shadow-lg shadow-[#6C5CE7]/30'
                  }`}
                >
                  {addedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
