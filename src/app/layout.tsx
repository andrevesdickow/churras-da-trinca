import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from '@/components/Toast';
import { TooltipProvider } from '@/components/Tooltip';
import { NextThemeProvider } from '@/providers/NextThemeProvider';

const montserrat = Montserrat({ subsets: ['cyrillic'] });

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
    <html suppressHydrationWarning lang="pt-BR">
      <body className={montserrat.className}>
        <NextThemeProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <ToastContainer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
