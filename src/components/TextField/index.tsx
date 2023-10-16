'use client';

import { HTMLInputTypeAttribute, useState } from 'react';
import { type Control, useController } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import toString from 'lodash/toString';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { Button } from '@/components/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/Tooltip';
import { cn } from '@/utils/mergeClassName';

export const helperTextClassName = tv({
  base: 'text-[0.625rem] mt-1',
  variants: {
    isInvalid: {
      true: 'text-orange-500',
      false: 'text-gray-500'
    }
  },
  defaultVariants: {
    isInvalid: false
  }
});

type TextFieldProps = React.ComponentProps<'input'> & {
  name: string;
  control: Control<any>;
  label: React.ReactNode | string;
  withPasswordStrength?: boolean;
  helperText?: string;
}

export const TextField = ({
  name,
  label,
  helperText,
  control,
  className,
  withPasswordStrength = false,
  ...rest
}: TextFieldProps) => {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(rest.type || 'text');

  const { field, fieldState: { invalid, error } } = useController({
    name,
    control,
    defaultValue: rest.value || ''
  });

  function handleChangeType() {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  return (
    <div className={cn('relative z-0 mb-4', className)}>
      <input
        {...field}
        id={name}
        className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 appearance-none dark:border-slate-300 dark:focus:border-amber-400 dark:text-slate-100 focus:outline-none focus:ring-0 focus:border-amber-400 peer"
        role="textbox"
        {...rest}
        type={inputType}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-slate-500 dark:text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>

      {rest.type === 'password' && (
        <div className="absolute h-10 flex items-center right-1 top-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={handleChangeType}
                variant="ghost"
                size="icon"
                aria-label={inputType === 'password' ? 'Mostrar' : 'Ocultar'}
              >
                {inputType === 'password' ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {inputType === 'password' ? 'Mostrar' : 'Ocultar'}
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {(helperText || invalid) && (
        <div className={helperTextClassName({ isInvalid: invalid })} role={invalid ? 'alert' : 'note'}>
          {invalid ? error?.message : helperText}
        </div>
      )}

      {(withPasswordStrength === true && rest.type === 'password') && (
        <PasswordStrengthBar
          password={toString(field.value)}
          shortScoreWord="curta demais"
          scoreWords={['fraca', 'fraca', 'ok', 'boa', 'forte']}
          scoreWordClassName="impo text-[0.625rem] text-slate-500"
        />
      )}
    </div>
  );
};
