import React from 'react';
import { css } from '@emotion/react';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';

const styles = {
  container: (breakpoint: Breakpoint) =>
    css({
      paddingRight: breakpoint === 'sm' ? 16 : breakpoint === 'md' ? 30 : 60,
      paddingBottom: breakpoint === 'sm' ? 72 : breakpoint === 'md' ? 45 : breakpoint === 'lg' ? 50 : 60,
      paddingLeft: breakpoint === 'sm' ? 16 : breakpoint === 'md' ? 30 : 60,
      paddingTop: breakpoint === 'sm' ? 16 : breakpoint === 'md' ? 25 : 29,
      width: '100%',
      maxWidth: 1440,
      margin: '0 auto',
    }),
};

export const Page: React.FC = ({ children }) => {
  const { breakpoint } = useMedia();
  return <div css={styles.container(breakpoint)}>{children}</div>;
};
