import React from 'react';
import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';

type ParagraphVariant = 'regular' | 'semiBold' | 'blank';
type Decoration = 'lineThrough' | 'underline';
type Aligning = 'center' | 'start' | 'end';

type ParagraphProps = {
  variant?: ParagraphVariant;
  decoration?: Decoration;
  size?: number;
  color?: string;
  align?: Aligning;
};

const textDecorationValues: Record<Decoration, string> = {
  lineThrough: 'line-through',
  underline: 'underline',
};

const style = {
  paragraph: (size: number, color: string, align: Aligning) => (theme: ThemeType) =>
    css({
      fontSize: size || 14,
      color: color || theme.colors.text,
      textAlign: align || 'start',
      wordWrap: 'break-word',
    }),
  regular: css({
    fontFamily: 'Poppins, Open Sans, sans-serif',
    fontWeight: 'normal',
  }),
  semiBold: css({
    fontFamily: 'Poppins, Open Sans, sans-serif',
    fontWeight: 'bold',
  }),
  blank: (size: number) => (theme: ThemeType) =>
    css`
      color: ${theme.colors.leaveBlank};
      font-family: Poppins, sans-serif;
      font-weight: normal;
      font-size: ${size ? size + 'px' : '12px'};
    `,
  decoration: (decoration: Decoration) => css`
    ${decoration && `text-decoration: ${textDecorationValues[decoration]}`};
  `,
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  variant = 'regular',
  color,
  size,
  decoration,
  align,
  // @ts-ignore
}) => <p css={[style.paragraph(size, color, align), style[variant], style.decoration(decoration)]}>{children}</p>;
