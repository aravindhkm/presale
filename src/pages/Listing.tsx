import React from 'react';
import { Page } from 'layout/Page/Page';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { MediaWatcherContextType, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { css } from '@emotion/react';
import IMAGES from 'assets';
import { ThemeType } from 'constants/themes';
import { Colors } from 'constants/colors';
import { TelegramIcon } from 'assets/icons';

import Lottie from 'react-lottie';
import animationData from '../lotties/lf30_editor_7t21ncby.json';

const styles = {
  topSection: (media: MediaWatcherContextType) =>
    css({
      backgroundImage: media.breakpoint === 'sm' ? 'none' : `url(${IMAGES.bgTop})`,
      backgroundSize: 'cover',
      backgroundPosition: '10%, 75%',
      textAlign: 'center',
      maxHeight: '100%',
      minHeight: '76.5vh',
    }),
  mainTitle: (media: MediaWatcherContextType) => (theme: ThemeType) =>
    css({
      paddingTop: media.breakpoint === 'sm' ? 0 : media.breakpoint === 'md' ? 15 : media.breakpoint === 'lg' ? 25 : 35,
      fontSize: media.breakpoint === 'sm' ? 24 : 72,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_GRAY : Colors.WHITE,
      maxWidth: '100%',
      margin: '0 auto',
    }),
  buttonContainer: (media: MediaWatcherContextType) =>
    css({
      paddingTop: media.breakpoint === 'sm' ? 10 : 30,
      paddingBottom: media.breakpoint === 'sm' ? 10 : 30,
    }),
  buttonWrapper: () =>
    css({
      width: 232,
    }),
  robotImg: (media: MediaWatcherContextType) => (theme: ThemeType) =>
    css({
      height: media.breakpoint === 'sm' ? 230 : 462,
      backgroundImage:
        theme.colors.footerBg === '#4D23C7' ? `url(${IMAGES.lightRobotIcon})` : `url(${IMAGES.robotIcon})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center, center',
      margin: 0,
      width: '100%',
    }),
  linksReset: css`
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

export const Listing: React.FC = () => {
  const media = useMedia();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <section css={styles.topSection(media)}>
      <Page>
        <h1 css={styles.mainTitle(media)}>
          To list your token on Anyx
          <br /> please contact us
        </h1>
        <div css={styles.buttonContainer(media)}>
          <Flex
            flexDirection={media.breakpoint === 'sm' ? 'column' : 'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box mR={media.breakpoint === 'sm' ? 0 : 40} mB={media.breakpoint === 'sm' ? 27 : 0}>
              <div css={styles.buttonWrapper}>
                <a css={styles.linksReset} href="https://airtable.com/shrHVMFCw8iRKtHym" target="_blank">
                  <Button fullWidth colorText={Colors.WHITE}>
                    Fill in the form
                  </Button>
                </a>
              </div>
            </Box>
            <div css={styles.buttonWrapper}>
              <a css={styles.linksReset} href="https://t.me/Anyx_admin" target="_blank">
                <Button variant={'primary'} fullWidth colorText={Colors.WHITE}>
                  <span
                    style={{
                      marginRight: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    Telegram
                  </span>
                  <TelegramIcon />
                </Button>
              </a>
            </div>
          </Flex>
        </div>
        <Lottie options={defaultOptions} height={400} width={400} />
        <div css={styles.robotImg(media)} style={{ display: 'none' }} />
      </Page>
    </section>
  );
};
