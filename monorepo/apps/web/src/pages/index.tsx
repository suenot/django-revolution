'use client';

import { useAuth } from '@/context';
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
  const homeMdxSource = documentation['home'];

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

      {/* MDX Content Section */}
      {homeMdxSource && (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <MdxViewer mdxSource={homeMdxSource} />
          </div>
        </div>
      )}

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
