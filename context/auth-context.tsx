import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  shouldShowOnboarding: boolean;
  logIn: () => void;
  logOut: () => void;
  completeOnboarding: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  shouldShowOnboarding: true,
  logIn: () => {},
  logOut: () => {},
  completeOnboarding: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const router = useRouter();

  const logIn = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    router.replace("/login");
  };

  const completeOnboarding = async () => {
    // Simulate storage write with delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShouldShowOnboarding(false);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Simulate storage read with delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // For demo, always show onboarding
        setShouldShowOnboarding(true);
        // Additional delay for splash screen
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  console.log("isReady", isReady)
  console.log("isLoggedIn", isLoggedIn)

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        shouldShowOnboarding,
        logIn,
        logOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}
