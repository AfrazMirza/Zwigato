import { Stack, useRouter } from 'expo-router';
import { ShopProvider } from '../src/context/ShopContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
/**
 * RootLayout: The entry point for Expo Router.
 * Wraps everything in ShopProvider so global state works.
 */

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    // Agar fonts load ho gaye ya koi error aaya, toh splash screen hata do
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Jab tak fonts loading mode mein hain, tab tak kuch render mat karo (null)
  if (!loaded && !error) {
    return null;
  }

  return (
    <ShopProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 'index' corresponds to app/index.js */}
        <Stack.Screen 
          name="index" 
          options={{ title: 'Zwigato Shop' }} 
        />
        
        {/* This will be our dynamic product page */}
        <Stack.Screen 
          name="details/[id]" 
          options={{ title: 'Product Details' }} 
         
        />
      </Stack>
    </ShopProvider>
  );
}