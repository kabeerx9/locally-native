import { View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const userInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: '2025',
  };

  const menuItems = [
    'Edit Profile',
    'Delivery Addresses',
    'Payment Methods',
    'Notifications',
    'Help & Support',
    'Terms & Privacy',
  ];

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 p-4">
      <View className="items-center mb-6">
        <View className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 mb-3" />
        <Text className="text-xl font-bold text-black dark:text-white">{userInfo.name}</Text>
        <Text className="text-gray-500 dark:text-gray-400">{userInfo.email}</Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">Member since {userInfo.memberSince}</Text>
      </View>

      {menuItems.map((item) => (
        <TouchableOpacity 
          key={item} 
          className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800"
        >
          <Text className="text-black dark:text-white">{item}</Text>
          <Text className="text-gray-400">›</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity className="mt-auto">
        <Text className="text-red-500 text-center font-bold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
