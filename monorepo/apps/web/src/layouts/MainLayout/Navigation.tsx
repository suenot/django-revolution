'use client';

import Link from 'next/link';
import { useAuth } from '@/context';
import { usePathname } from 'next/navigation';
import { config } from '@/core/settings';

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="w-full px-4">
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
              href="/docs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/docs')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              Documentation
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
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              About
            </Link>
            <Link
              href="/support"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/support')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              Support
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {/* GitHub Link */}
            <a
              href={config.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              title="View on GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
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
                  href="/auth"
                  className="btn-primary text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
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