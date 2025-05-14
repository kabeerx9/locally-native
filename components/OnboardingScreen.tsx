import React, { useRef, useState } from 'react';
import { View, FlatList, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { useAuth } from '~/context/auth-context';
import { MaterialIcons } from '@expo/vector-icons';

const slides = [
  {
    id: '1',
    title: 'Welcome to Locally',
    description: 'Your trusted partner for local deliveries. Fast, reliable, and secure.',
    icon: 'local-shipping',
  },
  {
    id: '2',
    title: 'How It Works',
    description: 'Choose what to send, set pickup and delivery locations, and track in real-time.',
    icon: 'route',
  },
  {
    id: '3',
    title: 'Safe & Secure',
    description: 'Verified drivers, package insurance, and real-time tracking for peace of mind.',
    icon: 'verified-user',
  },
  {
    id: '4',
    title: "Let's Get Started",
    description: 'Join thousands of satisfied customers using Locally for their delivery needs.',
    icon: 'rocket-launch',
  },
];

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { completeOnboarding } = useAuth();

  const renderSlide = ({ item }: { item: typeof slides[0] }) => (
    <View style={{ width }} className="items-center justify-center px-8">
      <View className="items-center mb-8">
        <View className="p-6 rounded-full bg-green-100 dark:bg-green-900 mb-6">
          <MaterialIcons name={item.icon as any} size={80} color="#16a34a" />
        </View>
        <Text className="text-2xl font-bold text-center mb-4">{item.title}</Text>
        <Text className="text-base text-center text-muted-foreground">{item.description}</Text>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true,
    });
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View className="px-8 pb-12">
        <View className="flex-row justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${
                index === currentIndex
                  ? 'w-4 bg-primary'
                  : 'w-2 bg-primary/30'
              }`}
            />
          ))}
        </View>

        {currentIndex === slides.length - 1 ? (
          <Button onPress={completeOnboarding} className="mb-4">
            <Text className="text-primary-foreground font-semibold text-lg">Get Started</Text>
          </Button>
        ) : (
            <Button onPress={handleNext}>
              <Text className="text-primary-foreground font-semibold text-lg">Next</Text>
            </Button>

        )}
      </View>
    </View>
  );
}
