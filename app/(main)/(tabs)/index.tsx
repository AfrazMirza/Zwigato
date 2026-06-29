// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Redirect } from 'expo-router';
// import ProductListing from '../../../src/screens/ProductListing'; 

// export default function HomeRoute() {
//   const [loading, setLoading] = useState(true);
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkAppState = async () => {
//       try {
//         // 1. Check karein kya user pehli baar app khol raha hai
//         const onboardingDone = await AsyncStorage.getItem('hasCompletedOnboarding');
//         if (onboardingDone !== 'true') {
//           setShowOnboarding(true);
//           return; // Aage ka check karne ki zaroorat nahi hai
//         }

//         // 2. Check karein kya user actual mein LOGGED IN hai (Koi auth token ya user id save hai ya nahi)
//         const userToken = await AsyncStorage.getItem('userToken'); // Aapki login screen jo token set karegi
//         if (userToken !== null) {
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.warn('Error reading storage states:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAppState();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#ff3f6c" />
//       </View>
//     );
//   }

//   // RULE 1: Agar onboarding complete nahi hai, toh seedhe onboarding screen par bheinjo (Only First Time)
//   if (showOnboarding) {
//     return <Redirect href="/onboarding" />;
//   }

//   // RULE 2: Agar user authentic logged-in nahi hai, toh har baar fresh app kholne par AuthPortal bheinjo
//   if (!isLoggedIn) {
//     return <Redirect href="/(auth)/authPortal" />;
//   }

//   // RULE 3: Agar user actual mein logged in hai, tabhi use direct Product Listing dikhegi
//   return <ProductListing />;
// }

// import React from 'react';
// // Aapka local src folder se ProductListing component import
// import ProductListing from '../../../src/screens/ProductListing'; 

// export default function HomeTabScreen() {
//   // Jab bhi koi user (Chahe Guest ho ya Logged In) is tab par aayega,
//   // use direct aapka ProductListing wala component render hoke dikhega!
//   return <ProductListing />;
// }

import React from 'react';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
// Aapka local src folder se ProductListing component import
import ProductListing from '../../../src/screens/ProductListing'; 

export default function HomeTabScreen() {

  // ── THE ULTIMATE BACK HANDLER FIX ──
useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App', 
        'Are you sure you want to exit Zwigato?', 
        [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    // ── THE FIX: Standard modern event listener subscription ──
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // .remove() method use karein clean-up ke liye
    return () => subscription.remove();
  }, [])
);

  return <ProductListing />;
}