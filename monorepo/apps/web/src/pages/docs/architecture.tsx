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

interface ArchitecturePageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const ArchitecturePage: PageWithConfig<ArchitecturePageProps> = ({ documentation }) => {
  const architectureMdxSource = documentation['architecture'];

  return (
    <DocsLayout>
      {architectureMdxSource && <MdxViewer mdxSource={architectureMdxSource} />}
    </DocsLayout>
  );
};

ArchitecturePage.pageConfig = {
  title: 'Architecture - Django Revolution Documentation',
  description: 'Learn about the architecture and design principles behind Django Revolution.',
  keywords: 'django revolution architecture, design, principles, structure',
  ogImage: {
    title: 'Architecture',
    subtitle: 'Design and architecture of Django Revolution',
  },
};

export default ArchitecturePage; 