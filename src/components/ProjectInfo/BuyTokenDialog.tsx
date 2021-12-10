import { Project, Token } from '@types';
import { useCreateOrderMutation } from 'api/gen/requests';
import IMAGES from 'assets';
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Flex } from 'components/Flex';
import { Grid } from 'components/Grid/Grid';
import { TokenField } from 'components/TokenField/TokenField';
import { Colors } from 'constants/colors';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import React, { useEffect } from 'react';
import { useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { DialogProps } from 'UI/Modal/Dialog';
import Heading from 'UI/Typography/Heading';
import { Paragraph } from 'UI/Typography/Paragraph';

type BuyTokenDialogProps = {
  project: Project;
  token: Token;
  sendAmount: number | string;
  getAmount: number | string;
  sendTokenPrice: number | string;
  receiverAddress: string;
};

export const BuyTokenDialog: React.FC<DialogProps<boolean, BuyTokenDialogProps>> = ({
  token,
  project,
  sendAmount,
  getAmount,
  sendTokenPrice,
  receiverAddress,
  onSubmit,
}) => {
  const media = useMedia();

  const [createOrder, { data }] = useCreateOrderMutation();

  useEffect(() => {
    createOrder({
      variables: {
        pid: project.pid,
        chain: token.chain,
        decimals: token.decimals,
        symbolPaymentToken: token.symbol,
        sendTokensBuy: String(sendAmount),
        getTokenBuy: String(getAmount),
        priceUsd: String(sendTokenPrice),
        addressReceiverSender: receiverAddress,
      },
    });
  }, []);

  if (!data) return null;

  return (
    <DialogLayout size={media.breakpoint === 'sm' ? 'small' : 'general'} closeButton>
      <DialogLayout.Header>
        <Flex justifyContent="center" alignItems="center">
          <Flex.Item>
            <img src={project.coinLogo} alt={`${project.title} logo`} />
          </Flex.Item>
          <Flex.Item>
            <Heading level={4}>BUY {project.title}</Heading>
          </Flex.Item>
        </Flex>
      </DialogLayout.Header>
      <DialogLayout.Content>
        <Grid rowGap={{ sm: 10, md: 20 }}>
          <Grid.Item>
            <Paragraph>
              Amount: {getAmount} {project.tokenSymbol}
            </Paragraph>
            <Paragraph>Receiver: {receiverAddress}</Paragraph>
          </Grid.Item>
          <Grid.Item>
            Please confirm that you have successfully sent the transaction through the following method. You can pay
            both manually or using a your Metamask Trust Wallet when applicable.
          </Grid.Item>
          <Grid.Item>
            SEND: ${token.name}
            <TokenField fieldText={`${sendAmount}`} icon={token.logoURI} border />
          </Grid.Item>
          <Grid.Item>
            SEND TO:
            <TokenField fieldText={data.createOrder.addressSendTo} icon={token.logoURI} border />
          </Grid.Item>
          <Grid.Item>
            <Button fullWidth onClick={() => onSubmit(true)}>
              Transferred, next
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Flex alignItems={'center'}>
              <img src={IMAGES.infoGreyIcon} alt="info" />
              <Box pL={10}>
                <Paragraph color={Colors.GRAY_8}>
                  If you lose your seed phrase, you will not be able to access <br /> the wallet and recieve the tokens,
                  so your money will be lost.
                </Paragraph>
              </Box>
            </Flex>
          </Grid.Item>
          <Grid.Item>
            <Flex alignItems={'center'}>
              <img src={IMAGES.infoGreyIcon} alt="info" />
              <Box pL={10}>
                <Paragraph color={Colors.GRAY_8}>
                  In case you send a different amount, number of {project.pid} tokens will update accordingly.
                </Paragraph>
              </Box>
            </Flex>
          </Grid.Item>
        </Grid>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
