import { css } from '@emotion/react';
import { useMedia, Breakpoint, breakpoints } from 'UI/MediaWatcher/MediaWatcher';
import React, { CSSProperties } from 'react';

type ViewportRelated<T> = { [P in Breakpoint]?: T };

type CanBeViewportRelated<T> = ViewportRelated<T> | T;

type GridProps = {
  frames?: number;
  rowGap?: CanBeViewportRelated<number>;
  colGap?: CanBeViewportRelated<number>;
  minHeight?: number;
  alignItems?: CSSProperties['alignItems'];
  justifyItems?: CSSProperties['justifyItems'];
};

type GridItemStyles = {
  colSpan?: number;
  rowSpan?: number;
  colStart?: number | 'auto';
  rowStart?: number | 'auto';
  align?: CSSProperties['alignSelf'];
  justify?: CSSProperties['justifySelf'];
};

type GridItemProps = { [P in keyof GridItemStyles]: CanBeViewportRelated<GridItemStyles[P]> };

export type WithGridItemProps<T> = GridItemProps & T;

const getViewportRelated = <T,>(value: CanBeViewportRelated<T> | undefined, currentBreakpoint: Breakpoint) => {
  if (!value) return undefined;
  if (typeof value !== 'object') return value as T;

  let result: T | undefined;
  let isCurrentReached: boolean;

  breakpoints.forEach((viewport) => {
    if (!isCurrentReached) {
      result = (value as ViewportRelated<T>)[viewport] || result;
      isCurrentReached = currentBreakpoint === viewport;
    }
  });

  return result;
};

const toPx = (value?: number) => (value !== undefined ? `${value}px` : undefined);
const toSpan = (value?: number) => (value !== undefined ? `span ${value}` : undefined);

const styles = {
  grid: (
    frames: number,
    rowGap?: number,
    colGap?: number,
    minHeight?: number,
    alignItems?: CSSProperties['alignItems'],
    justifyItems?: CSSProperties['justifyItems'],
  ) => css`
    display: grid;
    grid-template-columns: repeat(${frames}, 1fr);
    grid-row-gap: ${toPx(rowGap) || 'initial'};
    grid-column-gap: ${toPx(colGap) || 'initial'};
    grid-auto-rows: ${minHeight || 'initial'};
    align-items: ${alignItems || 'initial'};
    justify-items: ${justifyItems || 'initial'};
    & > * {
      grid-column-end: span ${frames};
    }
  `,
  item: ({ colSpan, rowSpan, colStart = 'auto', rowStart = 'auto', justify, align }: GridItemStyles) => css`
    grid-column-start: ${colStart};
    ${colSpan && `grid-column-end: ${toSpan(colSpan)} !important`};
    grid-row-start: ${rowStart};
    ${rowSpan && `grid-row-end: ${toSpan(rowSpan)}`};
    align-self: ${align};
    justify-self: ${justify};
  `,
};

const GridItem: React.FC<GridItemProps & { className?: string }> = ({ children, className, ...rest }) => {
  const { breakpoint } = useMedia();

  const colSpan = getViewportRelated(rest.colSpan, breakpoint);
  const rowSpan = getViewportRelated(rest.rowSpan, breakpoint);
  const colStart = getViewportRelated(rest.colStart, breakpoint);
  const rowStart = getViewportRelated(rest.rowStart, breakpoint);
  const justify = getViewportRelated(rest.justify, breakpoint);
  const align = getViewportRelated(rest.align, breakpoint);

  return (
    <div css={styles.item({ colSpan, rowSpan, colStart, rowStart, justify, align })} className={className}>
      {children}
    </div>
  );
};

export const Grid: React.FC<GridProps> & { Item: typeof GridItem } = ({
  frames = 12,
  children,
  justifyItems,
  alignItems,
  ...rest
}) => {
  const { breakpoint } = useMedia();
  const rowGap = getViewportRelated(rest.rowGap, breakpoint);
  const colGap = getViewportRelated(rest.colGap, breakpoint);
  const minHeight = getViewportRelated(rest.minHeight, breakpoint);
  return <div css={styles.grid(frames, rowGap, colGap, minHeight, alignItems, justifyItems)}>{children}</div>;
};

Grid.Item = GridItem;
