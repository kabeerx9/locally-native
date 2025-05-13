import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl font-bold text-black dark:text-white">Home Screen</Text>
      <Text className="mt-2 text-gray-600 dark:text-gray-300">Send items from one place to another</Text>
      
      {/* Dummy Featured Items */}
      <View className="mt-6 w-full px-4">
        <Text className="text-lg font-semibold mb-3 text-black dark:text-white">Popular Items</Text>
        <View className="flex-row flex-wrap justify-between">
          {['Phone', 'Laptop', 'Documents', 'Package'].map((item) => (
            <View key={item} className="w-[48%] bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <Text className="font-medium text-black dark:text-white">{item}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Fast Delivery</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
