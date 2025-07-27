'use client';

import Link from 'next/link';
import { useAuth } from '../../context';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Django Revolution
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              Home
            </Link>
            <Link
              href="/public"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/public')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              Public API
            </Link>
            <Link
              href="/private"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/private')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              Private API
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user?.display_name?.[0] || user?.username?.[0] || 'U'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.display_name || user?.username}
                    </p>
                    <p className="text-xs text-gray-500">Authenticated</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="btn-danger text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="btn-primary text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-secondary text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 