import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ToastContainer } from '@/components/Toast';
import { TooltipProvider } from '@/components/Tooltip';
import { NextThemeProvider } from '@/providers/NextThemeProvider';

const montserrat = Montserrat({ subsets: ['cyrillic'] });
setDefaultOptions({ locale: ptBR });

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
