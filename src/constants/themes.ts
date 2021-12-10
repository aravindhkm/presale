import { Colors } from './colors';

export type ThemeName = 'light' | 'dark';

export type ThemeType = typeof darkTheme;

const darkTheme = {
  colors: {
    text: Colors.L_BLUE_17,
    body: Colors.GRAY_20,
    primaryButton: Colors.PRIMARY_4,
    primaryButtonHovered: Colors.L_BLUE_21,
    secondaryButton: Colors.GRAY_18,
    secondaryButtonUpdated: Colors.PRIMARY_4,
    secondaryButtonUpdatedHover: Colors.L_BLUE_21,
    secondaryButtonHovered: Colors.GRAY_17,
    socialLink: Colors.GRAY_20,
    socialLinkIcon: Colors.L_BLUE_17,
    socialIcons: Colors.L_BLUE_17,
    headerBg: Colors.GRAY_21,
    footerBg: Colors.GRAY_21,
    headingSubColor: Colors.L_GRAY,
    cardBackground: Colors.GRAY_18,
    cardBackgroundLighten: Colors.GRAY_17,
    listItemBackground: Colors.GRAY_17,
    borderDashed: Colors.GRAY_18,
    textInputFont: Colors.GRAY_8,
    inputFocusedBorder: Colors.WHITE,
    connectBg: Colors.GRAY_20,
    chipsBg: Colors.GRAY_18,
    chipsText: Colors.GREEN_8,
    informer: Colors.GRAY_16,
    leaveBlank: Colors.GRAY_8,
    addressInputBorder: Colors.GRAY_14,
    selectBorder: Colors.GRAY_18,
    tokenItemHover: Colors.GRAY_14,
    modalCloseBtn: Colors.WHITE,
    referralBtn: Colors.PRIMARY_4,
    textInputPlaceholder: Colors.GRAY_14,
    headerActiveLink: Colors.PRIMARY_4,
  },
};

const lightTheme: ThemeType = {
  colors: {
    body: Colors.L_BLUE_17,
    text: Colors.L_GRAY,
    primaryButton: Colors.L_BLUE_21,
    primaryButtonHovered: Colors.L_BLUE_20,
    secondaryButton: Colors.L_BLUE_18,
    secondaryButtonUpdated: Colors.L_BLUE_21,
    secondaryButtonUpdatedHover: Colors.L_BLUE_20,
    secondaryButtonHovered: Colors.L_BLUE_17,
    socialLink: Colors.L_BLUE_21,
    socialLinkIcon: Colors.L_BLUE_17,
    socialIcons: Colors.L_BLUE_17,
    headerBg: Colors.L_BLUE_21,
    footerBg: Colors.L_BLUE_21,
    headingSubColor: Colors.L_GRAY, //TODO need fined where use
    cardBackground: Colors.WHITE,
    cardBackgroundLighten: Colors.L_BLUE_17,
    listItemBackground: Colors.L_YELLOW,
    borderDashed: Colors.L_BLUE_18,
    textInputFont: Colors.GRAY_18,
    inputFocusedBorder: Colors.GRAY_21,
    connectBg: Colors.L_BLUE_20,
    chipsBg: Colors.L_BLUE_21,
    chipsText: Colors.WHITE,
    informer: Colors.L_BLUE_21,
    leaveBlank: Colors.L_BLUE_21,
    addressInputBorder: Colors.L_BLUE_21,
    selectBorder: Colors.L_BLUE_21,
    tokenItemHover: Colors.L_BLUE_18,
    modalCloseBtn: Colors.L_BLUE_18,
    referralBtn: Colors.L_BLUE_21,
    textInputPlaceholder: Colors.L_GRAY,
    headerActiveLink: Colors.L_GRAY,
  },
};

export const themes: Record<ThemeName, ThemeType> = {
  dark: darkTheme,
  light: lightTheme,
};
