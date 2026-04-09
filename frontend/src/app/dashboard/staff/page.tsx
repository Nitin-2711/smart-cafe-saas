'use client';
import { useOrders } from '@/hooks/useOrders';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Play, 
  Check, 
  Users, 
  ChefHat,
  Monitor
} from 'lucide-react';
import { OrderStatus } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export default function StaffDashboard() {
  // In a real app, this would come from auth context or URL
  const cafeId = 'blue-tokai-1'; 
  const { orders, loading, updateOrderStatus } = useOrders(cafeId);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'preparing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'ready': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6 md:p-10 selection:bg-[#6C5CE7]">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#00D1FF] flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Kitchen Dashboard</h1>
          </div>
          <p className="text-zinc-500 font-medium">Real-time KDS Management • High Ground Café</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Monitor className="w-5 h-5 text-[#00D1FF]" />
            <div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Kitchen Status</p>
              <p className="text-sm font-bold">Online & Syncing</p>
            </div>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-[#6C5CE7] flex items-center gap-3 shadow-lg shadow-[#6C5CE7]/20">
            <ShoppingBag className="w-5 h-5 text-white" />
            <div className="text-white text-right">
              <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider">Active Orders</p>
              <p className="text-lg font-black leading-none">{activeOrders.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-[#6C5CE7]/20 border-t-[#6C5CE7] rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium animate-pulse">Connecting to live feed...</p>
        </div>
      ) : activeOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-white/5 rounded-[3rem]">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-zinc-700" />
          </div>
          <h2 className="text-2xl font-bold mb-2">All Clear!</h2>
          <p className="text-zinc-500 max-w-xs">New orders will appear here automatically in real-time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {activeOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col group hover:border-white/20 transition-all"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-bold">{formatDistanceToNow(order.createdAt)} ago</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter">Table {order.tableId}</h3>
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">ID: {order.id.slice(-6)}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end text-[#00D1FF] mb-1">
                        <Users className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Customer</span>
                      </div>
                      <p className="text-sm font-bold">Standard Order</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 p-6 space-y-4 max-h-[300px] overflow-y-auto scrollbar-none">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-[#6C5CE7]/20 text-[#6C5CE7] flex items-center justify-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <p className="text-sm font-bold text-zinc-200">{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Controls */}
                <div className="p-6 bg-white/[0.02] border-t border-white/10 space-y-3">
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="w-full py-4 bg-[#6C5CE7] hover:bg-[#5b4dcf] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#6C5CE7]/20"
                    >
                      <Play className="w-4 h-4 fill-current" /> Start Preparing
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-green-500/20"
                    >
                      <Check className="w-4 h-4" /> Ready for Pickup
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="w-full py-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Mark as Served
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
