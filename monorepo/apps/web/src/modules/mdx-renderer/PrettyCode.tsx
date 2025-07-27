import React from 'react';
import { Highlight, Language, themes } from 'prism-react-renderer';

interface PrettyCodeProps {
  data: string | object;
  language: Language;
  className?: string;
  mode?: 'dark' | 'light';
  inline?: boolean;
}

const PrettyCode = ({ data, language, className, mode = 'light', inline = false }: PrettyCodeProps) => {
  console.log('PrettyCode render:', { language, normalizedLanguage: (() => {
    switch (language) {
      case 'bash':
      case 'shell':
        return 'shell';
      case 'python':
        return 'python';
      case 'javascript':
      case 'js':
        return 'javascript';
      case 'typescript':
      case 'ts':
        return 'typescript';
      case 'json':
        return 'json';
      case 'yaml':
        return 'yaml';
      default:
        return 'shell';
    }
  })() });
  // Select the Prism theme based on the mode
  const prismTheme =
    mode === 'dark'
      ? {
          ...themes.vsDark,
          plain: {
            ...themes.vsDark.plain,
            backgroundColor: 'transparent',
          },
        }
      : {
          ...themes.vsLight,
          plain: {
            ...themes.vsLight.plain,
            backgroundColor: 'transparent',
            color: '#1f2937', // Dark text for light background
          },
          // Ensure syntax highlighting colors are applied
          types: { color: '#d73a49' },
          punctuation: { color: '#24292e' },
          property: { color: '#005cc5' },
          selector: { color: '#d73a49' },
          operator: { color: '#d73a49' },
          entity: { color: '#6f42c1' },
          url: { color: '#032f62' },
          string: { color: '#032f62' },
          keyword: { color: '#d73a49' },
          boolean: { color: '#005cc5' },
          number: { color: '#005cc5' },
          function: { color: '#6f42c1' },
          constant: { color: '#005cc5' },
          comment: { color: '#6a737d', fontStyle: 'italic' },
          tag: { color: '#22863a' },
          attrName: { color: '#6f42c1' },
          attrValue: { color: '#032f62' },
        };

  // Convert form object to JSON string with proper formatting
  const contentJson = typeof data === 'string' ? data : JSON.stringify(data || {}, null, 2);
  
  // Handle empty content
  if (!contentJson || contentJson.trim() === '') {
    return (
      <div className={`relative h-full bg-gray-50 rounded-lg border border-gray-200 ${className || ''}`}>
        <div className="h-full overflow-auto p-4">
          <p className="text-gray-500 text-sm italic">No content available</p>
        </div>
      </div>
    );
  }

  // Normalize language for Prism - use only basic supported languages
  const normalizedLanguage = (() => {
    switch (language) {
      case 'bash':
      case 'shell':
        return 'shell'; // Use 'shell' instead of 'bash'
      case 'python':
        return 'python';
      case 'javascript':
      case 'js':
        return 'javascript';
      case 'typescript':
      case 'ts':
        return 'typescript';
      case 'json':
        return 'json';
      case 'yaml':
        return 'yaml';
      default:
        return 'shell'; // Default to shell for unknown languages
    }
  })();

  if (inline) {
    return (
      <Highlight theme={prismTheme} code={contentJson} language={normalizedLanguage}>
        {({ className, style, tokens, getTokenProps }) => (
          <code
            className={`${className} bg-gray-200 px-2 py-1 rounded text-sm font-mono inline-block`}
            style={{
              ...style,
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              color: '#1f2937', // Ensure dark text
            }}
          >
            {tokens.map((line) => (
              line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))
            ))}
          </code>
        )}
      </Highlight>
    );
  }

  return (
    <div className={`relative h-full bg-gray-50 rounded-lg border border-gray-200 ${className || ''}`}>
      <div className="h-full overflow-auto">
        <Highlight theme={prismTheme} code={contentJson} language={normalizedLanguage}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{
                ...style,
                margin: 0,
                padding: '1rem',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default PrettyCode; 