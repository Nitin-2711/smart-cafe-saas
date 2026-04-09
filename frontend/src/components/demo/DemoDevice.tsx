'use client';
import { motion } from 'framer-motion';

export default function DemoDevice({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[320px] h-[650px]">
      {/* Device Frame */}
      <div className="absolute inset-0 bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden z-10 transition-transform duration-500">
        
        {/* Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-10 h-1 bg-zinc-700 rounded-full" />
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-white dark:bg-[#0A0A0B] overflow-y-auto overflow-x-hidden pt-8 pb-4 scrollbar-none relative">
          {children}
          
          {/* Glass Reflection */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-20 z-40" />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-zinc-400 dark:bg-zinc-800 rounded-full z-50" />
      </div>

      {/* Side Buttons - Left (Volume) */}
      <div className="absolute left-[-10px] top-24 w-[4px] h-8 bg-zinc-700 rounded-l-md z-0" />
      <div className="absolute left-[-10px] top-36 w-[4px] h-12 bg-zinc-700 rounded-l-md z-0" />
      <div className="absolute left-[-10px] top-52 w-[4px] h-12 bg-zinc-700 rounded-l-md z-0" />

      {/* Side Buttons - Right (Power) */}
      <div className="absolute right-[-10px] top-40 w-[4px] h-16 bg-zinc-700 rounded-r-md z-0" />

      {/* Outer Glow */}
      <div className="absolute inset-[-20px] bg-[#6C5CE7]/10 blur-[40px] rounded-[4rem] z-[-1] animate-pulse" />
    </div>
  );
}
