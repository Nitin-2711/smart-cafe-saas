"use client";
import { Order, OrderStatus } from "@/types";
import { Check, Clock, Flame, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps: { status: OrderStatus; label: string; icon: any }[] = [
  { status: "pending", label: "Confirmed", icon: Clock },
  { status: "preparing", label: "Preparing", icon: Flame },
  { status: "ready", label: "Ready", icon: Check },
  { status: "served", label: "Served", icon: Utensils },
];

export default function RealTimeOrderTracker({ order }: { order: Order }) {
  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold">Tracking Order</h3>
          <p className="text-white/40 text-xs">#{order.id.slice(-6).toUpperCase()}</p>
        </div>
        <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-[10px] font-bold uppercase tracking-wider">
          Live Updates
        </div>
      </div>

      <div className="relative flex justify-between items-start mb-4">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-white/5 -z-10" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          className="absolute top-5 left-0 h-0.5 bg-orange-500 -z-10 transition-all duration-1000 ease-in-out" 
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex flex-col items-center gap-2 group">
              <motion.div 
                initial={false}
                animate={{ 
                  backgroundColor: isActive ? "#f97316" : isCompleted ? "#f97316" : "#171717",
                  scale: isActive ? 1.2 : 1
                }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  isCompleted ? "border-orange-500" : "border-white/10"
                )}
              >
                {isActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <Icon className={cn("w-5 h-5", isCompleted ? "text-white" : "text-white/20")} />
                )}
              </motion.div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity",
                isCompleted ? "text-orange-400" : "text-white/20"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center text-center space-y-2">
        <p className="text-sm font-medium">
          {order.status === "pending" && "The kitchen has received your order."}
          {order.status === "preparing" && "Chef is hand-tossing your meal right now."}
          {order.status === "ready" && "Your order is ready at the counter!"}
          {order.status === "served" && "Hope you enjoy your meal!"}
        </p>
        <button className="text-orange-400 text-xs font-bold hover:underline">
          Need help with your order?
        </button>
      </div>
    </div>
  );
}
