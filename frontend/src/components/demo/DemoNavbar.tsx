'use client';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, History } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface DemoNavbarProps {
  onBack?: () => void;
  onCartClick?: () => void;
  onHistoryClick?: () => void;
}

export default function DemoNavbar({ onBack, onCartClick, onHistoryClick }: DemoNavbarProps) {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-40 border-b border-zinc-100 dark:border-white/5">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg tracking-tight">Blue Tokai</span>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onHistoryClick}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <History className="w-5 h-5 text-zinc-500" />
        </button>
        
        <button 
          onClick={onCartClick}
          className="relative p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          {itemCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 w-4 h-4 bg-[#6C5CE7] text-white text-[10px] flex items-center justify-center rounded-full font-bold"
            >
              {itemCount}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
}
