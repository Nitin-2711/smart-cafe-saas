'use client';
import { useState, useEffect } from 'react';
import { useCafeMenu } from '@/hooks/useRealtime';
import MenuItemCard from './components/MenuItemCard';
import { MenuItem } from '@/types';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';

const MOCK_MENU: MenuItem[] = [
  {
    id: 'm1',
    cafeId: 'blue-tokai-1',
    categoryId: 'c1',
    name: 'Iced Vietnamese Latte',
    description: 'Strong espresso poured over condensed milk and lots of ice.',
    price: 320,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm2',
    cafeId: 'blue-tokai-1',
    categoryId: 'c1',
    name: 'Avocado Sourdough Toast',
    description: 'Smashed avocado, cherry tomatoes, feta cheese, and chili flakes on fresh sourdough.',
    price: 450,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm3',
    cafeId: 'blue-tokai-1',
    categoryId: 'c2',
    name: 'Truffle Mushroom Pasta',
    description: 'Creamy fettuccine with wild mushrooms and white truffle oil essence.',
    price: 550,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm4',
    cafeId: 'blue-tokai-1',
    categoryId: 'c2',
    name: 'Classic Chicken Burger',
    description: 'Crispy fried chicken breast, brioche bun, house sauce, side of fries.',
    price: 480,
    isAvailable: true,
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
  }
];

export default function CustomerMenu() {
  const { cafeId } = useParams();
  const { menu, loading } = useCafeMenu(cafeId as string);
  const [search, setSearch] = useState('');
  
  const displayMenu = menu.length > 0 ? menu : MOCK_MENU;
  
  const filteredMenu = displayMenu.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Our Menu</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <Input 
            placeholder="Search for coffee, pasta, etc..." 
            className="pl-10 bg-white/5 border-white/10 text-white rounded-full h-12 focus-visible:ring-[#6C5CE7]"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item, index) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredMenu.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          <p>No items found matching your search.</p>
        </div>
      )}
    </div>
  );
}
