'use client';

import { forwardRef, memo } from 'react';
import { useForm } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: ReturnType<typeof useForm>['register']; // Using ReturnType to get the actual type from react-hook-form
}

const FormInput = memo(forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, register, className = '', ...props }, ref) => {
    const inputClasses = `input-field ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''} ${className}`;

    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          ref={ref}
          {...register}
          {...props}
          className={inputClasses}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
));

FormInput.displayName = 'FormInput';

export default FormInput; 