import React from 'react';
import { useTheme } from '@emotion/react';
import { ThemeType } from 'constants/themes';

type SvgVariant = {
  variant: 'link' | 'icon';
  width: string;
  height: string;
};

export const Arrow: React.VFC<SvgVariant> = ({ variant, width, height }) => {
  const theme = useTheme() as ThemeType;
  return (
    <svg
      width={width || '8'}
      height={height || '13'}
      viewBox="0 0 8 13"
      fill={`${variant == 'link' ? theme.colors.socialLinkIcon : theme.colors.socialIcons}`}
    >
      <path d="M0 1.42593L4.58 6.0678L0 10.7097L1.41 12.1356L7.41 6.0678L1.41 0L0 1.42593Z" />
    </svg>
  );
};
