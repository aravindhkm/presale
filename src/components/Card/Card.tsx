import { css } from '@emotion/react';
import { Grid, WithGridItemProps } from 'components/Grid/Grid';
import { ThemeType } from 'constants/themes';
import React from 'react';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { Colors } from 'constants/colors';
import { useTraslate } from 'UI/I18n/I18n';

type CardVariant = 'regular' | 'lighten';
type CardProps = {
  variant?: CardVariant;
  className?: string;
};

const styles = {
  card: (variant: CardVariant) => (theme: ThemeType) =>
    css`
      border-radius: 24px;
      background-color: ${variant === 'regular' ? theme.colors.cardBackground : theme.colors.cardBackgroundLighten};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    `,
  content: (breakpoint: Breakpoint) => css`
    padding: ${breakpoint === 'sm' ? '20px 15px' : '24px'};
    position: relative;
  `,
  informer: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css`
      background: ${theme.colors.informer};
      color: ${Colors.WHITE};
      font-size: ${breakpoint === 'sm' ? '8px;' : '12px'};
      font-family: Roboto, sans-serif;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: ${breakpoint === 'sm' ? '5px 11px' : '8px 10px'};
      border-radius: 0 0 12px 12px;
      text-transform: uppercase;
    `,
};

type CardContentProps = {
  send?: boolean;
  get?: boolean;
};

const CardContent: React.FC<CardContentProps> = ({ send, get, children }) => {
  const { breakpoint } = useMedia();
  const translation = useTraslate();
  return (
    <div css={styles.content(breakpoint)}>
      {send && <div css={styles.informer(breakpoint)}>{translation('page-project-you-send').toString()}</div>}
      {get && <div css={styles.informer(breakpoint)}>{translation('page-project-you-get').toString()}</div>}
      {children}
    </div>
  );
};

export const Card: React.FC<WithGridItemProps<CardProps>> & { Content: typeof CardContent } = ({
  children,
  variant,
  ...gridItemProps
}) => (
  <Grid.Item css={styles.card(variant)} {...gridItemProps}>
    {children}
  </Grid.Item>
);

Card.Content = CardContent;
