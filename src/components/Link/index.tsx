import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/lib/utils';

type LinkProps = {
  children: React.ReactNode;
  className?: string;
} & NextLinkProps;

export const Link = ({ className, ...rest }: LinkProps) => (
  <NextLink
    className={cn('text-amber-400 hover:text-amber-500 transition-colors', className)}
    {...rest}
  />
);
