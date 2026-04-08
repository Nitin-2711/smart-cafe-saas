"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { MenuItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuManager({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [isAdding, setIsAdding] = useState(false);

  const toggleAvailability = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
    // In production, update Firestore here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Menu Management</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group"
            >
              <div className="h-40 bg-neutral-800 relative">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-white/20"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-2 bg-red-500/50 backdrop-blur-md rounded-lg hover:bg-red-500/80"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-white/40 text-sm line-clamp-1">{item.description}</p>
                  </div>
                  <span className="text-orange-400 font-bold">{formatCurrency(item.price)}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded bg-white/5 border border-white/5">
                    {item.category}
                  </div>
                  <button 
                    onClick={() => toggleAvailability(item.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold transition-all",
                      item.isAvailable 
                        ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                    )}
                  >
                    {item.isAvailable ? "Available" : "Sold Out"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper to avoid build error before cn is available globally
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
