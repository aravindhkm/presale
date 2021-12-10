import { ThemeProvider } from '@emotion/react';
import { LsKeys } from 'constants/lsKeys';
import { ThemeName, themes } from 'constants/themes';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeSwitcherContextType = {
  theme: ThemeName;
  setTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
};

const ThemeSwitcherContext = createContext<ThemeSwitcherContextType>({ theme: 'dark', setTheme: () => {} });

export const useThemeSwitcher = () => useContext(ThemeSwitcherContext);

export const ThemeSwitcher: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>((localStorage.getItem(LsKeys.theme) as ThemeName) ?? 'dark');

  useEffect(() => {
    localStorage.setItem(LsKeys.theme, theme);
  }, [theme]);

  return (
    <ThemeSwitcherContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};
