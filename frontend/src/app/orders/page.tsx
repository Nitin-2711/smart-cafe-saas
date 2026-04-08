"use client";
import { useUserOrders } from "@/hooks/useUserOrders";
import RealTimeOrderTracker from "@/components/customer/RealTimeOrderTracker";
import { formatCurrency } from "@/lib/utils";
import { FileText, ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { generateReceiptPDF } from "@/services/receiptService";

export default function OrderHistoryPage() {
  const { orders, loading } = useUserOrders();

  const activeOrder = orders.find(o => ["pending", "preparing", "ready"].includes(o.status));
  const pastOrders = orders.filter(o => !["pending", "preparing", "ready"].includes(o.status));

  if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white/20 italic">Loading your history...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <p className="text-white/40">Track and manage your café visits.</p>
      </header>

      {/* Active Tracking */}
      {activeOrder && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Active Order</h2>
          <RealTimeOrderTracker order={activeOrder} />
        </section>
      )}

      {/* Past Orders */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">History</h2>
        <div className="space-y-3">
          {pastOrders.map((order) => (
            <motion.div
              layout
              key={order.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-xl text-white/40">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Order #{order.id.slice(-6).toUpperCase()}</h3>
                  <p className="text-[10px] text-white/40">
                    {order.createdAt ? format(order.createdAt.toMillis(), "MMM dd, yyyy • hh:mm a") : "Just now"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold">{formatCurrency(order.totalAmount)}</p>
                  <p className="text-[10px] text-neutral-500 capitalize">{order.status}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    generateReceiptPDF(order);
                  }}
                  className="p-2 bg-white/5 hover:bg-white/20 rounded-lg transition-colors group/btn"
                >
                  <Download className="w-4 h-4 text-white/40 group-hover/btn:text-orange-400" />
                </button>
              </div>
            </motion.div>
          ))}

          {pastOrders.length === 0 && !activeOrder && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl text-white/10">
              Your history is empty. Time to order something delicious!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
