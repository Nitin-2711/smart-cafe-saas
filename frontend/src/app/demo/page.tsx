'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, QrCode, ArrowLeft, Coffee, Utensils, Zap } from 'lucide-react';
import DemoDevice from '@/components/demo/DemoDevice';
import DemoNavbar from '@/components/demo/DemoNavbar';
import DemoMenu from '@/components/demo/DemoMenu';
import DemoCart from '@/components/demo/DemoCart';
import OrderHistory from '@/components/demo/OrderHistory';
import PaymentModal from '@/components/demo/PaymentModal';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { subscribeToOrderStatus } from '@/services/firebase/orders';
import { OrderStatus } from '@/types';

export default function DemoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Scoped per cafe and table from URL
  const cafeId = searchParams.get('cafe') || 'blue-tokai-1';
  const tableId = searchParams.get('table') || '04';

  // Real logic hooks
  const { checkout, getTotal } = useCart();
  const { orders } = useOrders(cafeId);
  
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  // Internal state for UI tracking
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<'idle' | OrderStatus>('idle');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // REAL-TIME STATUS LISTENER
  useEffect(() => {
    if (!activeOrderId) return;

    const unsubscribe = subscribeToOrderStatus(cafeId, activeOrderId, (status) => {
      // Map Firebase status to our UI states if needed, or use directly
      setOrderStatus(status);
    });

    return () => unsubscribe();
  }, [activeOrderId, cafeId]);

  const handlePlaceOrder = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const onPaymentSuccess = async () => {
    setIsPaymentOpen(false);
    try {
      setOrderStatus('pending');
      
      // REAL CHECKOUT
      const orderId = await checkout(cafeId, tableId);
      setActiveOrderId(orderId);
    } catch (error) {
      console.error("Order failed:", error);
      setOrderStatus('idle');
      alert("Failed to place order. Check console.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-8 w-full max-w-xs"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6C5CE7] to-[#00D1FF] flex items-center justify-center shadow-2xl shadow-[#6C5CE7]/20">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Initialising SaaS Experience</span>
              <span className="text-[#6C5CE7] text-lg font-black tracking-tighter">{loadingProgress}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF]"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-[#6C5CE7] overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6C5CE7]/20 blur-[120px] rounded-full" 
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1FF]/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 lg:py-0 min-h-screen flex flex-col items-center lg:flex-row lg:justify-between lg:gap-20 relative z-10">
        
        {/* Left Side: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center lg:text-left mb-16 lg:mb-0"
        >
          <motion.button 
            whileHover={{ x: -4 }}
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-[#6C5CE7] text-[10px] font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3 fill-current" />
            Real-time Order Sync Active
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Next-Gen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] via-[#a29bfe] to-[#00D1FF]">
              Dining SaaS.
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            Scan. Order. Repeat. Experience the seamless real-time synchronization between table {tableId} and the kitchen.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Live Server Connected</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Device Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, cubicBezier: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <DemoDevice>
            <div className="relative h-full flex flex-col">
              <DemoNavbar 
                onCartClick={() => setIsCartOpen(true)} 
                onHistoryClick={() => setIsHistoryOpen(true)}
              />
              
              <div className="flex-1">
                <div className="px-6 py-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <h2 className="text-2xl font-black tracking-tight dark:text-white">Morning, Drinker!</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Table {tableId} • {cafeId === 'blue-tokai-1' ? 'High Ground Café' : 'Cafe ' + cafeId}</p>
                  </motion.div>
                </div>
                
                <DemoMenu />
              </div>

              {/* Real-time Order Status Overlays */}
              <AnimatePresence>
                {orderStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
                  >
                    {orderStatus === 'pending' && (
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-[#6C5CE7]/20 border-t-[#6C5CE7] rounded-full animate-spin mx-auto" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-[#6C5CE7] animate-pulse" />
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-black text-xl tracking-tight uppercase">Placing Order</p>
                          <p className="text-zinc-500 text-xs mt-2">Waiting for kitchen acceptance...</p>
                        </div>
                      </div>
                    )}

                    {orderStatus === 'preparing' && (
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto border border-orange-500/20">
                          <Coffee className="w-10 h-10 text-orange-500 animate-bounce" />
                        </div>
                        <div>
                          <p className="text-orange-500 font-black text-xl tracking-tight uppercase tracking-tighter">Kitchen is Preparing</p>
                          <p className="text-zinc-500 text-xs mt-2">Your specialist is crafting your order</p>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 3 }}
                          />
                        </div>
                      </div>
                    )}

                    {orderStatus === 'ready' && (
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                          <CheckCircle2 className="w-10 h-10 text-green-500 animate-pulse" />
                        </div>
                        <div>
                          <p className="text-green-500 font-black text-xl tracking-tight uppercase italic">Ready for Pickup!</p>
                          <p className="text-zinc-500 text-xs mt-2 italic font-bold">Head to the counter at High Ground</p>
                        </div>
                      </div>
                    )}

                    {orderStatus === 'delivered' && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-8"
                      >
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                          <Utensils className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white mb-2 italic">Enjoy your meal!</h3>
                          <p className="text-zinc-400 text-sm font-medium">Order served at Table {tableId}.</p>
                        </div>
                        <button
                          onClick={() => { setOrderStatus('idle'); setActiveOrderId(null); }}
                          className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                          New Order
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <DemoCart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                onOrderPlace={handlePlaceOrder}
              />

              <OrderHistory 
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                orders={orders.filter(o => o.tableId === tableId)}
              />

              <PaymentModal 
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onSuccess={onPaymentSuccess}
                amount={getTotal()}
              />
            </div>
          </DemoDevice>
          
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-[#6C5CE7]/20 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-[#6C5CE7]/30" />
        </motion.div>

      </div>
    </div>
  );
}
