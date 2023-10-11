import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Churras da TRINCA',
  description: 'Aqui você encontra os melhores churrascos da firma. Bora participar?'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
