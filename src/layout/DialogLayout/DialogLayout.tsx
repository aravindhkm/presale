import React from 'react';
import { css } from '@emotion/react';
import { Card } from 'components/Card/Card';
import { CloseIcon } from 'assets/icons';
import { useSelector } from 'react-redux';
import { selectCurrentDialog } from 'store/ui/dialogs';
import { ThemeType } from 'constants/themes';
import { useMedia } from 'UI/MediaWatcher/MediaWatcher';

const dialogSize = {
  small: 390,
  medium: 450,
  general: 645,
};

const styles = {
  container: (width: number) => css`
    max-width: ${width}px;
    position: relative;
    z-index: 0;
  `,
  container__close: (theme: ThemeType) => css`
    z-index: 1;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.secondaryButton};
    transition: all 0.35s ease-in-out;
    & svg {
      transition: all 0.35s ease-in-out;
    }
    &:hover {
      background-color: ${theme.colors.secondaryButtonHovered};
      & svg path {
        fill: ${theme.colors.modalCloseBtn};
        //stroke: red;
      }
    }
    position: absolute;
    top: 30px;
    right: 30px;
  `,
  header: css`
    padding: 35px 35px 0px;
  `,
  content: css`
    padding: 14px 23px 20px;
  `,
};

type DialogHeaderProps = {
  closeButton?: boolean;
};

const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div css={styles.header}>{children}</div>;
};

const DialogContent: React.FC = ({ children }) => {
  return <div css={styles.content}>{children}</div>;
};

type DialogLayoutProps = {
  size?: keyof typeof dialogSize;
  closeButton?: boolean;
};

type DialogLayoutComponent = React.FC<DialogLayoutProps> & {
  Header: typeof DialogHeader;
  Content: typeof DialogContent;
};

export const DialogLayout: DialogLayoutComponent = ({ children, closeButton, size = 'general' }) => {
  const dialog = useSelector(selectCurrentDialog);
  const { breakpoint } = useMedia();

  const actualSize = breakpoint === 'sm' ? dialogSize.small : dialogSize[size];

  return (
    <div css={styles.container(actualSize)}>
      {closeButton && (
        <div css={styles.container__close} onClick={dialog.props.onClose}>
          <CloseIcon />
        </div>
      )}
      <Card>{children}</Card>
    </div>
  );
};

DialogLayout.Header = DialogHeader;
DialogLayout.Content = DialogContent;
