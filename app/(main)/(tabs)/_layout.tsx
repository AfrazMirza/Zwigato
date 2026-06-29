import { Tabs } from "expo-router";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // 👈 Gradient wrap import kiya

const { width } = Dimensions.get("window");

export default function TabLayout() {
  // ── CUSTOM TAB RADIANTS CONFIGURATION ──
  // Aap yahan se pure look ke gradients control kar sakte ho bhai!
  const TAB_GRADIENTS = {
    index:    ['#FFD54F', '#FFE450'], // Sunset Golden Yellow
    explore:  ['#81C784', '#A5D6A7'], // Premium Mint Green
    wishlist: ['#FF8A80', '#FF5252'], // Blush Accent Pink/Red
    cart:     ['#64B5F6', '#2196F3'], // Deep Electric Blue
    profile:  ['#BA68C8', '#9C27B0'], // Royal Soft Purple
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarInactiveBackgroundColor: "transparent",
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      {/* 🏠 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => {
            const content = (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={focused ? "#000000" : "#6B7280"}
              />
            );
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.index} style={styles.iconBoxActive}>
                {content}
              </LinearGradient>
            ) : (
              <View style={styles.iconBoxInactive}>{content}</View>
            );
          },
        }}
      />

      {/* 🔍 2. EXPLORE TAB */}
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => {
            const content = (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={22}
                color={focused ? "#000000" : "#6B7280"}
              />
            );
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.explore} style={styles.iconBoxActive}>
                {content}
              </LinearGradient>
            ) : (
              <View style={styles.iconBoxInactive}>{content}</View>
            );
          },
        }}
      />

      {/* 🖤 3. WISHLIST TAB */}
      <Tabs.Screen
        name="wishlist"
        options={{
          tabBarIcon: ({ focused }) => {
            const content = (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={22}
                color={focused ? "#FFFFFF" : "#6B7280"} // Active hone par text/icon white kiya taaki clean dikhe
              />
            );
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.wishlist} style={styles.iconBoxActive}>
                {content}
              </LinearGradient>
            ) : (
              <View style={styles.iconBoxInactive}>{content}</View>
            );
          },
        }}
      />

      {/* 🛒 4. CART TAB */}
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => {
            const content = (
              <Ionicons
                name={focused ? "bag-handle" : "bag-handle-outline"}
                size={22}
                color={focused ? "#FFFFFF" : "#6B7280"}
              />
            );
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.cart} style={styles.iconBoxActive}>
                {content}
              </LinearGradient>
            ) : (
              <View style={styles.iconBoxInactive}>{content}</View>
            );
          },
        }}
      />

      {/* 👤 5. PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => {
            const content = (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={focused ? "#FFFFFF" : "#6B7280"}
              />
            );
            return focused ? (
              <LinearGradient colors={TAB_GRADIENTS.profile} style={styles.iconBoxActive}>
                {content}
              </LinearGradient>
            ) : (
              <View style={styles.iconBoxInactive}>{content}</View>
            );
          },
        }}
      />
    </Tabs>
  );
}

// ─── EXACT LAYOUT STYLES ───
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 34,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    height: 68,
    backgroundColor: "rgba(235, 237, 240, 0.95)",
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    paddingHorizontal: 6,
    shadowOffset: { width: 0, height: 6 },
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
      paddingVertical: 15,
  },
  iconBoxActive: {
    width: 52,
    height: 52,
    borderRadius: 16, 
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.4)", // Soft glassy border over gradient
  },
  iconBoxInactive: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});