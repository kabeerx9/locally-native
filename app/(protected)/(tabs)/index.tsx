import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DELIVERY_ITEMS, RECENT_DELIVERIES } from '../../../lib/data';


export default function HomeScreen() {

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-green-600 dark:text-green-400">Locally</Text>
          <Text className="mt-2 text-base text-gray-600 dark:text-gray-300">Fast & reliable local deliveries</Text>
        </View>

        {/* Quick Actions */}
        <View className="px-4 py-4">
          <TouchableOpacity className="bg-green-600 rounded-xl p-4 shadow-sm">
            <Text className="text-white text-lg font-semibold">Send a Package Now</Text>
            <Text className="text-green-100 mt-1">Get your items delivered today</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Options */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold mb-4 text-black dark:text-white">What would you like to send?</Text>
          <View className="flex-row flex-wrap justify-between">
            {DELIVERY_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-[48%] bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4 border border-gray-100 dark:border-gray-700"
              >
                <Text className="text-3xl mb-2">{item.icon}</Text>
                <Text className="font-medium text-black dark:text-white">{item.name}</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</Text>
                <Text className="text-green-600 dark:text-green-400 font-medium mt-2">${item.price}</Text>
                <Text className="text-xs text-gray-400 dark:text-gray-500">{item.estimatedTime}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Deliveries */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold mb-4 text-black dark:text-white">Recent Deliveries</Text>
          {RECENT_DELIVERIES.map((delivery) => (
            <View
              key={delivery.id}
              className="flex-row justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-3 border border-gray-100 dark:border-gray-700"
            >
              <View>
                <Text className="font-medium text-black dark:text-white">{delivery.type}</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">{delivery.date}</Text>
              </View>
              <View className="items-end">
                <Text className="text-green-600 dark:text-green-400 font-medium">${delivery.price}</Text>
                <Text className="text-xs text-gray-400 dark:text-gray-500">{delivery.status}</Text>
              </View>
            </View>
          ))}
        </View>




      </ScrollView>
    </View>
  );
}
