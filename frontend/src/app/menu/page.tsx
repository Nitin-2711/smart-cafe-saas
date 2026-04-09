'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MenuRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tableId = searchParams.get('table') || '04';
    const cafeId = searchParams.get('cafe') || 'blue-tokai-1';
    
    // Redirect to the premium demo page with the context
    router.replace(`/demo?cafe=${cafeId}&table=${tableId}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#6C5CE7]/20 border-t-[#6C5CE7] rounded-full animate-spin" />
    </div>
  );
}
