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

interface CliReferencePageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const CliReferencePage: PageWithConfig<CliReferencePageProps> = ({ documentation }) => {
  const cliReferenceMdxSource = documentation['cli-reference'];

  return (
    <DocsLayout>
      {cliReferenceMdxSource && <MdxViewer mdxSource={cliReferenceMdxSource} />}
    </DocsLayout>
  );
};

CliReferencePage.pageConfig = {
  title: 'CLI Reference - Django Revolution Documentation',
  description: 'Complete command-line interface reference for Django Revolution.',
  keywords: 'django revolution cli, command line, reference',
  ogImage: {
    title: 'CLI Reference',
    subtitle: 'Command-line interface for Django Revolution',
  },
};

export default CliReferencePage; 