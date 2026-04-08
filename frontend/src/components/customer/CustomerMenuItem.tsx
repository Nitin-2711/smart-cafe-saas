"use client";
import { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerMenuItem({ item }: { item: MenuItem }) {
  const { addItem, updateQuantity, items } = useCartStore();
  const cartItem = items.find(i => i.id === item.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex gap-4 hover:bg-white/10 transition-colors"
    >
      <div className="w-24 h-24 rounded-xl bg-neutral-800 overflow-hidden flex-shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-xs text-center p-2">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-white/40 text-xs line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-orange-400 font-bold">{formatCurrency(item.price)}</span>
          
          <div className="flex items-center gap-3">
            {!cartItem ? (
              <button 
                onClick={() => addItem(item)}
                disabled={!item.isAvailable}
                className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-700 disabled:text-white/20 rounded-full text-xs font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                {item.isAvailable ? "ADD" : "SOLD OUT"}
              </button>
            ) : (
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4 bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
              >
                <button onClick={() => updateQuantity(item.id, -1)} className="text-orange-400 hover:text-orange-500"><Minus className="w-4 h-4" /></button>
                <span className="font-bold text-sm min-w-[12px] text-center">{cartItem.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="text-orange-400 hover:text-orange-500"><Plus className="w-4 h-4" /></button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
