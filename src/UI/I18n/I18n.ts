import { useSelector } from 'react-redux';
import { selectCurrentTranslations } from 'store/ui/i18n';

export const useTraslate = () => {
  const translations = useSelector(selectCurrentTranslations);
  return (key: string) => translations[key] || key;
};
