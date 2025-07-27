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

interface ChangelogPageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const ChangelogPage: PageWithConfig<ChangelogPageProps> = ({ documentation }) => {
  const changelogMdxSource = documentation['changelog'];

  return (
    <DocsLayout>
      {changelogMdxSource && <MdxViewer mdxSource={changelogMdxSource} />}
    </DocsLayout>
  );
};

ChangelogPage.pageConfig = {
  title: 'Changelog - Django Revolution Documentation',
  description: 'Version history and release notes for Django Revolution.',
  keywords: 'django revolution changelog, version history, release notes',
  ogImage: {
    title: 'Changelog',
    subtitle: 'Version history and releases',
  },
};

export default ChangelogPage; 