import React from 'react';
import { useTheme } from '@emotion/react';
import { ThemeType } from 'constants/themes';

type TProps = {
  variant: 'link' | 'icon';
  onClick?: () => void;
};

export const CopyButton: React.VFC<TProps> = ({ variant = 'icon', onClick }) => {
  const theme = useTheme() as ThemeType;
  console.log(`${variant == 'icon' ? theme.colors.socialLinkIcon : theme.colors.socialLinkIcon}`);
  return (
    <svg onClick={onClick} width="28" height="28" viewBox="0 0 28 28" fill={'none'} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.6668 8.16699V8.16699C11.6668 6.76253 11.6668 6.0603 12.0039 5.55585C12.1498 5.33747 12.3373 5.14997 12.5557 5.00405C13.0601 4.66699 13.7624 4.66699 15.1668 4.66699H19.3335C21.2191 4.66699 22.1619 4.66699 22.7477 5.25278C23.3335 5.83857 23.3335 6.78138 23.3335 8.66699V12.8337C23.3335 14.2381 23.3335 14.9404 22.9964 15.4448C22.8505 15.6632 22.663 15.8507 22.4446 15.9966C21.9402 16.3337 21.238 16.3337 19.8335 16.3337V16.3337"
        stroke="#A2A3B9"
      />
      <rect width="11.6667" height="11.6667" rx="2" transform="matrix(-1 0 0 1 16.3335 11.667)" stroke="#A2A3B9" />
    </svg>
  );
};
