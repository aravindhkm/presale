import React from 'react';
import { ThemeType } from 'constants/themes';
import { css } from '@emotion/react';
import { Colors } from 'constants/colors';
import { BepIcon, ErcIcon, SolanaSmallIcon, TrcIcon } from 'assets/icons';

type ChipsProps = {
  text?: string;
  point?: boolean;
  icon?: React.ReactNode;
};
const style = {
  wrapper: () => (theme: ThemeType) =>
    css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: ${theme.colors.chipsBg};
      color: ${theme.colors.chipsText};
      border-radius: 100px;
      padding: 10px 24px;
    `,
  point: css`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${Colors.YELLOW_8};
    margin-right: 9px;
  `,
  pointText: css`
    color: ${Colors.WHITE};
  `,
  iconWrapper: css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    & span {
      margin-left: 9px;
    }
  `,
};

export const Chips: React.FC<ChipsProps> = ({ text, point, icon }) => {
  console.log(icon);
  if (point) {
    return (
      <div css={style.wrapper()}>
        <div css={style.point} />
        <div css={style.pointText}>Sale Ended</div>
        {icon && null}
      </div>
    );
  }

  return (
    <div css={style.wrapper()}>
      {icon ? (
        <div css={style.iconWrapper}>
          {icon === 'bsc' && (
            <>
              <BepIcon />
              <span>BEP-20</span>
            </>
          )}
          {icon === 'erc' && (
            <>
              <ErcIcon />
              <span>ERC-20</span>
            </>
          )}
          {icon === 'trc' && (
            <>
              <TrcIcon />
              <span>TRC-20</span>
            </>
          )}
          {icon === 'solana' && (
            <>
              <SolanaSmallIcon />
              <span>Solana</span>
            </>
          )}
        </div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};
