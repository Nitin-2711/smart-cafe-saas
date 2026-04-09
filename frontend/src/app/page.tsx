'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, QrCode, Shield, Zap, BarChart3, ChefHat } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden selection:bg-[#6C5CE7] selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D1FF] flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SmartCafé</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
          <Link href="/demo" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 cursor-pointer">
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <motion.div 
          className="container mx-auto max-w-5xl text-center mt-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
            Privacy-First QR Ordering is Here
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            The future of dining is <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF]">
              silent & seamless.
            </span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Elevate your café with our multi-tenant SaaS. Zero-app-download QR ordering, real-time staff sync, and a privacy-first DND mode for your premium customers.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => router.push('/demo')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6C5CE7] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#5b4dcf] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_#6C5CE7] cursor-pointer"
            >
              View Customer Demo <ArrowRight className="w-4 h-4" />
            </button>
            <Link href="/staff/blue-tokai-1" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-semibold flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              View Staff Panel
            </Link>
          </motion.div>

          {/* Hero Image / Dashboard Mockup */}
          <motion.div 
            variants={itemVariants}
            className="mt-24 relative rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center relative overflow-hidden">
              {/* Fake dashboard UI */}
              <div className="absolute inset-0 p-8 grid grid-cols-3 gap-6 opacity-30 transform transition-transform group-hover:scale-105 duration-700">
                <div className="col-span-2 space-y-6">
                  <div className="h-48 rounded-xl bg-white/5 border border-white/5"></div>
                  <div className="h-64 rounded-xl bg-white/5 border border-white/5"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                </div>
              </div>
              <div className="z-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-[#6C5CE7]/10 flex items-center justify-center mx-auto mb-4 border border-[#6C5CE7]/20">
                  <ChefHat className="w-10 h-10 text-[#6C5CE7]" />
                </div>
                <h3 className="text-2xl font-bold">Premium Dashboard Experience</h3>
                <p className="text-zinc-400 text-sm">Real-time order management & analytics</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="container mx-auto max-w-5xl mt-32" id="features">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, color: '#00D1FF', title: 'Privacy First', desc: 'Unique DND mode allows customers to order silently without waiter interruptions.' },
              { icon: Zap, color: '#6C5CE7', title: 'Real-time Sync', desc: 'Zero-lag Firestore synchronization from table order directly to the kitchen display.' },
              { icon: BarChart3, color: '#00D1FF', title: 'Multi-tenant SaaS', desc: 'Built for scalability. Manage 100+ cafes securely with separate database shards.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 mb-6" style={{ color: feature.color }} />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

