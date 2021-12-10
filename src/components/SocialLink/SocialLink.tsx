import { css } from '@emotion/react';
import React from 'react';
import { ThemeType } from 'constants/themes';

type SocialLinkProps = {
  link?: string;
};

const style = {
  socialLink: () => (theme: ThemeType) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      width: 32,
      height: 32,
      background: theme.colors.socialLink,
      cursor: 'pointer',
      transition: 'linear',
      transitionDuration: '.3s',
      transitionProperty: 'all',
      paddingLeft: 6,
      paddingRight: 6,
      '&:hover': {
        transform: 'scale(1.1)',
      },
      // '& svg': {
      //   fill: Colors.GRAY_8,
      // },
    }),
};

export const SocialLink: React.FC<SocialLinkProps> = ({ link, children }) => {
  return (
    <a href={link} target="_blank" css={style.socialLink()}>
      {children}
    </a>
  );
};
