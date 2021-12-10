import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';
import React, { ChangeEvent } from 'react';

type AmountInputProps = {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
};

const styles = {
  input: (theme: ThemeType) => css`
    font-family: 'Rubik', sans-serif;
    width: 100%;
    font-size: 24px;
    background-color: unset;
    border: none;
    color: ${theme.colors.text};
    text-overflow: ellipsis;
    outline: 0;
  `,
};

export const AmountInput: React.FC<AmountInputProps> = (props) => {
  return <input css={styles.input} type="text" {...props} />;
};
