import React from 'react';
import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';

type Level = 1 | 2;

type TitleProps = {
  level: Level;
};

const style = {
  title: (level: Level) => (theme: ThemeType) =>
    css({
      fontFamily: 'Poppins',
      fontSize: level === 1 ? 18 : 16,
      fontWeight: '600',
      color: theme.colors.text,
    }),
};

export const Title: React.FC<TitleProps> = ({ level, children }) => <div css={style.title(level)}>{children}</div>;
