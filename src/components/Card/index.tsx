import { cn } from '@/lib/utils';

/**
 * Component Composition Pattern
 */

type CardProps = React.ComponentProps<'div'>;

type CardHeaderProps = React.ComponentProps<'div'>;

type CardTitleProps = React.ComponentProps<'h2'>;

type CardSubtitleProps = React.ComponentProps<'h5'>;

type CardBodyProps = React.ComponentProps<'div'>;

const Card = ({ className, ...rest }: CardProps) => (
  <div
    className={cn('w-full h-full min-h-[160px] text-slate-800 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 flex flex-col justify-between gap-6 p-6 rounded-lg shadow-xl', className)}
    {...rest}
  />
);

const CardHeader = ({ className, ...rest }: CardHeaderProps) => (
  <div
    className={cn('flex flex-col', className)}
    {...rest}
  />
);

const CardTitle = ({ className, ...rest }: CardTitleProps) => (
  <h2
    className={cn('text-2xl font-bold', className)}
    {...rest}
  />
);

const CardSubtitle = ({ className, ...rest }: CardSubtitleProps) => (
  <h5
    className={cn('text-lg font-semibold', className)}
    {...rest}
  />
);

const CardBody = ({ className, ...rest }: CardBodyProps) => (
  <div
    className={cn('flex justify-between', className)}
    {...rest}
  />
);

export { Card, CardHeader, CardTitle, CardSubtitle, CardBody };
