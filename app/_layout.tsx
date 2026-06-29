import { Stack, useRouter } from 'expo-router';
import { ShopProvider } from '../src/context/ShopContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
// import "../../global.css";

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
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ShopProvider>
      <Stack
        initialRouteName="(main)"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Onboarding Core Entry Screen */}
        {/* <Stack.Screen name="onboarding" options={{ title: 'Welcome' }} /> */}

        {/* 🔐 Auth Group Layout (Handles authPortal, signIn, signUp, etc.) */}
        {/* <Stack.Screen name="(auth)" /> */}

        {/* 🛒 Main App Layout (Handles Tabs: index, wishlist, cart) */}
        <Stack.Screen name="(main)" />
        
        {/* 🔍 THE ULTIMATE FIX: Search Screen Registered in the Main Stack Navigator */}
        <Stack.Screen 
          name="search" 
          options={{ 
            title: 'Search',
            animation: 'fade_from_bottom' // Myntra-style smooth animation ke liye
          }} 
        />
        <Stack.Screen 
  name="addresses" 
  options={{ 
    title: 'Addresses',
    animation: 'slide_from_right' // Premium sliding animation ke liye
  }} 
  />
  
  {/* 👤 Edit Profile Credentials Screen */}
<Stack.Screen 
  name="edit-profile" 
  options={{ 
    title: 'Edit Profile',
    animation: 'slide_from_right' // Premium sliding look ke liye
  }} 
/>

        {/* <Stack.Screen name="details/[id]" options={{ title: 'Product Details' }} /> */}
      </Stack>
    </ShopProvider>
  );
}

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ActivityIndicator, StyleSheet, Animated } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Redirect } from 'expo-router';

// export default function CustomSplashScreen() {
//   const [loading, setLoading] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(0)); // Smooth fade-in logo ke liye

//   useEffect(() => {
//     // 1. Logo Fade-In Animation Trigger Karen
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000, // 1 second fade duration
//       useNativeDriver: true,
//     }).start();

//     const checkAppState = async () => {
//       try {
//         // Ek intentional delay (e.g. 2.5 seconds) taaki user aapki premium splash styling dekh sake
//         await new Promise(resolve => setTimeout(resolve, 2500));

//         // Onboarding checks
//         const onboardingDone = await AsyncStorage.getItem('hasCompletedOnboarding');
//         if (onboardingDone !== 'true') {
//           setShowOnboarding(true);
//         }
//       } catch (error) {
//         console.warn('Storage read error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAppState();
//   }, []);

//   // ─── CUSTOM STYLED RENDER CYCLE (REACT NATIVE RUNTIME) ───
//   if (loading) {
//     return (
//       <View style={styles.container}>
//         {/* Animated Brand Identity Logo */}
//         <Animated.View style={[styles.logoWrapper, { opacity: fadeAnim }]}>
//           <Image 
//             source={require('../assets/splash-icon.png')} // Aapka app.json wala main logo path
//             style={styles.logoImage} 
//           />
//           {/* Custom Brand Fonts Text Label */}
//           <Text style={styles.brandText}>ZWIGATO</Text>
//           <Text style={styles.brandSub}>Your Premium Shopping Hub</Text>
//         </Animated.View>

//         {/* Customized Bottom Activity Indicator */}
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="small" color="#000000" />
//         </View>
//       </View>
//     );
//   }

//   // Navigation Routing Fallbacks
//   if (showOnboarding) {
//     return <Redirect href="/onboarding" />;
//   }

//   return <Redirect href="/(main)" />;
// }

// // ─── PREMIUM BRAND STYLES ────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFE450', // Zwigato's signature vibrant yellow base color!
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoWrapper: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoImage: {
//     width: 130,
//     height: 130,
//     resizeMode: 'contain',
//     marginBottom: 16,
//   },
//   brandText: {
//     fontSize: 32,
//     fontFamily: 'Poppins-Bold', // Dynamic font load direct apply ho jayega yahan
//     color: '#282c3f',
//     letterSpacing: 2,
//   },
//   brandSub: {
//     fontSize: 12,
//     fontFamily: 'Poppins-Medium',
//     color: '#535766',
//     letterSpacing: 0.5,
//     marginTop: 4,
//   },
//   loaderContainer: {
//     position: 'absolute',
//     bottom: 60, // Screen ke exact bottom segment me fix layout balance
//   },
// });