import React from 'react';
import { GetStaticProps } from 'next';
import { MdxViewer } from '@/modules/mdx-renderer';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { PageWithConfig } from '@/types/pageConfig';
import { loadMdxDocs } from '@/utils/mdx';
import path from 'path';

export const getStaticProps: GetStaticProps = async () => {
  const docsDir = path.join(process.cwd(), 'src', 'mdx', 'pages');
  const documentation = await loadMdxDocs(docsDir);

  return {
    props: {
      documentation,
    },
  };
};

interface SupportPageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const SupportPage: PageWithConfig<SupportPageProps> = ({ documentation }) => {
  const supportMdxSource = documentation['support'];

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {supportMdxSource && <MdxViewer mdxSource={supportMdxSource} />}
      </div>
    </div>
  );
};

SupportPage.pageConfig = {
  title: 'Support - Django Revolution',
  description: 'Get help and support for Django Revolution. Find documentation, community resources, and contact information.',
  keywords: 'django revolution support, help, documentation, community, contact',
  ogImage: {
    title: 'Support Django Revolution',
    subtitle: 'Get help and support for your Django projects',
  },
};

export default SupportPage; 