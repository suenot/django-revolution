import React from 'react';
import { PageWithConfig } from '@/types/pageConfig';
import RegisterForm from '@/components/RegisterForm';

const RegisterPage: PageWithConfig = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

RegisterPage.pageConfig = {
  title: 'Register - Django Revolution',
  description: 'Create a new Django Revolution account.',
  keywords: 'django revolution register, sign up, create account',
  ogImage: {
    title: 'Register',
    subtitle: 'Create your Django Revolution account',
  },
};

export default RegisterPage; 