import React from 'react';
import { Highlight, Language, themes } from 'prism-react-renderer';

interface PrettyCodeProps {
  data: string | object;
  language: Language;
  className?: string;
  mode?: 'dark' | 'light';
}

const PrettyCode = ({ data, language, className, mode = 'light' }: PrettyCodeProps) => {
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
          },
        };

  // Convert form object to JSON string with proper formatting
  const contentJson = typeof data === 'string' ? data : JSON.stringify(data || {}, null, 2);

  return (
    <div className={`relative h-full bg-white rounded-lg border border-gray-200 ${className || ''}`}>
      <div className="h-full overflow-auto">
        <Highlight theme={prismTheme} code={contentJson} language={language}>
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