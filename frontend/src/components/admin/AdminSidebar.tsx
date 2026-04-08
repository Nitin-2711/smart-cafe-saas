"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Utensils, ClipboardList, Bell, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Menu", href: "/admin/menu", icon: Utensils },
  { name: "Orders", href: "/admin/orders", icon: ClipboardList },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col p-4 fixed left-0 top-0">
      <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent px-4 py-8">
        SmartCafé
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-white/10 text-white shadow-lg shadow-black/5" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute left-1 w-1 h-6 bg-orange-500 rounded-full" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all mt-auto">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}
