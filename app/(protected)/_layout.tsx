import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/auth-context";
import OnboardingScreen from "~/components/OnboardingScreen";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  const { isLoggedIn, isReady, shouldShowOnboarding } = useAuth();

  if(!isReady) return null;

  if(!isLoggedIn) {
    return <Redirect href="/login" />
  }

  // Show onboarding if needed
  if(shouldShowOnboarding) {
    return <OnboardingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"
      options={{
          headerShown: false,
        }} />
    </Stack>
  );
}
