import React from 'react';
import { css } from '@emotion/react';
import QRCode from 'react-qr-code';
import { Flex } from 'components/Flex';
import { Colors } from 'constants/colors';
import { CopyToClipboard } from 'components/CopyToClipboard/CopyToClipboard';

type TProps = {
  QrText: string;
  QrCodeSize?: number;
  qrCodeValue: string;
  pR?: number;
  pL?: number;
  pB?: number;
  pT?: number;
};

const styles = {
  qrCodeWrapper: (pR: number, pL: number, pT: number, pB: number) =>
    css({
      background: Colors.GRAY_18,
      padding: `${pT}px ${pL}px ${pB}px ${pR}px`,
      borderRadius: 20,
    }),
  icon: () =>
    css({
      paddingRight: 10,
    }),
  copyButton: () =>
    css({
      background: 'transparent',
    }),
};

export const QrCodeInfo: React.FC<TProps> = ({
  qrCodeValue,
  // QrText,
  QrCodeSize = 70,
  pR = 30,
  pL = 30,
  pT = 20,
  pB = 20,
}) => {
  return (
    <div css={styles.qrCodeWrapper(pR, pL, pT, pB)}>
      <Flex alignItems={'center'}>
        <CopyToClipboard text={qrCodeValue} />
        <div style={{ marginBottom: -7, marginLeft: 30 }}>
          <QRCode value={qrCodeValue} bgColor={Colors.GRAY_18} fgColor={Colors.WHITE} size={QrCodeSize} />
        </div>
      </Flex>
    </div>
  );
};
