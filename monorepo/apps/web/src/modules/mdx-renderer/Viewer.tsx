import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import NextImage from 'next/image';
import React from 'react';
import { Language } from 'prism-react-renderer';

import PrettyCode from './PrettyCode';

// Custom components for MDX
const CustomLink = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const hrefString = typeof href === 'string' ? href : '';
  return (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
      target={hrefString.startsWith('http') ? '_blank' : undefined}
      rel={hrefString.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-bold text-gray-900 mb-2 mt-4" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-lg font-bold text-gray-900 mb-2 mt-4" {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="text-base font-bold text-gray-900 mb-2 mt-4" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
  ),
  a: CustomLink,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-700" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-gray-300 my-8" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white" {...props} />
        </div>
      </div>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gradient-to-r from-gray-50 to-gray-100" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 tracking-wide" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" {...props} />
  ),
  img: ({ src, alt, width, height, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (width && height && src) {
      return (
        <NextImage
          src={src}
          alt={alt || ''}
          width={width as number}
          height={height as number}
          className="rounded-lg shadow-sm"
          {...(rest as Omit<React.ComponentProps<typeof NextImage>, 'src' | 'alt' | 'width' | 'height'>)}
        />
      );
    } else if (src) {
      return (
        <div className="relative w-full pt-[56.25%]">
          <NextImage
            src={src}
            alt={alt || ''}
            fill
            className="object-contain rounded-lg"
            {...(rest as Omit<React.ComponentProps<typeof NextImage>, 'src' | 'alt' | 'fill'>)}
          />
        </div>
      );
    }
    return null;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    // Extract code content and language
    let codeContent = '';
    let language: Language = 'plaintext';

    if (React.isValidElement(props.children)) {
      const child = props.children;
      if (child.type === 'code' || (typeof child.type === 'function' && child.type.name === 'code')) {
        const codeProps = child.props as { className?: string; children?: React.ReactNode };
        language = (codeProps.className?.replace(/language-/, '').trim() as Language) || 'plaintext';
        codeContent = String(codeProps.children || '').trim();
      }
    } else if (Array.isArray(props.children)) {
      const codeChild = props.children.find(child =>
        React.isValidElement(child) &&
        (child.type === 'code' || (typeof child.type === 'function' && child.type.name === 'code'))
      );
      if (codeChild) {
        const codeProps = codeChild.props as { className?: string; children?: React.ReactNode };
        language = (codeProps.className?.replace(/language-/, '').trim() as Language) || 'plaintext';
        codeContent = String(codeProps.children || '').trim();
      }
    }

    // Fallback: extract text content
    if (!codeContent) {
      codeContent = React.Children.toArray(props.children)
        .map(child => typeof child === 'string' ? child : '')
        .join('')
        .trim();
    }

    return <PrettyCode data={codeContent} language={language} className="my-6" />;
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const { children, className } = props;
    const language = (className?.replace(/language-/, '').trim() as Language) || 'plaintext';
    const code = typeof children === 'string' ? children : '';

    return <PrettyCode data={code} language={language} inline={true} />;
  },
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
    contentToRender = <Component />;
  } else if (mdxSource) {
    contentToRender = (
      <MDXRemote
        {...mdxSource}
        components={mdxComponents}
      />
    );
  } else {
    contentToRender = (
      <div className="p-4 text-gray-500">
        <p>No MDX content available</p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none prose-gray">
      {contentToRender}
    </div>
  );
};

export default MdxViewer; 