export type AppSettings = {
    theme: 'light' | 'dark' | 'system';
    pushNotificationsEnabled: boolean;
    language: string;
  };

  export const defaultAppSettings: AppSettings = {
    theme: 'light',
    pushNotificationsEnabled: true,
    language: 'en',
  };
