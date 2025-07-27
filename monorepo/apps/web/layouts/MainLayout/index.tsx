'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../../context';
import { Navigation } from './Navigation';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        {children}
      </div>
    </AuthProvider>
  );
}
