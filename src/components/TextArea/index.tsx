'use client';

import { useController } from 'react-hook-form';
import { helperTextClassName } from '../TextField';

type TextAreaProps = {
  name: string;
  control: any;
  label: React.ReactNode | string;
  helperText?: string;
} & React.ComponentProps<'textarea'>

export const TextArea = ({
  name,
  label,
  helperText,
  control,
  ...rest
}: TextAreaProps) => {
  const { field, fieldState: { invalid, error } } = useController({
    name,
    control,
    defaultValue: rest.value || ''
  });

  return (
    <div className="relative z-0 mb-4">
      <textarea
        {...field}
        id={name}
        className="block py-2.5 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 border-slate-500 appearance-none dark:border-slate-300 dark:focus:border-amber-400 dark:text-slate-100 focus:outline-none focus:ring-0 focus:border-amber-400 peer"
        {...rest}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-slate-500 dark:text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-400 peer-focus:dark:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>

      {(helperText || invalid) && (
        <div className={helperTextClassName({ isInvalid: invalid })} role={invalid ? 'alert' : 'note'}>
          {invalid ? error?.message : helperText}
        </div>
      )}
    </div>
  );
};
