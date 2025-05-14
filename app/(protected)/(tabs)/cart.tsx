import { View, Text, TouchableOpacity } from 'react-native';

export default function CartScreen() {
  const dummyCart = [
    { id: '1', item: 'Package Delivery', price: 29.99 },
    { id: '2', item: 'Express Shipping', price: 49.99 },
  ];

  const total = dummyCart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-xl font-bold mb-4 text-black dark:text-white">Your Cart</Text>

      {dummyCart.map((item) => (
        <View key={item.id} className="flex-row justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
          <Text className="font-medium text-black dark:text-white">{item.item}</Text>
          <Text className="text-black dark:text-white">${item.price.toFixed(2)}</Text>
        </View>
      ))}

      <View className="mt-auto">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-bold text-black dark:text-white">Total:</Text>
          <Text className="text-lg font-bold text-black dark:text-white">${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
          <Text className="text-white text-center font-bold">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
