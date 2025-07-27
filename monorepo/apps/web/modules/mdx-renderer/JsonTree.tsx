import React from 'react';
import { CommonExternalProps, JSONTree } from 'react-json-tree';

interface JsonTreeComponentProps {
  title?: string;
  data: unknown;
  config?: Partial<CommonExternalProps>;
}

const JsonTreeComponent = ({ title, data, config }: JsonTreeComponentProps) => {
  // JSON Tree theme based on current theme
  const jsonTreeTheme = {
    scheme: 'default',
    base00: 'transparent',
    base01: '#f3f4f6',
    base02: '#e5e7eb',
    base03: '#9ca3af',
    base04: '#6b7280',
    base05: '#374151',
    base06: '#1f2937',
    base07: '#ffffff',
    base08: '#ef4444',
    base09: '#f59e0b',
    base0A: '#3b82f6',
    base0B: '#10b981',
    base0C: '#8b5cf6',
    base0D: '#6366f1',
    base0E: '#ec4899',
    base0F: '#f97316',
  };

  return (
    <div className="relative bg-white rounded-lg border border-gray-200 h-full overflow-hidden">
      {title && (
        <div className="p-4 border-b border-gray-200">
          <h6 className="text-lg font-semibold text-gray-900">{title}</h6>
        </div>
      )}

      <div className="h-full overflow-auto p-4">
        <JSONTree
          data={data}
          theme={jsonTreeTheme}
          invertTheme={false}
          hideRoot={true}
          shouldExpandNodeInitially={() => true}
          keyPath={[]}
          postprocessValue={(value) => value}
          isCustomNode={() => false}
          getItemString={() => null}
          collectionLimit={100}
          sortObjectKeys={false}
          {...config}
        />
      </div>
    </div>
  );
};

export default JsonTreeComponent; 