import React from 'react';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import { DialogProps } from 'UI/Modal/Dialog';
import Heading from 'UI/Typography/Heading';
import { Box } from 'components/Box/Box';
import { Paragraph } from 'UI/Typography/Paragraph';
import { css } from '@emotion/react';
import IMAGES from 'assets';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';

const styles = {
  mainWrapper: (breakpoint: Breakpoint) =>
    css({
      padding: breakpoint === 'sm' ? 0 : '15px 45px',
      textAlign: 'center',
    }),
};

export const LoadingDialog: React.FC<DialogProps> = () => {
  const { breakpoint } = useMedia();

  return (
    <DialogLayout closeButton>
      <DialogLayout.Header>
        <Heading level={4} align={'center'}>
          LOADING
        </Heading>
      </DialogLayout.Header>
      <DialogLayout.Content>
        <div css={styles.mainWrapper(breakpoint)}>
          <Box mB={breakpoint === 'sm' ? 15 : 30} mT={breakpoint === 'sm' ? 15 : 30}>
            <div>
              <Paragraph align={'center'}>please, confirm transaction in your wallet</Paragraph>
            </div>
          </Box>
          <Box pL={35} pR={35}>
            <img style={{ maxWidth: '100%' }} src={IMAGES.loadingModalImg} alt="success-image" />
          </Box>
        </div>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
