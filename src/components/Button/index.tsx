import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-3xl text-sm font-medium uppercase ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-violet-950 dark:focus-visible:ring-violet-300',
  {
    variants: {
      variant: {
        default: 'bg-slate-950 text-white hover:bg-slate-950/90 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-950/50',
        outline: 'border border-slate-950 bg-transparent text-slate-950 hover:bg-amber-100 dark:border-slate-950 dark:bg-transparent dark:hover:bg-amber-100',
        ghost: 'bg-transparent text-slate-950 hover:bg-amber-100 dark:bg-transparent dark:text-slate-300 dark:hover:bg-amber-400 dark:hover:text-slate-950',
        link: 'bg-transparent text-slate-950 hover:underline dark:bg-transparent dark:text-slate-950'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-8 w-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, variant, size, asChild = false, isLoading = false, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      >
        {children}
        {isLoading && <Loader className="h-4 w-4 animate-spin" />}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
