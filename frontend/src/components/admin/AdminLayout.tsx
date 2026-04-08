"use client";
import AdminSidebar from "./AdminSidebar";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { initAuthListener } from "@/store/useAuthStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Initialize Global Listeners
  useEffect(() => {
    initAuthListener();
  }, []);

  useNotifications();

  const { loading, user } = useAuthStore();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-white/20 font-medium italic">Establishing secure connection...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white selection:bg-orange-500/30">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
