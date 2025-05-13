import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const logIn = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    router.replace("/login");
  };

  useEffect(() => {
    const initAuth = async () => {
      // Simulate a delay for splash screen
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsReady(true);
      SplashScreen.hideAsync();
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
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () =>{
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext
}
