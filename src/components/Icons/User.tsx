import React from 'react';
import { useTheme } from '@emotion/react';
import { ThemeType } from 'constants/themes';

export const User: React.VFC = () => {
  const theme = useTheme() as ThemeType;
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.6067 5.39343C27.9996 6.78631 29.1045 8.43991 29.8583 10.2598C30.6121 12.0797 31.0001 14.0303 31.0001 16.0001C31.0001 17.9699 30.6121 19.9205 29.8583 21.7404C29.1045 23.5603 27.9996 25.2139 26.6067 26.6068C25.2138 27.9996 23.5602 29.1045 21.7403 29.8584C19.9204 30.6122 17.9699 31.0002 16 31.0002C14.0302 31.0002 12.0796 30.6122 10.2597 29.8584C8.43985 29.1045 6.78625 27.9996 5.39336 26.6068C2.5803 23.7937 0.999939 19.9784 0.999939 16.0001C0.999939 12.0218 2.5803 8.20649 5.39336 5.39343C8.20643 2.58036 12.0218 1 16 1C19.9783 1 23.7936 2.58036 26.6067 5.39343"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.8452 28.0948C24.2052 25.0282 20.5085 22.6665 16.0002 22.6665C11.4919 22.6665 7.79521 25.0282 7.15521 28.0948"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5352 9.13178C20.0207 9.59103 20.4093 10.1429 20.6779 10.7549C20.9464 11.3669 21.0896 12.0265 21.0989 12.6947C21.1082 13.363 20.9834 14.0263 20.732 14.6455C20.4805 15.2647 20.1075 15.8272 19.6349 16.2998C19.1623 16.7724 18.5998 17.1454 17.9806 17.3969C17.3614 17.6483 16.6981 17.7731 16.0298 17.7638C15.3616 17.7545 14.702 17.6113 14.09 17.3427C13.478 17.0742 12.9261 16.6856 12.4669 16.2001C11.5837 15.2523 11.1029 13.9986 11.1257 12.7033C11.1486 11.408 11.6733 10.1721 12.5894 9.25597C13.5055 8.33988 14.7414 7.81514 16.0367 7.79228C17.3321 7.76943 18.5857 8.25025 19.5336 9.13345"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={theme.colors.socialIcons}
      />
    </svg>
  );
};