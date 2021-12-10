import React from 'react';
import { css } from '@emotion/react';

type TokenItemProps = {
  mainLogo: string;
  title: string;
  coinImg: string;
};

const styles = {
  wrapper: css`
    position: relative;
    & img {
      max-width: 100%;
    }
  `,
  coin: css`
    display: flex;
    position: absolute;
    top: 0;
    left: 17px;
    transform: translateY(-45%);
  `,
};

export const TokenItem: React.FC<TokenItemProps> = ({ coinImg, mainLogo, title }) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.coin}>
        <img src={coinImg} alt={`${title} coin`} />
      </div>
      <img width="300" src={mainLogo} alt={`${title} logo`} />
    </div>
  );
};
