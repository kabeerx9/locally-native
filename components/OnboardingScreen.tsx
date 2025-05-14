import React, { useRef, useState } from 'react';
import { View, FlatList, useWindowDimensions, TouchableOpacity, Image, FlatListProps, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
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
    color: '#16a34a', // Green
    backgroundColor: '#e0f2f1', // Light green
    darkBackgroundColor: '#1c3a1e', // Dark green
  },
  {
    id: '2',
    title: 'How It Works',
    description: 'Choose what to send, set pickup and delivery locations, and track in real-time.',
    icon: 'route',
    color: '#3b82f6', // Blue
    backgroundColor: '#dbeafe', // Light blue
    darkBackgroundColor: '#1e3a5f', // Dark blue
  },
  {
    id: '3',
    title: 'Safe & Secure',
    description: 'Verified drivers, package insurance, and real-time tracking for peace of mind.',
    icon: 'verified-user',
    color: '#f59e0b', // Amber
    backgroundColor: '#fef3c7', // Light amber
    darkBackgroundColor: '#4a300a', // Dark amber
  },
  {
    id: '4',
    title: "Let's Get Started",
    description: 'Join thousands of satisfied customers using Locally for their delivery needs.',
    icon: 'rocket-launch',
    color: '#ef4444', // Red
    backgroundColor: '#fee2e2', // Light red
    darkBackgroundColor: '#5f2120', // Dark red
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<SlideItem>>(FlatList);

// Correct type for AnimatedFlatList ref
type AnimatedFlatListType = FlatList<SlideItem>;

interface SlideItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  backgroundColor: string;
  darkBackgroundColor: string;
}

interface RenderSlideProps {
  item: SlideItem;
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const RenderSlide: React.FC<RenderSlideProps> = ({ item, index, scrollX }) => {
  const { width } = useWindowDimensions();
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [100, 0, -100],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[{ width }, animatedStyle]} className="items-center justify-center px-8">
      <View className="items-center mb-8">
        <Animated.View
          style={iconAnimatedStyle}
          className="p-6 rounded-full mb-6"
          // @ts-ignore TODO: fix this type error for style
          style={{ backgroundColor: item.backgroundColor }} // Use dynamic background color
        >
          {/* TODO: fix this type error for dark mode background color */}
          {/* className={`p-6 rounded-full bg-[${item.backgroundColor}] dark:bg-[${item.darkBackgroundColor}] mb-6`} */}
          <MaterialIcons name={item.icon as any} size={80} color={item.color} />
        </Animated.View>
        <Text className="text-2xl font-bold text-center mb-4">{item.title}</Text>
        <Text className="text-base text-center text-muted-foreground">{item.description}</Text>
      </View>
    </Animated.View>
  );
};

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<AnimatedFlatListType>(null);
  const { completeOnboarding } = useAuth();
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1); // Manually update currentIndex as onMomentumScrollEnd might not fire immediately
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true,
    });
    setCurrentIndex(slides.length - 1);
  };

  return (
    <View className="flex-1 bg-background">
      <AnimatedFlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }: { item: SlideItem; index: number }) => (
          <RenderSlide item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // Important for smooth animations
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item: SlideItem) => item.id}
      />

      <View className="px-8 pb-12">
        <View className="flex-row justify-center space-x-2 mb-8">
          {slides.map((slide: SlideItem, index: number) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const animatedDotStyle = useAnimatedStyle(() => {
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0.3, 1, 0.3],
                Extrapolate.CLAMP
              );
              const scale = interpolate(
                scrollX.value,
                inputRange,
                [0.8, 1.25, 0.8],
                Extrapolate.CLAMP
              );
              return {
                opacity,
                transform: [{ scale }],
                backgroundColor: slide.color, // Use slide-specific color for dots
              };
            });
            return (
              <Animated.View
                key={slide.id}
                style={[
                  { height: 10, width: 10, borderRadius: 5 },
                  animatedDotStyle,
                ]}
              />
            );
          })}
        </View>

        {currentIndex === slides.length - 1 ? (
          <Button onPress={completeOnboarding} className="mb-4" style={{backgroundColor: slides[currentIndex].color}}>
            <Text className="text-primary-foreground font-semibold text-lg">Get Started</Text>
          </Button>
        ) : (
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={handleSkip} className="px-4 py-2">
              <Text style={{color: slides[currentIndex].color}} className="font-semibold text-base">
                Skip
              </Text>
            </TouchableOpacity>
            <Button onPress={handleNext} style={{backgroundColor: slides[currentIndex].color}}>
              <Text className="text-primary-foreground font-semibold text-lg">Next</Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
