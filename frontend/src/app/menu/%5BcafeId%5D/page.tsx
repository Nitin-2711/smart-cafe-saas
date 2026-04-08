"use client";
import { use, useState, useMemo } from "react";
import { useMenu } from "@/hooks/useMenu";
import { useAdminStore } from "@/store/useAdminStore";
import CustomerMenuItem from "@/components/customer/CustomerMenuItem";
import FloatingCart from "@/components/customer/FloatingCart";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function CustomerMenuPage({ params }: { params: Promise<{ cafeId: string }> }) {
  const { cafeId } = use(params);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Re-using useMenu hook to stream real-time catalog
  useMenu();
  const { menuItems } = useAdminStore();

  const categories = useMemo(() => ["All", ...Array.from(new Set(menuItems.map(i => i.category)))], [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 pb-32">
      {/* Header Section */}
      <header className="mb-10 text-center space-y-4">
        <div className="w-20 h-20 bg-orange-500 rounded-2xl mx-auto shadow-2xl shadow-orange-500/20 flex items-center justify-center font-bold text-3xl">
          SC
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SmartCafé Menu</h1>
          <p className="text-white/40 text-sm">Welcome! Order fresh, eat fresh.</p>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="space-y-6 sticky top-6 z-40">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search our delicious menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 focus:border-orange-500/50 focus:bg-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-white/20"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                activeCategory === cat 
                  ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20 scale-105" 
                  : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="mt-8 space-y-4">
        {filteredItems.map((item) => (
          <CustomerMenuItem key={item.id} item={item} />
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-white/20 font-medium italic">
            No items found matching your criteria.
          </div>
        )}
      </div>

      <FloatingCart />
    </div>
  );
}
