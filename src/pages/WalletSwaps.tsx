import React, { useEffect } from 'react';
import { Page } from 'layout/Page/Page';
import { Button } from 'components/Button/Button';
import { Colors } from 'constants/colors';
import { useMoralis } from 'react-moralis';
import { useDispatch } from 'react-redux';
import { setEthAddress } from 'store/user';

export const WalletSwaps = () => {
  const { user, isAuthenticated, authenticate } = useMoralis();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Authenticated!!!', user.get('ethAddress'));
      dispatch(setEthAddress(user.get('ethAddress')));
    }
  }, [user, isAuthenticated]);
  return (
    <Page>
      <div>
        <Button onClick={() => authenticate()} colorText={Colors.PRIMARY_4}>
          Connect wallet
        </Button>
      </div>
    </Page>
  );
};
