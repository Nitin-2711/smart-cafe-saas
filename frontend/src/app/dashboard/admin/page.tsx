'use client';
import { useOrders } from '@/hooks/useOrders';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  MoreVertical,
  Calendar,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { useMemo } from 'react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const cafeId = 'blue-tokai-1'; 
  const { orders, loading } = useOrders(cafeId);

  // Derived Analytics Data
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, o) => acc + (o.status === 'delivered' ? o.totalAmount : 0), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    
    return { totalRevenue, totalOrders, pendingOrders, avgOrderValue };
  }, [orders]);

  // Simulated daily chart data
  const chartData = [45, 52, 38, 65, 48, 72, 58].map((val, i) => ({
    val, 
    label: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), 'EEE')
  }));

  const maxVal = Math.max(...chartData.map(d => d.val));

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8 lg:p-12 selection:bg-[#6C5CE7]">
      {/* Search & Top Bar */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">Business Overview</h1>
          <p className="text-zinc-500 font-medium">Monitoring <span className="text-white">SmartCafé Terminal Alpha</span> • {format(new Date(), 'MMMM dd, yyyy')}</p>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search reports/orders..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-1 focus:ring-[#6C5CE7] transition-all"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'DELIVERED REVENUE', value: `₹${stats.totalRevenue}`, icon: DollarSign, trend: '+12.5%', color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'TOTAL ORDERS', value: stats.totalOrders, icon: ShoppingBag, trend: '+8.2%', color: 'text-[#6C5CE7]', bg: 'bg-[#6C5CE7]/10' },
          { label: 'PENDING ACTION', value: stats.pendingOrders, icon: Layers, trend: '-2.4%', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'AVG. ORDER VALUE', value: `₹${stats.avgOrderValue}`, icon: TrendingUp, trend: '+4.1%', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-6 transition-transform group-hover:scale-110`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                <span className={`text-xs font-bold mb-1 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-zinc-500'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold mb-1">Growth Forecast</h3>
              <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">Historical order volume trends</p>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
              <Calendar className="w-3 h-3 text-[#6C5CE7]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Last 7 Days</span>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-4 h-[240px] px-4">
            {chartData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="relative w-full flex items-end justify-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.val / maxVal) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'circOut' }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#6C5CE7] to-[#a29bfe] rounded-t-xl group-hover:to-[#00D1FF] transition-all relative"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-black px-2 py-1 rounded transition-opacity">
                      {data.val}
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase">{data.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Orders Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-[3rem] bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex flex-col relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7] flex items-center justify-center shadow-lg shadow-[#6C5CE7]/40">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20 animate-pulse">
                Live
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-black mb-4 tracking-tighter">Real-time <br />Active Feed</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">Currently processing data from <span className="text-white font-bold">4 active tables</span>.</p>
              
              <div className="space-y-4">
                {orders.slice(0, 3).map((o, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6C5CE7]" />
                      <span className="text-xs font-bold">Order #{o.id.slice(-4)}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00D1FF]">₹{o.totalAmount}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-8 w-full py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Launch Agent Support
            </button>
          </div>

          {/* Decorative background glow */}
          <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#6C5CE7]/20 blur-[80px] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
