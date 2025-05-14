import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useAuth } from "../context/auth-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "~/lib/useColorScheme";
import { Link, useRouter } from "expo-router";

export default function SignupScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const { logIn } = useAuth();
  const router = useRouter();

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
          <Text className={`text-3xl font-bold text-center mb-4 ${isDarkColorScheme ? 'text-white' : 'text-gray-900'}`}>
            Create Account
          </Text>
          <Text className={`text-base text-center ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
            Join us and start shipping
          </Text>
        </View>

        <View className="space-y-6 mb-8">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={isDarkColorScheme ? '#9ca3af' : '#6b7280'}
            className={`w-full px-4 py-4 rounded-xl border ${isDarkColorScheme ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={isDarkColorScheme ? '#9ca3af' : '#6b7280'}
            className={`w-full px-4 py-4 rounded-xl border ${isDarkColorScheme ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={isDarkColorScheme ? '#9ca3af' : '#6b7280'}
            secureTextEntry
            className={`w-full px-4 py-4 rounded-xl border ${isDarkColorScheme ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}
          />
        </View>

        <TouchableOpacity
          onPress={logIn}
          className={`${isDarkColorScheme ? 'bg-green-500' : 'bg-green-600'} rounded-xl py-4 w-full mb-8`}
        >
          <Text className="text-white text-center font-semibold text-lg">Create Account</Text>
        </TouchableOpacity>

        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
          <Text className={`mx-4 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
        </View>

        <View className="flex-row space-x-4 mb-6">
          <TouchableOpacity className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border ${isDarkColorScheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <MaterialIcons name="mail" size={24} color={isDarkColorScheme ? '#fff' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border ${isDarkColorScheme ? 'border-gray-700' : 'border-gray-200'}`}>
            <MaterialIcons name="phone-android" size={24} color={isDarkColorScheme ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className={`${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className={`font-semibold ${isDarkColorScheme ? 'text-green-400' : 'text-green-600'}`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
