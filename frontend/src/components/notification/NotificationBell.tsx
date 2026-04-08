"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <div className="relative cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors">
      <Bell className="w-6 h-6 text-white/80" />
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-[10px] flex items-center justify-center border-2 border-neutral-950 font-bold"
          >
            {unreadCount}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
