import { FC, ReactNode } from 'react';

// Configuration for the AppBar
export interface AppBarConfig {
  label?: string;
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
  hideAuthButtons?: boolean;
  hideNavigation?: boolean;
  actions?: ReactNode;
  showPageScrollProgress?: boolean;
}

// Configuration for a Page using the App3 layout
export interface PageConfig {
  title?: string;
  description?: string;
  keywords?: string;
  jsonLd?: Record<string, any>;
  appBar?: AppBarConfig;
  protected?: boolean;
  themeMode?: 'light' | 'dark';
  ogImage?: {
    title?: string;
    subtitle?: string;
  };
}

// Type for a Page component that includes page configuration
export type PageWithConfig<T = {}> = FC<T> & {
  pageConfig?: PageConfig;
  [key: string]: any;
};

// --- Helper Function ---
export const determinePageConfig = (
  Component: PageWithConfig,
  pageProps: Record<string, any>, // Use a general type for pageProps
  defaultTitle: string,
  defaultDescription: string,
): PageConfig => {
  const defaultPageConfig: PageConfig = {
    title: defaultTitle,
    description: defaultDescription,
    protected: false,
  };

  const configFromProps = pageProps.pageConfig as PageConfig | undefined;
  const configFromStatic = Component.pageConfig as PageConfig | undefined;

  let finalConfig: PageConfig = { ...defaultPageConfig };

  // Merge static config first
  if (configFromStatic) {
    finalConfig = {
      ...finalConfig,
      ...configFromStatic,
    };
  }

  // Merge dynamic config from props (overrides static)
  if (configFromProps) {
    finalConfig = {
      ...finalConfig,
      ...configFromProps,
      appBar: {
        ...finalConfig.appBar,
        ...configFromProps.appBar,
      },
    };
  }

  return finalConfig;
};
// --- End Helper Function ---
