'use client';
import { useParams } from 'next/navigation';
import { useCustomerOrder } from '@/hooks/useRealtime';
import { CheckCircle2, Clock, ChefHat, Coffee, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const STATUS_STEPS = [
  { id: 'pending', label: 'Order Placed', icon: Clock },
  { id: 'accepted', label: 'Accepted', icon: CheckCircle2 },
  { id: 'preparing', label: 'Preparing', icon: ChefHat },
  { id: 'served', label: 'Served', icon: Coffee }
];

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const { order, loading } = useCustomerOrder(orderId as string);

  // Mock order for UI demo purposes if orderId starts with 'ORD-'
  const isMock = typeof orderId === 'string' && orderId.startsWith('ORD-');
  const mockOrder = isMock ? {
    id: orderId,
    tableNumber: '12',
    status: 'pending' as const,
    totalAmount: 320,
    paymentStatus: 'pending' as const,
    items: [
      { name: 'Iced Vietnamese Latte', quantity: 1, price: 320 }
    ]
  } : null;

  const displayOrder = isMock ? mockOrder : order;

  if (loading && !isMock) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-zinc-400">Loading your order...</p>
      </div>
    );
  }

  if (!displayOrder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Not Found</h2>
        <p className="text-slate-500 dark:text-zinc-400">The order you are looking for does not exist.</p>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === displayOrder.status);
  
  return (
    <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF]" />
        
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Order #{displayOrder.id.slice(-6).toUpperCase()}</h1>
        <p className="text-slate-500 dark:text-zinc-400">Table {displayOrder.tableNumber}</p>
        
        <div className="mt-8 text-6xl mb-4 font-mono text-[#00D1FF]">
          ₹{(displayOrder.totalAmount * 1.05).toFixed(2)}
        </div>
        
        {displayOrder.paymentStatus === 'paid' ? (
          <div className="inline-flex items-center text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Paid via Razorpay
          </div>
        ) : (
          <div className="inline-flex items-center text-amber-600 dark:text-yellow-400 bg-amber-100 dark:bg-yellow-400/10 px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4 mr-2" /> Payment Pending
          </div>
        )}
      </div>

      <div className="space-y-8 pl-4">
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = currentStepIndex >= index;
          const isCurrent = currentStepIndex === index;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index !== STATUS_STEPS.length - 1 && (
                <div className={`absolute top-10 left-6 w-0.5 h-16 -ml-px ${isCompleted ? 'bg-[#6C5CE7]' : 'bg-black/10 dark:bg-white/10'}`} />
              )}
              
              <motion.div 
                initial={false}
                animate={{ opacity: isCompleted ? 1 : 0.5 }}
                className="flex items-center gap-6"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${isCurrent ? 'bg-[#6C5CE7] text-white shadow-[0_0_20px_rgba(108,92,231,0.5)]' : isCompleted ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 border border-black/5 dark:border-white/10'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold ${isCurrent ? 'text-xl text-slate-900 dark:text-white' : 'text-lg text-slate-600 dark:text-zinc-300'}`}>{step.label}</h3>
                  {isCurrent && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-[#00D1FF]"
                    >
                      Currently in progress...
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none rounded-2xl p-6">
        <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Order Details</h3>
        <div className="space-y-3">
          {displayOrder.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-zinc-300">{item.quantity}x {item.name}</span>
              <span className="text-slate-900 dark:text-white">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
