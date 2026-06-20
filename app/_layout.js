import { Stack, useRouter } from 'expo-router';
import { ShopProvider } from '../src/context/ShopContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import "../global.css";
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
        initialRouteName="onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Onboarding should appear first after the splash screen */}
        <Stack.Screen name="onboarding" options={{ title: 'Welcome' }} />

        {/* Auth group/folder screens */}
        <Stack.Screen name="auth/SignIn" />
        <Stack.Screen name="auth/SignUp" />
        <Stack.Screen name="auth/Verification" />
        <Stack.Screen name="auth/forgetPassword" />
        <Stack.Screen name="auth/PersonalDetails" />

        {/* Main App Screens */}
        <Stack.Screen name="index" options={{ title: 'Zwigato Shop' }} />
        <Stack.Screen name="details/[id]" options={{ title: 'Product Details' }} />
      </Stack>
    </ShopProvider>
  );
}