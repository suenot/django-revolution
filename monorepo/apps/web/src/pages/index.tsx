'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context';
import api from '@/api';
import { Post } from '@/api/types';
import Link from 'next/link';
import { PageWithConfig } from '@/types/pageConfig';
import { MdxViewer } from '@/modules/mdx-renderer';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { GetStaticProps } from 'next';
import { loadMdxDocs } from '@/utils/mdx';
import path from 'path';

export const getStaticProps: GetStaticProps = async () => {
  const docsDir = path.join(process.cwd(), 'src/mdx');
  const documentation = await loadMdxDocs(docsDir);

  return {
    props: {
      documentation,
    },
  };
};

interface HomePageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const Home: PageWithConfig<HomePageProps> = ({ documentation }) => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const homeMdxSource = documentation['home'];

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.public.apiPublicApiPostsList();
      setPosts(response.data?.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Django Revolution
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Zero-config TypeScript & Python client generator for Django REST Framework
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs" className="btn-primary">
                View Documentation
              </Link>
              <Link href="/public" className="btn-secondary">
                Explore Public API
              </Link>
              {isAuthenticated ? (
                <Link href="/private" className="btn-secondary">
                  Access Private API
                </Link>
              ) : (
                <Link href="/auth" className="btn-secondary">
                  Login to Access Private API
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      {isAuthenticated && (
        <div className="container mx-auto px-4 py-8">
          <div className="card bg-primary-50 border-primary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.display_name?.[0] || user?.username?.[0] || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome back, {user?.display_name || user?.username}!
                </h2>
                <p className="text-gray-600">
                  You have access to both public and private API endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* MDX Content Section */}
      {homeMdxSource && (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <MdxViewer mdxSource={homeMdxSource} />
          </div>
        </div>
      )}

      {/* Posts Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <button
            onClick={fetchData}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Refresh'
            )}
          </button>
        </div>

        {posts.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500">Try refreshing the data or check the API connection.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${post.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {post.author?.username || 'Unknown'}</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

Home.pageConfig = {
  title: 'Django Revolution - Zero-config TypeScript & Python client generator for Django REST Framework',
  description: 'Generate fully-typed TypeScript and Python clients for Django REST Framework APIs with zero configuration. Supports OpenAPI, authentication, and more.',
  keywords: 'django, django rest framework, typescript, python, api client, openapi, code generation, drf',
  ogImage: {
    title: 'Django Revolution',
    subtitle: 'Zero-config TypeScript & Python client generator for Django REST Framework',
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Django Revolution",
    "description": "Zero-config TypeScript & Python client generator for Django REST Framework",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
};

export default Home;
