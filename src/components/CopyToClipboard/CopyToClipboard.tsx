import React, { useRef, useState } from 'react';
import { CopyIcon } from 'assets/icons';
import { css } from '@emotion/react';
import { Colors } from 'constants/colors';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { ThemeType } from 'constants/themes';

type CopyToClipboardProps = {
  text: string;
  width?: string;
};

const style = {
  copyWrapper: (width: string) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${width || 'unset'};
  `,
  text: (breakpoint: Breakpoint) => css`
    display: block;
    font-size: 14px;
    color: ${Colors.GRAY_8};
    overflow-wrap: anywhere;
    margin-right: ${breakpoint === 'sm' ? '55px' : 0};
    text-align: left;
  `,
  icon: css`
    position: relative;
    display: flex;
    cursor: pointer;
    & svg {
      min-width: 20px;
    }
  `,
  copyMessage: (shown: boolean) => (theme: ThemeType) =>
    css`
      position: absolute;
      bottom: 120%;
      right: 0;
      display: flex;
      justify-content: flex-end;
      opacity: ${shown ? 0.75 : 0};
      background: ${theme.colors.cardBackgroundLighten};
      border: 1px solid ${theme.colors.headerBg};
      border-radius: 15px;
      padding: 5px 10px;
      box-sizing: content-box;
      transition: all 0.35s ease-in-out;
      & p {
        white-space: nowrap;
        font-size: 11px;
      }
    `,
  error: css`
    & p {
      color: red;
    }
  `,
};

type CopyMessageProps = {
  shown: boolean;
  error?: boolean;
};

const CopyMessage: React.VFC<CopyMessageProps> = ({ error, shown }) => {
  if (error) {
    return (
      // @ts-ignore
      <div css={[style.copyMessage(shown), style.error]}>
        <p>Something go wrong, address didn't copied.</p>
      </div>
    );
  }
  return (
    <div css={style.copyMessage(shown)}>
      <p>Copy successful !</p>
    </div>
  );
};

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, width }) => {
  const { breakpoint } = useMedia();
  const [isTooltipShown, setShown] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const copyText = useRef<HTMLSpanElement>();

  async function handleCopyText() {
    const cb = navigator.clipboard;
    const paragraph = copyText.current.innerText;
    try {
      await cb.writeText(paragraph);
      setShown(true);
    } catch (e) {
      setError(true);
      setShown(true);
    } finally {
      setTimeout(() => {
        setError(false);
        setShown(false);
      }, 5000);
    }
  }

  return (
    <div css={style.copyWrapper(width)}>
      <span ref={copyText} id={'textForCopy'} css={style.text(breakpoint)}>
        {text}
      </span>
      <div css={style.icon} onClick={handleCopyText}>
        <CopyIcon />
        <CopyMessage error={error} shown={isTooltipShown} />
      </div>
    </div>
  );
};
