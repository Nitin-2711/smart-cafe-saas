'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Coffee, CheckCircle2, ChevronRight } from 'lucide-react';
import { Order } from '@/types';
import { format } from 'date-fns';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function OrderHistory({ isOpen, onClose, orders }: OrderHistoryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md z-[150] rounded-[3rem]"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 w-[85%] bg-[#0A0A0B] border-l border-white/10 z-[160] flex flex-col shadow-2xl rounded-r-[3rem]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-white">My Orders</h3>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Previous visits at Table 04</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-600 opacity-50">
                  <Clock className="w-12 h-12 mb-4" />
                  <p className="font-bold text-sm">No order history yet</p>
                </div>
              ) : (
                orders.map((order) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#6C5CE7]/10 flex items-center justify-center">
                          <Coffee className="w-5 h-5 text-[#6C5CE7]" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-white">{format(order.createdAt, 'MMM dd, h:mm a')}</p>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">ID: {order.id.slice(-6)}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        order.status === 'delivered' ? 'bg-green-500/10 text-green-500' : 'bg-[#6C5CE7]/10 text-[#6C5CE7]'
                      }`}>
                        {order.status}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex justify-between text-[11px] font-medium text-zinc-400">
                          <span>{item.quantity}x {item.name}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-[10px] text-zinc-600 font-bold italic">+{order.items.length - 2} more items</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <p className="text-sm font-black text-white">₹{order.totalAmount}</p>
                      <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#6C5CE7] hover:underline">
                        Order Details <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 bg-black/40 border-t border-white/5">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20">
                <CheckCircle2 className="w-5 h-5 text-[#6C5CE7]" />
                <p className="text-[10px] text-zinc-300 font-medium leading-tight">
                  You've earned <span className="text-white font-bold">120 points</span> from your recent visits.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
