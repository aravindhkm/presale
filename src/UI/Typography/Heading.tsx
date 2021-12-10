import React from 'react';

import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';

type HeadingVariant = 1 | 2 | 3 | 4 | 5 | 6;
type Aligning = 'start' | 'center' | 'end' | 'right' | 'left';
type HeadingProps = {
  level: HeadingVariant;
  colorStyle?: string;
  align?: Aligning;
};

const style = {
  main: (colorStyle: string, align: Aligning) => (theme: ThemeType) =>
    css`
      font-family: 'Rubik', sans-serif;
      font-style: normal;
      font-weight: 700;
      text-align: ${align ? align : 'start'};
      color: ${colorStyle ? colorStyle : theme.colors.text};
      width: 100%;
    `,
  h1: css({
    fontSize: 96,
  }),
  h2: css({
    fontSize: 60,
  }),
  h3: css({
    fontSize: 48,
  }),
  h4: css({
    fontSize: window.screen.width < 350 ? 31 : 34,
  }),
  h5: css({
    fontSize: 24,
  }),
  h6: css({
    fontSize: 20,
  }),
};

const Heading: React.FC<HeadingProps> = ({ level, colorStyle, align, children }) => {
  switch (level) {
    case 1:
      // @ts-ignore
      return <h1 css={[style.h1, style.main(colorStyle, align)]}>{children}</h1>;
    case 2:
      // @ts-ignore
      return <h2 css={[style.h2, style.main(colorStyle, align)]}>{children}</h2>;
    case 3:
      // @ts-ignore
      return <h3 css={[style.h3, style.main(colorStyle, align)]}>{children}</h3>;
    case 4:
      // @ts-ignore
      return <h4 css={[style.h4, style.main(colorStyle, align)]}>{children}</h4>;
    case 5:
      // @ts-ignore
      return <h5 css={[style.h5, style.main(colorStyle, align)]}>{children}</h5>;
    case 6:
      // @ts-ignore
      return <h6 css={[style.h6, style.main(colorStyle, align)]}>{children}</h6>;
  }
};

export default Heading;
