import { css } from '@emotion/react';
import React, { useMemo, useContext } from 'react';
import { Breakpoint, breakpoints, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { RowContext } from './Row';

type Sizes = { [P in Breakpoint]?: number };

type TextAlign = 'left' | 'right' | 'center' | 'justify';

type BasicProps = Sizes & {
  order?: number;
  textAlign?: TextAlign | Record<Breakpoint, TextAlign>;
  hideOn?: (keyof Sizes)[] | 'all';
  showOn?: (keyof Sizes)[] | 'all';
};

export type ColProps = BasicProps;

const getSpan = (currentBreakpoint: Breakpoint, colSizes: Sizes): number | null => {
  let span: number | null = null;
  let isCurrentReached: boolean;

  breakpoints.forEach((breakpoint) => {
    span = isCurrentReached ? span : colSizes[breakpoint] || span;
    isCurrentReached = isCurrentReached || currentBreakpoint === breakpoint;
  });

  return span;
};

const getIsHidden = (hideOn: BasicProps['hideOn'] = [], showOn: BasicProps['showOn'] = [], currentSize: Breakpoint) =>
  (hideOn === 'all' || hideOn.includes(currentSize)) && (showOn === 'all' || !showOn.includes(currentSize));

const getTextAlign = (textAlign: BasicProps['textAlign'] | undefined, currentBreakpoint: Breakpoint) => {
  if (!textAlign) return undefined;
  if (typeof textAlign === 'string') return textAlign;

  let result: TextAlign | null = null;
  let isCurrentReached: boolean;

  breakpoints.forEach((breakpoint) => {
    result = isCurrentReached ? result : textAlign[breakpoint] || result;
    isCurrentReached = currentBreakpoint === breakpoint;
  });
};

const percentage = (value: number) => `${100 * value}%`;

type ColStyleProps = {
  span: number;
  frames: number;
  order?: number;
  textAlign?: TextAlign;
  isHidden?: boolean;
  gap: number;
};

const styles = {
  col: ({ span, frames, order, textAlign, isHidden, gap }: ColStyleProps) =>
    css({
      display: isHidden ? 'none' : 'initial',
      textAlign,
      maxWidth: `calc(${percentage(span / frames)} - ${gap}px)`,
      flex: `0 0 calc(${percentage(span / frames)} - ${gap}px)`,
      boxSizing: 'border-box',
      order,
    }),
};
export const Col: React.FC<ColProps> = ({ sm, md, lg, order, textAlign, hideOn, showOn, children }) => {
  const frames = 12;

  const { breakpoint: currentBreakpoint } = useMedia();

  const { gap } = useContext(RowContext);

  const span = useMemo(
    () => getSpan(currentBreakpoint, { sm, md, lg }) || frames,
    [currentBreakpoint, sm, md, lg, frames],
  );

  const isHidden = useMemo(() => getIsHidden(hideOn, showOn, currentBreakpoint), [currentBreakpoint, hideOn, showOn]);

  const calculatedTextAlign = useMemo(() => getTextAlign(textAlign, currentBreakpoint), [textAlign, currentBreakpoint]);

  return (
    <div
      css={styles.col({
        span,
        frames,
        order,
        textAlign: calculatedTextAlign,
        isHidden,
        gap,
      })}
    >
      {children}
    </div>
  );
};
