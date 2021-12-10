import React from 'react';
import { Flex } from 'components/Flex';
import { css } from '@emotion/react';
import { Colors } from 'constants/colors';
import { useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { CopyToClipboard } from 'components/CopyToClipboard/CopyToClipboard';

type TProps = {
  fieldText: string;
  icon: string;
  border: boolean;
  paddingField?: number;
  borderColor?: string;
};

const styles = {
  tokenField: (border: boolean, paddingField: number, borderColor: string) =>
    css({
      padding: paddingField,
      border: border ? `1px solid` : 'none',
      borderColor: borderColor,
      borderRadius: 20,
    }),
  icon: () =>
    css({
      display: 'block',
      paddingRight: 10,
    }),
  copyButton: () =>
    css({
      background: 'transparent',
    }),
};

export const TokenField: React.FC<TProps> = ({
  fieldText = 'text',
  icon,
  border = true,
  paddingField = 10,
  borderColor = Colors.GRAY_8,
}) => {
  const media = useMedia();

  return (
    <div css={styles.tokenField(border, paddingField, borderColor)}>
      <Flex
        justifyContent={'space-between'}
        flexDirection={media.breakpoint === 'sm' ? 'column' : 'row'}
        alignItems={'center'}
      >
        <img src={icon} alt="payment-icon" css={styles.icon} />
        <CopyToClipboard text={fieldText} width={'100%'} />
      </Flex>
    </div>
  );
};
