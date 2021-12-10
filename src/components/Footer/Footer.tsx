import { Col } from 'components/OldGrid/Col';
import { Row } from 'components/OldGrid/Row';
import React from 'react';
import { SocialLink } from 'components/SocialLink/SocialLink';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { css } from '@emotion/react';

import { useTraslate } from 'UI/I18n/I18n';
import { ThemeType } from 'constants/themes';
import { Colors } from 'constants/colors';

import { Box } from 'components/Box/Box';
import { Paragraph } from 'UI/Typography/Paragraph';
import { Arrow } from 'components/Icons/Arrow';
import { Accordeon } from 'components/Acordeon/Acordeon';
import { TelegramIcon, TwitterIcon } from 'assets/icons';
import { Link, useLocation } from 'react-router-dom';
import { routes } from 'constants/routes';

const style = {
  footer: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      background:
        theme.colors.footerBg === '#4D23C7'
          ? `linear-gradient( to right, ${theme.colors.footerBg}, #633ECE)`
          : theme.colors.footerBg,
      paddingTop: breakpoint === 'sm' ? 38 : 40,
      paddingRight: breakpoint === 'sm' ? 16 : breakpoint === 'md' ? 30 : 108,
      paddingLeft: breakpoint === 'sm' ? 16 : breakpoint === 'md' ? 30 : 88,
      width: '100%',
    }),
  container: css({ maxWidth: 1440, width: '100%', margin: '0 auto' }),
  socialsWrapper: (breakpoint: Breakpoint) =>
    css({
      display: 'flex',
      justifyContent: breakpoint === 'sm' ? 'center' : 'flex-start',
      marginBottom: breakpoint === 'sm' ? 32 : 0,
    }),
  poweredBy: (breakpoint: Breakpoint) =>
    css({
      display: 'flex',
      height: '100%',
      flexDirection: breakpoint === 'sm' ? 'column' : 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: ['0', 'auto'],
      // paddingTop: media.breakpoint !== 'sm' ? 10 : 0,
    }),
  infoWrapper: (breakpoint: Breakpoint) =>
    css({
      display: 'flex',
      flexDirection: breakpoint === 'sm' ? 'column' : 'row',
      justifyContent: breakpoint === 'sm' ? 'flex-start' : 'space-between',
      alignItems: breakpoint === 'sm' ? 'center' : 'center',
      height: '100%',
    }),
  arrow: css({
    marginLeft: 10,
  }),
  footerLink: () =>
    css({
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '600',
      fontSize: 14,
      outline: 'none',
      '&:focus': 'none',
      textDecoration: 'none',
      color: Colors.WHITE,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '& svg': {
        marginLeft: 13,
      },
    }),
  footerLinkActive: css`
    border: 1px solid ${Colors.WHITE};
    border-radius: 100px;
    padding: 5px 15px;
  `,
  linksReset: css`
    color: ${Colors.WHITE};
    font-size: 14px;
    font-family: PoppinsRegular, sans-serif;
    margin-left: 5px;
    cursor: pointer;
    &:link,
    &:visited,
    &:focus,
    &:hover,
    &:active {
      outline: none;
      text-decoration: none;
    }
  `,
};

export const Footer: React.FC = () => {
  const translate = useTraslate();
  const { breakpoint } = useMedia();
  const { pathname } = useLocation();

  const socialMediaHandler = (media: string) => {
    switch (media) {
      case 'telegram': {
        return window.open('https://t.me/anyxapp');
      }
      case 'twitter': {
        return window.open('https://twitter.com/AnyxApp');
      }
    }
  };

  return (
    <footer css={style.footer(breakpoint)}>
      <div css={style.container}>
        <Row justifyContentLg={'center'}>
          <Col sm={12} md={6} lg={4} order={breakpoint === 'sm' ? 3 : 1} textAlign="center">
            <div css={style.socialsWrapper(breakpoint)}>
              <Box mR={16}>
                <div onClick={() => socialMediaHandler('telegram')}>
                  <SocialLink link="here would be social link">
                    <TelegramIcon />
                  </SocialLink>
                </div>
              </Box>
              <Box mB={breakpoint === 'sm' ? 40 : 0}>
                <div onClick={() => socialMediaHandler('twitter')}>
                  <SocialLink>
                    <TwitterIcon />
                  </SocialLink>
                </div>
              </Box>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} order={2} textAlign="center">
            <div css={style.infoWrapper(breakpoint)}>
              <Box mB={breakpoint === 'sm' ? 21 : 0}>
                {/*@ts-ignore*/}
                <Link
                  to={routes.HOME}
                  /* @ts-ignore  */
                  css={[style.footerLink, pathname.includes('/products') && style.footerLinkActive]}
                >
                  {translate('page-products-title').toString().toUpperCase()}
                </Link>
              </Box>
              <Box mB={breakpoint === 'sm' ? 21 : 0}>
                <Link
                  to={routes.HOME}
                  /* @ts-ignore */
                  css={[style.footerLink, pathname.includes('/resources') && style.footerLinkActive]}
                >
                  {translate('page-resources-title').toString().toUpperCase()}
                  <Arrow variant="icon" css={style.arrow} width="8" height="13" />
                </Link>
              </Box>
              <Box mB={breakpoint === 'sm' ? 39 : 0}>
                <Link
                  to={routes.HOME}
                  /* @ts-ignore  */
                  css={[style.footerLink, pathname.includes('/company') && style.footerLinkActive]}
                >
                  {translate('page-company-title').toString().toUpperCase()}
                </Link>
              </Box>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} order={breakpoint === 'lg' ? 3 : 4} textAlign="center">
            <div css={style.poweredBy(breakpoint)}>
              <Paragraph
                variant="regular"
                size={14}
                align={breakpoint === 'sm' ? 'center' : 'end'}
                color={Colors.WHITE}
              >
                {translate('common-all-rights-reserved')}
              </Paragraph>
              <Paragraph
                variant="regular"
                size={14}
                align={breakpoint === 'sm' ? 'center' : 'end'}
                color={Colors.WHITE}
              >
                <a href=" https://onex.agency/" target="_blank" css={style.linksReset}>
                  Onex
                </a>
              </Paragraph>
            </div>
          </Col>

          <Col order={breakpoint === 'sm' ? 1 : 4}>
            <Box mT={breakpoint === 'sm' ? 0 : 45} mB={breakpoint === 'sm' ? 40 : 45}>
              <Accordeon title="Disclaimer">
                <>
                  <Box mB={12}>
                    <Paragraph variant="semiBold" color={Colors.WHITE}>
                      {translate('common-no-advice')}
                    </Paragraph>
                  </Box>
                  <Box mB={34}>
                    <Paragraph variant="regular" color={Colors.WHITE}>
                      {/*@ts-ignore */}
                      {translate('common-description-no-advice')}
                    </Paragraph>
                  </Box>
                  <Box mB={12}>
                    <Paragraph variant="semiBold" color={Colors.WHITE}>
                      {translate('common-risk-warnings')}
                    </Paragraph>
                  </Box>
                  <Box>
                    <Paragraph variant="regular" color={Colors.WHITE}>
                      {/*@ts-ignore */}
                      {translate('common-description-risk-warnings')}
                    </Paragraph>
                  </Box>
                </>
              </Accordeon>
            </Box>
          </Col>
        </Row>
      </div>
    </footer>
  );
};
