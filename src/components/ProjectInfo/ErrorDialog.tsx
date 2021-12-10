import React from 'react';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import { Box } from 'components/Box/Box';
import Heading from 'UI/Typography/Heading';
import { Paragraph } from 'UI/Typography/Paragraph';
import IMAGES from 'assets';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { css } from '@emotion/react';

const styles = {
  mainWrapper: (breakpoint: Breakpoint) =>
    css({
      padding: breakpoint === 'sm' ? 0 : '15px 45px',
      textAlign: 'center',
    }),
};

export const ErrorDialog = () => {
  const { breakpoint } = useMedia();

  return (
    <DialogLayout closeButton>
      <DialogLayout.Header>
        <Heading level={4} align={'center'}>
          ! ERROR !
        </Heading>
      </DialogLayout.Header>
      <DialogLayout.Content>
        <div css={styles.mainWrapper(breakpoint)}>
          <Box mB={breakpoint === 'sm' ? 20 : 30}>
            <div>
              <Paragraph align={'center'}>Please try again :)</Paragraph>
            </div>
          </Box>
          <Box mB={breakpoint === 'sm' ? 0 : 30}>
            <img src={IMAGES.errorModalImg} alt="error-image" />
          </Box>
        </div>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
