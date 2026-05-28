import React, { useEffect } from 'react';
import '../../styles/global.css';
import '../../styles/theme.css';

import * as classes from './layout.module.css';
import { Header } from "./header"

interface LayoutProps {
  children: React.ReactElement;
}

export const Layout = (props: LayoutProps) => {
  useEffect(() => {
    const handleOutboundClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('http')) return;
      if (href.includes('jovialcode.github.io')) return;
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click', {
          event_category: 'outbound',
          event_label: href,
          transport_type: 'beacon',
        });
      }
    };
    document.addEventListener('click', handleOutboundClick);
    return () => document.removeEventListener('click', handleOutboundClick);
  }, []);

  return (
    <div className={classes.Layout}>
      <div className={classes.BodyWrapper}>
        <Header />
        <main className={classes.ContentWrapper}>
          {props.children}
        </main>
      </div>
    </div>
  );
}
