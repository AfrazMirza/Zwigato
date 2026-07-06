// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
// import Animated, { 
//   useSharedValue, 
//   useAnimatedStyle, 
//   withRepeat, 
//   withTiming, 
//   withSequence 
// } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');

// export default function ZwigatoAnimatedSplash() {
//   // ── 🎭 REANIMATED SHARED INIFINITE POINTERS ──
//   const logoScale = useSharedValue(1);
//   const ringRotation = useSharedValue(0);

//   useEffect(() => {
//     // 1. Loop 1: Logo Pulse Animation (Bada-Chota infinite looping bounce)
//     logoScale.value = withRepeat(
//       withSequence(
//         withTiming(1.12, { duration: 800 }),
//         withTiming(0.95, { duration: 800 })
//       ),
//       -1, // -1 matlab loop hamesha chalta rahega jab tak screen change na ho
//       true
//     );

//     // 2. Loop 2: Ring Continuous Rotation (360 degree infinite spinner map)
//     ringRotation.value = withRepeat(
//       withTiming(360, { duration: 1800 }),
//       -1, 
//       false
//     );
//   }, []);

//   const animatedLogoStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: logoScale.value }],
//     };
//   });

//   const animatedRingStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ rotate: `${ringRotation.value}deg` }],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       {/* Center Wrapper Module */}
//       <View style={styles.animationMatrixBox}>
        
//         {/* 🌀 LOOP 1: Infinite Gradient Rotating Ring Border */}
//         <Animated.View style={[styles.outerGlowRing, animatedRingStyle]} />

//         {/* 🎯 LOOP 2: Infinite Pulsing Central App Brand Logo */}
//         <Animated.Image 
//           source={require('../../../assets/zwigato.jpg')} // Apne icon image asset ka dynamic path double check kar lena bhai
//           style={[styles.brandLogo, animatedLogoStyle]} 
//         />
//       </View>

//       {/* Subtle Shopping Bottom branding node */}
//       <Text style={styles.footerBrandingText}>Z W I G A T O   S H O P</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ff3f6c', // Tumhara app.json matching global yellow theme brand color
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   animationMatrixBox: {
//     width: 160,
//     height: 160,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative'
//   },
//   brandLogo: {
//     width: 100,
//     height: 100,
//     borderRadius: 50, // Pure circle avatar mapping
//     resizeMode: 'cover',
//     position: 'absolute',
//     zIndex: 10,
//     borderWidth: 3,
//     borderColor: '#FFFFFF', // Clean white boundary frame
//   },
//   outerGlowRing: {
//     position: 'absolute',
//     width: 124,
//     height: 124,
//     borderRadius: 62,
//     borderWidth: 4,
//     borderColor: 'transparent',
//     borderTopColor: '#FFE450', // Premium hot pink accent loader spinner color
//     borderBottomColor: '#2874F0', // Flipkart electric blue loading spinner color
//     zIndex: 5,
//   },
//   footerBrandingText: {
//     position: 'absolute',
//     bottom: 50,
//     fontSize: 12,
//     fontFamily: 'Poppins-Bold',
//     color: '#212121',
//     letterSpacing: 3,
//     opacity: 0.6
//   }
// // });
// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Image } from 'react-native';
// import Animated, { 
//   useSharedValue, 
//   useAnimatedStyle, 
//   withRepeat, 
//   withTiming, 
//   withSequence,
//   withDelay,
//   withSpring
// } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');

// export default function ZwigatoAnimatedSplash() {
//   // ── 🎭 LOGO ULTRA ELASTIC POINTERS ──
//   const logoScale = useSharedValue(0);
//   const logoOpacity = useSharedValue(0);
//   const logoRotation = useSharedValue(-180); // Starts upside down for a premium spin entry
//   const ringScale = useSharedValue(0.6);
//   const ringRotation = useSharedValue(0);

//   // ── ✍️ NORMAL LEFT-TO-RIGHT TEXT SEQUENCE ──
//   const textString = "ZWIGATO SHOP";
//   const lettersArray = textString.split("");
//   const letterSharedValues = lettersArray.map(() => useSharedValue(0));

//   useEffect(() => {
//     // 1. Elite Logo Spin + Spring Pop Entrance
//     logoScale.value = withSpring(1, { damping: 11, stiffness: 75 });
//     logoOpacity.value = withTiming(1, { duration: 550 });
//     logoRotation.value = withSpring(0, { damping: 12, stiffness: 70 });

//     // 2. Ring Scaling and Smooth Infinite Rotate Loop
//     ringScale.value = withSpring(1, { damping: 10, stiffness: 60 });
//     ringRotation.value = withRepeat(
//       withTiming(360, { duration: 3200 }),
//       -1, 
//       false
//     );

//     // 3. ➡️ NORMAL LEFT-TO-RIGHT CHARACTER DELAY GENERATOR
//     lettersArray.forEach((_, index) => {
//       letterSharedValues[index].value = withDelay(
//         index * 180, // Dynamic incremental padding delay
//         withTiming(1, { duration: 500 })
//       );
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.animationMatrixBox}>
//   {/* 🌀 Loader Ring Setup (Touchless Background Orbit) */}
//   <Animated.View 
//     style={[
//       styles.outerGlowRing, 
//       useAnimatedStyle(() => ({ 
//         transform: [
//           { rotate: `${ringRotation.value}deg` },
//           { scale: ringScale.value }
//         ] 
//       }))
//     ]} 
//   />

//   {/* 🎯 Upgraded Elastic Spin Logo (With Inner Padding Layer) */}
//   <Animated.View
//     style={[
//       styles.brandLogoWrapper, // Is view ke upar saare transform aur shapes de diye
//       useAnimatedStyle(() => ({ 
//         opacity: logoOpacity.value,
//         transform: [
//           { scale: logoScale.value },
//           { rotate: `${logoRotation.value}deg` }
//         ] 
//       }))
//     ]}
//   >
//     {/* Actual logo image bound cleanly inside contain layout rules */}
//     <Image 
//       source={require('../../../assets/zwigato.jpg')} 
//       style={styles.innerBrandLogoImage} 
//     />
//   </Animated.View>
// </View>

//       {/* ── NORMAL SEQUENTIAL TEXT GRID LAYOUT ── */}
//       <View style={styles.textTrackWrapperRow}>
//         {lettersArray.map((letter, index) => {
//           const animatedLetterStyle = useAnimatedStyle(() => {
//             return {
//               opacity: letterSharedValues[index].value,
//               transform: [
//                 {
//                   // Smooth bounce-up layout transition effect
//                   translateY: withTiming(letterSharedValues[index].value === 1 ? 0 : 12, { duration: 400 })
//                 }
//               ]
//             };
//           });

//           return (
//             <Animated.Text key={index} style={[styles.animatedLetter, animatedLetterStyle]}>
//               {letter === " " ? "\u00A0" : letter}
//             </Animated.Text>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center' },
//  animationMatrixBox: { 
//     width: 160, 
//     height: 160, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     position: 'relative', 
//     marginBottom: 40 
//   },
  
//   // ✅ FIXED CONTAINER: Image ki jagah humne wrapper view banaya aur isko shape di
//   brandLogoWrapper: { 
//     width: 110, 
//     height: 110, 
//     borderRadius: 55, 
//     position: 'absolute', 
//     zIndex: 10, 
//     borderWidth: 3, 
//     borderColor: '#FFFFFF',
//     backgroundColor: '#FFFFFF', // Image scaling ke peeche seamless color overlay ke liye
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden', // Corners se extra content bahar na jaye
//     padding: 6 // 👈 Extra breathing space taaki content corners par na kate!
//   },

//   // ✅ FIXED IMAGE SCALE: ResizeMode ko contain kiya taaki full image canvas area me fit ho sake
//   innerBrandLogoImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 50,
//     resizeMode: 'contain', // 👈 'cover' se badal kar 'contain' kiya taaki clipping band ho jaye
//   },

//   outerGlowRing: { 
//     position: 'absolute', 
//     width: 136, 
//     height: 136, 
//     borderRadius: 68, 
//     borderWidth: 4, 
//     borderColor: 'transparent', 
//     borderTopColor: '#FFE450', 
//     borderBottomColor: '#2874F0', 
//     zIndex: 5 
//   },
//   textTrackWrapperRow: { flexDirection: 'row', position: 'absolute', bottom: 155, justifyContent: 'center', alignItems: 'center', width: width },
//   animatedLetter: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#FFFFFF', letterSpacing: 2 }
// });

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  withDelay,
  withSpring
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ZwigatoAnimatedSplash() {
  // ── 🌈 BACKGROUND CORNER COLOR BLOBS SHIFT POINTERS ──
  const blob1Scale = useSharedValue(1);
  const blob2Scale = useSharedValue(1);
  const blob3Scale = useSharedValue(1);
  const blob4Scale = useSharedValue(1);

  // ── 🎭 LOGO 3D SPIN + FLOATING WAVE POINTERS ──
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const logoRotationY = useSharedValue(180); // 180° Dynamic back-flip setup
  const logoTranslateY = useSharedValue(0);
  const ringScale = useSharedValue(0.6);
  const ringRotation = useSharedValue(0);

  // ── ✍️ NORMAL LEFT-TO-RIGHT TEXT SEQUENCE ──
  const textString = "ZWIGATO SHOP";
  const lettersArray = textString.split("");
  const letterSharedValues = lettersArray.map(() => useSharedValue(0));

  useEffect(() => {
    // ── 🌈 1. BACKGROUND CORNERS WAVE TIMING LOOPS ──
    // Top Left Blob Pulse
    blob1Scale.value = withRepeat(
      withSequence(withTiming(1.3, { duration: 2200 }), withTiming(1, { duration: 2200 })),
      -1, true
    );
    // Top Right Blob Pulse
    blob2Scale.value = withRepeat(
      withSequence(withTiming(0.85, { duration: 1800 }), withTiming(1.2, { duration: 1800 })),
      -1, true
    );
    // Bottom Left Blob Pulse
    blob3Scale.value = withRepeat(
      withSequence(withTiming(1.25, { duration: 2500 }), withTiming(0.9, { duration: 2500 })),
      -1, true
    );
    // Bottom Right Blob Pulse
    blob4Scale.value = withRepeat(
      withSequence(withTiming(0.9, { duration: 2000 }), withTiming(1.3, { duration: 2000 })),
      -1, true
    );

    // ── 🎭 2. UPGRADED ELITE 3D FLIP LOGO TIMING ──
    logoScale.value = withSpring(1, { damping: 11, stiffness: 75 });
    logoOpacity.value = withTiming(1, { duration: 550 });
    logoRotationY.value = withSpring(0, { damping: 12, stiffness: 70 }); // Smoothly flips back to 0
    

    // Soft continuous floating loop after flip wraps up
    logoTranslateY.value = withDelay(
      600,
      withRepeat(
        withSequence(withTiming(-6, { duration: 1200 }), withTiming(4, { duration: 1200 })),
        -1, true
      )
    );

    // Ring scaling and continuous 360 rotation orbit loop
    ringScale.value = withSpring(1, { damping: 10, stiffness: 60 });
    ringRotation.value = withRepeat(withTiming(360, { duration: 3200 }), -1, false);

    // ── ✍️ 3. LEFT-TO-RIGHT TYPOGRAPHY ENTRANCE ──
    lettersArray.forEach((_, index) => {
      letterSharedValues[index].value = withDelay(
        index * 180, 
        withTiming(1, { duration: 500 })
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      
      {/* ── 🌈 AMBIENT CORNER ORBS BOUNDS (BACKGROUND LAYER) ── */}
      {/* 1. Top Left Orb (Zwigato Red Base Accent) */}
      <Animated.View style={[styles.blob, styles.topLeftBlob, useAnimatedStyle(() => ({ transform: [{ scale: blob1Scale.value }] }))]} />
      {/* 2. Top Right Orb (Flipkart Blue Base Accent) */}
      <Animated.View style={[styles.blob, styles.topRightBlob, useAnimatedStyle(() => ({ transform: [{ scale: blob2Scale.value }] }))]} />
      {/* 3. Bottom Left Orb (Zwigato Golden Theme Yellow Accent) */}
      <Animated.View style={[styles.blob, styles.bottomLeftBlob, useAnimatedStyle(() => ({ transform: [{ scale: blob3Scale.value }] }))]} />
      {/* 4. Bottom Right Orb (Deep Dark Pink Hybrid Burst) */}
      <Animated.View style={[styles.blob, styles.bottomRightBlob, useAnimatedStyle(() => ({ transform: [{ scale: blob4Scale.value }] }))]} />


      {/* ── CENTRAL MATRIX CONTENT FRAME ── */}
      {/* <View style={styles.animationMatrixBox}>
        {/* 🌀 Loader Ring Setup */}
        {/* <Animated.View 
          style={[
            styles.outerGlowRing, 
            useAnimatedStyle(() => ({ 
              transform: [
                { rotate: `${ringRotation.value}deg` },
                { scale: ringScale.value }
              ] 
            }))
          ]} 
        /> */}

        {/* 🎯 Upgraded 3D Spin + Float Logo Wrapper */}
        {/* <Animated.View
          style={[
            styles.brandLogoWrapper, 
            useAnimatedStyle(() => ({ 
              opacity: logoOpacity.value,
              transform: [
                { scale: logoScale.value },
                { rotateY: `${logoRotationY.value}deg` }, // ✅ 3D Vertical Flip applied perfectly
                { translateY: logoTranslateY.value }      // ✅ Floating wave added safely
              ] 
            }))
          ]}
        >
          <Image 
            source={require('../../../assets/zwigato.jpg')} 
            style={styles.innerBrandLogoImage} 
          />
        </Animated.View>
      </View>  */}

      <View style={styles.animationMatrixBox}>
   <Animated.View 
    style={[
      styles.outerGlowRing, 
      useAnimatedStyle(() => ({ 
        transform: [
          { rotate: `${ringRotation.value}deg` },
          { scale: ringScale.value }
        ] 
      }))
    ]} 
  />

  {/* 🎯 Upgraded Elastic Spin Logo (With Inner Padding Layer) */}
  <Animated.View
    style={[
      styles.brandLogoWrapper, // Is view ke upar saare transform aur shapes de diye
      useAnimatedStyle(() => ({ 
        opacity: logoOpacity.value,
        transform: [
          { scale: logoScale.value },
          { rotate: `${logoRotationY.value}deg` }
        ] 
      }))
    ]}
  >
    {/* Actual logo image bound cleanly inside contain layout rules */}
    <Image 
      source={require('../../../assets/zwigato.jpg')} 
      style={styles.innerBrandLogoImage} 
    />
  </Animated.View>
</View>

      {/* ── NORMAL SEQUENTIAL TEXT GRID LAYOUT ── */}
      <View style={styles.textTrackWrapperRow}>
        {lettersArray.map((letter, index) => {
          const animatedLetterStyle = useAnimatedStyle(() => {
            return {
              opacity: letterSharedValues[index].value,
              transform: [
                { translateY: withTiming(letterSharedValues[index].value === 1 ? 0 : 12, { duration: 400 }) }
              ]
            };
          });

          return (
            <Animated.Text key={index} style={[styles.animatedLetter, animatedLetterStyle]}>
              {letter === " " ? "\u00A0" : letter}
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
}

// ─── STYLES PREMIUM ARCHITECTURE GRID ───
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ff3f6c', // Base primary brand color wrapper bounds
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },

  // ── 🌈 BACKGROUND CORNER BLENDING BALLS CONFIGS ──
  blob: {
    position: 'absolute',
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    opacity: 0.55, // Soft fluid color visibility blend
  },
  topLeftBlob: {
    top: -50,
    left: -50,
    backgroundColor: '#E11D48', // Intense Vibrant Crimson
  },
  topRightBlob: {
    top: -60,
    right: -60,
    backgroundColor: '#1E3A8A', // Deep Premium Slate Blue
  },
  bottomLeftBlob: {
    bottom: -80,
    left: -60,
    backgroundColor: '#FFD700', // Metallic Golden Yellow
  },
  bottomRightBlob: {
    bottom: -40,
    right: -40,
    backgroundColor: '#9333EA', // Luxury Ambient Purple
  },

  // ── CENTRAL MODULE STYLES ──
 animationMatrixBox: { 
    width: 160, 
    height: 160, 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative', 
    marginBottom: 40 
  },
  
  // ✅ FIXED CONTAINER: Image ki jagah humne wrapper view banaya aur isko shape di
  brandLogoWrapper: { 
    width: 110, 
    height: 110, 
    borderRadius: 55, 
    position: 'absolute', 
    zIndex: 10, 
    borderWidth: 3, 
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF', // Image scaling ke peeche seamless color overlay ke liye
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Corners se extra content bahar na jaye
    padding: 6 // 👈 Extra breathing space taaki content corners par na kate!
  },

  // ✅ FIXED IMAGE SCALE: ResizeMode ko contain kiya taaki full image canvas area me fit ho sake
  innerBrandLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'contain', // 👈 'cover' se badal kar 'contain' kiya taaki clipping band ho jaye
  },

  outerGlowRing: { 
    position: 'absolute', 
    width: 136, 
    height: 136, 
    borderRadius: 68, 
    borderWidth: 4, 
    borderColor: 'transparent', 
    borderTopColor: '#FFE450', 
    borderBottomColor: '#2874F0', 
    zIndex: 5 
  },
  textTrackWrapperRow: { flexDirection: 'row', position: 'absolute', bottom: 125, justifyContent: 'center', alignItems: 'center', width: width, zIndex: 30 },
  animatedLetter: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#FFFFFF', letterSpacing: 2 }
});