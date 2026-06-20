import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from 'expo-router';
import { useShop } from '../context/ShopContext';
import { COLORS } from '../constants/colors';
import { BaseFonts } from '../constants/BaseFonts';
const AppIcon = require('../../assets/zwigato.jpg');

const { width } = Dimensions.get('window');

const Header = ({ title, showBack = false, ShowWishlist = true, ShowCart = true  }) => {
  const router = useRouter();
  const { cart, favorites } = useShop();
//   console.log("Header Cart Data:", cart);
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Side: Back Arrow or Logo */}
        <View style={styles.leftRow}>
          {showBack ? (
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={24} color={COLORS.iconColor} />
            </TouchableOpacity>
          ) : (
    /* This replaces the 'null' part */
    <View style={styles.appIconContainer}>
      <Image
        source={AppIcon} 
        style={styles.headerAppIcon} 
        resizeMode="contain"
      />
    </View>
  )
          }
          <Text style={styles.logoText}>{title || 'Myntra'}</Text>
        </View>

        {/* Right Side: Search, Wishlist, Cart */}
        <View style={styles.rightRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/search')}>
            <Ionicons name="search-outline" size={24} color={COLORS.iconColor} />
          </TouchableOpacity>

          {ShowWishlist === true ? (
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.navigate('/wishlist')}>
            <Ionicons name="heart-outline" size={24} color={COLORS.iconColor} />
            {/* {favorites.length > 10 && <View style={styles.dot} />} */}
          </TouchableOpacity>
          ) : null}

          {ShowCart === true ? (
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.navigate('/cart')}>
            {/* <Ionicons name="bag-outline" size={22} color={COLORS.iconColor} /> */}
            <SimpleLineIcons name="bag" size={20} color={COLORS.iconColor} />
            { cart && cart.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{ cart.length > 9 ? '9+' : cart.length }</Text>
              </View>
            )}
          </TouchableOpacity>
          ) : null }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: COLORS.white, paddingTop: 40, borderBottomColor: '#E5E5E5', borderBottomWidth: 0.5 }, // For status bar notch
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    // backgroundColor: '#FA4616',
    // elevation: 2, // Shadow for android
    // shadowColor: '#000', // Shadow for iOS
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,

  },
  leftRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  appIconContainer: {
    paddingLeft: 5,
    // marginRight: ,
  },
  headerAppIcon: {
    width: 32,  // Adjust size as needed
    height: 32,
    // borderRadius: 6, // Optional: gives it a slightly rounded look
  },
  logoText: {
    fontSize: 16,
    fontFamily: BaseFonts.bold,
    color: COLORS.iconColor,
    marginLeft: 5,
    letterSpacing: 0.5
  },
  rightRow: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 8, position: 'relative' },
  badge: {
    position: 'absolute',
    top: 4,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    // zIndex: 100,
  },
  badgeText: { color: COLORS.white, fontSize: 10, fontFamily: BaseFonts.semiBold, },
  dot: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: COLORS.myntraPink,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.white
  }
});

export default Header;