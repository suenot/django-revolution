import React, { useState, useEffect } from 'react';
import { DocsContext, DocsContextType } from './context';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';

interface DocsLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children, currentPage = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  // Update current page when prop changes
  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage]);

  const contextValue: DocsContextType = {
    currentPage: currentPageState,
    setCurrentPage: setCurrentPageState,
    isMenuOpen,
    setIsMenuOpen,
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <DocsContext.Provider value={contextValue}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={isMenuOpen} onToggle={handleMenuToggle} />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Header */}
          <Header onMenuToggle={handleMenuToggle} />
          
          {/* Content */}
          <Content>
            {children}
          </Content>
        </div>
      </div>
    </DocsContext.Provider>
  );
};

export default DocsLayout; 