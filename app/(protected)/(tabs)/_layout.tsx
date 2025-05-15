import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/lib/useColorScheme';
import { ThemeToggle } from '~/components/ThemeToggle';
import ProfileDropdown from '~/components/ProfileDropdown';
import React from 'react';

export default function TabLayout() {
      const { colorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? 'black' : 'white',
        },
        tabBarActiveTintColor: isDarkColorScheme ? 'lightgreen' : 'darkgreen',
        tabBarInactiveTintColor: isDarkColorScheme ? '#fff' : '#000',
        headerShown: true,
        headerRight : ()=>(<React.Fragment>
            <ThemeToggle/>
            <ProfileDropdown/>
        </React.Fragment>)
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="premium"
        options={{
          title: 'L+',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
