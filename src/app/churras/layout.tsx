'use client';

import { Header } from '@/components/Header';
import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="relative flex items-center gap-4 w-full flex-col px-10 top-40 md:max-w-[1200px] md:m-auto">
        {children}
      </main>
    </QueryClientProvider>
  );
}
