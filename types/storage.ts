import { AppSettings } from "./settings";

export enum StorageKeys {
    THEME = 'theme',
    TOKEN = 'token',
    ONBOARDING_COMPLETE = 'onboardingComplete',
    APP_SETTINGS = 'appSettings',
  }

  export type StorageValues = {
    [StorageKeys.THEME]: 'light' | 'dark' | 'system';
    [StorageKeys.TOKEN]: string | null;
    [StorageKeys.ONBOARDING_COMPLETE]: boolean;
    [StorageKeys.APP_SETTINGS]: AppSettings | null;
  };
