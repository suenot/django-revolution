import type { AppProps } from 'next/app';
import '@/theme/globals.css';
import { MainLayout } from '@/layouts/MainLayout';
import Seo from '@/components/Seo';
import PageProgress from '@/components/PageProgress';
import { determinePageConfig, PageWithConfig } from '@/types/pageConfig';

type AppPropsWithConfig = AppProps & {
  Component: PageWithConfig;
};

export default function App({ Component, pageProps }: AppPropsWithConfig) {
  const pageConfig = determinePageConfig(
    Component,
    pageProps,
    'Django Revolution',
    'Zero-config TypeScript & Python client generator for Django REST Framework'
  );

  return (
    <>
      <Seo pageConfig={pageConfig} />
      <PageProgress />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
} 