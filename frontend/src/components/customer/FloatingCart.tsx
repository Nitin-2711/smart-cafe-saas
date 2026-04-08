"use client";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCart() {
  const { items, getTotal } = useCartStore();
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AnimatePresence>
      {totalCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50"
        >
          <div className="bg-orange-500 rounded-2xl p-4 flex items-center justify-between shadow-2xl shadow-orange-500/40 border border-white/20 overflow-hidden relative group cursor-pointer hover:bg-orange-600 transition-colors">
            {/* Ambient Pulse Effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-10 transition-opacity" />
            
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <p className="text-sm font-bold leading-none">{totalCount} Items Added</p>
                <p className="text-xs text-white/70 mt-1">From SmartCafé Menu</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-white">
              <div className="text-right">
                <p className="text-xs text-white/60 uppercase font-bold tracking-wider">Total</p>
                <p className="text-xl font-bold">{formatCurrency(getTotal())}</p>
              </div>
              <div className="bg-white/20 p-1.5 rounded-full">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
