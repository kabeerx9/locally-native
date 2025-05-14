import { View } from "react-native";
import { useAuth } from "../context/auth-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";
import { Link } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function LoginScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { logIn } = useAuth();

  return (
    <View className={`flex-1 items-center justify-center px-8 ${isDarkColorScheme ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="w-full max-w-sm">
        <View className="items-center mb-12">
          <View className={`p-5 rounded-full mb-8 ${isDarkColorScheme ? 'bg-gray-800' : 'bg-green-50'}`}>
            <MaterialIcons
              name="local-shipping"
              size={72}
              color={isDarkColorScheme ? '#4ade80' : '#16a34a'}
            />
          </View>
          <Text className="text-3xl font-bold text-center mb-4">Welcome Back</Text>
          <Text className="text-base text-center text-muted-foreground">Sign in to your account</Text>
        </View>

        <View className="space-y-6 mb-8">
          <Input
            placeholder="Email"
            className="bg-background"
          />
          <Input
            placeholder="Password"
            secureTextEntry
            className="bg-background"
          />
        </View>

        <Button
          onPress={logIn}
          className="mb-8"
        >
          <Text className="text-primary-foreground font-semibold text-lg">Sign In</Text>
        </Button>

        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="mx-4 text-muted-foreground">or continue with</Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        <View className="flex-row space-x-4 mb-8">
          <Button
            variant="outline"
            className="flex-1"
          >
            <MaterialIcons name="mail" size={24} color={isDarkColorScheme ? '#fff' : '#000'} />
          </Button>
          <Button
            variant="outline"
            className="flex-1"
          >
            <MaterialIcons name="phone-android" size={24} color={isDarkColorScheme ? '#fff' : '#000'} />
          </Button>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-muted-foreground">Don't have an account? </Text>
          <Link href="/signup" asChild>
            <Text className="font-semibold text-primary underline">Sign Up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
