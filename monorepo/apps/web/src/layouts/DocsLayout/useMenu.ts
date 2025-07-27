import { useRouter } from 'next/router';
import { useMemo } from 'react';

export interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
  isActive?: boolean;
}

export const useMenu = () => {
  const router = useRouter();

  const menuItems: MenuItem[] = useMemo(() => [
    {
      title: 'Getting Started',
      href: '/docs/installation',
      children: [
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Usage Guide', href: '/docs/usage' },
      ]
    },
    {
      title: 'Reference',
      href: '/docs/cli-reference',
      children: [
        { title: 'CLI Reference', href: '/docs/cli-reference' },
        { title: 'API Reference', href: '/docs/api-reference' },
      ]
    },
    {
      title: 'Advanced',
      href: '/docs/architecture',
      children: [
        { title: 'Architecture', href: '/docs/architecture' },
        { title: 'Troubleshooting', href: '/docs/troubleshooting' },
      ]
    },
    {
      title: 'Resources',
      href: '/docs/changelog',
      children: [
        { title: 'Changelog', href: '/docs/changelog' },
      ]
    }
  ], []);

  const currentPath = router.asPath;

  const isActive = (href: string) => {
    return currentPath === href;
  };

  const navigateTo = (href: string) => {
    router.push(href);
  };

  const getActiveMenuItem = (): MenuItem | null => {
    for (const item of menuItems) {
      if (isActive(item.href)) {
        return item;
      }
      if (item.children) {
        for (const child of item.children) {
          if (isActive(child.href)) {
            return child;
          }
        }
      }
    }
    return null;
  };

  const getBreadcrumbs = (): MenuItem[] => {
    const breadcrumbs: MenuItem[] = [];
    const activeItem = getActiveMenuItem();
    
    if (activeItem) {
      // Find parent
      for (const item of menuItems) {
        if (item.children?.some(child => child.href === activeItem.href)) {
          breadcrumbs.push(item);
          break;
        }
      }
      breadcrumbs.push(activeItem);
    }
    
    return breadcrumbs;
  };

  return {
    menuItems,
    currentPath,
    isActive,
    navigateTo,
    getActiveMenuItem,
    getBreadcrumbs,
  };
}; 