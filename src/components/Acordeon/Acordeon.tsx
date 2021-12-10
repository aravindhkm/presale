import React, { useRef, useState } from 'react';
import { Arrow } from 'components/Icons/Arrow';
import { css } from '@emotion/react';
import Heading from 'UI/Typography/Heading';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { Colors } from 'constants/colors';
import { ThemeType } from 'constants/themes';

type AccordeonProps = {
  title: string;
};

const style = {
  wrapper: (theme: ThemeType) =>
    css({
      width: '100%',
      border: 1,
      outline: 'none',
      borderStyle: 'dashed',
      borderRadius: 45,
      borderColor: theme.colors.borderDashed,
      paddingBottom: 36,
    }),
  button: (isOpened: boolean) =>
    css({
      color: Colors.WHITE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 35,
      textAlign: 'center',
      cursor: 'pointer',
      maxWidth: 140,
      margin: '0 auto',
      '& svg': {
        transform: isOpened ? 'rotate(-90deg)' : 'rotate(90deg)',
        marginLeft: 13,
        transition: 'linear',
        transitionDuration: '0.5s',
        transitionProperty: 'transform',
      },
    }),
  content: (isOpened: boolean, breakpoint: Breakpoint) => css`
    visibility: hidden;
    max-height: ${isOpened ? 300 : 0};
    overflow: hidden;
    opacity: 0;
    transition: all 1.5s ease-in-out;
    margin-top: ${isOpened ? '20px' : 0};
    padding-left: ${breakpoint === 'sm' ? '15px' : '55px'};
    padding-right: ${breakpoint === 'sm' ? '15px' : '35px'};
  `,
  show: (height: number) =>
    css({
      maxHeight: height,
      opacity: 1,
      visibility: 'visible',
    }),
};
export const Accordeon: React.FC<AccordeonProps> = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { breakpoint } = useMedia();
  const toggle = () => setIsOpened(!isOpened);

  const div = useRef<HTMLDivElement>(null);
  return (
    <div css={style.wrapper}>
      <div css={style.button(isOpened)} onClick={toggle}>
        <Heading level={6} colorStyle={Colors.WHITE}>
          {title}
        </Heading>
        <Arrow variant={'icon'} width="8" height="13" />
      </div>
      <div ref={div} css={[style.content(isOpened, breakpoint), isOpened && style.show(div.current.scrollHeight)]}>
        {children}
      </div>
    </div>
  );
};
