import React from 'react';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import { DialogProps } from 'UI/Modal/Dialog';
import { Box } from 'components/Box/Box';
// import { Paragraph } from 'UI/Typography/Paragraph';
import { css } from '@emotion/react';
// import IMAGES from 'assets';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { useTraslate } from 'UI/I18n/I18n';
import { Card } from 'components/Card/Card';
import { Flex } from 'components/Flex';
import { Paragraph } from 'UI/Typography/Paragraph';
import { MetaMaskIcon, WalletConnect } from 'assets/icons';
import { useMoralis } from 'react-moralis';
import { store } from 'store';
import { removeDialog } from 'store/ui/dialogs';

const styles = {
  mainWrapper: (breakpoint: Breakpoint) =>
    css({
      padding: breakpoint === 'sm' ? 0 : 0,
      textAlign: 'center',
    }),
  buttons: css`
    cursor: pointer;
    &:active {
      transform: scale(0.98);
    }
  `,
};

export const ConnectWalletDialog: React.FC<DialogProps> = () => {
  const { breakpoint } = useMedia();
  const t = useTraslate();

  const { authenticate, Moralis } = useMoralis();
  const closeDialog = () => store.dispatch(removeDialog('login'));

  const logInMetaMAsk = async () => {
    await Moralis.Web3.enableWeb3();

    const chainIdHex = await Moralis.Web3.switchNetwork('0x38');
    try {
      closeDialog();
      // @ts-ignore
      await authenticate({ chainId: chainIdHex });
    } catch (e) {
      console.log(e);
    }
  };

  const walletConnect = async () => {
    try {
      closeDialog();
      await authenticate({
        provider: 'walletconnect',
        chainId: 56,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DialogLayout closeButton size={'small'}>
      <DialogLayout.Header>
        <Box mB={breakpoint === 'sm' ? 20 : 30}>
          <Paragraph variant={'semiBold'} align={'start'}>
            {t('header-connect-wallet').toString()}
          </Paragraph>
        </Box>
      </DialogLayout.Header>
      <DialogLayout.Content>
        <div css={styles.mainWrapper(breakpoint)}>
          <div css={styles.buttons} onClick={() => logInMetaMAsk()}>
            <Box mB={breakpoint === 'sm' ? 5 : 16}>
              <Card variant={'lighten'}>
                <Box
                  pT={breakpoint === 'sm' ? 5 : 19.5}
                  pB={breakpoint === 'sm' ? 5 : 19.5}
                  pL={breakpoint === 'sm' ? 5 : 19.5}
                  pR={breakpoint === 'sm' ? 5 : 19.5}
                >
                  <Flex justifyContent={'flex-start'} alignItems={'center'} width={breakpoint === 'sm' ? 250 : 322}>
                    <Flex.Item>
                      <MetaMaskIcon />
                    </Flex.Item>
                    <Flex.Item>
                      <Paragraph variant={'semiBold'}>Meta Mask</Paragraph>
                    </Flex.Item>
                  </Flex>
                </Box>
              </Card>
              {/*<img src={IMAGES.loadingModalImg} alt="success-image" />*/}
            </Box>
          </div>
          <div css={styles.buttons} onClick={() => walletConnect()}>
            <Card variant={'lighten'}>
              <Box
                pT={breakpoint === 'sm' ? 5 : 16}
                pB={breakpoint === 'sm' ? 5 : 16}
                pL={breakpoint === 'sm' ? 5 : 16}
                pR={breakpoint === 'sm' ? 5 : 16}
              >
                <Flex justifyContent={'flex-start'} alignItems={'center'} width={breakpoint === 'sm' ? 250 : 322}>
                  <Flex.Item>
                    <WalletConnect />
                  </Flex.Item>
                  <Flex.Item>
                    <Paragraph variant={'semiBold'}> WalletConnect</Paragraph>
                  </Flex.Item>
                </Flex>
              </Box>
            </Card>
          </div>
        </div>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
