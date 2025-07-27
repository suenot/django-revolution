import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Content; 