// //1 code 
// import { Stack, useRouter, useSegments } from 'expo-router';
// import { ShopProvider } from '../src/context/ShopContext';
// import { useFonts } from 'expo-font';
// import { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import { getStoredToken } from "../src/controller/tokenController";
// import { Provider } from 'react-redux';
// import { store } from '../src/store/store';

// // ── IMPORT YOUR NEW REANIMATED SPLASH SCREEN ──
// import ZwigatoAnimatedSplash from '../src/components/common/ZwigatoAnimatedSplash';

// function AuthNavigationGuard({ children, onReady }: { children: React.ReactNode; onReady: () => void }) {
//   const segments = useSegments();
//   const router = useRouter();
//   const [isAuthChecked, setIsAuthChecked] = useState(false);

//   useEffect(() => {
//     const evaluateSessionRoute = async () => {
//       try {
//         const token = await getStoredToken();
//         const inAuthGroup = segments[0] === "(auth)";

//         if (token) {
//           if (inAuthGroup) {
//             router.replace("/(main)/(tabs)");
//           }
//         } else {
//           if (!inAuthGroup && (segments[0] === "checkout" || segments[0] === "addresses")) {
//             router.replace("/signIn");
//           }
//         }
//       } catch (error) {
//         console.error("Session protection failed:", error);
//       } finally {
//         setIsAuthChecked(true);
//         onReady(); // Triggers parent node layout that data pipeline verification is done
//       }
//     };

//     evaluateSessionRoute();
//   }, [segments]);

//   if (!isAuthChecked) return null;
//   return <>{children}</>;
// }

// export default function RootLayout() {
//   const [isAuthReady, setIsAuthReady] = useState(false);

//   const [fontsLoaded, fontError] = useFonts({
//     'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
//     'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
//     'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
//     'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
//     'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
//   });

//   // Check compile system readiness indicators
//   const appDataIsLoading = !fontsLoaded && !fontError || !isAuthReady;

//   // ── 🔄 RENDER INFINITE ANIMATED SPLASH UNTIL DATA IS FULLY BAKED ──
//   if (appDataIsLoading) {
//     return <ZwigatoAnimatedSplash />;
//   }

//   return (
//     <Provider store={store}>
//       <ShopProvider>
//         <AuthNavigationGuard onReady={() => setIsAuthReady(true)}>
//           <Stack screenOptions={{ headerShown: false }} initialRouteName="(main)">
//             <Stack.Screen name="(auth)" />
//             <Stack.Screen name="(main)" />
//             <Stack.Screen name="search" options={{ title: 'Search', animation: 'fade_from_bottom' }} />
//             <Stack.Screen name="addresses" options={{ title: 'Addresses', animation: 'slide_from_right' }} />
//             <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile', animation: 'slide_from_right' }} />
//           </Stack>
//         </AuthNavigationGuard>
//       </ShopProvider>
//     </Provider>
//   );
  // }
  import { Stack, useRouter, useSegments } from 'expo-router';
  import { ShopProvider } from '../src/context/ShopContext';
  import { useFonts } from 'expo-font';
  import * as SplashScreen from 'expo-splash-screen'; 
  import { useEffect, useState } from 'react';
  import { View, StyleSheet } from 'react-native'; 
  import { getStoredToken } from "../src/controller/tokenController";
  import { Provider } from 'react-redux';
  import { store } from '../src/store/store';

  // Custom Infinite Rotating Ring + Pulse Loader Component
  import ZwigatoAnimatedSplash from '../src/components/common/ZwigatoAnimatedSplash';

  // ✅ STEP 1: Sabse upar lock lagao taaki black screen ka mauka hi na mile
  SplashScreen.preventAutoHideAsync().catch(() => {});

  // ── SESSION GUARD CONTROLLER ──
  function AuthNavigationGuard({ children, onReady }: { children: React.ReactNode; onReady: () => void }) {
    const segments = useSegments();
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
      const evaluateSessionRoute = async () => {
        try {
          const token = await getStoredToken();
          const inAuthGroup = segments[0] === "(auth)";

          if (token) {
            if (inAuthGroup) {
              router.replace("/(main)/(tabs)");
            }
          } else {
            if (!inAuthGroup && (segments[0] === "checkout" || segments[0] === "addresses")) {
              router.replace("/signIn");
            }
          }
        } catch (error) {
          console.error("Session route protection failed:", error);
        } finally {
          setIsAuthChecked(true);
          onReady(); // Direct parent state synchronization trigger
        }
      };

      evaluateSessionRoute();
    }, [segments]);

    // if (!isAuthChecked) return null;
    return <>{children}</>;
  }

  export default function RootLayout() {
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isCustomSplashVisible, setIsCustomSplashVisible] = useState(true);

    const [fontsLoaded, fontError] = useFonts({
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });

    // ✅ STEP 2: Dono conditions jab tak true nahi hongi, tab tak loading mana jayega
    const isEngineFullyReady = (fontsLoaded || fontError) && isAuthReady;

    useEffect(() => {
      if (isEngineFullyReady) {
        // 1. Jaise hi background engine ready hoga, native splash ko hide karenge
        SplashScreen.hideAsync().catch(() => {});

        // 2. Usi exact time par hamari custom splash screen open rahegi aur use 2 seconds baad smoothly dismiss kar denge
        const timer = setTimeout(() => {
          setIsCustomSplashVisible(false);
        }, 4200);

        return () => clearTimeout(timer);
      }
    }, [isEngineFullyReady]);

    // // Jab tak fonts load na hon, white crash se bachne ke liye blank loader return karo piche
    // if (!fontsLoaded && !fontError) {
    // return <ZwigatoAnimatedSplash />;
    // }
  // Crash protection loop
  if (!fontsLoaded && !fontError) {
    return <ZwigatoAnimatedSplash />;
}

    return (
      <Provider store={store}>
        <ShopProvider>
          <View style={styles.masterViewportContainer}>
            
            {/* Main Router Stack rendering smoothly behind scenes */}
            <AuthNavigationGuard onReady={() => setIsAuthReady(true)}>
              <Stack screenOptions={{ headerShown: false }} initialRouteName="(main)">
                  {/* Onboarding Entry Screen (If needed later) */}
  //           {/* <Stack.Screen name="onboarding" options={{ title: 'Welcome' }} /> */}
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(main)" />
                <Stack.Screen name="search" options={{ title: 'Search', animation: 'fade_from_bottom' }} />
                <Stack.Screen name="addresses" options={{ title: 'Addresses', animation: 'slide_from_right' }} />
                <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile', animation: 'slide_from_right' }} />
              </Stack>
            </AuthNavigationGuard>

            {/* ✅ STEP 3: PURE ABSOLUTE OVERLAY MATCHING APPS CLONES */}
            {isCustomSplashVisible && (
              <View style={StyleSheet.absoluteFillObject}>
                <ZwigatoAnimatedSplash />
              </View>
            )}

          </View>
        </ShopProvider>
      </Provider>
    );
  }

  const styles = StyleSheet.create({
    masterViewportContainer: {
      flex: 1,
      backgroundColor: '#ff3f6c', // Same branding color
      position: 'relative',
    }
  });
//2 code 
// import { Stack, useRouter, useSegments } from 'expo-router';
// import { ShopProvider } from '../src/context/ShopContext';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from 'react';
// import { getStoredToken } from "../src/controller/tokenController";
// import { Provider } from 'react-redux';
// import { store } from '../src/store/store';
// // import "../../global.css";

// /**
//  * RootLayout: The entry point for Expo Router.
//  * Wraps everything in ShopProvider so global state works.
//  */

// SplashScreen.preventAutoHideAsync();

// // ── NEW COMPONENT: SESSION GUARD CONTROLLER ──
// function AuthNavigationGuard({ children }: { children: React.ReactNode }) {
//   const segments = useSegments();
//   const router = useRouter();
//   const [isAuthChecked, setIsAuthChecked] = useState(false);

//   useEffect(() => {
//     const evaluateSessionRoute = async () => {
//       try {
//         // 👈 SecureStore se real token read kiya jo saveTokens me store hua tha
//         const token = await getStoredToken();
//         const inAuthGroup = segments[0] === "(auth)";

//         console.log("============ [SESSION SECURITY AUDIT] ============");
//         console.log("Current Session Token:", token ? "ACTIVE_TOKEN_FOUND" : "NO_TOKEN");
//         console.log("User Current Segment View:", segments[0]);

//         if (token) {
//           // Rule 1: Agar token active hai aur user login/signup screens standard loops me hai
//           if (inAuthGroup) {
//             console.log("=> Redirecting Active Session to Main Tabs Layout Dashboard...");
//             router.replace("/(main)/(tabs)");
//           }
//         } else {
//           // Rule 2: Agar token delete ho gaya (Logout) ya session expire ho gaya
//           if (!inAuthGroup && (segments[0] === "checkout" || segments[0] === "addresses")) {
//             console.log("=> Anonymous Token Intercepted! Diverting directly to sign-in portal...");
//             router.replace("/signIn");
//           }
//         }
//       } catch (error) {
//         console.error("Session route protection failed:", error);
//       } finally {
//         setIsAuthChecked(true);
//       }
//     };

//     evaluateSessionRoute();
//   }, [segments]);

//   // Prevent rendering children tree structure until security validation confirms routing matrices
//   if (!isAuthChecked) return null;

//   return <>{children}</>;
// }

// export default function RootLayout() {

//   const [loaded, error] = useFonts({
//     'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
//     'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
//     'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
//     'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
//     'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
//   });

//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

//   if (!loaded && !error) {
//     return null;
//   }

// return (
//   <Provider store={store}>
//     <ShopProvider>
//       {/* ✅ Wrapped children inside AuthNavigationGuard to monitor live application transitions */}
//       <AuthNavigationGuard>
//         <Stack
//           initialRouteName="(main)"
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           {/* Onboarding Entry Screen (If needed later) */}
//           {/* <Stack.Screen name="onboarding" options={{ title: 'Welcome' }} /> */}

//           {/* 🔐 Auth Group Layout */}
//           <Stack.Screen name="(auth)" />

//           {/* 🛒 Main App Layout */}
//           <Stack.Screen name="(main)" />
          
//           {/* 🔍 Search Screen */}
//           <Stack.Screen 
//             name="search" 
//             options={{ 
//               title: 'Search',
//               animation: 'fade_from_bottom' 
//             }} 
//           />
          
//           {/* 📍 Addresses Screen */}
//           <Stack.Screen 
//             name="addresses" 
//             options={{ 
//               title: 'Addresses',
//               animation: 'slide_from_right' 
//             }} 
//           />
          
//           {/* 👤 Edit Profile Credentials Screen */}
//           <Stack.Screen 
//             name="edit-profile" 
//             options={{ 
//               title: 'Edit Profile',
//               animation: 'slide_from_right' 
//             }} 
//           />
//         </Stack>
//       </AuthNavigationGuard>
//     </ShopProvider>
//   </Provider>
// );
// };

//3 code 
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