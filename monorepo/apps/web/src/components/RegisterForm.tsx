'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context';
import { registerSchema, type RegisterFormData } from '../lib/validations';
import { DjangoErrorHandler } from '@repo/api';
import FormInput from './FormInput';

export default function RegisterForm() {
  const { register: registerUser, error: authError } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      first_name: '',
      last_name: '',
    },
    mode: 'onBlur', // Only validate on blur for better performance
  });

  // Memoize error handling to prevent unnecessary re-renders
  const handleAuthError = useCallback((error: string) => {
    try {
      const errorHandler = new DjangoErrorHandler(error, 'Registration failed');
      const fieldErrors = errorHandler.getFieldErrors();

      // Set field-specific errors
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (field in registerSchema.shape) {
          setError(field as keyof RegisterFormData, {
            type: 'server',
            message: Array.isArray(messages) ? messages[0] : String(messages),
          });
        }
      });

      // If no field errors, show general error
      if (Object.keys(fieldErrors).length === 0) {
        setApiError(errorHandler.getMessage());
      }
    } catch {
      // If can't parse as Django error, show as is
      setApiError(error);
    }
  }, [setError]);

  // Handle errors from AuthContext with debounce
  useEffect(() => {
    if (authError) {
      const timeoutId = setTimeout(() => {
        handleAuthError(authError);
      }, 100); // Small debounce to prevent rapid updates

      return () => clearTimeout(timeoutId);
    }
  }, [authError, handleAuthError]);

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null); // Clear previous errors

    const success = await registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirm: data.password_confirm,
      first_name: data.first_name,
      last_name: data.last_name,
    });

    if (success) {
      router.push('/');
    }

    setIsLoading(false);
  }, [registerUser, router]);

  // Memoize error display to prevent unnecessary re-renders
  const errorDisplay = useMemo(() => {
    if (!apiError) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Registration Error</h3>
            <p className="text-sm text-red-700 mt-1">{apiError}</p>
          </div>
        </div>
      </div>
    );
  }, [apiError]);

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* API Error Display */}
        {errorDisplay}

        {/* First Name Field */}
        <FormInput
          {...register('first_name')}
          label="First Name"
          type="text"
          id="first_name"
          placeholder="Enter your first name"
          disabled={isLoading}
          autoComplete="given-name"
          error={errors.first_name?.message}
        />

        {/* Last Name Field */}
        <FormInput
          {...register('last_name')}
          label="Last Name"
          type="text"
          id="last_name"
          placeholder="Enter your last name"
          disabled={isLoading}
          autoComplete="family-name"
          error={errors.last_name?.message}
        />

        {/* Username Field */}
        <FormInput
          {...register('username')}
          label="Username"
          type="text"
          id="username"
          placeholder="Choose a username"
          disabled={isLoading}
          autoComplete="username"
          error={errors.username?.message}
        />

        {/* Email Field */}
        <FormInput
          {...register('email')}
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          disabled={isLoading}
          autoComplete="email"
          error={errors.email?.message}
        />

        {/* Password Field */}
        <FormInput
          {...register('password')}
          label="Password"
          type="password"
          id="password"
          placeholder="Create a password"
          disabled={isLoading}
          autoComplete="new-password"
          error={errors.password?.message}
        />

        {/* Confirm Password Field */}
        <FormInput
          {...register('password_confirm')}
          label="Confirm Password"
          type="password"
          id="password_confirm"
          placeholder="Confirm your password"
          disabled={isLoading}
          autoComplete="new-password"
          error={errors.password_confirm?.message}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
} 