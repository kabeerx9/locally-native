import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/auth-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";

export default function LoginScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { logIn } = useAuth();

  return (
    <View className={`flex-1 items-center justify-center px-8 ${isDarkColorScheme ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="w-full max-w-sm">
        <View className="items-center mb-16">
          <View className={`p-5 rounded-full mb-8 ${isDarkColorScheme ? 'bg-gray-800' : 'bg-green-50'}`}>
            <MaterialIcons
              name="local-shipping"
              size={72}
              color={isDarkColorScheme ? '#4ade80' : '#16a34a'}
            />
          </View>
          <View>
            <Text className={`text-3xl font-bold text-center mb-3 ${isDarkColorScheme ? 'text-white' : 'text-gray-900'}`}>
              Welcome to Locally
            </Text>
            <Text className={`text-base text-center ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Your local delivery partner. Sign in to continue.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={logIn}
          className={`${isDarkColorScheme ? 'bg-green-500' : 'bg-green-600'} rounded-xl py-4 w-full`}
        >
          <Text className="text-white text-center font-semibold text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
