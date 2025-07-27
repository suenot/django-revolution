'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context';
import { loginSchema, type LoginFormData } from '../lib/validations';
import { DjangoErrorHandler } from '@repo/api';
import FormInput from './FormInput';

export default function LoginForm() {
  const { login, error: authError } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur', // Only validate on blur for better performance
  });

  // Handle errors from AuthContext
  useEffect(() => {
    if (authError) {
      try {
        const errorHandler = new DjangoErrorHandler(authError, 'Login failed');
        const fieldErrors = errorHandler.getFieldErrors();

        // Set field-specific errors
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (field === 'email' || field === 'password') {
            setError(field as keyof LoginFormData, {
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
        setApiError(authError);
      }
    }
  }, [authError, setError]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    const success = await login({
      email: data.email,
      password: data.password,
    });

    if (success) {
      router.push('/');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* API Error Display */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Login Error</h3>
                <p className="text-sm text-red-700 mt-1">{apiError}</p>
              </div>
            </div>
          </div>
        )}

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
          placeholder="Enter your password"
          disabled={isLoading}
          autoComplete="current-password"
          error={errors.password?.message}
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
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
} 