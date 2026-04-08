"use client";
import { use } from "react";
import AnalyticsOverview from "@/components/admin/AnalyticsOverview";
import LiveOrderFeed from "@/components/admin/LiveOrderFeed";
import { useOrders } from "@/hooks/useOrders";
import { useAdminStore } from "@/store/useAdminStore";
import { motion } from "framer-motion";

export default function AdminDashboardPage({ params }: { params: Promise<{ cafeId: string }> }) {
  const { cafeId } = use(params);
  
  // Initialize real-time order stream
  useOrders(cafeId);
  const { orders } = useAdminStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Good morning, Café Manager</h1>
        <p className="text-white/40">Here's what's happening at your café today.</p>
      </header>

      <section>
        <AnalyticsOverview />
      </section>

      <section>
        <LiveOrderFeed orders={orders} />
      </section>
    </motion.div>
  );
}
