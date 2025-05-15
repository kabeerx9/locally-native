import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useAuth } from "../context/auth-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";
import { useRouter } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { logIn } = useAuth();
  const router = useRouter();

  const handleSignup = () => {
    console.log('signup');
    Keyboard.dismiss();
    logIn();
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className={`flex-1 items-center justify-center px-8 bg-background`}>
              <View className="w-full max-w-sm">
                <View className="items-center mb-12">
                  <View className={`p-5 rounded-full mb-8 ${isDarkColorScheme ? 'bg-gray-800' : 'bg-green-50'}`}>
                    <MaterialIcons
                      name="local-shipping"
                      size={72}
                      color={isDarkColorScheme ? '#4ade80' : '#16a34a'}
                    />
                  </View>
                  <Text className="text-3xl font-bold text-center mb-4">Create Account</Text>
                  <Text className="text-base text-center text-muted-foreground">Join us and start shipping</Text>
                </View>

                <View className="space-y-6 mb-8">
                  <Input
                    placeholder="Full Name"
                    className="bg-background"
                  />
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
                  onPress={handleSignup}
                  className="mb-8"
                >
                  <Text className="text-primary-foreground font-semibold text-lg">Create Account</Text>
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
                  <Text className="text-muted-foreground">Already have an account? </Text>
                  <Text className="font-semibold text-primary underline" onPress={() => router.back()}>Sign In</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
