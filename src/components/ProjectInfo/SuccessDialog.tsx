import React from 'react';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import { DialogProps } from 'UI/Modal/Dialog';
import Heading from 'UI/Typography/Heading';
import { Box } from 'components/Box/Box';
import { Paragraph } from 'UI/Typography/Paragraph';
import { css } from '@emotion/react';
import IMAGES from 'assets';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { ThemeType } from 'constants/themes';
import { CopyToClipboard } from 'components/CopyToClipboard/CopyToClipboard';
import { Colors } from 'constants/colors';

const styles = {
  mainWrapper: (breakpoint: Breakpoint) =>
    css({
      padding: breakpoint === 'sm' ? 0 : '15px 45px',
      textAlign: 'center',
    }),
  successButton: (breakpoint: Breakpoint, blockHash: string) => (theme: ThemeType) =>
    css`
      display: inline-block;
      text-align: center;
      width: 100%;
      background: ${blockHash !== null ? theme.colors.primaryButton : Colors.GRAY_8};
      padding: ${breakpoint === 'sm' ? '10px 15px' : '23px'};
      cursor: ${blockHash !== null ? 'pointer' : 'not-allowed'};
      text-decoration: none;
      outline: none;
      border-radius: 100px;
      color: ${Colors.WHITE};
    `,
};
type SuccessDialogProps = {
  contractAddress?: string;
  blockHash?: string;
};

export const SuccessDialog: React.FC<DialogProps<string, SuccessDialogProps>> = ({
  contractAddress,
  blockHash = null,
}) => {
  const { breakpoint } = useMedia();
  console.log(blockHash);
  return (
    <DialogLayout closeButton>
      <DialogLayout.Header>
        <Box mB={breakpoint === 'sm' ? 20 : 30} mT={breakpoint === 'sm' ? 15 : 0}>
          <Heading level={4} align={'center'}>
            Success!
          </Heading>
        </Box>
      </DialogLayout.Header>
      <DialogLayout.Content>
        <div css={styles.mainWrapper(breakpoint)}>
          <Box mB={breakpoint === 'sm' ? 15 : 30}>
            <Paragraph align={'center'}>
              Thank you for the purchase. <br /> You will receive your tokens once the sale ends.
            </Paragraph>
            <Box mT={15}>
              <CopyToClipboard text={contractAddress} />
            </Box>
          </Box>
          <Box mB={breakpoint === 'sm' ? 15 : 30} pL={40} pR={40}>
            <img style={{ maxWidth: '100%' }} src={IMAGES.successModalImg} alt="success-image" />
          </Box>
          <Box>
            <a
              css={styles.successButton(breakpoint, blockHash)}
              href={`https://bscscan.com/tx/${blockHash}/`}
              target={'_blank'}
            >
              Details
            </a>
          </Box>
        </div>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
