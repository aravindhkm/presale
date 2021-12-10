import React from 'react';
import { css } from '@emotion/react';
import { ThemeType } from 'constants/themes';
import { ArrowRightIcon } from 'assets/icons';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { useNavigate, To } from 'react-router-dom';
import { Colors } from 'constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'select';

type ButtonProps = {
  variant?: ButtonVariant;
  onClick?: VoidFunction;
  to?: To;
  square?: boolean;
  updated?: boolean;
  fullWidth?: boolean;
  colorText?: string;
};

const styles = {
  button: (variant: ButtonVariant, fullWidth: boolean, colorText: string) => (theme: ThemeType) =>
    css`
      border: none;
      font-family: ${variant === 'secondary' ? 'Poppins, sans-serif' : 'Rubik'};
      background: ${variant === 'secondary' ? theme.colors.secondaryButton : theme.colors.primaryButton};
      font-size: ${variant === 'secondary' ? '14px' : '20px'};
      font-weight: ${variant === 'secondary' ? '600' : 'bold'};
      color: ${colorText || theme.colors.text};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      padding: ${variant === 'secondary' ? '10px 22px' : '15px 22px'};
      ${fullWidth && 'width: 100%;'}
      white-space: nowrap;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: ${variant === 'secondary'
          ? theme.colors.secondaryButtonHovered
          : theme.colors.primaryButtonHovered};
      }

      &.button_square {
        padding: 0;
        border-radius: 12px;
        height: 40px;
        width: 40px;
        font-weight: 500;
      }

      &.button_secondary_updated {
        background: ${theme.colors.secondaryButtonUpdated};
        color: ${Colors.WHITE};
        font-family: Poppins, sans-serif;
        font-size: 14px;
        font-weight: 600;
        &:hover {
          background: ${theme.colors.secondaryButtonUpdatedHover};
        }
      }
    `,
  select: (fullWidth: boolean, breakpoint: Breakpoint) => (theme: ThemeType) =>
    css`
      border: ${fullWidth ? 'none' : `1px solid ${theme.colors.selectBorder}`};
      border-radius: 30px;
      background: transparent;
      color: ${theme.colors.text};
      display: ${fullWidth ? 'initial' : 'flex'};
      align-items: center;
      padding: ${fullWidth ? '0' : breakpoint === 'sm' ? '16px 15px' : '15px 21px'};
      outline: none;
      cursor: pointer;
      justify-content: space-between;
      gap: 20px;
      min-width: 150px;
      & svg {
        width: 6px;
        height: 10px;
        & path {
          stroke: ${theme.colors.text};
        }
      }
    `,
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  square,
  updated,
  fullWidth,
  onClick = () => {},
  to,
  children,
  colorText,
}) => {
  const { breakpoint } = useMedia();
  const buttonStyle = styles.button(variant, fullWidth, colorText);
  const navigate = useNavigate();
  const enhancedOnClick = () => {
    if (to) {
      navigate(to);
    }
    onClick();
  };
  if (variant === 'select') {
    return (
      <button css={styles.select(fullWidth, breakpoint)} onClick={onClick}>
        {children}
        {!fullWidth ? <ArrowRightIcon /> : null}
      </button>
    );
  }
  return (
    <button
      css={buttonStyle}
      className={`${square ? 'button_square' : ''} ${updated ? 'button_secondary_updated' : ''}`}
      onClick={enhancedOnClick}
    >
      {children}
    </button>
  );
};
