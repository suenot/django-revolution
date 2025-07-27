import React from 'react';
import { PageWithConfig } from '@/types/pageConfig';
import LoginForm from '@/components/LoginForm';

const LoginPage: PageWithConfig = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

LoginPage.pageConfig = {
  title: 'Login - Django Revolution',
  description: 'Sign in to your Django Revolution account.',
  keywords: 'django revolution login, sign in, authentication',
  ogImage: {
    title: 'Login',
    subtitle: 'Sign in to Django Revolution',
  },
};

export default LoginPage; 