'use client';
import { MenuItem } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const addToCart = useAppStore(state => state.addToCart);
  const updateQuantity = useAppStore(state => state.updateQuantity);
  const cart = useAppStore(state => state.cart);
  
  const cartItem = cart.find(i => i.id === item.id);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden hover:bg-slate-50 dark:hover:bg-white/10 transition-colors group relative shadow-sm dark:shadow-none"
    >
      {item.imageUrl ? (
        <div className="h-48 w-full bg-zinc-800 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      ) : (
        <div className="h-32 w-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{item.name}</h3>
          {item.isVeg !== undefined && (
            <div className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm ${item.isVeg ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
          )}
        </div>
        
        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">{item.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold font-mono text-slate-800 dark:text-white">₹{item.price}</span>
          
          {cartItem ? (
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/10 rounded-full px-2 py-1">
              <button 
                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-black/50 hover:bg-slate-300 dark:hover:bg-black transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium w-4 text-center">{cartItem.quantity}</span>
              <button 
                onClick={() => addToCart(item)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6C5CE7] hover:bg-[#5b4dcf] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(item)}
              className="px-6 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors active:scale-95"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
