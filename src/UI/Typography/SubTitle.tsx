import React from 'react';
import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';

type Level = 1 | 2;

type TitleProps = {
  level: Level;
};

const style = {
  subTitle: (level: Level) => (theme: ThemeType) =>
    css({
      fontFamily: 'Poppins',
      fontSize: level === 1 ? 18 : 16,
      fontWeight: '400',
      color: theme.colors.text,
      textDecoration: 'none',
      ':visited': {
        outline: 'none',
      },
    }),
};

export const SubTitle: React.FC<TitleProps> = ({ level, children }) => (
  <div css={style.subTitle(level)}>{children}</div>
);
