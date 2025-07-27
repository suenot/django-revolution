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

interface InstallationPageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const InstallationPage: PageWithConfig<InstallationPageProps> = ({ documentation }) => {
  const installationMdxSource = documentation['installation'];

  return (
    <DocsLayout>
      {installationMdxSource && <MdxViewer mdxSource={installationMdxSource} />}
    </DocsLayout>
  );
};

InstallationPage.pageConfig = {
  title: 'Installation - Django Revolution Documentation',
  description: 'Learn how to install and set up Django Revolution for generating TypeScript and Python clients.',
  keywords: 'django revolution installation, setup guide, getting started',
  ogImage: {
    title: 'Installation Guide',
    subtitle: 'Get started with Django Revolution',
  },
};

export default InstallationPage; 