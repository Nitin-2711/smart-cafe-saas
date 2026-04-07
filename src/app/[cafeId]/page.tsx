'use client';
import { useState, useMemo } from 'react';
import { useCafeMenu } from '@/hooks/useRealtime';
import MenuItemCard from './components/MenuItemCard';
import { MenuItem } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';

const CATEGORIES = [
  { id: 'all', name: 'All Menu' },
  { id: 'coffee', name: 'Coffee & Drinks' },
  { id: 'food', name: 'Food & Bites' },
  { id: 'dessert', name: 'Desserts' }
];

const MOCK_MENU: MenuItem[] = [
  {
    id: 'm1',
    cafeId: 'blue-tokai-1',
    categoryId: 'coffee',
    name: 'Iced Vietnamese Latte',
    description: 'Strong espresso poured over condensed milk and lots of ice.',
    price: 320,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm1_2',
    cafeId: 'blue-tokai-1',
    categoryId: 'coffee',
    name: 'Sea Salt Caramel Mocha',
    description: 'Our signature mocha layered with house-made sea salt caramel and dark chocolate.',
    price: 380,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm2',
    cafeId: 'blue-tokai-1',
    categoryId: 'food',
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
    categoryId: 'food',
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
    categoryId: 'food',
    name: 'Classic Chicken Burger',
    description: 'Crispy fried chicken breast, brioche bun, house sauce, side of fries.',
    price: 480,
    isAvailable: true,
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm5',
    cafeId: 'blue-tokai-1',
    categoryId: 'dessert',
    name: 'Basque Cheesecake',
    description: 'Burnt basque style cheesecake with a creamy molten center.',
    price: 350,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm6',
    cafeId: 'blue-tokai-1',
    categoryId: 'dessert',
    name: 'Matcha Tiramisu',
    description: 'Layered mascarpone and matcha-soaked ladyfingers.',
    price: 420,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1571115177098-24c4240e0f20?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm7',
    cafeId: 'blue-tokai-1',
    categoryId: 'food',
    name: 'Butter Croissant',
    description: 'Freshly baked, flaky, buttery French classic.',
    price: 180,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm8',
    cafeId: 'blue-tokai-1',
    categoryId: 'food',
    name: 'Acai Super Bowl',
    description: 'Blended organic acai berries topped with granola, fresh bananas, strawberries, and a drizzle of honey.',
    price: 490,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1496412705862-200634c44243?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm9',
    cafeId: 'blue-tokai-1',
    categoryId: 'food',
    name: 'Neapolitan Margherita Pizza',
    description: 'Wood-fired 11-inch pizza with San Marzano tomatoes, fresh mozzarella, and basil.',
    price: 650,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm10',
    cafeId: 'blue-tokai-1',
    categoryId: 'coffee',
    name: 'Iced Matcha Latte',
    description: 'Premium ceremonial grade matcha steeped in cold milk.',
    price: 380,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1536281140500-7b624405d15a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm11',
    cafeId: 'blue-tokai-1',
    categoryId: 'coffee',
    name: 'Cold Brew 24hr',
    description: 'Our signature blend steeped for 24 hours for a smooth, less acidic taste.',
    price: 280,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm12',
    cafeId: 'blue-tokai-1',
    categoryId: 'coffee',
    name: 'Mango Pineapple Smoothie',
    description: 'Fresh tropical mangoes and pineapples blended with a splash of coconut water.',
    price: 320,
    isAvailable: true,
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600',
  }
];

export default function CustomerMenu() {
  const { cafeId } = useParams();
  // Temporarily bypass useCafeMenu if no DB exists to stop eternal loading
  const menu = MOCK_MENU; // We mock directly for UI demo to fix the flow
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const displayMenu = menu.length > 0 ? menu : MOCK_MENU;
  
  const filteredMenu = useMemo(() => {
    return displayMenu.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [displayMenu, search, activeCategory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Our Menu</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
          <Input 
            placeholder="Search for coffee, pasta, etc..." 
            className="pl-10 bg-white dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-900 dark:text-white rounded-full h-12 focus-visible:ring-[#6C5CE7]"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 py-2 mt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-md' 
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-zinc-300 border border-black/5 dark:border-transparent hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMenu.map((item) => (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              key={item.id}
            >
              <MenuItemCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredMenu.length === 0 && (
        <div className="text-center py-20 text-slate-500 dark:text-zinc-500">
          <p>No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
