import { css } from '@emotion/react';
import React, { createContext } from 'react';
import { useMedia, breakpoints, Breakpoint } from 'UI/MediaWatcher/MediaWatcher';

type JustifyContent = 'center' | 'start' | 'end' | 'space-between';

type JustifyContents = { [P in Breakpoint]?: JustifyContent };

const getJustifyContent = (currentSize: Breakpoint, justifyContents: JustifyContents): JustifyContent | null => {
  let justifyContent: JustifyContent | null = null;
  let isCurrentReached: boolean;
  breakpoints.forEach((breakpoint) => {
    justifyContent = isCurrentReached ? justifyContent : justifyContents[breakpoint] || justifyContent;
    isCurrentReached = currentSize === breakpoint;
  });

  return justifyContent;
};

const styles = {
  row: (gap: number, alignItems: RowProps['alignItems'], justifyContent: JustifyContent | null) =>
    css({
      alignItems,
      gap,
      justifyContent: justifyContent ?? undefined,
      display: 'flex',
      flexWrap: 'wrap',
    }),
};

type JustifyContentProps = { [P in Breakpoint as `justifyContent${Capitalize<string & P>}`]?: JustifyContent };

export type RowProps = {
  gap?: number;
  alignItems?: 'center' | 'flex-end' | 'flex-start' | 'baseline' | 'stretch';
} & JustifyContentProps;

export const RowContext = createContext({ gap: 8 });

export const Row: React.FC<RowProps> = ({
  alignItems = 'stretch',
  gap = 8,
  justifyContentSm,
  justifyContentMd,
  justifyContentLg,
  children,
}) => {
  const { breakpoint: currentBreakpoint } = useMedia();
  const justifyContent = getJustifyContent(currentBreakpoint, {
    sm: justifyContentSm,
    md: justifyContentMd,
    lg: justifyContentLg,
  });

  return (
    <RowContext.Provider value={{ gap }}>
      <div css={styles.row(gap, alignItems, justifyContent)}>{children}</div>
    </RowContext.Provider>
  );
};
