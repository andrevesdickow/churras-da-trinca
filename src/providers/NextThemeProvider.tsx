'use client';

import { ThemeProvider } from 'next-themes';

type NextThemeProviderProps = {
  children: React.ReactNode;
}

export function NextThemeProvider({ children }: NextThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  );
}
