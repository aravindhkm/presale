import React from 'react';
import { Breakpoint, useMedia } from 'UI/MediaWatcher/MediaWatcher';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Colors } from 'constants/colors';
import { Button } from 'components/Button/Button';
import { Flex } from 'components/Flex';
import { Box } from 'components/Box/Box';
import IMAGES from 'assets';
import Dropdown from 'components/Dropdown/Dropdown';
import { ThemeType } from 'constants/themes';
import { useTraslate } from 'UI/I18n/I18n';
import { routes } from 'constants/routes';

type TQuestion = {
  id: number;
  title: string;
  text: string;
  link?: string;
  pathLink?: string;
};

const dataProblems = (translate: Function) => {
  return [
    {
      id: 0,
      title: translate('landing-problems-idx0-title'),
      text: translate('landing-problems-idx0-text'),
    },
    {
      id: 1,
      title: translate('landing-problems-idx1-title'),
      text: translate('landing-problems-idx1-text'),
    },
    {
      id: 2,
      title: translate('landing-problems-idx2-title'),
      text: translate('landing-problems-idx2-text'),
    },
  ];
};

const dataQuestions = (translate: Function) => {
  return [
    {
      id: 0,
      title: translate('landing-questions-idx0-title'),
      text: translate('landing-questions-idx0-text'),
    },
    {
      id: 1,
      title: translate('landing-questions-idx1-title'),
      text: translate('landing-questions-idx1-text'),
    },
    {
      id: 2,
      title: translate('landing-questions-idx2-title'),
      text: translate('landing-questions-idx2-text'),
    },
    {
      id: 3,
      title: translate('landing-questions-idx3-title'),
      text: translate('landing-questions-idx3-text'),
    },
    {
      id: 4,
      title: translate('landing-questions-idx4-title'),
      text: translate('landing-questions-idx4-text'),
    },
    {
      id: 5,
      title: translate('landing-questions-idx5-title'),
      text: translate('landing-questions-idx5-text'),
      link: translate('landing-questions-idx5-link-text'),
      pathLink: 'project/ANYX',
    },
  ];
};

const style = {
  home: (breakpoint: Breakpoint) =>
    css({
      paddingBottom: breakpoint === 'sm' ? 72 : 173,
      padding: breakpoint === 'sm' ? '0 15px' : 0,
      // maxWidth: 1440,
      // width: '100%',
      // margin: '0 auto',
    }),
  titleH2: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      fontSize: breakpoint === 'sm' ? 24 : 60,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_GRAY : Colors.WHITE,
      textAlign: 'center',
      // margin: breakpoint === 'sm' ? '0 auto' : 0,
    }),
  titleH4: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      fontSize: breakpoint === 'sm' ? 14 : 34,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_GRAY : Colors.WHITE,
    }),
  topSection: (breakpoint: Breakpoint) =>
    css({
      backgroundImage: breakpoint === 'sm' ? 'none' : `url(${IMAGES.bgTop})`,
      backgroundSize: 'cover',
      backgroundPosition: '10%, 75%',
      textAlign: 'center',
      paddingBottom: breakpoint === 'sm' ? 48 : 261,
    }),
  mainTitle: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      maxWidth: 1000,
      width: '100%',
      margin: '0 auto',
      paddingTop: breakpoint === 'sm' ? 40 : 160,
      fontSize: breakpoint === 'sm' ? 24 : 96,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_GRAY : Colors.WHITE,
    }),
  buttonContainer: (breakpoint: Breakpoint) =>
    css({
      height: 231,
      backgroundImage: breakpoint === 'sm' ? 'none' : `url(${IMAGES.circularIcon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center, center',
      paddingTop: breakpoint === 'sm' ? 40 : 85,
      paddingBottom: breakpoint === 'sm' ? 80 : 86,
    }),
  buttonWrapper: () =>
    css({
      width: 232,
    }),
  robotImg: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      height: breakpoint === 'sm' ? 230 : 462,
      // lightRobotIcon
      backgroundImage:
        theme.colors.footerBg === '#4D23C7' ? `url(${IMAGES.lightRobotIcon})` : `url(${IMAGES.robotIcon})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center, center',
      margin: 0,
      width: '100%',
    }),
  line: (breakpoint: Breakpoint) =>
    css({
      width: 120,
      height: 1,
      background: Colors.PRIMARY_4,
      display: breakpoint === 'sm' ? 'none' : 'block',
    }),
  problemsSection: (breakpoint: Breakpoint) =>
    css({
      marginTop: breakpoint === 'sm' ? 48 : -130,
      marginBottom: breakpoint === 'sm' ? 10 : 160,
    }),
  roundBlock: (breakpoint: Breakpoint) =>
    css({
      position: 'relative',
      width: breakpoint === 'sm' ? 60 : 100,
      height: breakpoint === 'sm' ? 60 : 100,
      borderRadius: '50%',
      border: `1px solid ${Colors.GRAY_17}`,
      marginRight: breakpoint === 'sm' ? 0 : 88,
    }),
  roundNumber: (theme: ThemeType) =>
    css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_BLUE_21 : Colors.PRIMARY_4,
      fontSize: 14,
    }),
  problemContent: (breakpoint: Breakpoint) =>
    css({
      width: breakpoint === 'sm' ? '100%' : 580,
    }),
  problemText: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      width: breakpoint === 'sm' ? '100%' : 520,
      marginTop: breakpoint === 'sm' ? 10 : 40,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.GRAY_8 : Colors.WHITE,
    }),
  questionsSection: (breakpoint: Breakpoint) =>
    css({
      position: 'relative',
      backgroundImage: breakpoint === 'sm' ? 'none' : `url(${IMAGES.moonBg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 0',
      marginTop: breakpoint === 'sm' ? 10 : 160,
      marginBottom: breakpoint === 'sm' ? 60 : 160,
    }),
  questionBg: (breakpoint: Breakpoint) =>
    css({
      display: breakpoint === 'sm' || breakpoint === 'md' ? 'none' : 'block',
      textAlign: 'center',
      marginBottom: -300,
    }),
  circularShadow: (breakpoint: Breakpoint) =>
    css({
      display: breakpoint === 'sm' || breakpoint === 'md' ? 'none' : 'block',
      width: 1502,
      height: 1502,
      background: `radial-gradient(50% 50% at 50% 50%, rgba(72, 157, 254, 0.3) 0%, rgba(72, 157, 254, 0) 100%)`,
      position: 'absolute',
      left: '-55%',
      top: '-25%',
    }),
  dropdownWrapper: (breakpoint: Breakpoint) =>
    css({
      marginBottom: breakpoint === 'sm' ? 19 : 40,
    }),
  //  Bottom Block
  adminBlock: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      maxWidth: 1095,
      width: '100%',
      textAlign: 'center',
      padding: breakpoint === 'sm' ? '18px 20px 39px 20px' : '80px 0',
      background:
        theme.colors.footerBg === '#4D23C7' ? `${Colors.L_BLUE_17}` : `${Colors.GRAY_18} url(${IMAGES.adminBlockBg})`,
      boxShadow: theme.colors.footerBg === '#4D23C7' ? '0px 2px 8px rgba(0, 0, 0, 0.25)' : 'none',

      backgroundRepeat: 'no-repeat',
      borderRadius: 24,
      marginBottom: breakpoint === 'sm' ? 59 : 173,
    }),
  adminTitle: (breakpoint: Breakpoint) =>
    css({
      fontSize: breakpoint === 'sm' ? 20 : 34,
    }),
  adminDescription: (breakpoint: Breakpoint) =>
    css({
      width: breakpoint === 'sm' ? '100%' : 450,
      textAlign: 'center',
      margin: '0 auto',
      marginBottom: breakpoint === 'sm' ? 57 : 50,
      marginTop: breakpoint === 'sm' ? 15 : 0,
      fontSize: 14,
    }),
  adminLogo: (breakpoint: Breakpoint) => (theme: ThemeType) =>
    css({
      width: breakpoint === 'sm' ? 'auto' : 690,
      fontSize: breakpoint === 'sm' ? 20 : 96,
      color: theme.colors.footerBg === '#4D23C7' ? Colors.L_BLUE_21 : Colors.PRIMARY_4,
      paddingBottom: breakpoint === 'sm' ? 0 : 27,
      borderBottomStyle: breakpoint === 'sm' ? 'none' : 'dotted',
      margin: '0 auto',
    }),
};

export const Landing: React.FC = () => {
  const { breakpoint } = useMedia();
  const navigate = useNavigate();
  const translate = useTraslate();

  const tokenHandler = () => {
    navigate(routes.LISTING);
  };

  const buyHandler = () => {
    navigate(routes.PROJECT('ANYX'));
  };

  const goToTelegram = () => {
    window.open('https://t.me/anyx_admin');
  };

  return (
    <div css={style.home(breakpoint)}>
      <section css={style.topSection(breakpoint)}>
        <h1 css={style.mainTitle(breakpoint)}>{translate('landing-main-title')}</h1>
        <div css={style.buttonContainer(breakpoint)}>
          <Flex flexDirection={breakpoint === 'sm' ? 'column' : 'row'} justifyContent={'center'} alignItems={'center'}>
            <Box mR={breakpoint === 'sm' ? 0 : 40} mB={breakpoint === 'sm' ? 27 : 0}>
              <div css={style.buttonWrapper}>
                <Button fullWidth onClick={tokenHandler} colorText={Colors.WHITE}>
                  {translate('landing-token-button')}
                </Button>
              </div>
            </Box>
            <div css={style.buttonWrapper}>
              <Button fullWidth onClick={buyHandler} colorText={Colors.WHITE}>
                {translate('landing-buy-button')}
              </Button>
            </div>
          </Flex>
        </div>

        <div css={style.robotImg(breakpoint)} />
      </section>

      {/*Problems Block*/}
      <section css={style.problemsSection(breakpoint)}>
        <Flex alignItems={'center'} justifyContent={breakpoint === 'xl' ? 'center' : 'flex-start'}>
          <div css={style.line(breakpoint)} />
          <Box mL={breakpoint === 'sm' ? 0 : 54}>
            <h2 css={style.titleH2(breakpoint)}>{translate('landing-problems-title')}</h2>
          </Box>
        </Flex>
        <Flex justifyContent={'center'}>
          <Box mT={breakpoint === 'sm' ? 20 : 160} mL={breakpoint === 'sm' ? 0 : 173}>
            <Flex flexDirection={'column'}>
              {dataProblems(translate).map(({ id, title, text }: TQuestion) => (
                <div key={id}>
                  <Flex
                    flexDirection={breakpoint === 'sm' || breakpoint === 'md' ? 'column' : 'row'}
                    alignItems={breakpoint === 'sm' ? 'center' : 'flex-start'}
                  >
                    <div css={style.roundBlock(breakpoint)}>
                      <div css={style.roundNumber}>0{id + 1}</div>
                    </div>
                    <div css={style.problemContent(breakpoint)}>
                      <Flex flexDirection={'column'}>
                        <h4 css={style.titleH4(breakpoint)}>{title}</h4>
                        <div css={style.problemText(breakpoint)}>
                          <span>{text}</span>
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </div>
              ))}
            </Flex>
          </Box>
        </Flex>
      </section>
      {/*Problems Block END*/}

      <div css={style.questionBg(breakpoint)}>
        <img src={IMAGES.questionBg} alt="questionBg" />
      </div>

      {/*Questions Block*/}
      <section css={style.questionsSection(breakpoint)}>
        <div css={style.circularShadow(breakpoint)} />
        <Flex alignItems={'center'} justifyContent={breakpoint === 'xl' ? 'center' : 'flex-start'}>
          <div css={style.line(breakpoint)} />
          <Box mL={breakpoint === 'sm' ? 0 : 54}>
            <h2 css={style.titleH2(breakpoint)}>{translate('landing-questions-title')}</h2>
          </Box>
        </Flex>
        <Box mT={breakpoint === 'sm' ? 20 : 64}>
          <Flex flexDirection={'column'} alignItems={'center'}>
            {dataQuestions(translate)?.map(({ id, title, text, link, pathLink }: TQuestion) => (
              <div key={id} css={style.dropdownWrapper(breakpoint)}>
                <Dropdown
                  width={breakpoint === 'sm' && 300}
                  dropFontSize={breakpoint === 'sm' && 14}
                  dropText={title}
                  contentText={text}
                  circularVariant={breakpoint === 'sm'}
                  link={link}
                  pathLink={pathLink}
                />
              </div>
            ))}
          </Flex>
        </Box>
      </section>
      {/*Questions Block END*/}

      {/*Admin Block*/}
      <section>
        <Flex justifyContent={'center'}>
          <div css={style.adminBlock(breakpoint)}>
            <Flex justifyContent={'center'} flexDirection={'column'}>
              <h4 css={style.adminTitle(breakpoint)}>{translate('landing-admin-card-title')}</h4>
              <div css={style.adminDescription(breakpoint)}>{translate('landing-admin-description')}</div>
              <h1 onClick={goToTelegram} css={style.adminLogo(breakpoint)}>
                @Anyx_admin
              </h1>
            </Flex>
          </div>
        </Flex>
      </section>
    </div>
  );
};
