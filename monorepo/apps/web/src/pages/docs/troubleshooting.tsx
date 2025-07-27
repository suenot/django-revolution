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

interface TroubleshootingPageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const TroubleshootingPage: PageWithConfig<TroubleshootingPageProps> = ({ documentation }) => {
  const troubleshootingMdxSource = documentation['troubleshooting'];

  return (
    <DocsLayout>
      {troubleshootingMdxSource && <MdxViewer mdxSource={troubleshootingMdxSource} />}
    </DocsLayout>
  );
};

TroubleshootingPage.pageConfig = {
  title: 'Troubleshooting - Django Revolution Documentation',
  description: 'Common issues and solutions for Django Revolution.',
  keywords: 'django revolution troubleshooting, issues, problems, solutions',
  ogImage: {
    title: 'Troubleshooting',
    subtitle: 'Common issues and solutions',
  },
};

export default TroubleshootingPage; 