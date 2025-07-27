import React from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useMenu, MenuItem } from './useMenu';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarItem: React.FC<{ item: MenuItem; level?: number }> = ({ item, level = 0 }) => {
  const { isActive, navigateTo } = useMenu();
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isItemActive = isActive(item.href);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      navigateTo(item.href);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium rounded-md transition-colors ${
          isItemActive
            ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
            : 'text-gray-700 hover:bg-gray-100'
        } ${level > 0 ? 'pl-8' : ''}`}
      >
        <span>{item.title}</span>
        {hasChildren && (
          <span className="ml-2">
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </span>
        )}
      </button>
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children!.map((child, index) => (
            <SidebarItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { menuItems } = useMenu();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>Django Revolution</p>
              <p>v1.0.13</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 