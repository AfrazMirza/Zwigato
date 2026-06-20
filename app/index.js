import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import ProductListing from '../src/screens/ProductListing';

export default function HomeRoute() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const value = await AsyncStorage.getItem('hasCompletedOnboarding');
        setShowOnboarding(value !== 'true');
      } catch (error) {
        console.warn('Failed to read onboarding state:', error);
        setShowOnboarding(true);
      } finally {
        setLoading(false);
      }
    };

    loadOnboardingState();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
  }

  if (showOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <ProductListing />;
}
