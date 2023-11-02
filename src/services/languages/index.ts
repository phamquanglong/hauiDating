import {I18n, Scope, TranslateOptions} from 'i18n-js';
import vi from './translations/vi';
import en from './translations/en';

export class TranslateService implements IService {
  private inited = false;
  private i18n: I18n | undefined;

  init = async (): PVoid => {
    if (!this.inited) {
      this.setup('en');

      this.inited = true;
    }
  };

  do = (scope: Scope, options?: TranslateOptions): string => {
    return this.i18n?.t(scope, options) || '';
  };

  getCurrentLanguage = (): string => {
    return this.i18n?.locale || '';
  };

  setup = (language?: string): void => {
    if (language === 'en') {
      this.i18n = new I18n({});
      this.i18n.translations = {en};
      this.i18n.enableFallback = true;
      this.i18n.locale = 'en';
    } else {
      this.i18n = new I18n({});
      this.i18n.translations = {vi};
      this.i18n.enableFallback = true;
      this.i18n.locale = 'vi';
      this.i18n.defaultLocale = 'vi';
    }
  };
}
