import React from 'react';
import { css } from '@emotion/react';
import Heading from 'UI/Typography/Heading';
import { Flex } from 'components/Flex';
import { GitHubIcon, TelegramIcon, WebSiteIcon, YouTubeIcon } from 'assets/icons';
import { SocialLink } from 'components/SocialLink/SocialLink';
import { routes } from 'constants/routes';
import { Button } from 'components/Button/Button';
import { Box } from 'components/Box/Box';
import { Paragraph } from 'UI/Typography/Paragraph';
import { toFixedFromExp } from 'helpers/toFixedFromExp';
import { Chips } from 'components/Chips/Chip';
import { Project } from 'api/gen/requests';
import { ThemeType } from 'constants/themes';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';

const styles = {
  mainWrapper: (theme: ThemeType) =>
    css({
      position: 'relative',
      background: theme.colors.cardBackgroundLighten,
      borderRadius: 27,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    }),
  cardImg: (breakpoint: Breakpoint) =>
    css({
      maxWidth: breakpoint === 'sm' ? 290 : 342,
    }),
  cardContent: () =>
    css({
      padding: 17,
    }),
  chips: () =>
    css({
      position: 'absolute',
      top: 17,
      right: 17,
    }),
};

export const DashboardCard = (props: Project) => {
  const { title, price, social, profileImage, status } = props;
  const { breakpoint } = useMedia();

  return (
    <div css={styles.mainWrapper}>
      <img css={styles.cardImg(breakpoint)} src={profileImage} alt="dashCardIcon" />
      <div css={styles.cardContent}>
        <Flex justifyContent={'space-between'}>
          {/*Card info*/}
          <Flex flexDirection={'column'} alignItems={'center'} flexGrow={2}>
            <Heading level={5} align="start">
              {title}
            </Heading>
            <Box pL={30}>
              <Paragraph variant={'regular'} align={'center'}>
                Token Price
              </Paragraph>
              <Heading level={6} align={'center'}>
                {toFixedFromExp(price.token)}
              </Heading>
              <Box mT={20}>
                <Paragraph align={'center'} variant={'regular'}>
                  Goal
                </Paragraph>
                <Heading level={4} align={'center'}>
                  ${props.price.goal}
                </Heading>
              </Box>
            </Box>
          </Flex>
          {/*Card info END*/}

          {/*Social links*/}
          <Flex flexDirection={'column'}>
            {social.youtube && (
              <Flex.Item>
                <SocialLink link={social.youtube}>
                  <YouTubeIcon />
                </SocialLink>
              </Flex.Item>
            )}
            {social.telegramChat && (
              <Flex.Item>
                <SocialLink link={social.telegramChat}>
                  <TelegramIcon />
                </SocialLink>
              </Flex.Item>
            )}
            {social.github && (
              <Flex.Item>
                <SocialLink link={social.github}>
                  <GitHubIcon />
                </SocialLink>
              </Flex.Item>
            )}
            {social.siteUrl && (
              <Flex.Item>
                <SocialLink link={social.siteUrl}>
                  <WebSiteIcon />
                </SocialLink>
              </Flex.Item>
            )}
          </Flex>
          {/*Social links END*/}
        </Flex>
        <Box mT={12}>
          <Button fullWidth to={routes.PROJECT(props.pid)} variant={'secondary'} updated>
            Buy
          </Button>
        </Box>
      </div>
      <div css={styles.chips}>
        <Chips point={false} text={status} />
      </div>
    </div>
  );
};
