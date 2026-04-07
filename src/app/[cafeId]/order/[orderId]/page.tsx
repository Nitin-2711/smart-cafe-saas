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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-[#6C5CE7] border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-400">Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold">Order Not Found</h2>
        <p className="text-zinc-400">The order you are looking for does not exist.</p>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === order.status);
  
  return (
    <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF]" />
        
        <h1 className="text-2xl font-bold mb-2">Order #{order.id.slice(-6).toUpperCase()}</h1>
        <p className="text-zinc-400">Table {order.tableNumber}</p>
        
        <div className="mt-8 text-6xl mb-4 font-mono text-[#00D1FF]">
          ₹{(order.totalAmount * 1.05).toFixed(2)}
        </div>
        
        {order.paymentStatus === 'paid' ? (
          <div className="inline-flex items-center text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Paid via Razorpay
          </div>
        ) : (
          <div className="inline-flex items-center text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full text-sm font-medium">
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
                <div className={`absolute top-10 left-6 w-0.5 h-16 -ml-px ${isCompleted ? 'bg-[#6C5CE7]' : 'bg-white/10'}`} />
              )}
              
              <motion.div 
                initial={false}
                animate={{ opacity: isCompleted ? 1 : 0.5 }}
                className="flex items-center gap-6"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${isCurrent ? 'bg-[#6C5CE7] text-white shadow-[0_0_20px_rgba(108,92,231,0.5)]' : isCompleted ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500 border border-white/10'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold ${isCurrent ? 'text-xl text-white' : 'text-lg text-zinc-300'}`}>{step.label}</h3>
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

      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-bold mb-4">Order Details</h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-zinc-300">{item.quantity}x {item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
