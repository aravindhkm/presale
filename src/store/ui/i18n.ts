import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localTranslations from 'constants/translations.csv';
import { createSelector } from 'reselect';
import { RootState } from 'store';

export type Locale = 'en' | 'ru';

type Translation = { [key: string]: string };

type Translations = { [P in Locale]: Translation };

type I18nSlice = { locale: Locale; translations: Translations };

const locales: Locale[] = ['en', 'ru'];

const selectState = (state: RootState) => state.ui.i18n;

export const selectCurrentLocale = createSelector(selectState, (state) => state.locale);

const selectTranslations = createSelector(selectState, (state) => state.translations);

export const selectCurrentTranslations = createSelector(
  [selectCurrentLocale, selectTranslations],
  (locale, translations) => translations[locale],
);

const initialState: I18nSlice = {
  locale: 'en',
  translations: localTranslations.reduce<Translations>((translations, row) => {
    locales.forEach((locale) => (translations[locale] = { ...translations[locale], [row.key]: row[locale] }));
    return translations;
  }, {} as Translations),
};

const i18nSlice = createSlice({
  name: 'iu/i18n',
  initialState,
  reducers: {
    setCurrentLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },
});

export const i18n = i18nSlice.reducer;

export const { setCurrentLocale } = i18nSlice.actions;
