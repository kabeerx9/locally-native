import { View, Text, TouchableOpacity } from 'react-native';

export default function PremiumScreen() {
  const features = [
    'Priority Delivery',
    'Exclusive Discounts',
    'Free Express Shipping',
    '24/7 Premium Support',
  ];

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-xl font-bold mb-2 text-black dark:text-white">L+ Premium</Text>
      <Text className="text-gray-600 dark:text-gray-400 mb-6">Upgrade to unlock exclusive benefits</Text>

      {features.map((feature) => (
        <View key={feature} className="flex-row items-center mb-4">
          <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
          <Text className="text-black dark:text-white">{feature}</Text>
        </View>
      ))}

      <View className="mt-auto">
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mb-3">
          <Text className="text-white text-center font-bold">Upgrade Now - $9.99/month</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
          <Text className="text-black dark:text-white text-center font-bold">Annual Plan - Save 20%</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
