import {LANGUAGE_NAMES} from '~utils/constants';
import {useServices} from '~services/translate';

export const useLanguageSettingController = () => {
  const {t} = useServices();
  const getCurrentLanguage = () => {
    if (t.getCurrentLanguage() === 'en') {
      return LANGUAGE_NAMES.ENGLISH;
    } else {
      return LANGUAGE_NAMES.VIETNAMESE;
    }
  };

  const changeLanguage = () => {
    // console.log(LANGUAGE_NAMES.ENGLISH, getCurrentLanguage());
    if (LANGUAGE_NAMES.ENGLISH === getCurrentLanguage()) {
      t.setup('vi');
    } else {
      t.setup('en');
    }
  };

  return {
    getCurrentLanguage,
    changeLanguage,
  };
};
