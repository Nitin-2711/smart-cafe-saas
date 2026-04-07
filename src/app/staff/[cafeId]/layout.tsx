export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center font-bold text-xs">
              STAFF
            </div>
            <span className="font-semibold tracking-wide">Command Center</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Sync
            </div>
          </div>
        </div>
      </nav>
      <main className="p-6 h-[calc(100vh-64px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
