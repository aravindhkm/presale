import React from 'react';
import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';
import { BitcoinNetworkIcon } from 'assets/icons';

const styles = {
  wrapper: (theme: ThemeType) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid ${theme.colors.referralBtn};
    padding: 14px 22px;
    border-radius: 100px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:active {
      transform: scale(0.9);
    }
    & svg,
    & span {
      display: inline-block;
    }
    & span {
      font-size: 14px;
      font-family: Poppins, sans-serif;
      margin-left: 10px;
      color: ${theme.colors.referralBtn};
    }
    & svg path {
      fill: ${theme.colors.referralBtn};
    }
  `,
};
export const ReferralButton: React.FC = () => {
  return (
    <div css={styles.wrapper}>
      <BitcoinNetworkIcon />
      <span>Referral +3%</span>
    </div>
  );
};
