import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { css } from '@emotion/react';
import { Col } from 'components/OldGrid/Col';
import { Row } from 'components/OldGrid/Row';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { useTraslate } from 'UI/I18n/I18n';
import { ThemeType } from 'constants/themes';
import { Paragraph } from 'UI/Typography/Paragraph';
import { Logo } from 'components/Icons/Logo';
import { ToggleTheme } from 'components/ToggleTheme/ToggleTheme';
import { Box } from 'components/Box/Box';
import { routes } from 'constants/routes';
import { Flex } from 'components/Flex';
import { setEthAddress } from 'store/user';
import { Colors } from 'constants/colors';
import { LocaleSwitcher } from './LocaleSwitcher';
import { UserIcon } from 'assets/icons';
import { Button } from 'components/Button/Button';
import { Dialog } from 'UI/Modal/Dialog';
import { ConnectWalletDialog } from 'components/Header/ConnectWalletDialog';

const style = {
  header: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      background:
        theme.colors.headerBg === '#4D23C7'
          ? `linear-gradient( to right, ${theme.colors.headerBg}, #633ECE)`
          : theme.colors.headerBg,
      paddingTop: breakpoint === 'sm' ? 12 : 28,
      paddingRight: breakpoint === 'sm' ? 12 : breakpoint === 'md' ? 30 : 60,
      paddingBottom: breakpoint === 'sm' ? 12 : 28,
      paddingLeft: breakpoint === 'sm' ? 12 : breakpoint === 'md' ? 30 : 60,
      width: '100%',
    }),
  container: css({ maxWidth: 1440, width: '100%', margin: '0 auto' }),
  headerLinks: (breakpoint: Breakpoint) =>
    css({
      display: 'flex',
      marginBottom: breakpoint === 'sm' ? 32 : 0,
    }),
  headerNav: (breakpoint: Breakpoint) =>
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      marginBottom: breakpoint === 'sm' ? 32 : 0,
    }),
  headerLink: () =>
    css({
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '600',
      fontSize: 14,
      marginRight: '48px',
      outline: 'none',
      '&:focus': 'none',
      textDecoration: 'none',
      color: Colors.WHITE,
      position: 'relative',
    }),
  headerLinkActive: css`
    &:after {
      content: '';
      position: absolute;
      width: calc(100% + 32px);
      height: calc(100% + 12px);
      left: -16px;
      top: -7px;
      border: 1px solid ${Colors.WHITE};
      border-radius: 100px;
    }
  `,
  logo: (breakpoint: Breakpoint) => css`
    margin-right: ${breakpoint === 'sm' && 0};
    margin-bottom: ${breakpoint === 'sm' && 0} !important;
  `,
  connectToWalletContainer: (breakpoint: Breakpoint) =>
    css({
      display: 'flex',
      flexDirection: breakpoint === 'sm' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: breakpoint === 'sm' ? 'flex-start' : 'end',
      // justifyContent: breakpoint === 'sm' ? 'space-between' : 'end',
      marginTop: breakpoint === 'sm' ? '22px' : 'unset',
      marginBottom: breakpoint === 'sm' ? '28px' : 'unset',
      '& svg': {
        stroke: 'white',
        width: 30,
        height: 30,
      },
    }),
  connectToWallet: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.colors.connectBg,
      borderRadius: '100px',
      position: 'relative',
      paddingLeft: '20px',
      marginLeft: breakpoint === 'sm' ? 0 : '29px',
      marginRight: breakpoint === 'sm' ? 13.75 : 0,
      // width: breakpoint === 'sm' && '100%',
    }),
  connectToButton: (theme: ThemeType) => css`
    background-color: ${theme.colors.secondaryButton};
    border: none;
    display: flex;
    width: 186px;
    padding: 10px 22px;
    border-radius: 100px;
    color: #fff;
    position: absolute;
    cursor: pointer;
    right: 0;

    &:hover {
      background-color: ${theme.colors.secondaryButtonHovered};
    }
  `,
  greenPip: () =>
    css({
      backgroundColor: '#53F3C3',
      borderRadius: '100%',
      width: '6px',
      height: '6px',
      marginRight: '4px',
    }),
  arrow: css({
    marginLeft: 10,
  }),
  dropdownMenu: (breakpoint: Breakpoint) =>
    css`
      color: ${breakpoint};
      width: 100%;
      max-height: ${breakpoint === 'md' ? 21 : 0};
      opacity: ${breakpoint === 'md' ? 1 : 0};
      overflow: hidden;
      transition: max-height 0.5s ease-in-out, opacity 1s ease-in;
    `,
  opened: (height: number) => css`
    max-height: ${height + 'px'};
    opacity: 1;
  `,
  headerNavMd: css`
    justify-content: center;
  `,
  headerNavSm: css`
    flex-direction: column;
    align-items: center;
  `,
  headerLinkSm: css`
    padding-right: 0;
    margin-right: 0;
    &:not(:last-child) {
      margin-bottom: 35px;
    }
  `,
  showUserInfo: (isOpened: boolean) =>
    css`
      width: 20px;
      height: 17px;
      position: relative;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.5s ease-in-out;
      -moz-transition: 0.5s ease-in-out;
      -o-transition: 0.5s ease-in-out;
      transition: 0.5s ease-in-out;
      cursor: pointer;

      & span {
        display: block;
        position: absolute;
        height: 3px;
        width: 50%;
        background: ${Colors.WHITE};
        opacity: 1;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
      }
      & span:nth-child(even) {
        left: 50%;
        border-radius: 0 9px 9px 0;
      }
      & span:nth-child(odd) {
        left: 0;
        border-radius: 9px 0 0 9px;
      }
      & span:nth-child(1), span:nth-child(2) {
        top: 0;
      }
      & span:nth-child(3), span:nth-child(4) {
        top: 7px;
      }
      & span:nth-child(5), span:nth-child(6) {
        top: 14px;
      }
      & span:nth-child(1),
      span:nth-child(6) {
        -webkit-transform: ${isOpened && 'rotate(45deg)'};
        -moz-transform: ${isOpened && 'rotate(45deg)'};
        -o-transform: ${isOpened && 'rotate(45deg)'};
        transform: ${isOpened && 'rotate(45deg)'};
      }
      & span:nth-child(2),
      span:nth-child(5) {
        -webkit-transform: ${isOpened && 'rotate(-45deg)'};
        -moz-transform: ${isOpened && 'rotate(-45deg)'};
        -o-transform: ${isOpened && 'rotate(-45deg)'});
        transform: ${isOpened && 'rotate(-45deg)'};
      }
      & span:nth-child(1) {
        left: ${isOpened && '1px'};
        top: ${isOpened && '5px'};
      }
      & span:nth-child(2) {
        left: ${isOpened && 'calc(50% - 3px)'};
        top: ${isOpened && '5px'};
      }
      & span:nth-child(3) {
        left: ${isOpened && '-50%'};
        opacity: ${isOpened && '0'};
      }
      & span:nth-child(4) {
        left: ${isOpened && '100%'};
        opacity: ${isOpened && '0'};
      }
      & span:nth-child(5) {
        left: ${isOpened && '1px'};
        top: ${isOpened && '11px'};
      }
      & span:nth-child(6) {
        left: ${isOpened && 'calc(50% - 3px)'};
        top: ${isOpened && '11px'};
      }
    `,
};

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const translate = useTraslate();
  const { breakpoint } = useMedia();
  const dispatch = useDispatch();

  const div = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Authenticated!!!', user);
      console.log('Authenticated!!!', user.get('ethAddress'));
      dispatch(setEthAddress(user.get('ethAddress')));
    }
  }, [user, isAuthenticated]);

  const [isOpened, setOpened] = useState<boolean>(false);

  const toggleUserInfo = () => setOpened(!isOpened);
  const shutDownHeaderDropdown = () => setOpened(false);

  const loginDialog = new Dialog('login', ConnectWalletDialog);
  const handleLogin = async () => {
    await loginDialog.open();
  };

  return (
    <header css={style.header(breakpoint)}>
      <div css={style.container}>
        <Row justifyContentLg={'space-between'} alignItems={'center'} gap={0}>
          <Col sm={4} md={2} lg={6} textAlign="center" order={1}>
            <div css={style.headerLinks}>
              {/*@ts-ignore*/}
              <a css={[style.headerLink, style.logo(breakpoint)]}>
                <Logo />
              </a>
              <Col lg={9} hideOn={['sm', 'md']}>
                <nav css={style.headerNav}>
                  {/*@ts-ignore*/}
                  <Link to={routes.HOME} css={[style.headerLink, pathname === '/' && style.headerLinkActive]}>
                    {translate('page-home-title').toString()}
                  </Link>
                  <Link
                    to={routes.DASHBOARD}
                    /* @ts-ignore */
                    css={[style.headerLink, pathname.includes(routes.DASHBOARD) && style.headerLinkActive]}
                  >
                    {translate('page-dashboard-title').toString()}
                  </Link>
                  <Link
                    to={routes.LISTING}
                    /* @ts-ignore */
                    css={[style.headerLink, pathname.includes(routes.LISTING) && style.headerLinkActive]}
                  >
                    {translate('page-listing-title').toString()}
                  </Link>
                </nav>
              </Col>
            </div>
          </Col>
          <Col sm={12} md={8} lg={4} textAlign="center" order={breakpoint === 'sm' ? 3 : 1} hideOn={['sm']}>
            <div css={style.connectToWalletContainer(breakpoint)}>
              {user && <UserIcon />}
              <div css={style.connectToWallet(breakpoint)}>
                <Box mR={16} pT={10} pB={10}>
                  <Flex alignItems="center">
                    <div css={style.greenPip()} />
                    <Paragraph variant={'regular'} size={14} color={Colors.WHITE}>
                      BSC
                    </Paragraph>
                  </Flex>
                </Box>
                {isAuthenticated ? (
                  <Button fullWidth variant="secondary" onClick={() => logout()}>
                    logOut
                  </Button>
                ) : (
                  <Button fullWidth variant="secondary" onClick={() => handleLogin()}>
                    {translate('header-connect-wallet').toString()}
                  </Button>
                )}
              </div>
            </div>
          </Col>
          <Col sm={8} md={2} lg={2} order={breakpoint === 'sm' ? 2 : 3} textAlign="center">
            <Row alignItems="center" justifyContentSm="space-between" justifyContentMd="end" justifyContentLg="end">
              <Col sm={5} hideOn={['lg']}>
                <Row alignItems="center" justifyContentSm="center">
                  {breakpoint === 'sm' ? (
                    <div onClick={toggleUserInfo} css={style.showUserInfo(isOpened)}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : null}
                </Row>
              </Col>
              <Col sm={7} md={12}>
                <Row justifyContentSm="end" gap={8}>
                  <Box mL={0}>
                    <LocaleSwitcher />
                  </Box>
                  <Box mL={breakpoint === 'sm' ? 10 : breakpoint === 'md' ? 0 : 24}>
                    <ToggleTheme />
                  </Box>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <div ref={div} css={[style.dropdownMenu(breakpoint), isOpened && style.opened(div.current.scrollHeight)]}>
          <Row gap={0}>
            <Col sm={12} hideOn={['md']}>
              <div css={style.connectToWalletContainer(breakpoint)}>
                {user && <UserIcon />}
                <div css={style.connectToWallet(breakpoint)}>
                  <Box mR={16} pT={10} pB={10}>
                    <Flex alignItems="center">
                      <div css={style.greenPip()} />
                      <Paragraph variant={'regular'} size={14} color={Colors.WHITE}>
                        BSC
                      </Paragraph>
                    </Flex>
                  </Box>
                  {isAuthenticated ? (
                    <Button fullWidth variant="secondary" onClick={() => logout()}>
                      logOut
                    </Button>
                  ) : (
                    <Button fullWidth variant="secondary" onClick={() => handleLogin()}>
                      {translate('header-connect-wallet').toString()}
                    </Button>
                  )}
                </div>
              </div>
            </Col>
            <Col md={12} sm={12}>
              <Box mT={breakpoint === 'md' ? 20 : 0} mB={breakpoint === 'sm' ? 35 : 10}>
                <nav
                  /* @ts-ignore */
                  css={[
                    style.headerNav,
                    breakpoint === 'md' && style.headerNavMd,
                    breakpoint === 'sm' && style.headerNavSm,
                  ]}
                >
                  <Link
                    to={routes.HOME}
                    onClick={shutDownHeaderDropdown}
                    /* @ts-ignore */
                    css={[
                      style.headerLink,
                      breakpoint === 'sm' && style.headerLinkSm,
                      pathname === '/' && style.headerLinkActive,
                    ]}
                  >
                    {translate('page-home-title').toString()}
                  </Link>
                  <Link
                    to={routes.DASHBOARD}
                    onClick={shutDownHeaderDropdown}
                    /* @ts-ignore */
                    css={[
                      style.headerLink,
                      breakpoint === 'sm' && style.headerLinkSm,
                      pathname.includes(routes.DASHBOARD) && style.headerLinkActive,
                    ]}
                  >
                    {translate('page-dashboard-title').toString()}
                  </Link>
                  <Link
                    to={routes.LISTING}
                    onClick={shutDownHeaderDropdown}
                    /* @ts-ignore */
                    css={[
                      style.headerLink,
                      breakpoint === 'sm' && style.headerLinkSm,
                      pathname.includes(routes.LISTING) && style.headerLinkActive,
                    ]}
                  >
                    {translate('page-listing-title').toString()}
                  </Link>
                </nav>
              </Box>
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
};
