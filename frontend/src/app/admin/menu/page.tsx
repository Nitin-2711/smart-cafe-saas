"use client";
import MenuManager from "@/components/admin/MenuManager";
import { useMenu } from "@/hooks/useMenu";
import { useAdminStore } from "@/store/useAdminStore";
import { motion } from "framer-motion";

export default function AdminMenuPage() {
  useMenu();
  const { menuItems } = useAdminStore();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-white/40">Organize your offerings and manage item availability.</p>
        </div>
      </header>

      <section>
        <MenuManager initialItems={menuItems} />
      </section>
    </motion.div>
  );
}
