import i18next from 'i18next';
import {LANGUAGE_NAMES} from '~utils/constants';

export const useLanguageSettingController = () => {
  const getCurrentLanguage = () => {
    if (i18next.language === 'en') {
      return LANGUAGE_NAMES.ENGLISH;
    } else {
      return LANGUAGE_NAMES.VIETNAMESE;
    }
  };

  const changeLanguage = () => {
    // console.log(LANGUAGE_NAMES.ENGLISH, getCurrentLanguage());
    if (LANGUAGE_NAMES.ENGLISH === getCurrentLanguage()) {
      i18next.changeLanguage('vi');
    } else {
      i18next.changeLanguage('en');
    }
  };

  return {
    getCurrentLanguage,
    changeLanguage,
  };
};
