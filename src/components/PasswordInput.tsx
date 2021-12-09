import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { ChangeEvent, useState } from 'react';

const PasswordInput = ({
  id,
  placeholder,
  value,
  onChange,
  className,
  ...rest
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange?: (e: ChangeEvent) => void;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        className={`input input-primary input-bordered !p-4 w-full !pr-12 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <button
        className='btn btn-clear absolute right-0 top-1'
        type='button'
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? (
          <EyeOffIcon className='h-6 w-6' />
        ) : (
          <EyeIcon className='h-6 w-6' />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
