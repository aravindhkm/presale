import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { Colors } from 'constants/colors';
import IMAGES from 'assets';
import { Flex } from 'components/Flex';
import { ThemeType } from 'constants/themes';

type TProps = {
  width?: number;
  dropFontSize?: number;
  contentFontSize?: number;
  dropText?: string;
  contentText?: string;
  circularVariant?: boolean;
  link?: string;
  pathLink?: string;
};

const style = {
  dropDownWrapper: (width: number) =>
    css({
      width: width ? width : 532,
    }),
  dropdown: (circularVariant: boolean) => (theme: ThemeType) =>
    css({
      padding: circularVariant ? '10px 14px ' : 40,
      background: theme.colors.footerBg === '#4D23C7' ? Colors.L_BLUE_21 : Colors.PRIMARY_4,
      borderRadius: 24,
      boxSizing: 'border-box',
    }),
  dropdownArrow: (show: boolean) =>
    css({
      transform: show ? 'rotate(180deg)' : 'none',
      transition: 'transform .25s ease',
    }),
  dropdownText: (dropFontSize: number) =>
    css({
      fontSize: dropFontSize ? dropFontSize : 34,
      color: Colors.WHITE,
    }),
  dropdownContent: (contentFontSize: number) => (theme: ThemeType) =>
    css({
      fontSize: contentFontSize ? contentFontSize : 14,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_GRAY : Colors.WHITE,
      padding: '10px 40px',
      background: theme.colors.footerBg === '#4D23C7' ? Colors.L_BLUE_17 : Colors.GRAY_18,
      boxShadow: theme.colors.footerBg === '#4D23C7' ? '0px 2px 8px rgba(0, 0, 0, 0.25)' : 'none',
      borderRadius: 24,
      marginTop: 20,
    }),
};

const Dropdown: React.FC<TProps> = ({
  width = 532,
  dropFontSize,
  contentFontSize,
  dropText,
  contentText,
  circularVariant = false,
  link,
  pathLink,
}) => {
  const dropDownWrapper = style.dropDownWrapper(width);
  const dropdownText = style.dropdownText(dropFontSize);
  const dropdownContent = style.dropdownContent(contentFontSize);
  const theme = useTheme() as ThemeType;

  const [show, setShow] = useState<boolean>(false);

  const dropdownArrow = style.dropdownArrow(show);

  const showHandler = () => {
    setShow(!show);
  };

  const Link = (theme: ThemeType) => {
    if (theme.colors.body === '#2C2D3A') {
      return `<a style='color:${Colors.PRIMARY_4};' href='${pathLink}'>${link}</a>`;
    } else {
      return `<a style='color:${Colors.L_GRAY};' href='${pathLink}'>${link}</a>`;
    }
  };

  function createMarkup(link: string, pathLink: string, theme: ThemeType) {
    return {
      __html: link ? contentText.replace(link, Link(theme)) : `<span>${contentText}</span>`,
    };
  }

  return (
    <div css={dropDownWrapper}>
      <div css={style.dropdown(circularVariant)} onClick={showHandler}>
        <Flex justifyContent={'space-between'}>
          <h4 css={dropdownText}>{dropText}</h4>
          <img css={dropdownArrow} src={IMAGES.dropdownArrow} alt="Arrow" />
        </Flex>
      </div>
      {show && <div css={dropdownContent} dangerouslySetInnerHTML={createMarkup(link, pathLink, theme)} />}
    </div>
  );
};

export default Dropdown;
