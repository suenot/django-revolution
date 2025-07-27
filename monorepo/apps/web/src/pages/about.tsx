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

interface AboutPageProps {
  documentation: Record<string, MDXRemoteSerializeResult>;
}

const AboutPage: PageWithConfig<AboutPageProps> = ({ documentation }) => {
  const aboutMdxSource = documentation['about'];

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {aboutMdxSource && <MdxViewer mdxSource={aboutMdxSource} />}
      </div>
    </div>
  );
};

AboutPage.pageConfig = {
  title: 'About - Django Revolution',
  description: 'Learn more about Django Revolution and its mission to simplify Django development.',
  keywords: 'django revolution, about, mission, team, django framework',
  ogImage: {
    title: 'About Django Revolution',
    subtitle: 'Simplifying Django development with powerful tools',
  },
};

export default AboutPage; 