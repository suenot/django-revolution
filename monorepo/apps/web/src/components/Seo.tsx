import Head from 'next/head';
import { PageConfig } from '@/types/pageConfig';

interface SeoProps {
  pageConfig: PageConfig;
}

export default function Seo({ pageConfig }: SeoProps) {
  const {
    title = 'Django Revolution',
    description = 'Zero-config TypeScript & Python client generator for Django REST Framework',
    keywords,
    jsonLd,
    ogImage,
  } = pageConfig;

  const ogTitle = ogImage?.title || title;
  const ogSubtitle = ogImage?.subtitle || description;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogSubtitle} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Django Revolution" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogSubtitle} />
      
      {/* OG Image */}
      {ogImage && (
        <meta
          property="og:image"
          content={`/api/og?data=${Buffer.from(
            JSON.stringify({
              title: ogTitle,
              subtitle: ogSubtitle,
            })
          ).toString('base64')}`}
        />
      )}
      
      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
    </Head>
  );
} 