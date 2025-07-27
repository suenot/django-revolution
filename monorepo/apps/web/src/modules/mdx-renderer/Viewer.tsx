import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { Language } from 'prism-react-renderer';

import PrettyCode from './PrettyCode';

// Custom MDX components with Tailwind styling
const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <NextLink
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
  >
    {children}
  </NextLink>
);

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-gray-900 mt-5 mb-2" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold text-gray-900 mt-4 mb-2" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-lg font-semibold text-gray-900 mt-3 mb-2" {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="text-base font-semibold text-gray-900 mt-3 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isBlank = (props.href as string).startsWith('http');
    return (
      <NextLink
        href={props.href as string}
        target={isBlank ? '_blank' : undefined}
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        {...props}
      />
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-700" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-300" />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4 mt-2"
      {...props}
    />
  ),
  // HTML table components with Tailwind styling
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-gray-200" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => {
    const { align, ...rest } = props;
    return (
      <th
        {...rest}
        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''
        }`}
      />
    );
  },
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => {
    const { align, ...rest } = props;
    return (
      <td
        {...rest}
        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''
        }`}
      />
    );
  },
  img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    const { src, alt, width, height, ...rest } = props;

    if (!src) {
      return (
        <div className="inline-block w-12 h-12 bg-gray-300 rounded" />
      );
    }

    const hasNumericDimensions = typeof width === 'number' && typeof height === 'number';

    if (hasNumericDimensions) {
      return (
        <NextImage
          src={src}
          alt={alt || ''}
          width={width as number}
          height={height as number}
          className="rounded-lg shadow-sm"
          {...(rest as any)}
        />
      );
    } else {
      return (
        <div className="relative w-full pt-[56.25%]">
          <NextImage
            src={src}
            alt={alt || ''}
            fill
            className="object-contain rounded-lg"
            {...(rest as any)}
          />
        </div>
      );
    }
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const codeElement = React.Children.toArray(props.children).find(
      (child): child is React.ReactElement<{ className?: string; children?: React.ReactNode }> =>
        React.isValidElement(child) && child.type === 'code'
    );

    if (codeElement) {
      const { className, children: codeContent } = codeElement.props;
      const language = className?.replace(/language-/, '').trim() as Language || 'plaintext';
      const code = typeof codeContent === 'string' ? codeContent.trim() : '';

      return <PrettyCode data={code} language={language} className="my-6" />;
    }

    return <pre className="bg-gray-100 p-4 rounded-lg overflow-auto my-4" {...props} />;
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-700" {...props} />
  ),
  CustomLink,
};

interface MdxViewRemoteProps {
  mdxSource: MDXRemoteSerializeResult;
  MdxContentComponent?: never;
  filePath?: string;
}

interface MdxViewDirectProps {
  mdxSource?: never;
  MdxContentComponent: React.ComponentType<unknown>;
  filePath?: string;
}

type MdxViewProps = MdxViewRemoteProps | MdxViewDirectProps;

const MdxViewer = (props: MdxViewProps) => {
  const { mdxSource, MdxContentComponent } = props;

  let contentToRender;

  if (MdxContentComponent) {
    const Component = MdxContentComponent;
    contentToRender = <Component components={mdxComponents as any} />;
  } else if (mdxSource) {
    contentToRender = (
      <MDXRemote
        {...mdxSource}
        components={mdxComponents as any}
      />
    );
  }

  return (
    <div className="prose prose-lg max-w-none">
      {contentToRender}
    </div>
  );
};

export default MdxViewer; 