'use client';
import { useLiveOrders, useLiveChatRequests } from '@/hooks/useRealtime';
import { updateOrderStatus, resolveChatRequest } from '@/services/db';
import { useParams } from 'next/navigation';
import { Order, OrderStatus } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { Check, ChefHat, Clock, Coffee, AlertCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_CONFIG: Record<OrderStatus, { color: string, icon: any }> = {
  pending: { color: 'text-yellow-500 bg-yellow-500/10', icon: Clock },
  accepted: { color: 'text-blue-500 bg-blue-500/10', icon: Check },
  preparing: { color: 'text-purple-500 bg-purple-500/10', icon: ChefHat },
  served: { color: 'text-green-500 bg-green-500/10', icon: Coffee },
  completed: { color: 'text-zinc-500 bg-zinc-500/10', icon: Check },
  cancelled: { color: 'text-red-500 bg-red-500/10', icon: AlertCircle }
};

export default function StaffDashboard() {
  const { cafeId } = useParams();
  const { orders, loading: ordersLoading } = useLiveOrders(cafeId as string);
  const { requests, loading: reqLoading } = useLiveChatRequests(cafeId as string);

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const activeCount = orders.filter(o => ['accepted', 'preparing'].includes(o.status)).length;
  
  if (ordersLoading) {
    return <div className="flex h-full items-center justify-center">Loading live dashboard...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Sidebar for Chat Requests */}
      <div className="col-span-3 border-r border-white/10 pr-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
          <span>Service Requests</span>
          {requests.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{requests.length}</span>
          )}
        </h2>
        
        <div className="space-y-4">
          <AnimatePresence>
            {requests.map(req => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 border border-red-500/30 p-4 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg">Table {req.tableNumber}</span>
                  <span className="text-xs text-zinc-400">
                    {formatDistanceToNow(req.createdAt)} ago
                  </span>
                </div>
                <div className="flex items-center gap-2 text-red-400 capitalize bg-red-500/10 w-fit px-2 py-1 rounded">
                  <MessageCircle className="w-4 h-4" /> {req.type}
                </div>
                <button 
                  onClick={() => resolveChatRequest(req.id)}
                  className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded font-medium transition-colors text-sm"
                >
                  Mark Resolved
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {requests.length === 0 && (
            <p className="text-zinc-500 text-sm text-center pt-10">No pending requests.</p>
          )}
        </div>
      </div>

      {/* Main Order Board */}
      <div className="col-span-9 h-full flex flex-col">
        <Tabs defaultValue="all" className="w-full flex-1 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white/5 border border-white/10 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/20">All Active</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400 relative">
                New
                {pendingCount > 0 && <span className="ml-2 w-2 h-2 rounded-full bg-yellow-400" />}
              </TabsTrigger>
              <TabsTrigger value="preparing" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                Preparing ({activeCount})
              </TabsTrigger>
              <TabsTrigger value="served" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                Served
              </TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-zinc-400">
              Total Today: {orders.length} orders
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            <TabsContent value="all" className="m-0 h-full">
              <OrderGrid orders={orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled')} />
            </TabsContent>
            <TabsContent value="pending" className="m-0 h-full">
              <OrderGrid orders={orders.filter(o => o.status === 'pending')} />
            </TabsContent>
            <TabsContent value="preparing" className="m-0 h-full">
              <OrderGrid orders={orders.filter(o => ['accepted', 'preparing'].includes(o.status))} />
            </TabsContent>
            <TabsContent value="served" className="m-0 h-full">
              <OrderGrid orders={orders.filter(o => o.status === 'served')} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function OrderGrid({ orders }: { orders: Order[] }) {
  if (orders.length === 0) return <div className="flex items-center justify-center h-64 text-zinc-500">No orders in this category.</div>;
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const config = STATUS_CONFIG[order.status];
  const Icon = config.icon;

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-white/5 border rounded-2xl p-5 flex flex-col ${order.doNotDisturb ? 'border-purple-500/50 shadow-[0_0_15px_rgba(108,92,231,0.2)]' : 'border-white/10'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-3xl font-bold font-mono text-white mb-1">T-{order.tableNumber}</h3>
          <p className="text-xs text-zinc-400">Order #{order.id.slice(-5).toUpperCase()}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${config.color}`}>
            <Icon className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{order.status}</span>
          </div>
          {order.doNotDisturb && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/20 uppercase tracking-widest">
              Silent Drop
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 mb-6 space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex gap-3 text-sm">
            <span className="font-mono text-zinc-400">{item.quantity}x</span>
            <span className="text-zinc-200">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex gap-2 w-full pt-4 border-t border-white/5">
        {order.status === 'pending' && (
          <button onClick={() => handleStatusChange('accepted')} className="flex-1 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 py-2 rounded-lg font-medium text-sm transition-colors">Accept</button>
        )}
        {order.status === 'accepted' && (
          <button onClick={() => handleStatusChange('preparing')} className="flex-1 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 py-2 rounded-lg font-medium text-sm transition-colors">Start Prep</button>
        )}
        {order.status === 'preparing' && (
          <button onClick={() => handleStatusChange('served')} className="flex-1 bg-green-500/20 text-green-500 hover:bg-green-500/30 py-2 rounded-lg font-medium text-sm transition-colors">Ready to Serve</button>
        )}
        {order.status === 'served' && (
          <button onClick={() => handleStatusChange('completed')} className="flex-1 bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30 py-2 rounded-lg font-medium text-sm transition-colors">Complete</button>
        )}
      </div>
    </motion.div>
  );
}
