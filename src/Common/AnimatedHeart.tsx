import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface AnimatedHeartProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
}

export default function AnimatedHeart({ isFavorite, onPress, size = 24 }: AnimatedHeartProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    // 👈 Instant scale down then spring pop up
    scale.value = 0.8;
    scale.value = withSpring(1.3, { damping: 4, stiffness: 150 }, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={animatedStyle}>
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={size} 
          color={isFavorite ? "#ff3f6c" : "#757575"} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
}