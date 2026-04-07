'use client';
import { BarChart3, Users, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';

const STATS = [
  { label: 'Total Revenue', value: '₹142,390', icon: DollarSign, trend: '+14%' },
  { label: 'Total Orders', value: '842', icon: BarChart3, trend: '+8%' },
  { label: 'Active Tables', value: '24', icon: Users, trend: '+2%' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-zinc-400">Your SaaS performance across 12 managed cafes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D1FF]/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150" />
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-black/50 border border-white/5 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#00D1FF]" />
                </div>
                <div className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded text-sm font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 flex flex-col">
          <h3 className="font-bold mb-6">Revenue Chart</h3>
          <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4 border-b border-l border-white/10 relative">
            {/* Fake chart bars */}
            {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="w-12 bg-gradient-to-t from-[#6C5CE7] to-[#00D1FF] rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mt-4 px-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
           <h3 className="font-bold mb-6">Recent Deployments / Top Cafes</h3>
           <div className="space-y-4 relative z-10">
             {[
               { name: 'Blue Tokai', rev: '₹45K' },
               { name: 'Third Wave', rev: '₹38K' },
               { name: 'Starbucks Indiranagar', rev: '₹29K' },
               { name: 'Hole in the Wall', rev: '₹22K' },
             ].map((cafe, i) => (
               <div key={i} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                 <div className="font-medium">{cafe.name}</div>
                 <div className="flex items-center gap-4">
                   <span className="text-[#00D1FF] font-mono">{cafe.rev}</span>
                   <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
