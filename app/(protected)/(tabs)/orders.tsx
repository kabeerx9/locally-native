import { View, Text } from 'react-native';

export default function OrdersScreen() {
  const dummyOrders = [
    { id: '1', item: 'iPhone 13', status: 'In Transit', date: '2025-05-13' },
    { id: '2', item: 'MacBook Pro', status: 'Delivered', date: '2025-05-12' },
    { id: '3', item: 'Documents', status: 'Pending', date: '2025-05-14' },
  ];

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-xl font-bold mb-4 text-black dark:text-white">Your Orders</Text>

      {dummyOrders.map((order) => (
        <View key={order.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
          <Text className="font-medium text-black dark:text-white">{order.item}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">Status: {order.status}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">Date: {order.date}</Text>
        </View>
      ))}
    </View>
  );
}
