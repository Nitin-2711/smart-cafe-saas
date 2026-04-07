import CustomerNav from './components/CustomerNav';
import ChatFloatingAction from './components/ChatFloatingAction';

export default function CafeCustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0A0A0B] dark:text-white transition-colors duration-300">
      <CustomerNav />
      <main className="pt-20 pb-24 container mx-auto px-4">
        {children}
      </main>
      <ChatFloatingAction />
    </div>
  );
}
