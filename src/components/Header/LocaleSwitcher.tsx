import React from 'react';
import { Button } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLocale, setCurrentLocale } from 'store/ui/i18n';

export const LocaleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector(selectCurrentLocale);
  return (
    <>
      {locale === 'en' ? (
        <Button variant={'secondary'} square onClick={() => dispatch(setCurrentLocale('ru'))}>
          En
        </Button>
      ) : (
        <Button variant={'secondary'} square onClick={() => dispatch(setCurrentLocale('en'))}>
          Ru
        </Button>
      )}
    </>
  );
};
