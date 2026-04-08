"use client";
import { Order, OrderStatus } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Clock, CheckCircle2, Flame, UtensilsCrossed } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const statusMap: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", icon: Clock },
  preparing: { label: "Preparing", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Flame },
  ready: { label: "Ready", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle2 },
  served: { label: "Served", color: "text-neutral-400 bg-neutral-400/10 border-neutral-400/20", icon: UtensilsCrossed },
  cancelled: { label: "Cancelled", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: Clock },
};

export default function LiveOrderFeed({ orders }: { orders: Order[] }) {
  const updateStatus = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: nextStatus,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
          Live Orders
        </h2>
        <div className="flex gap-2">
          {["pending", "preparing", "ready"].map((s) => (
            <span key={s} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-white/40">
              {orders.filter(o => o.status === s).length} {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {orders.map((order) => {
            const StatusIcon = statusMap[order.status].icon;
            
            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 group hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-white/40">#{order.id.slice(-6).toUpperCase()}</span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", statusMap[order.status].color)}>
                        {statusMap[order.status].label}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">Table {order.tableId || "T1"}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-bold">{formatCurrency(order.totalAmount)}</p>
                    <p className="text-[10px] text-white/40">3 mins ago</p>
                  </div>
                </div>

                <div className="space-y-2 border-y border-white/5 py-3 my-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white/80">
                        <span className="font-bold text-orange-400/80">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="text-white/40">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 justify-end">
                  {order.status === "pending" && (
                    <button 
                      onClick={() => updateStatus(order.id, "preparing")}
                      className="text-xs font-bold px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button 
                      onClick={() => updateStatus(order.id, "ready")}
                      className="text-xs font-bold px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                    >
                      Mark as Ready
                    </button>
                  )}
                  {order.status === "ready" && (
                    <button 
                      onClick={() => updateStatus(order.id, "served")}
                      className="text-xs font-bold px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                    >
                      Served
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
