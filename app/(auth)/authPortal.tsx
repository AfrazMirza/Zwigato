import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function AuthPortalScreen() {
  const router = useRouter();

  // 6 Premium high-res e-commerce placeholder products for collage grid
  const productImages = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', // Crimson Sneakers
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', // Audio Headset
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', // Minimalist Watch
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', // Designer Sunglasses
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', // Gaming Controller
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', // Retro Camera
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', // Crimson Sneakers
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', // Audio Headset
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', // Minimalist Watch
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', // Designer Sunglasses
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', // Gaming Controller
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', // Retro Camera
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

{/* 📸 Top Styled Image Collage Section (Perfect Symmetry & Grid Alignment) */}
<View style={styles.collageContainer}>
  {productImages.map((uri, index) => {
    // 3 Columns system (Symmetric distribution)
    const columnIndex = index % 12; // 16 images for a 3x3 grid with some duplicates for visual richness

    // Dynamic pattern standard matching for original flow
    let cardHeight = 135; 
    if (index === 0 || index === 5) cardHeight = 135; // Corner highlights
    if (index === 1 || index === 4) cardHeight = 135; // Symmetrical sizing

    // Single unified perspective slant to maintain clean grid paths
    const dynamicCardStyle = {
      height: cardHeight,
      transform: [
        { rotate: '-6deg' }, // Uniform slant to keep parallel grid lines
        { translateY: columnIndex === 1 ? -18 : -18 } // Center shift matrix
      ]
    };

    return (
      <View key={index} style={[styles.imageCard, dynamicCardStyle]}>
        <Image source={{ uri }} style={styles.cardImage} resizeMode="cover" />
      </View>
    );
  })}
</View>
      {/* 🎯 Bottom Context Branding & Action Layout */}
      <View style={styles.bottomContent}>
        
        {/* Logo and Typography Section */}
        <View style={styles.brandingWrapper}>
         <View style={styles.logoRow}>
    <Image 
      source={require('../../assets/zwigato.jpg')} 
      style={styles.logo}
      resizeMode="contain"
    />
    {/* <Text style={styles.appName}>Zwigato</Text> */}
  </View>
          <Text style={styles.tagline}>
            Discover . Order . Enjoy
          </Text>
        </View>

        {/* 🔘 Action Control Layout Structure */}
        <View style={styles.actionBlock}>
          
          {/* Top Row: Dual Rounded Pill Buttons */}
          <View style={styles.rowActions}>
            
            {/* Primary Action Button: Login */}
            <TouchableOpacity 
              onPress={() => router.push('/signIn')} 
              style={[styles.btn, styles.btnLogin]}
              activeOpacity={0.9}
            >
              <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>

            {/* Ghost Border Action Button: Explore Trends */}
            {/* <TouchableOpacity 
              onPress={() => router.push('/search')}
              style={[styles.btn, styles.btnExplore]}
              activeOpacity={0.8}
            >
              <Text style={styles.textExplore}>Explore Trends</Text>
            </TouchableOpacity> */}
          </View>

          {/* Secondary Action: Continue as Guest */}
          <TouchableOpacity 
            onPress={() => router.replace('/(main)/(tabs)')}
            style={styles.btnGuest}
            activeOpacity={0.9}
          >
            <Text style={styles.textGuest}>Continue as Guest</Text>
          </TouchableOpacity>

          {/* Footnote Authentication Redirection Stack */}
          <View style={styles.footerWrapper}>
            <Text style={styles.footerText}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => router.push('/signUp')}>
              <Text style={styles.registerLink}>Register Now</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </View>
  );
}

// 🎨 Clean and Scalable Native Stylesheets Configuration
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
collageContainer: {
    height: '60%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Equal screen breathing room padding
    paddingTop: Platform.OS === 'ios' ? 30 : 15,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  imageCard: {
    // Precise width matrix calculation to ensure mathematical equal gaps
    width: (width - 32 - 16) / 3, // (Total width - screen paddings - row margins) divided by 3 columns
    marginVertical: 2,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  bottomContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 40 : 25,
    backgroundColor: 'transparent',
  },
  brandingWrapper: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',      // Vertical center align karne ke liye
    justifyContent: 'center', // Horizontal center align karne ke liye
    marginBottom: 12,          // Tagline se gap dene ke liye
  },
  logo: {
    // width: 220,
    height: 60,
    borderRadius: 12,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    fontSize: 32,              // Premium bold typography branding look
    // marginLeft: 12,            // Image aur Text ke beech ka gap
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: 'Poppins-Medium',
    color: '#a1a1aa',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 4,
  },
  actionBlock: {
    width: '100%',
  },
  rowActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  btn: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnLogin: {
    backgroundColor: '#ff3f6c',
    marginRight: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#ff3f6c',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  btnExplore: {
    borderWidth: 1,
    borderColor: '#3f3f46',
    backgroundColor: 'rgba(24, 24, 27, 0.6)',
    marginLeft: 6,
  },
  textLogin: {
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  textExplore: {
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  btnGuest: {
    width: '100%',
    backgroundColor: '#E0F2FE',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
  textGuest: {
    fontFamily: 'Poppins-Bold',
    color: '#09090b',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  footerText: {
    fontFamily: 'Poppins-Light',
    color: '#a1a1aa',
    fontSize: 14,
  },
  registerLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#ff3f6c',
    fontSize: 14,
  },
});