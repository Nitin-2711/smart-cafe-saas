'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

interface DemoCartProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlace: () => void;
}

export default function DemoCart({ isOpen, onClose, onOrderPlace }: DemoCartProps) {
  const { items, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 rounded-[3rem]"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#121214] rounded-t-3xl z-[60] p-6 pb-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Your Order</h3>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="py-12 text-center text-zinc-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-none">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <p className="text-xs text-zinc-500 font-medium">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-lg font-bold">-</button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-lg font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-zinc-500 font-medium">Total Amount</span>
                  <span className="text-xl font-bold">₹{total}</span>
                </div>
                <button
                  onClick={onOrderPlace}
                  className="w-full py-4 bg-[#6C5CE7] hover:bg-[#5b4dcf] text-white rounded-2xl font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-[#6C5CE7]/30"
                >
                  Place Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
