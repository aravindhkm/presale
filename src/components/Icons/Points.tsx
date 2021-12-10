import React from 'react';
import { useTheme } from '@emotion/react';
import { ThemeType } from 'constants/themes';

export const Points: React.VFC = () => {
  const theme = useTheme() as ThemeType;
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 12V12C1.895 12 1 11.105 1 10V10C1 8.895 1.895 8 3 8V8C4.105 8 5 8.895 5 10V10C5 11.105 4.105 12 3 12Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 12V12C8.895 12 8 11.105 8 10V10C8 8.895 8.895 8 10 8V8C11.105 8 12 8.895 12 10V10C12 11.105 11.105 12 10 12Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 12V12C15.895 12 15 11.105 15 10V10C15 8.895 15.895 8 17 8V8C18.105 8 19 8.895 19 10V10C19 11.105 18.105 12 17 12Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 19V19C1.895 19 1 18.105 1 17V17C1 15.895 1.895 15 3 15V15C4.105 15 5 15.895 5 17V17C5 18.105 4.105 19 3 19Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 19V19C8.895 19 8 18.105 8 17V17C8 15.895 8.895 15 10 15V15C11.105 15 12 15.895 12 17V17C12 18.105 11.105 19 10 19Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 19V19C15.895 19 15 18.105 15 17V17C15 15.895 15.895 15 17 15V15C18.105 15 19 15.895 19 17V17C19 18.105 18.105 19 17 19Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5V5C1.895 5 1 4.105 1 3V3C1 1.895 1.895 1 3 1V1C4.105 1 5 1.895 5 3V3C5 4.105 4.105 5 3 5Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5V5C8.895 5 8 4.105 8 3V3C8 1.895 8.895 1 10 1V1C11.105 1 12 1.895 12 3V3C12 4.105 11.105 5 10 5Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 5V5C15.895 5 15 4.105 15 3V3C15 1.895 15.895 1 17 1V1C18.105 1 19 1.895 19 3V3C19 4.105 18.105 5 17 5Z"
        stroke={theme.colors.socialIcons}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
