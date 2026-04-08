'use client';
import { useAppStore } from '@/store/useAppStore';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
// import { createOrder } from '@/services/db';

export default function CartPage() {
  const { cafeId } = useParams();
  const router = useRouter();
  const cart = useAppStore(state => state.cart);
  const updateQuantity = useAppStore(state => state.updateQuantity);
  const removeFromCart = useAppStore(state => state.removeFromCart);
  const getCartTotal = useAppStore(state => state.getCartTotal);
  const clearCart = useAppStore(state => state.clearCart);
  const [tableNo, setTableNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (!tableNo) {
      toast.error('Please enter your table number');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      // MOCK FLOW: By-pass Firebase for UI testing
      // const orderId = await createOrder({ ... });
      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network delay
      const mockOrderId = `ORD-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/${cafeId}/order/${mockOrderId}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center border border-black/5 dark:border-transparent shadow-sm dark:shadow-none">
          <Trash2 className="w-10 h-10 text-slate-400 dark:text-zinc-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
        <Link href={`/${cafeId}`} className="text-[#00D1FF] hover:underline">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
      <Link href={`/${cafeId}`} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Checkout</h1>

      <div className="space-y-6 mb-8">
        {cart.map((item) => (
          <motion.div 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={item.id} 
            className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0">
                {item.imageUrl && (
                   /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-[#00D1FF] font-mono">₹{item.price}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-black/50 rounded-full px-2 py-1">
                <button 
                  onClick={() => {
                    if (item.quantity === 1) removeFromCart(item.id);
                    else updateQuantity(item.id, item.quantity - 1);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium w-4 text-center text-slate-900 dark:text-white">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6C5CE7] hover:bg-[#5b4dcf] transition-colors text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-white/5 shadow-sm dark:shadow-none rounded-3xl p-6 border border-black/5 dark:border-white/10 space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Table Number</label>
          <Input 
            placeholder="e.g. 12" 
            value={tableNo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTableNo(e.target.value)}
            className="bg-slate-50 dark:bg-black/50 border-black/10 dark:border-white/10 h-14 text-xl text-center rounded-xl focus-visible:ring-[#6C5CE7] text-slate-900 dark:text-white"
          />
        </div>

        <div className="h-px bg-black/10 dark:bg-white/10 w-full" />

        <div className="space-y-2 text-sm text-slate-500 dark:text-zinc-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-slate-900 dark:text-white">₹{total}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (5%)</span>
            <span className="text-slate-900 dark:text-white">₹{(total * 0.05).toFixed(2)}</span>
          </div>
        </div>

        <div className="h-px bg-black/10 dark:bg-white/10 w-full" />

        <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white">
          <span>Total To Pay</span>
          <span className="text-[#00D1FF] font-mono">₹{(total * 1.05).toFixed(2)}</span>
        </div>

        <button 
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Pay & Place Order'
          )}
        </button>
      </div>
    </div>
  );
}
