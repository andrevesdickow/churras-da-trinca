import * as React from 'react';
import { useController } from 'react-hook-form';
import toString from 'lodash/toString';
import { Check as CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { helperTextClassName } from '../TextField';

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  name: string;
  control: any;
  label?: React.ReactNode | string;
  helperText?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({
  className,
  name,
  control,
  label,
  helperText,
  checked = false,
  ...rest
}, ref) => {
  const { field, fieldState: { invalid, error } } = useController({
    name,
    control,
    defaultValue: checked
  });

  return (
    <div className="flex flex-col mb-2">
      <div className="flex gap-2 items-center">
        <CheckboxPrimitive.Root
          {...field}
          ref={ref}
          id={name}
          name={name}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-amber-300 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-amber-300 data-[state=checked]:text-white dark:border-amber-300 dark:ring-offset-violet-950 dark:focus-visible:ring-violet-300 dark:data-[state=checked]:bg-amber-300 dark:data-[state=checked]:text-white',
            className
          )}
          value={toString(field.value)}
          defaultChecked={checked}
          onCheckedChange={(newChecked) => field.onChange(newChecked)}
          {...rest}
        >
          <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center text-current')}
          >
            <CheckIcon className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor={name}
          className="text-sm text-gray-500 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
      {helperText || invalid && (
        <div className={helperTextClassName({ isInvalid: invalid })} role={invalid ? 'alert' : 'note'}>
          {invalid ? error?.message : helperText}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
