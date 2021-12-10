import { css } from '@emotion/react';
import React from 'react';

type Global = 'initial' | 'inherit' | 'unset';

type Align = Global | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';

type Justify =
  | Global
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'space-between'
  | 'space-around'
  | 'space-evently'
  | 'stretch';

export type FlexProps = {
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
  justifyContent?: Justify;
  alignItems?: Align;
  gap?: number;
};

export type ItemProps = {
  flexBasis?: number;
  flexGrow?: number;
  flexShrink?: number;
  width?: number;
  alignSelf?: Align;
};

const styles = {
  flex: ({ gap = 8, flexDirection = 'row', ...style }: FlexProps) =>
    css(
      { ...style, flexDirection },
      css`
        gap: ${gap}px;
        display: flex;
      `,
    ),
  item: ({ flexBasis, width, ...style }: ItemProps) =>
    css(
      { ...style },
      css`
        ${flexBasis && `flex-basis: ${flexBasis}px`};
        ${width && `min-width: ${width}px`};
      `,
    ),
};

export const Flex: React.FC<FlexProps & ItemProps> & { Item: typeof Item } = (props) => {
  const { children, ...flexProps } = props;

  return <div css={styles.flex(flexProps)}>{children}</div>;
};

const Item: React.FC<ItemProps> = (props) => {
  const { children, ...itemProps } = props;

  return (
    <div css={styles.item(itemProps)} className="flex-item">
      {children}
    </div>
  );
};

Flex.Item = Item;
