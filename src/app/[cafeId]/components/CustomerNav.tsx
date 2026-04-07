'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { useParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function CustomerNav() {
  const { cafeId } = useParams();
  const cart = useAppStore(state => state.cart);
  const doNotDisturb = useAppStore(state => state.doNotDisturb);
  const toggleDND = useAppStore(state => state.toggleDoNotDisturb);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00D1FF] flex items-center justify-center font-bold text-lg">
            S
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-slate-900 dark:text-white">SmartCafé</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 capitalize">{cafeId?.toString().replace(/-/g, ' ')}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-2">
            <Switch id="dnd" checked={doNotDisturb} onCheckedChange={toggleDND} />
            <Label htmlFor="dnd" className="text-sm text-slate-700 dark:text-zinc-300">
              {doNotDisturb ? 'DND Active' : 'Privacy Mode'}
            </Label>
          </div>

          <ThemeToggle />

          <Link href={`/${cafeId}/cart`} className="relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-slate-800 dark:text-zinc-300" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-[#6C5CE7] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
