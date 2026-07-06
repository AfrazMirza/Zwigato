import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 

const { width } = Dimensions.get("window");

export default function TabLayout() {
  // ── CUSTOM TAB RADIANTS CONFIGURATION ──
  const TAB_GRADIENTS = {
    index:      ['#FFCCBC', '#FFE0B2'], // Sunset Golden Yellow
    wishlist:   ['#FF8A80', '#FF5252'], // Blush Accent Pink/Red
    categories: ['#F8B4D9', '#FAD0C4'], // Soft Pink
    cart:       ['#64B5F6', '#2196F3'], // Deep Electric Blue
    profile:    ['#BA68C8', '#9C27B0'], // Royal Soft Purple
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      {/* 🏠 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.index} style={styles.iconBoxActive}>
                <Ionicons name="home" size={20} color="#FFF" />
                <Text style={styles.activeLabel}>Home</Text>
              </LinearGradient>
            ) : (
              <View 
              // /style={styles.iconBoxInactive}
              >
                <Ionicons name="home-outline" size={22} color="#6B7280" />
              </View>
            );
          },
        }}
      />

      {/* 🖤 2. WISHLIST TAB */}
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.wishlist} style={styles.iconBoxActive}>
                <Ionicons name="heart" size={20} color="#FFFFFF" />
                <Text style={styles.activeLabel}>Wishlist</Text>
              </LinearGradient>
            ) : (
              <View 
              // /style={styles.iconBoxInactive}
              >
                <Ionicons name="heart-outline" size={22} color="#6B7280" />
              </View>
            );
          },
        }}
      />

      {/* 🗂️ 3. CATEGORIES TAB */}
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.categories} style={styles.iconBoxActive}>
                <Ionicons name="grid" size={18} color="#FFF" />
                <Text style={styles.activeLabel}>Category</Text>
              </LinearGradient>
            ) : (
              <View 
              // /style={styles.iconBoxInactive}
              >
                <Ionicons name="grid-outline" size={20} color="#6B7280" />
              </View>
            );
          },
        }}
      />

      {/* 🛒 4. CART TAB */}
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.cart} style={styles.iconBoxActive}>
                <Ionicons name="bag-handle" size={20} color="#FFFFFF" />
                <Text style={styles.activeLabel}>Cart</Text>
              </LinearGradient>
            ) : (
              <View 
              // /style={styles.iconBoxInactive}
              >
                <Ionicons name="bag-handle-outline" size={22} color="#6B7280" />
              </View>
            );
          },
        }}
      />

      {/* 👤 5. PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.profile} style={styles.iconBoxActive}>
                <Ionicons name="person" size={20} color="#FFFFFF" />
                <Text style={styles.activeLabel}>Profile</Text>
              </LinearGradient>
            ) : (
              <View 
              // /style={styles.iconBoxInactive}
              >
                <Ionicons name="person-outline" size={22} color="#6B7280" />
              </View>
            );
          },
        }}
      />

      {/* ✅ CRITICAL PRODUCTION FIX: Hide standard hidden/development system endpoints from building tabs panels */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="_sitemap" options={{ href: null }} />
    </Tabs>
  );
}

// ─── STABLE RESPONSIVE CAPSULE DESIGN MATRIX ───
const styles = StyleSheet.create({
  tabBar: {
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "rgba(235, 237, 240, 0.95)",
    borderColor: '#8B5E34',
    borderTopWidth: 1.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftColor: '#8B5E34',
    borderLeftWidth: 0.2,
    borderRightColor: '#8B5E34',
    borderRightWidth: 0.2,
    paddingHorizontal: 20, // Side spacing fixed
  },
  tabBarItem: {
    // Isko pure dynamic spacing di taaki tabs screen ke center me balanced rahein
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    paddingVertical: 12, // Vertical breathing space for touch comfort
  },
  
  // ✅ STABLE ACTIVE CAPSULE: No text cutting, no screen escaping
  iconBoxActive: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12, // Adaptive breathing space for text
    height: 40,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "#8B5E34",
    backgroundColor: "#ff3f6c",
    minWidth: 90, // Ensures active label has solid footprint
  },
  
  // ✅ INACTIVE SLOT BALANCE
  // iconBoxInactive: {
  //   // width: 44,
  //   // height: 44,
  //   // borderRadius: 22,
  //   // justifyContent: "center",
  //   // alignItems: "center",
  //   // backgroundColor: "transparent",
  // },
  
  // ✅ IMAGE MATCHED CHARCOAL WHITE LABELS
  activeLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    marginLeft: 6,
    letterSpacing: 0.1,
  }
});

// import { Tabs } from "expo-router";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient"; // 👈 Gradient wrap import kiya

// const { width } = Dimensions.get("window");

// export default function TabLayout() {
//   // ── CUSTOM TAB RADIANTS CONFIGURATION ──
//   // Aap yahan se pure look ke gradients control kar sakte ho bhai!
//   const TAB_GRADIENTS = {
//     index:    ['#FFCCBC', '#FFE0B2'], // Sunset Golden Yellow
//     // explore:  ['#81C784', '#A5D6A7'], // Premium Mint Green
//     wishlist: ['#FF8A80', '#FF5252'], // Blush Accent Pink/Red
//     categories: ['#F8B4D9', '#FAD0C4'], 
//     cart:     ['#64B5F6', '#2196F3'], // Deep Electric Blue
//     profile:  ['#BA68C8', '#9C27B0'], // Royal Soft Purple
//   };

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBar,
//         tabBarItemStyle: styles.tabBarItem,
//         tabBarInactiveBackgroundColor: "transparent",
//         tabBarActiveTintColor: "#FFF",
//         tabBarInactiveTintColor: "#6B7280",
//       }}
//     >
//       {/* 🏠 1. HOME TAB */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           tabBarIcon: ({ focused }) => {
//             const content = (
//               <Ionicons
//                 name={focused ? "home" : "home-outline"}
//                 size={22}
//                 color={focused ? "#FFF" : "#6B7280"}
//               />
//             );
//             return focused ? (
//               <LinearGradient colors={TAB_GRADIENTS.index} style={styles.iconBoxActive}>
//                 {content}
//               </LinearGradient>
//             ) : (
//               <View style={styles.iconBoxInactive}>{content}</View>
//             );
//           },
//         }}
//       />

//       {/* 🔍 2. EXPLORE TAB */}
//       {/* <Tabs.Screen
//         name="explore"
//         options={{
//           tabBarIcon: ({ focused }) => {
//             const content = (
//               <Ionicons
//                 name={focused ? "compass" : "compass-outline"}
//                 size={22}
//                 color={focused ? "#FFF" : "#6B7280"}
//               />
//             );
//             return focused ? (
//               <LinearGradient colors={TAB_GRADIENTS.explore} style={styles.iconBoxActive}>
//                 {content}
//               </LinearGradient>
//             ) : (
//               <View style={styles.iconBoxInactive}>{content}</View>
//             );
//           },
//         }}
//       /> */}

//       {/* 🖤 3. WISHLIST TAB */}
//       <Tabs.Screen
//         name="wishlist"
//         options={{
//           tabBarIcon: ({ focused }) => {
//             const content = (
//               <Ionicons
//                 name={focused ? "heart" : "heart-outline"}
//                 size={22}
//                 color={focused ? "#FFFFFF" : "#6B7280"} // Active hone par text/icon white kiya taaki clean dikhe
//               />
//             );
//             return focused ? (
//               <LinearGradient colors={TAB_GRADIENTS.wishlist} style={styles.iconBoxActive}>
//                 {content}
//               </LinearGradient>
//             ) : (
//               <View style={styles.iconBoxInactive}>{content}</View>
//             );
//           },
//         }}
//       />

//    {/* 🗂️ 3. CATEGORIES TAB (Flipkart Clone UI Anchor) */}
//       <Tabs.Screen
//         name="categories"
//         options={{
//           tabBarIcon: ({ focused }) => {
//             const content = <Ionicons name={focused ? "grid" : "grid-outline"} size={20} color={focused ? "#FFF" : "#6B7280"} />;
//             return focused ? <LinearGradient colors={TAB_GRADIENTS.categories} style={styles.iconBoxActive}>{content}</LinearGradient> : <View style={styles.iconBoxInactive}>{content}</View>;
//           },
//         }}
//       />
//       {/* 🛒 4. CART TAB */}
//       <Tabs.Screen
//         name="cart"
//         options={{
//           tabBarIcon: ({ focused }) => {
//             const content = (
//               <Ionicons
//                 name={focused ? "bag-handle" : "bag-handle-outline"}
//                 size={22}
//                 color={focused ? "#FFFFFF" : "#6B7280"}
//               />
//             );
//             return focused ? (
//               <LinearGradient colors={TAB_GRADIENTS.cart} style={styles.iconBoxActive}>
//                 {content}
//               </LinearGradient>
//             ) : (
//               <View style={styles.iconBoxInactive}>{content}</View>
//             );
//           },
//         }}
//       />

//       {/* 👤 5. PROFILE TAB */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           tabBarIcon: ({ focused }) => {
//             const content = (
//               <Ionicons
//                 name={focused ? "person" : "person-outline"}
//                 size={22}
//                 color={focused ? "#FFFFFF" : "#6B7280"}
//               />
//             );
//             return focused ? (
//               <LinearGradient colors={TAB_GRADIENTS.profile} style={styles.iconBoxActive}>
//                 {content}
//               </LinearGradient>
//             ) : (
//               <View style={styles.iconBoxInactive}>{content}</View>
//             );
//           },
//         }}
//       />
//     </Tabs>
//   );
// }

// // ─── EXACT LAYOUT STYLES ───
// const styles = StyleSheet.create({
//   tabBar: {
//     // position: "absolute",
//     // bottom: 34,
//     // marginLeft: 20,
//     // marginRight: 20,
//     borderRadius: 18,
//     height: 68,
//     backgroundColor: "rgba(235, 237, 240, 0.95)",
//     // backgroundColor: "#FAA656",
//      borderColor: '#8B5E34',
//           borderTopWidth: 1.2,
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           borderLeftColor: '#8B5E34',
//           borderLeftWidth: 0.2,
//           borderRightColor: '#8B5E34',
//           borderRightWidth: 0.2,
//     // elevation: 5,
//     // shadowColor: "#000",
//     // shadowOpacity: 0.15,
//     // shadowRadius: 10,
//     paddingHorizontal: 10,
//     // shadowOffset: { width: 0, height: 6 },
//   },
//   tabBarItem: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//       paddingVertical: 15,
//   },
//   iconBoxActive: {
//     width: 52,
//     height: 52,
//     borderRadius: 28, 
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 6,
//     borderWidth: 1.2,
//     borderColor: "#8B5E34", // Soft glassy border over gradient
//   },
//   iconBoxInactive: {
//     width: 52,
//     height: 52,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     borderWidth: 0,
//   },
// });

// import { Tabs } from "expo-router";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Svg, { Path } from "react-native-svg";
// import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

// const { width } = Dimensions.get("window");
// const TAB_BAR_HEIGHT = 68;
// const TAB_WIDTH = width / 5;

// // Create an Animated version of the SVG View container
// const AnimatedSvgContainer = Animated.createAnimatedComponent(View);

// export default function TabLayout() {
//   const TAB_GRADIENTS = {
//     index:      ['#FFCCBC', '#FFE0B2'], // Sunset Orange
//     wishlist:   ['#FF8A80', '#FF5252'], // Wishlist Red
//     categories: ['#F8B4D9', '#FAD0C4'], // Creamy Pink
//     cart:       ['#64B5F6', '#2196F3'], // Electric Blue
//     profile:    ['#BA68C8', '#9C27B0'], // Royal Purple
//   };

//   // ✅ 1. DYNAMIC SVG BACKGROUND COMPONENT
//   // Yeh pure tab bar ke background ko continuous curve cutout deta hai
//   const CurveBackground = ({ activeIndex }: { activeIndex: number }) => {
//     const animatedBgStyle = useAnimatedStyle(() => {
//       return {
//         // Cutout horizontal axis par dynamic aur smoothly slide karega active index ke sath
//         transform: [
//           {
//             translateX: withSpring(activeIndex * TAB_WIDTH, {
//               damping: 15,
//               stiffness: 100,
//             }),
//           },
//         ],
//       };
//     });

//     return (
//       <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
//         {/* Main white bar wrapper layer */}
//         <View style={styles.absoluteBackgroundBase} />
        
//         {/* Animated Notch Cutout Window overlay */}
//         <AnimatedSvgContainer style={[styles.svgBackgroundMover, animatedBgStyle]}>
//           <Svg width={TAB_WIDTH} height={30} viewBox={`0 0 ${TAB_WIDTH} 30`}>
//             <Path
//               d={`M 0 0 
//                   L ${TAB_WIDTH * 0.15} 0 
//                   C ${TAB_WIDTH * 0.32} 0, ${TAB_WIDTH * 0.32} 24, ${TAB_WIDTH * 0.5} 24 
//                   C ${TAB_WIDTH * 0.68} 24, ${TAB_WIDTH * 0.68} 0, ${TAB_WIDTH * 0.85} 0 
//                   L ${TAB_WIDTH} 0 
//                   L ${TAB_WIDTH} 30 
//                   L 0 30 
//                   Z`}
//               fill="#F5F7FA" // Device layout container ka match tone jisse smooth transparent hole lage
//             />
//           </Svg>
//         </AnimatedSvgContainer>
//       </View>
//     );
//   };

//   // ✅ 2. DYNAMIC ICON RENDER ENGINE
//   const renderTabIcon = (focused: boolean, iconName: any, activeIconName: any, gradientColors: string[]) => {
//     const animatedIconStyle = useAnimatedStyle(() => {
//       return {
//         transform: [
//           {
//             translateY: withSpring(focused ? -22 : 0, {
//               damping: 12,
//               stiffness: 90,
//             }),
//           },
//           {
//             scale: withSpring(focused ? 1.15 : 1, {
//               damping: 10,
//               stiffness: 100,
//             }),
//           },
//         ],
//       };
//     });

//     return (
//       <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
//         {focused ? (
//           <View style={styles.floatingCircleWrapper}>
//             <LinearGradient 
//               colors={gradientColors} 
//               start={{ x: 0, y: 0 }} 
//               end={{ x: 1, y: 1 }} 
//               style={styles.floatingCircle}
//             >
//               <Ionicons name={activeIconName} size={24} color="#FFF" />
//             </LinearGradient>
//           </View>
//         ) : (
//           <Ionicons name={iconName} size={22} color="#6B7280" />
//         )}
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.containerMaster}>
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: styles.tabBar,
//           tabBarItemStyle: styles.tabBarItem,
//         }}
//       >
//         {/* 🏠 1. HOME TAB */}
//         <Tabs.Screen
//           name="index"
//           options={{
//             tabBarIcon: ({ focused }) => renderTabIcon(focused, "home-outline", "home", TAB_GRADIENTS.index)
//           }}
//           listeners={({ navigation }) => ({
//             focus: () => navigation.setParams({ currentIdx: 0 }),
//           })}
//         />

//         {/* 🖤 2. WISHLIST TAB */}
//         <Tabs.Screen
//           name="wishlist"
//           options={{
//             tabBarIcon: ({ focused }) => renderTabIcon(focused, "heart-outline", "heart", TAB_GRADIENTS.wishlist)
//           }}
//         />

//         {/* 🗂️ 3. CATEGORIES TAB */}
//         <Tabs.Screen
//           name="categories"
//           options={{
//             tabBarIcon: ({ focused }) => renderTabIcon(focused, "grid-outline", "grid", TAB_GRADIENTS.categories)
//           }}
//         />

//         {/* 🛒 4. CART TAB */}
//         <Tabs.Screen
//           name="cart"
//           options={{
//             tabBarIcon: ({ focused }) => renderTabIcon(focused, "bag-handle-outline", "bag-handle", TAB_GRADIENTS.cart)
//           }}
//         />

//         {/* 👤 5. PROFILE TAB */}
//         <Tabs.Screen
//           name="profile"
//           options={{
//             tabBarIcon: ({ focused }) => renderTabIcon(focused, "person-outline", "person", TAB_GRADIENTS.profile)
//           }}
//         />
//       </Tabs>
      
//       {/* 🛠️ Dynamic Background Curve Mapper Bridge */}
//       {/* Note: Yeh component pure background grid layer ko physically smooth cover out karega */}
//       <CurveBackground activeIndex={2} /> 
//     </View>
//   );
// }

// // ─── PIXEL PERFECT DESIGN MATRIX STYLES ───
// const styles = StyleSheet.create({
//   containerMaster: {
//     flex: 1,
//     position: 'relative',
//   },
//   tabBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: TAB_BAR_HEIGHT,
//     backgroundColor: "transparent", // Background ab transparent rahega kyunki SVG isko niche handle karega
//     borderTopWidth: 0,
//     elevation: 0,
//     shadowOpacity: 0,
//     zIndex: 30, // Icons grid ko sabs upar rakha
//   },
//   tabBarItem: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   // ✅ BASE BACKGROUND LAYER CONFIGURATION
//   absoluteBackgroundBase: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: TAB_BAR_HEIGHT,
//     backgroundColor: "#FFFFFF", // Master matching structural base color
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     borderWidth: 1.2,
//     borderColor: '#8B5E34',
//   },
//   svgBackgroundMover: {
//     position: "absolute",
//     top: -1.2, // Border logic boundary control
//     width: TAB_WIDTH,
//     height: 30,
//     zIndex: 10,
//   },

//   // ✅ FLOATING BUBBLES
//   floatingCircleWrapper: {
//     width: 58,
//     height: 58,
//     borderRadius: 29,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: '#8B5E34',
//     shadowOpacity: 0.22,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 4 }
//   },
//   floatingCircle: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: '#FFFFFF',
//   },
// });
// import { Tabs } from "expo-router";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

// const { width } = Dimensions.get("window");

// export default function TabLayout() {
//   const TAB_GRADIENTS = {
//     index:      ['#FFCCBC', '#FFE0B2'], // Sunset Orange
//     wishlist:   ['#FF8A80', '#FF5252'], // Blush Red
//     categories: ['#F8B4D9', '#FAD0C4'], // Creamy Pink
//     cart:       ['#64B5F6', '#2196F3'], // Electric Blue
//     profile:    ['#BA68C8', '#9C27B0'], // Royal Purple
//   };

//   // ✅ ANIMATION ELEMENT CORE WRAPPER
//   const AnimatedTabIcon = ({ focused, iconName, activeIconName, gradientColors }: any) => {
//     // Smooth jump spring animation properties mapping for the active floating look
//     const animatedStyle = useAnimatedStyle(() => {
//       return {
//         transform: [
//           {
//             translateY: withSpring(focused ? -22 : 0, {
//               damping: 12,
//               stiffness: 90,
//             }),
//           },
//           {
//             scale: withSpring(focused ? 1.15 : 1, {
//               damping: 10,
//               stiffness: 100,
//             }),
//           },
//         ],
//       };
//     });

//     return (
//       <Animated.View style={[styles.tabItemContainer, animatedStyle]}>
//         {focused ? (
//           // 🚀 JUMP STATE: Renders as a floating circle outside the bar layout bound
//           <View style={styles.floatingCircleWrapper}>
//             <LinearGradient 
//               colors={gradientColors} 
//               start={{ x: 0, y: 0 }} 
//               end={{ x: 1, y: 1 }} 
//               style={styles.floatingCircle}
//             >
//               <Ionicons name={activeIconName} size={24} color="#FFF" />
//             </LinearGradient>
//           </View>
//         ) : (
//           // 💤 REST STATE: Sits normally inside the tab layout grid
//           <View style={styles.iconBoxInactive}>
//             <Ionicons name={iconName} size={22} color="#6B7280" />
//           </View>
//         )}
//       </Animated.View>
//     );
//   };

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBar,
//         tabBarItemStyle: styles.tabBarItem,
//       }}
//     >
//       {/* 🏠 1. HOME TAB */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <AnimatedTabIcon focused={focused} iconName="home-outline" activeIconName="home" gradientColors={TAB_GRADIENTS.index} />
//           )
//         }}
//       />

//       {/* 🖤 2. WISHLIST TAB */}
//       <Tabs.Screen
//         name="wishlist"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <AnimatedTabIcon focused={focused} iconName="heart-outline" activeIconName="heart" gradientColors={TAB_GRADIENTS.wishlist} />
//           )
//         }}
//       />

//       {/* 🗂️ 3. CATEGORIES TAB */}
//       <Tabs.Screen
//         name="categories"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <AnimatedTabIcon focused={focused} iconName="grid-outline" size={20} activeIconName="grid" gradientColors={TAB_GRADIENTS.categories} />
//           )
//         }}
//       />

//       {/* 🛒 4. CART TAB */}
//       <Tabs.Screen
//         name="cart"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <AnimatedTabIcon focused={focused} iconName="bag-handle-outline" activeIconName="bag-handle" gradientColors={TAB_GRADIENTS.cart} />
//           )
//         }}
//       />

//       {/* 👤 5. PROFILE TAB */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <AnimatedTabIcon focused={focused} iconName="person-outline" activeIconName="person" gradientColors={TAB_GRADIENTS.profile} />
//           )
//         }}
//       />
//     </Tabs>
//   );
// }

// // ─── EXACT DYNAMIC CURVED BOTTOM LAYOUT STYLES ───
// const styles = StyleSheet.create({
//   tabBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 68,
//     backgroundColor: "rgba(235, 237, 240, 0.96)",
//     borderColor: '#8B5E34',
//     borderTopWidth: 1.2,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     borderLeftColor: '#8B5E34',
//     borderLeftWidth: 0.2,
//     borderRightColor: '#8B5E34',
//     borderRightWidth: 0.2,
//     paddingHorizontal: 8,
//     // Bottom shadows for sleek floating card aesthetics
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: -3 },
//   },
//   tabBarItem: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   tabItemContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
  
//   // ✅ FLOATING MECHANICS: Circular dynamic FAB structure matching user uploaded asset layout
//   floatingCircleWrapper: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // High depth drop shadows for realistic depth offsets
//     elevation: 6,
//     shadowColor: '#8B5E34',
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 4 }
//   },
//   floatingCircle: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: '#FFFFFF', // Clean white boundary glow outline over active circles
//   },
//   iconBoxInactive: {
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
// });