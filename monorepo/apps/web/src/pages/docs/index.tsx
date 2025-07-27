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

interface DocsPageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const DocsPage: PageWithConfig<DocsPageProps> = ({ documentation }) => {
  const installationMdxSource = documentation['installation'];

  return (
    <DocsLayout>
      {installationMdxSource && <MdxViewer mdxSource={installationMdxSource} />}
    </DocsLayout>
  );
};

DocsPage.pageConfig = {
  title: 'Documentation - Django Revolution',
  description: 'Complete documentation for Django Revolution - installation, usage, API reference, and more.',
  keywords: 'django revolution documentation, installation guide, api reference, usage examples',
  ogImage: {
    title: 'Django Revolution Documentation',
    subtitle: 'Complete guide to getting started with Django Revolution',
  },
};

export default DocsPage; 