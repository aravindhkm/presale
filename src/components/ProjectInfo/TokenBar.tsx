import React from 'react';
import Heading from 'UI/Typography/Heading';
import { Flex } from 'components/Flex';
import { Paragraph } from 'UI/Typography/Paragraph';
import { AmountInput } from 'components/Inputs/AmoutInput';
import { Token } from '@types';
import { Button } from 'components/Button/Button';
import { Grid } from 'components/Grid/Grid';

type TokenBarProps = {
  token: Pick<Token, 'name' | 'logoURI'> & { quantity: number | string };
  showInformer?: boolean;
  onAmountChange?: (amount: string) => void;
  onTokenSelect?: () => void;
  minAmount?: number;
};

export const TokenBar: React.FC<TokenBarProps> = ({ token, onAmountChange, onTokenSelect, minAmount }) => {
  const enhancedOnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !/^\d+((\.)?\d*)?$/.test(value)) {
      return;
    }

    onAmountChange(value);
  };

  const amountFieldBlurHandler = () => {
    if (Number(token.quantity) < minAmount) {
      return onAmountChange(String(minAmount));
    }
  };

  if (token) {
    const tokenContent = (
      <Flex alignItems={'center'} gap={26}>
        <img src={token.logoURI} alt={`${token.name} logo`} />
        <Paragraph variant={'regular'} size={14}>
          {token.name}
        </Paragraph>
      </Flex>
    );

    return (
      <Grid alignItems="center">
        <Grid.Item colSpan={{ md: 6 }}>
          {onTokenSelect ? (
            <Button variant={'select'} onClick={onTokenSelect}>
              {tokenContent}
            </Button>
          ) : (
            tokenContent
          )}
        </Grid.Item>
        <Grid.Item colSpan={{ md: 6 }}>
          {onAmountChange ? (
            <AmountInput
              name={`${token.name}_amount`}
              value={String(token.quantity)}
              onChange={enhancedOnAmountChange}
              onBlur={amountFieldBlurHandler}
            />
          ) : (
            <Heading level={5}>{token.quantity}</Heading>
          )}
        </Grid.Item>
      </Grid>
    );
  }

  return (
    <Button variant={'select'} onClick={onTokenSelect}>
      Select
    </Button>
  );
};
