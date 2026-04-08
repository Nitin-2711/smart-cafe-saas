'use client';
import { useState } from 'react';
import { createChatRequest } from '@/services/db';
import { useAppStore } from '@/store/useAppStore';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { HandPlatter, Droplet, Coffee, Receipt, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const REQUEST_TYPES = [
  { id: 'water', label: 'Water', icon: Droplet, color: 'text-blue-400 bg-blue-400/20' },
  { id: 'waiter', label: 'Call Waiter', icon: HandPlatter, color: 'text-purple-400 bg-purple-400/20' },
  { id: 'help', label: 'Help', icon: Coffee, color: 'text-orange-400 bg-orange-400/20' },
  { id: 'bill', label: 'Bill', icon: Receipt, color: 'text-green-400 bg-green-400/20' },
] as const;

export default function ChatFloatingAction() {
  const { cafeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const tableNumber = useAppStore(state => state.tableNumber);

  const handleRequest = async (type: string) => {
    // If they haven't set a table number, we usually prompt them. In this MVPs we assume they have, or we just use "T-Unknown"
    const currentTable = tableNumber || 'Unknown';
    
    try {
      await createChatRequest({
        cafeId: cafeId as string,
        tableNumber: currentTable,
        type: type as any,
        status: 'pending'
      });
      toast.success(`Request for ${type} sent to staff!`);
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-[#1A1A1E] border border-white/10 rounded-2xl p-2 w-48 shadow-2xl flex flex-col gap-1"
          >
            {REQUEST_TYPES.map((req) => {
              const Icon = req.icon;
              return (
                <button 
                  key={req.id}
                  onClick={() => handleRequest(req.id)}
                  className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-xl transition-colors text-left"
                >
                  <div className={`p-1.5 rounded-lg ${req.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{req.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-[#6C5CE7] to-[#00D1FF] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(108,92,231,0.4)] hover:scale-105 active:scale-95 transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="bell" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <HandPlatter className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
