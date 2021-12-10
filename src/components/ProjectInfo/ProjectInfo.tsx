import React from 'react';
import { Box } from 'components/Box/Box';
import { Paragraph } from 'UI/Typography/Paragraph';
import { SocialLink } from 'components/SocialLink/SocialLink';
import { Flex } from 'components/Flex';
import { Grid } from 'components/Grid/Grid';
import Heading from 'UI/Typography/Heading';
import { useMedia } from 'UI/MediaWatcher/MediaWatcher';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  RssIcon,
  TelegramIcon,
  TwitterIcon,
  WebSiteIcon,
  YouTubeIcon,
} from 'assets/icons';
import { CopyToClipboard } from 'components/CopyToClipboard/CopyToClipboard';
import { toFixedFromExp } from 'helpers/toFixedFromExp';
import { GetProjectQuery } from 'api/gen/requests';
import { ProjectPayment } from './ProjectPayment';
import { Chips } from 'components/Chips/Chip';
import { TokenItem } from 'components/ProjectInfo/TokenItem';

export const ProjectInfo: React.FC<GetProjectQuery['getProject']> = (project) => {
  const { breakpoint } = useMedia();
  return (
    <>
      <Box mB={30}>
        <Grid colGap={breakpoint === 'sm' ? 20 : breakpoint === 'md' ? 30 : 40} rowGap={30}>
          <Grid.Item colStart={1} rowStart={1} colSpan={{ sm: 12, md: 6, lg: 5, xl: 3 }}>
            <TokenItem mainLogo={project.profileImage} title={project.title} coinImg={project.coinLogo} />
          </Grid.Item>
          <Grid.Item
            colStart={breakpoint === 'lg' ? 1 : breakpoint === 'xl' ? 4 : null}
            rowStart={breakpoint === 'lg' ? 2 : breakpoint === 'xl' ? 1 : null}
            colSpan={{ sm: 12, md: 6, lg: 6, xl: 3 }}
          >
            <Grid rowGap={20}>
              <Heading level={4}>{project.title}</Heading>
              {breakpoint === 'sm' ? (
                <Flex.Item flexGrow={1}>
                  <Flex gap={16}>
                    {/*blog: null*/}
                    {/*siteUrl: "https://pandeco.info/eng"*/}
                    {/*twitter: "https://twitter.com/PandecoToken"*/}
                    {/*youtube: "https://www.youtube.com/channel/UCDPQkZPSoRlTGM2BQ9LxXLQ/videos"*/}
                    {project.social?.telegramChat && (
                      <Flex.Item>
                        <SocialLink link={project.social.telegramChat}>
                          <TelegramIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.linkedIn && (
                      <Flex.Item>
                        <SocialLink link={project.social.linkedIn}>
                          <LinkedInIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.github && (
                      <Flex.Item>
                        <SocialLink link={project.social.github}>
                          <GitHubIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.instagram && (
                      <Flex.Item>
                        <SocialLink link={project.social.instagram}>
                          <InstagramIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}

                    {project.social.blog && (
                      <Flex.Item>
                        <SocialLink link={project.social.blog}>
                          <RssIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social.siteUrl && (
                      <Flex.Item>
                        <SocialLink link={project.social.siteUrl}>
                          <WebSiteIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social.twitter && (
                      <Flex.Item>
                        <SocialLink link={project.social.twitter}>
                          <TwitterIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social.youtube && (
                      <Flex.Item>
                        <SocialLink link={project.social.youtube}>
                          <YouTubeIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                  </Flex>
                </Flex.Item>
              ) : null}
              <Grid.Item>
                <Paragraph variant={'regular'} size={14}>
                  Token Price
                </Paragraph>
                <Heading level={4}>${toFixedFromExp(project?.price?.token)}</Heading>
              </Grid.Item>
              <Grid>
                {project.price.raised > 0 && (
                  <Grid.Item colSpan={{ sm: 6, md: 6 }}>
                    <Box mB={breakpoint === 'sm' ? 20 : 15}>
                      <Paragraph variant={'regular'} size={14}>
                        Raised
                      </Paragraph>
                    </Box>
                    <Heading level={6}>${project.price.raised.toLocaleString('de-DE')}</Heading>
                  </Grid.Item>
                )}
                <Grid.Item colSpan={{ sm: 6, md: 6 }}>
                  <Box mB={breakpoint === 'sm' ? 20 : 15}>
                    <Paragraph variant={'regular'} size={14}>
                      Goal
                    </Paragraph>
                  </Box>
                  <Heading level={6}>${project.price.goal.toLocaleString('de-DE')}</Heading>
                </Grid.Item>
              </Grid>
            </Grid>
          </Grid.Item>
          <Grid.Item
            colSpan={breakpoint === 'xl' ? 6 : null}
            rowSpan={breakpoint === 'xl' ? 1 : null}
            colStart={breakpoint === 'xl' ? 1 : null}
            rowStart={breakpoint === 'xl' ? 2 : null}
          >
            <Flex gap={30} alignItems="center" justifyContent={'space-between'} alignSelf={'center'}>
              {breakpoint !== 'sm' ? (
                <Flex.Item>
                  <Flex gap={16} flexWrap="wrap">
                    {project.social?.telegramChat && (
                      <Flex.Item>
                        <SocialLink link={project.social.telegramChat}>
                          <TelegramIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.linkedIn && (
                      <Flex.Item>
                        <SocialLink link={project.social.linkedIn}>
                          <LinkedInIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.github && (
                      <Flex.Item>
                        <SocialLink link={project.social.github}>
                          <GitHubIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.instagram && (
                      <Flex.Item>
                        <SocialLink link={project.social.instagram}>
                          <InstagramIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.blog && (
                      <Flex.Item>
                        <SocialLink link={project.social.blog}>
                          <RssIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.siteUrl && (
                      <Flex.Item>
                        <SocialLink link={project.social.siteUrl}>
                          <WebSiteIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.twitter && (
                      <Flex.Item>
                        <SocialLink link={project.social.twitter}>
                          <TwitterIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                    {project.social?.youtube && (
                      <Flex.Item>
                        <SocialLink link={project.social.youtube}>
                          <YouTubeIcon />
                        </SocialLink>
                      </Flex.Item>
                    )}
                  </Flex>
                </Flex.Item>
              ) : null}
              <Flex.Item>
                <Flex alignItems="center" justifyContent={breakpoint !== 'lg' ? 'flex-end' : 'flex-start'}>
                  <CopyToClipboard text={project.address} />
                </Flex>
              </Flex.Item>
            </Flex>
          </Grid.Item>
          <Grid.Item
            rowSpan={breakpoint === 'lg' ? 2 : breakpoint === 'xl' ? 3 : null}
            colStart={breakpoint === 'lg' ? 6 : breakpoint === 'xl' ? 7 : null}
            rowStart={breakpoint === 'lg' ? 1 : breakpoint === 'xl' ? 1 : null}
            colSpan={{ md: 12, lg: 7, xl: 6 }}
          >
            <ProjectPayment project={project} />
          </Grid.Item>
          <Grid.Item
            colSpan={breakpoint === 'xl' ? 6 : 12}
            rowStart={breakpoint === 'xl' && 3}
            colStart={breakpoint === 'xl' ? 1 : null}
          >
            <Box mB={30}>
              <Flex gap={8} alignItems={'center'}>
                {project.status !== null ? (
                  <>
                    {/*<Flex.Item>*/}
                    {/*  <Chips point={true} text={'chips'} icon={project.chain} />*/}
                    {/*</Flex.Item>*/}
                    <Flex.Item>
                      <Chips point={false} text={project.status} />
                    </Flex.Item>
                    <Flex.Item>
                      <Chips point={false} text={'chips'} icon={project.chain} />
                    </Flex.Item>
                  </>
                ) : null}
                {/* <ReferralButton /> */}
                {/*<Flex.Item>*/}
                {/*  <button>Referal</button>*/}
                {/*</Flex.Item>*/}
              </Flex>
            </Box>
            <Paragraph variant="regular">{project.description}</Paragraph>
          </Grid.Item>
        </Grid>
      </Box>
    </>
  );
};
