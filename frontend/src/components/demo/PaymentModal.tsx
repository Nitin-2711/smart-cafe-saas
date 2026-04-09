'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Wallet, Smartphone, X } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, amount }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="relative w-full max-w-md bg-[#121214] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-[#2E7D32]/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-[#4CAF50]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4CAF50]">Secure Checkout</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-white">Select Payment</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Methods */}
            <div className="p-8 space-y-4">
              {[
                { name: 'UPI / PhonePe / Google Pay', icon: Smartphone, color: 'text-[#6C5CE7]' },
                { name: 'Credit / Debit Card', icon: CreditCard, color: 'text-blue-500' },
                { name: 'Netbanking / Wallet', icon: Wallet, color: 'text-amber-500' },
              ].map((method, i) => (
                <button
                  key={i}
                  disabled={isProcessing}
                  onClick={handlePay}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#6C5CE7]/50 hover:bg-[#6C5CE7]/5 transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-[#6C5CE7]/10 transition-colors ${method.color}`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">{method.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-8 bg-black/40 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Total Amount</p>
                <p className="text-2xl font-black text-white">₹{amount}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                  alt="Razorpay" 
                  className="h-4 opacity-50 mb-2 invert"
                />
                <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Powering SmartCafé</p>
              </div>
            </div>

            {/* Processing Overlay */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0A0A0B] flex flex-col items-center justify-center p-8 z-50"
                >
                  <div className="w-16 h-16 border-4 border-[#6C5CE7]/20 border-t-[#6C5CE7] rounded-full animate-spin mb-6" />
                  <h4 className="text-xl font-black tracking-tight text-white uppercase">Validating Transaction</h4>
                  <p className="text-zinc-500 text-xs mt-2">Do not refresh this page</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
