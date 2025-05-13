import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/auth-context";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  const { isLoggedIn, isReady } = useAuth();


    if(!isReady) return null;

    if(!isLoggedIn){
        return <Redirect href="/login" />
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
