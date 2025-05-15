import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import ProfileDropdown from '~/components/ProfileDropdown';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { AuthProvider } from '~/context/auth-context';
import { storage } from '~/storage/storage';
import { AppSettings, StorageKeys } from '~/types';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme, setColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    const initApp = async () => {
      await storage.initSettings();
      const settings = await storage.getItem(StorageKeys.APP_SETTINGS);
      if (settings?.theme && settings.theme !== 'system') {
        setColorScheme(settings.theme);
      }
      setIsColorSchemeLoaded(true);
    };
    initApp();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    hasMounted.current = true;
  }, []);

  // Add effect to save theme changes
  React.useEffect(() => {
    if (hasMounted.current) {
      storage.updateSettings({ theme: colorScheme });
    }
  }, [colorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <AuthProvider>

      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen
          name="(protected)"
          options={{
              headerShown: false,
              animation: "none",
            }}
            />
        <Stack.Screen
          name="login"
          options={{
              animation: "none",
            }}
            />
        <Stack.Screen
          name="signup"
          options={{
              animation: "none",
            }}
            />
      </Stack>
      <PortalHost />
        </AuthProvider>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
