import React from 'react';
import { Button } from 'components/Button/Button';
import { MoonIcon, SunIcon } from 'assets/icons';
import { useThemeSwitcher } from 'UI/ThemeSwitcher/ThemeSwitcher';
import { ThemeType } from 'constants/themes';
import { css } from '@emotion/react';

const style = {
  iconColor: (theme: ThemeType) => css`
    stroke: ${theme.colors.text};
    fill: ${theme.colors.text};
    & path {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
  `,
};

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useThemeSwitcher();

  return (
    <Button
      variant="secondary"
      square
      onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <SunIcon css={style.iconColor} /> : <MoonIcon css={style.iconColor} />}
    </Button>
  );
};
