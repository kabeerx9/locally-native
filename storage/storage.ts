import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys, StorageValues, AppSettings, defaultAppSettings } from '../types';

export class Storage {
  private static instance: Storage;

  private constructor() {}

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  async setItem<T extends StorageKeys>(key: T, value: StorageValues[T]): Promise<void> {
    try {
      // Handle different types of values
      let valueToStore: string;

      if (value === null) {
        valueToStore = '';
      } else if (typeof value === 'boolean') {
        valueToStore = value.toString();
      } else if (typeof value === 'object') {
        valueToStore = JSON.stringify(value);
      } else {
        valueToStore = value as string;
      }

      await AsyncStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      throw error;
    }
  }

  async getItem<T extends StorageKeys>(key: T): Promise<StorageValues[T] | null> {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value === null || value === '') return null;

      // Handle different return types based on the key
      if (key === StorageKeys.ONBOARDING_COMPLETE) {
        return (value === 'true') as unknown as StorageValues[T];
      } else if (key === StorageKeys.APP_SETTINGS) {
        try {
          return JSON.parse(value) as StorageValues[T];
        } catch {
          return null;
        }
      }

      return value as StorageValues[T];
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  async removeItem<T extends StorageKeys>(key: T): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Helper method to initialize settings
  async initSettings(): Promise<void> {
    const settings = await this.getItem(StorageKeys.APP_SETTINGS);
    if (!settings) {
      await this.setItem(StorageKeys.APP_SETTINGS, defaultAppSettings);
    }
  }

  // Helper to update just some settings
  async updateSettings(partialSettings: Partial<AppSettings>): Promise<void> {
    const current = await this.getItem(StorageKeys.APP_SETTINGS) || defaultAppSettings;
    await this.setItem(StorageKeys.APP_SETTINGS, {...current, ...partialSettings});
  }
}

export const storage = Storage.getInstance();
