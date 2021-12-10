import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { css, Global } from '@emotion/react';
import { MoralisProvider } from 'react-moralis';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'api/apolloClient';
import { ThemeType } from 'constants/themes';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { store } from 'store';
import { ThemeSwitcher } from 'UI/ThemeSwitcher/ThemeSwitcher';
import { MediaWatcher } from 'UI/MediaWatcher/MediaWatcher';
import { DialogRoot } from 'UI/Modal/DialogRoot';
import { Routing } from './Routing';

const globalStyles = (theme: ThemeType) => css`
  body {
    background: ${theme.colors.body};
    color: ${theme.colors.text};
    transition: all 0.5s linear;
    min-height: 100vh;
  }
  #modal-overlay {
    //backdrop-filter: blur(32px) opacity(0);
    backdrop-filter: blur(10px) opacity(0);
    -webkit-backdrop-filter: blur(10px) opacity(0);
    transition: backdrop-filter 0.2s;
    &.shown {
      //backdrop-filter: blur(32px) opacity(1);
      backdrop-filter: blur(10px) opacity(1);
      -webkit-backdrop-filter: blur(10px) opacity(1);
    }
  }
`;

// For header/footer sticky when no content
const contentWrapper = () => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const App: React.FC = () => (
  <ReduxProvider store={store}>
    <MediaWatcher>
      <ThemeSwitcher>
        <Global styles={globalStyles} />
        <ApolloProvider client={apolloClient}>
          <MoralisProvider
            appId={process.env.REACT_APP_MORALIS_APPLICATION_ID}
            serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
          >
            <Router>
              <div css={contentWrapper}>
                <div>
                  <Header />
                  <Routing />
                </div>
                <Footer />
              </div>
              <DialogRoot />
            </Router>
          </MoralisProvider>
        </ApolloProvider>
      </ThemeSwitcher>
    </MediaWatcher>
  </ReduxProvider>
);
