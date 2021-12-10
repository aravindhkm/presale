import React from 'react';
import { Link } from 'react-router-dom';
import { useGetNewWalletQuery } from 'api/gen/requests';
import { css } from '@emotion/react';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import { Paragraph } from 'UI/Typography/Paragraph';
import { Box } from 'components/Box/Box';
import { Colors } from 'constants/colors';
import { TokenField } from 'components/TokenField/TokenField';
import { QrCodeInfo } from 'components/QRCodeInfo/QRCodeInfo';
import { Flex } from 'components/Flex';
import { Button } from 'components/Button/Button';
import { useMedia } from 'UI/MediaWatcher/MediaWatcher';
import IMAGES from 'assets';
import { DialogProps } from 'UI/Modal/Dialog';

type PaymentDialogProps = {
  logo: string;
  chain: string;
  pid: string;
  name: string;
};

const style = {
  mainWrapper: () =>
    css({
      textAlign: 'center',
    }),
  link: () =>
    css({
      color: Colors.PRIMARY_4,
    }),
};

type TNewWallet = {
  address: string;
  chain?: string;
  mnemonic: string;
  name?: string;
};

export const CreateWalletDialog: React.FC<DialogProps<string, PaymentDialogProps>> = ({
  pid,
  name,
  chain,
  logo,
  onSubmit,
}) => {
  const media = useMedia();

  const { loading, error, data } = useGetNewWalletQuery({ variables: { chain, pid } });

  if (loading || error) return null;

  const { address, mnemonic }: TNewWallet = data?.getNewWallet;

  return (
    <DialogLayout size={media.breakpoint === 'sm' ? 'small' : 'general'} closeButton>
      <DialogLayout.Content>
        <div css={style.mainWrapper}>
          <h1>GREAT!</h1>
          <Box mT={media.breakpoint === 'sm' ? 10 : 20} mB={media.breakpoint === 'sm' ? 10 : 30}>
            <Paragraph align={'center'}>We have just created a new wallet for you.</Paragraph>
          </Box>
          <Box mB={media.breakpoint === 'sm' ? 10 : 20}>
            <Paragraph align={'center'} color={Colors.GRAY_8}>
              Your {name} Wallet:{' '}
            </Paragraph>
          </Box>
          {address && (
            <Box>
              <TokenField fieldText={address} border icon={logo} />
            </Box>
          )}
          <Box mT={media.breakpoint === 'sm' ? 10 : 35} mB={media.breakpoint === 'sm' ? 10 : 35}>
            <Paragraph align={'center'}>Save the seed phrase so that you can access the wallet later</Paragraph>
          </Box>
          <Box mB={20}>
            <Paragraph align={'center'} color={Colors.GRAY_8}>
              Your {name} Wallet:
            </Paragraph>
          </Box>
          {mnemonic && <QrCodeInfo qrCodeValue={mnemonic} QrText={mnemonic} />}
          <Box mT={20} mB={media.breakpoint === 'sm' ? 15 : 40}>
            <Flex justifyContent={'center'}>
              <img src={IMAGES.checkSuccessIcon} alt="check-success" />
              <Paragraph>I have saved my seed phrase</Paragraph>
            </Flex>
          </Box>
          <Button onClick={() => onSubmit(address)} fullWidth>
            Proceed to payment
          </Button>
          <Box mT={20} mB={media.breakpoint === 'sm' ? 10 : 30}>
            <Flex alignItems={'center'}>
              <img src={IMAGES.infoGreyIcon} alt="info" />
              <Box pL={10}>
                <Paragraph color={Colors.GRAY_8}>
                  If you lose your seed phrase, you will not be able to access <br /> the wallet and recieve the tokens,
                  so your money will be lost.
                </Paragraph>
              </Box>
            </Flex>
          </Box>
          <Box mB={5}>
            <Flex alignItems={'center'}>
              <img src={IMAGES.infoGreyIcon} alt="info" />
              <Box pL={10}>
                <Paragraph color={Colors.GRAY_8}>
                  In order to access your account, you may <br />
                  use{' '}
                  <Link to="#" css={style.link}>
                    Trust Wallet
                  </Link>
                  ,{' '}
                  <Link to="#" css={style.link}>
                    1inch{' '}
                  </Link>
                  or{' '}
                  <Link to="#" css={style.link}>
                    Metamask
                  </Link>
                  .
                </Paragraph>
              </Box>
            </Flex>
          </Box>
        </div>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
