import React from 'react';
import { GetStaticProps } from 'next';
import { MdxViewer } from '@/modules/mdx-renderer';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import DocsLayout from '@/layouts/DocsLayout';
import { PageWithConfig } from '@/types/pageConfig';
import { loadMdxDocs } from '@/utils/mdx';
import path from 'path';

export const getStaticProps: GetStaticProps = async () => {
  const docsDir = path.join(process.cwd(), 'src/mdx/docs');
  const documentation = await loadMdxDocs(docsDir);

  return {
    props: {
      documentation,
    },
  };
};

interface ApiReferencePageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const ApiReferencePage: PageWithConfig<ApiReferencePageProps> = ({ documentation }) => {
  const apiReferenceMdxSource = documentation['api-reference'];

  return (
    <DocsLayout>
      {apiReferenceMdxSource && <MdxViewer mdxSource={apiReferenceMdxSource} />}
    </DocsLayout>
  );
};

ApiReferencePage.pageConfig = {
  title: 'API Reference - Django Revolution Documentation',
  description: 'Complete API reference for Django Revolution client generation.',
  keywords: 'django revolution api, reference, endpoints, methods',
  ogImage: {
    title: 'API Reference',
    subtitle: 'Complete API documentation for Django Revolution',
  },
};

export default ApiReferencePage; 