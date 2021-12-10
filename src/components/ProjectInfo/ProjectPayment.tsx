import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GetTokenListPricesDocument, useGetTokenListQuery } from 'api/gen/requests';
import { Card } from 'components/Card/Card';
import { Grid } from 'components/Grid/Grid';
import { Button } from 'components/Button/Button';
// import { TextInput } from 'components/Inputs/TextInput';
import { selectUserEthAddress } from 'store/user';
import { Dialog } from 'UI/Modal/Dialog';
import { SelectTokenDialog } from './SelectTokenDialog';
import { apolloClient } from 'api/apolloClient';
// import { BuyTokenDialog } from './BuyTokenDialog';
import { Paragraph } from 'UI/Typography/Paragraph';
// import { Box } from 'components/Box/Box';
import { Colors } from 'constants/colors';
// import { CreateWalletDialog } from 'components/ProjectInfo/CreateWalletDialog';
import { TokenBar } from './TokenBar';
import { Project, Token } from '@types';
import { useTraslate } from 'UI/I18n/I18n';
import Moralis from 'moralis';
import { ErrorDialog } from 'components/ProjectInfo/ErrorDialog';
import { SuccessDialog } from 'components/ProjectInfo/SuccessDialog';
import { LoadingDialog } from 'components/ProjectInfo/LoadingDialog';
// import { selectCurrentDialog, selectDialogs } from 'store/ui/dialogs';

type ProjectPaymentProps = { project: Project };

const selectTokenDialog = new Dialog('selectToken', SelectTokenDialog);
// const buyTokenDialog = new Dialog('buyToken', BuyTokenDialog);
// const createWalletDialog = new Dialog('paymentInfo', CreateWalletDialog);
const successDialog = new Dialog('success', SuccessDialog);
const loadingDialog = new Dialog('loading', LoadingDialog);
const errorDialog = new Dialog('error', ErrorDialog);

export const ProjectPayment: React.FC<ProjectPaymentProps> = ({ project }) => {
  const ethAddress = useSelector(selectUserEthAddress);
  const [hash, setHash] = useState<string | undefined>(null);
  // const dialogs = useSelector(selectDialogs);
  // const currentDialog = useSelector(selectCurrentDialog);

  const translation = useTraslate();

  const [selectedToken, setSelectedToken] = useState<Token | null>();
  const [minSendAmount, setMinSendAmount] = useState<number>();
  const [sendAmount, setSendAmount] = useState<number | string>();
  const [getAmount, setGetAmount] = useState<number>();
  const [sendTokenPrice, setSendTokenPrice] = useState<number>();
  // const [address, setAddress] = useState<string | null>(ethAddress);

  // useEffect(() => {
  //   if (ethAddress) {
  //     setAddress(ethAddress);
  //   }
  // }, [ethAddress]);

  const { loading, error, data } = useGetTokenListQuery();
  if (loading || error) return null;

  const handleSelectClick = async () => {
    try {
      const token = await selectTokenDialog.open(data.tokensList);
      const prices = await apolloClient.query({ query: GetTokenListPricesDocument });

      const nextSendTokenPrice = prices.data.tokenListPrices.data[token.symbol].usd;
      const nextSendAmount = token.minValue / nextSendTokenPrice;
      const nextGetAmount = token.minValue / project.price.token;

      setSelectedToken(token);
      setSendTokenPrice(nextSendTokenPrice);
      setSendAmount(nextSendAmount);
      setMinSendAmount(nextSendAmount);
      setGetAmount(nextGetAmount);
    } catch (e) {
      console.log("ERROR when token select modal close and user didn't select token", e);
      setSelectedToken(null);
      setSendAmount(0);
      setMinSendAmount(0);
      setGetAmount(0);
    }
  };
  const { address } = project;
  //POPUPS handlers
  const handleSuccess = async () => {
    await successDialog.open({ contractAddress: address, blockHash: hash });
  };

  const handleLoading = async () => {
    await loadingDialog.open();
  };

  const handleError = async () => {
    await errorDialog.open();
  };

  // const handleMakePaymentClick = async () => {
  //   if (!selectedToken) {
  //     handleSelectClick();
  //     return;
  //   }
  //   let receiverAddress = address;
  //   if (!receiverAddress) {
  //     receiverAddress = await createWalletDialog.open({
  //       pid: project.pid,
  //       name: selectedToken.name,
  //       chain: selectedToken.chain,
  //       logo: selectedToken.logoURI,
  //     });
  //     if (!receiverAddress) return;
  //   }
  //   const buyTokenDialogResponse = await buyTokenDialog.open({
  //     token: selectedToken,
  //     project,
  //     sendAmount,
  //     getAmount,
  //     receiverAddress,
  //     sendTokenPrice,
  //   });
  //   if (buyTokenDialogResponse) {
  //     successDialog.open();
  //   }
  // };

  const sendAmountChangeHandler = (value: string) => {
    const sendTokensInUSD = Number(value) * sendTokenPrice;
    const nextGetAmount = sendTokensInUSD / project.price.token;
    setGetAmount(nextGetAmount);
    setSendAmount(value);
  };

  const ABI = [
    {
      inputs: [{ internalType: 'contract IBEP20', name: '_token', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: 'address', name: '_user', type: 'address' },
        { indexed: false, internalType: 'uint256', name: '_amount', type: 'uint256' },
      ],
      name: 'BuyToken',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'balances',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'bnbToToken',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'buyTokens', outputs: [], stateMutability: 'payable', type: 'function' },
    {
      inputs: [{ internalType: 'uint256', name: '_tokenPerUsd', type: 'uint256' }],
      name: 'changePrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'claimed',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractBalanceBnb',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getContractTokenBalance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentTime',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getLatestPriceBnb',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxAmount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'minAmount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'preSaleTime',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'priceFeedBnb',
      outputs: [{ internalType: 'contract AggregatorV3Interface', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [
        { internalType: 'uint256', name: '_minAmount', type: 'uint256' },
        { internalType: 'uint256', name: '_maxAmount', type: 'uint256' },
      ],
      name: 'setPreSaleAmount',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_time', type: 'uint256' }],
      name: 'setpreSaleTime',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'soldToken',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [{ internalType: 'contract IBEP20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tokenPerUsd',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_value', type: 'uint256' }],
      name: 'transferFunds',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenAddress', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ];

  const send = async () => {
    const web3 = await Moralis.Web3.enableWeb3();

    // @ts-ignore
    const contract = new web3.eth.Contract(ABI, project.contractAddress);

    const buyTokens = contract.methods.buyTokens().send({
      from: ethAddress,
      // value: 10000000000000000,
      value: Moralis.Units.ETH(sendAmount),
    });
    console.log('ethAddress', ethAddress);
    try {
      handleLoading();
      const receipt = await buyTokens;
      setHash(null);
      await loadingDialog.close();
      handleSuccess();
      console.log(receipt);
    } catch (e) {
      loadingDialog.close();
      handleError();
      console.log('send error', e);
    }
  };

  return (
    <Card>
      <Card.Content>
        <Grid rowGap={{ sm: 15, md: 25 }}>
          <Grid.Item>
            <Card variant="lighten">
              <Card.Content send>
                <TokenBar
                  token={
                    selectedToken
                      ? {
                          logoURI: selectedToken.logoURI,
                          name: selectedToken.name,
                          quantity: sendAmount,
                        }
                      : undefined
                  }
                  onTokenSelect={handleSelectClick}
                  onAmountChange={sendAmountChangeHandler}
                  minAmount={minSendAmount}
                />
                {sendAmount < minSendAmount && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      right: 15,
                    }}
                  >
                    <Paragraph variant="blank" align="end" color={Colors.YELLOW_8}>
                      {translation('page-project-amount-must').toString()} {minSendAmount}
                    </Paragraph>
                  </div>
                )}
              </Card.Content>
            </Card>
          </Grid.Item>
          <Card variant="lighten">
            <Card.Content get>
              <TokenBar token={{ name: project.title, logoURI: project.coinLogo, quantity: getAmount }} />
            </Card.Content>
          </Card>
          {/*// !!!!! DO NOT DELETE  !!!!! //*/}
          {/*<TextInput*/}
          {/*  value={address}*/}
          {/*  onChange={(e) => setAddress(e.target.value)}*/}
          {/*  placeholder={translation('page-project-enter-recipient-address').toString()}*/}
          {/*/>*/}
          {/*<Box mL={30}>*/}
          {/*  <Paragraph variant={'blank'} size={14}>*/}
          {/*    {translation('page-project-leave-blank').toString()}*/}
          {/*  </Paragraph>*/}
          {/*</Box>*/}
          {/*<Button colorText={Colors.WHITE} variant={'primary'} onClick={handleMakePaymentClick} fullWidth>*/}
          {/*  {translation('page-project-make-payment').toString()}*/}
          {/*</Button>*/}

          {/*  Smart Contract btn      */}
          <Button colorText={Colors.WHITE} variant={'primary'} onClick={() => send()} fullWidth>
            Buy
          </Button>
        </Grid>
      </Card.Content>
    </Card>
  );
};
