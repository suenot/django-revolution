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

interface UsagePageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const UsagePage: PageWithConfig<UsagePageProps> = ({ documentation }) => {
  const usageMdxSource = documentation['usage'];

  return (
    <DocsLayout>
      {usageMdxSource && <MdxViewer mdxSource={usageMdxSource} />}
    </DocsLayout>
  );
};

UsagePage.pageConfig = {
  title: 'Usage Guide - Django Revolution Documentation',
  description: 'Learn how to use Django Revolution to generate TypeScript and Python clients for your Django REST Framework APIs.',
  keywords: 'django revolution usage, how to use, examples, tutorial',
  ogImage: {
    title: 'Usage Guide',
    subtitle: 'Learn how to use Django Revolution',
  },
};

export default UsagePage; 