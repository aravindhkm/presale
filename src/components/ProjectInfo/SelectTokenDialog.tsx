import React from 'react';
import { DialogLayout } from 'layout/DialogLayout/DialogLayout';
import { Title } from 'UI/Typography/Title';
import { DialogProps } from 'UI/Modal/Dialog';
import { GetTokenListQuery } from 'api/gen/requests';
import { Flex } from 'components/Flex';
import { Paragraph } from 'UI/Typography/Paragraph';
import { Colors } from 'constants/colors';
import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';
import { useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { Token } from '@types';

type TokenRowProps = {
  token: Token;
  onClick: VoidFunction;
};

const styles = {
  selectRow: (theme: ThemeType) => css`
    display: flex;
    padding: 7px 0;
    cursor: pointer;
    position: relative;
    z-index: 0;
    & img {
      display: block;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -10px;
      width: calc(100% + 8px);
      height: calc(100% - 2px);
      border: 1px solid transparent;
      border-radius: 100px;
      transition: all 0.35s ease-in-out;
      z-index: -1;
    }
    &:hover {
      &:before {
        border-color: ${theme.colors.inputFocusedBorder};
        background: ${theme.colors.tokenItemHover};
      }
    }
  `,
  bottomInformer: css`
    padding-top: 7px;
  `,
};

const TokenRow: React.FC<TokenRowProps> = ({ token, onClick }) => {
  const [name, chain] = token.name.split(' ');
  const { breakpoint } = useMedia();
  return (
    <div css={styles.selectRow} onClick={onClick}>
      <Flex alignItems="center" justifyContent="flex-start">
        <Flex.Item width={breakpoint === 'sm' ? 50 : 84}>
          <img src={token.logoURI} alt={`${name} logo`} />
        </Flex.Item>
        <Flex.Item width={breakpoint === 'sm' ? 50 : 80}>
          <Paragraph variant="semiBold">{name}</Paragraph>
        </Flex.Item>
        <Flex.Item width={breakpoint === 'sm' ? 50 : 90}>
          <Paragraph variant="semiBold" color={Colors.GRAY_8}>
            {chain}
          </Paragraph>
        </Flex.Item>
        <Flex.Item width={breakpoint === 'sm' ? 50 : 75}>
          <Paragraph variant="semiBold">${token.minValue}</Paragraph>
        </Flex.Item>
      </Flex>
    </div>
  );
};

export const SelectTokenDialog: React.FC<DialogProps<Token, GetTokenListQuery['tokensList']>> = ({
  data,
  onSubmit,
}) => {
  const { breakpoint } = useMedia();

  const createHandleTokenRowClick = (token: Token) => () => {
    onSubmit(token);
  };

  return (
    <DialogLayout size="small" closeButton>
      <DialogLayout.Header>
        <Title level={2}>Select</Title>
        <div
          style={{
            marginTop: breakpoint === 'sm' ? 15 : 31,
            border: 'none',
            borderBottom: `1px solid ${Colors.GRAY_8}`,
          }}
        >
          <Flex alignItems="center" justifyContent="flex-start">
            <Flex.Item width={breakpoint === 'sm' ? 50 : 84} />
            <Flex.Item width={breakpoint === 'sm' ? 50 : 80}>
              <Paragraph variant="regular" color={Colors.GRAY_8}>
                chain
              </Paragraph>
            </Flex.Item>
            <Flex.Item width={breakpoint === 'sm' ? 50 : 90}>
              <Paragraph variant="regular" color={Colors.GRAY_8}>
                name
              </Paragraph>
            </Flex.Item>
            <Flex.Item width={breakpoint === 'sm' ? 50 : 75}>
              <Paragraph variant="regular" color={Colors.GRAY_8}>
                min
              </Paragraph>
            </Flex.Item>
          </Flex>
        </div>
      </DialogLayout.Header>
      <DialogLayout.Content>
        {data.map((token) => (
          <TokenRow token={token} onClick={createHandleTokenRowClick(token)} key={token.address} />
        ))}
        <div css={styles.bottomInformer}>
          <Paragraph variant={'regular'} size={12} color={Colors.GRAY_8} align={'end'}>
            Minimum investment in USDT
          </Paragraph>
        </div>
      </DialogLayout.Content>
    </DialogLayout>
  );
};
