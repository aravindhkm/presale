import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';
import React, { ChangeEvent } from 'react';

type TextInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const styles = {
  wrapper: (theme: ThemeType) => css`
    outline: none;
    border-radius: 100px;
    padding: 15px 22px;
    width: 100%;
    border: 1px solid ${theme.colors.addressInputBorder};
    &:focus-within {
      border-color: ${theme.colors.inputFocusedBorder};
    }
  `,
  input: (theme: ThemeType) => css`
    width: 100%;
    background-color: unset;
    border: none;
    font-size: 16px;
    color: ${theme.colors.textInputFont};
    text-overflow: ellipsis;
    outline: 0;
    &::placeholder {
      color: ${theme.colors.textInputPlaceholder};
    }
  `,
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div css={styles.wrapper}>
      <fieldset style={{ border: 'none' }}>
        <input css={styles.input} type="text" {...props} />
      </fieldset>
    </div>
  );
};
