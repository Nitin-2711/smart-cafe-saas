'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle2, QrCode, ArrowLeft } from 'lucide-react';
import DemoDevice from '@/components/demo/DemoDevice';
import DemoNavbar from '@/components/demo/DemoNavbar';
import DemoMenu from '@/components/demo/DemoMenu';
import DemoCart from '@/components/demo/DemoCart';
import { useCartStore } from '@/store/useCartStore';

export default function DemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'placing' | 'success'>('idle');
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Simulate premium loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePlaceOrder = () => {
    setOrderStatus('placing');
    setIsCartOpen(false);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderStatus('success');
      clearCart();
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#00D1FF] flex items-center justify-center animate-pulse">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-white font-bold tracking-tight text-xl">SmartCafé</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                />
              ))}
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6C5CE7]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1FF]/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-12 min-h-screen flex flex-col items-center lg:flex-row lg:justify-between lg:gap-20">
        
        {/* Left Side: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center lg:text-left mb-16 lg:mb-0"
        >
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            The future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF]">
              café interaction.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Experience the seamless flow of SmartCafé. Scan, order, and pay without ever leaving your seat. No apps, no friction.
          </p>
          
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0">
            {[
              { label: 'Avg. Order Time', val: '45s' },
              { label: 'Customer Satisfaction', val: '99%' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-zinc-500 text-xs font-medium mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.val}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Device Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <DemoDevice>
            <div className="relative h-full flex flex-col">
              <DemoNavbar 
                onCartClick={() => setIsCartOpen(true)} 
              />
              
              <div className="flex-1">
                <div className="px-6 py-4">
                  <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                  <p className="text-xs text-zinc-500 font-medium">Table No: 04 • High Ground Café</p>
                </div>
                
                <DemoMenu />
              </div>

              {/* Order Success Overlay */}
              <AnimatePresence>
                {orderStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[100] bg-[#6C5CE7] flex flex-col items-center justify-center p-8 text-center"
                  >
                    {orderStatus === 'placing' ? (
                      <div className="space-y-4">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        <p className="text-white font-bold">Placing Order...</p>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6"
                      >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                          <CheckCircle2 className="w-12 h-12 text-[#6C5CE7]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
                          <p className="text-white/80 text-sm">Your coffee is being prepared.</p>
                        </div>
                        <button
                          onClick={() => setOrderStatus('idle')}
                          className="px-6 py-2 bg-white text-[#6C5CE7] rounded-full font-bold text-sm"
                        >
                          Back to Menu
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
            </div>
          </DemoDevice>
          
          {/* Blur shadow for device */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-[#6C5CE7]/30 blur-[60px] rounded-full pointer-events-none" />
        </motion.div>

      </div>
    </div>
  );
}
