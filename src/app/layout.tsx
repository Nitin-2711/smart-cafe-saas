import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartCafé | Privacy-First QR Ordering SaaS',
  description: 'The future of dining is silent and seamless. Premium QR ordering SaaS for high-end cafes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased`}>
        {children}
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}
