'use client';
import { motion } from 'framer-motion';

export default function DemoDevice({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[320px] h-[650px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-10 h-1 bg-zinc-700 rounded-full" />
      </div>

      {/* Screen Content */}
      <div className="w-full h-full bg-white dark:bg-[#0A0A0B] overflow-y-auto overflow-x-hidden pt-8 pb-4 scrollbar-none">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-400 dark:bg-zinc-700 rounded-full z-50" />
    </div>
  );
}
