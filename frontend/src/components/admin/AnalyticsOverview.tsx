"use client";
import { TrendingUp, Users, DollarSign, ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const stats = [
  { label: "Total Revenue", value: 124500, icon: DollarSign, trend: "+12.5%", color: "text-green-400" },
  { label: "Active Orders", value: 14, icon: ShoppingBag, trend: "+2 now", color: "text-orange-400" },
  { label: "Total Customers", value: 842, icon: Users, trend: "+4.2%", color: "text-blue-400" },
  { label: "Avg. Ticket Size", value: 148, icon: TrendingUp, trend: "-1.2%", color: "text-purple-400" },
];

export default function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <span className={cn("text-xs font-bold px-2 py-1 rounded bg-white/5", 
              stat.trend.startsWith("+") ? "text-green-400" : "text-red-400"
            )}>
              {stat.trend}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-white/40 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold">
              {stat.label.includes("Revenue") ? formatCurrency(stat.value) : stat.value.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
