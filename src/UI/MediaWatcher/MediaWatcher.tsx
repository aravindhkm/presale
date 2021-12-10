import React, { createContext, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl'];

export const sizes: Record<Breakpoint, number> = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1366,
  // xxl: 1440,
};

export type MediaWatcherContextType = {
  breakpoint: Breakpoint;
};

const MediaWatcherContext = createContext<MediaWatcherContextType>({ breakpoint: 'sm' });

export const useMedia = () => useContext(MediaWatcherContext);

export const MediaWatcher: React.FC = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');

  useEffect(() => {
    const sm = matchMedia(`(max-width: ${sizes.md - 1}px)`);
    const md = matchMedia(`(min-width: ${sizes.md}px) and (max-width: ${sizes.lg - 1}px)`);
    const lg = matchMedia(`(min-width: ${sizes.lg}px) and (max-width: ${sizes.xl - 1}px)`);
    const xl = matchMedia(`(min-width: ${sizes.xl}px)`);
    // const xxl = matchMedia(`(min-width: ${sizes.xxl}px)`);

    function detectBreakpoint() {
      let nextBreakpoint: Breakpoint = 'sm';
      if (sm.matches) nextBreakpoint = 'sm';
      if (md.matches) nextBreakpoint = 'md';
      if (lg.matches) nextBreakpoint = 'lg';
      if (xl.matches) nextBreakpoint = 'xl';
      // if (xxl.matches) nextBreakpoint = 'xxl';
      setBreakpoint(nextBreakpoint);
    }

    detectBreakpoint();

    const onResize = debounce(detectBreakpoint, 10);

    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, []);

  return <MediaWatcherContext.Provider value={{ breakpoint }}>{children}</MediaWatcherContext.Provider>;
};
