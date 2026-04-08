export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <span className="font-semibold tracking-wide">Enterprise Admin</span>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
