import { css } from '@emotion/react';
import React from 'react';

type BoxProps = {
  mT?: number;
  mB?: number;
  mL?: number;
  mR?: number;
  pT?: number;
  pB?: number;
  pL?: number;
  pR?: number;
};

const style = {
  box: (mT: number, mB: number, mL: number, mR: number, pt: number, pB: number, pL: number, pR: number) =>
    css({
      marginTop: mT,
      marginBottom: mB,
      marginLeft: mL,
      marginRight: mR,
      paddingTop: pt,
      paddingBottom: pB,
      paddingLeft: pL,
      paddingRight: pR,
      position: 'relative',
    }),
};
export const Box: React.FC<BoxProps> = ({ mT, mB, mL, mR, pT: pt, pB, pL, pR, children }) => (
  <div css={style.box(mT, mB, mL, mR, pt, pB, pL, pR)}>{children}</div>
);
