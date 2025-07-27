'use client';

import { useState, useEffect } from 'react';
import { PageWithConfig } from '@/types/pageConfig';
import { useAuth } from '@/context';
import api from '@/api';
import { useRouter } from 'next/router';
import LocalDjangoNotification from '@/components/LocalDjangoNotification';

// Types for private API products
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: {
    id: number;
    name: string;
    description?: string;
    is_active?: boolean;
  };
  stock?: number;
  created_at: string;
}

const PrivateAPIPage: PageWithConfig = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    fetchProducts();
  }, [isAuthenticated, router]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.private.productsList();
      setProducts(response.data?.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Private API</h1>
          <p className="text-gray-600">
            Access private data from the Django Revolution API (requires authentication)
          </p>
        </div>
      </div>

      {/* Local Django Notification */}
      <div className="container mx-auto px-4 py-4">
        <LocalDjangoNotification />
      </div>

      {/* Error Display */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Refresh Products'
            )}
          </button>
        </div>

        {/* Products */}
        <div>
          {products.length === 0 && !loading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try refreshing the data or check the API connection.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.stock && product.stock > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {product.stock && product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Category: {product.category.name}</span>
                    <span className="font-semibold text-green-600">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PrivateAPIPage.pageConfig = {
  title: 'Private API - Django Revolution',
  description: 'Access private API endpoints for Django Revolution (requires authentication).',
  keywords: 'django revolution private api, authenticated endpoints, secure access',
  ogImage: {
    title: 'Private API',
    subtitle: 'Authenticated API endpoints',
  },
};

export default PrivateAPIPage; 