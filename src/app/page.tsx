import Link from 'next/link';
import { ArrowRight, QrCode, Shield, Zap, BarChart3, ChefHat } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden selection:bg-[#6C5CE7] selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00D1FF] flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SmartCafé</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
          <Link href="/blue-tokai-1" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse" />
            Privacy-First QR Ordering is Here
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            The future of dining is <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00D1FF]">
              silent & seamless.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Elevate your café with our multi-tenant SaaS. Zero-app-download QR ordering, real-time staff sync, and a privacy-first DND mode for your premium customers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/blue-tokai-1" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6C5CE7] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#5b4dcf] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_#6C5CE7]">
              View Customer Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/staff/blue-tokai-1" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-semibold flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all">
              View Staff Panel
            </Link>
          </div>

          {/* Hero Image / Dashboard Mockup */}
          <div className="mt-24 relative rounded-2xl border border-white/10 bg-black overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center relative">
              {/* Fake dashboard UI */}
              <div className="absolute inset-0 p-8 grid grid-cols-3 gap-6 opacity-50">
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
                <ChefHat className="w-16 h-16 text-[#6C5CE7] mx-auto" />
                <h3 className="text-2xl font-bold">Premium Dashboard Experience</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto max-w-5xl mt-32" id="features">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Shield className="w-10 h-10 text-[#00D1FF] mb-6" />
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-zinc-400 leading-relaxed">Unique DND mode allows customers to order silently without waiter interruptions.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Zap className="w-10 h-10 text-[#6C5CE7] mb-6" />
              <h3 className="text-xl font-semibold mb-3">Real-time Sync</h3>
              <p className="text-zinc-400 leading-relaxed">Zero-lag Firestore synchronization from table order directly to the kitchen display.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <BarChart3 className="w-10 h-10 text-[#00D1FF] mb-6" />
              <h3 className="text-xl font-semibold mb-3">Multi-tenant SaaS</h3>
              <p className="text-zinc-400 leading-relaxed">Built for scalability. Manage 100+ cafes securely with separate database shards.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
