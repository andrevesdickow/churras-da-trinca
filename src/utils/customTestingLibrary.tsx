import '../app/global.css';
import React from 'react';
import { ToastContainer } from '@/components/Toast';
import { NextThemeProvider } from '@/providers/NextThemeProvider';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { render } from '@testing-library/react';

const customRender = (ui: React.ReactElement, { ...renderOptions } = {}) => render(
  <NextThemeProvider>
    <TooltipProvider>
      {ui}
      <ToastContainer />
    </TooltipProvider>
  </NextThemeProvider>,
  renderOptions
);

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
