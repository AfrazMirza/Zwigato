import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// Dynamic width layout to render 2 items beautifully side-by-side
const cardWidth = (width - 36) / 2; 

const ProductCard = ({ product, onPress }) => {
  const isTopRated = product.rating >= 4.5;
  
  // Real E-commerce price equation calculation
  const calculatedOriginalPrice = Math.round((product.price * 80) / (1 - product.discountPercentage / 100));

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      
      {/* 🖼️ IMAGE BOX CONTAINER WITH FLOATING BADGE */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="cover" />
        
        {isTopRated && (
          <View style={styles.bestsellerBadge}>
            <Text style={styles.badgeText}>BESTSELLER</Text>
          </View>
        )}
      </View>

      {/* 📝 PREMIUM DATA TEXT GRID */}
      <View style={styles.detailsContainer}>
        
        {/* Brand & Title Stack */}
        <View style={styles.textStack}>
          <Text numberOfLines={1} style={styles.brandText}>{product.brand?.toUpperCase() || 'BRAND'}</Text>
          <Text numberOfLines={1} style={styles.titleText}>{product.title}</Text>
        </View>
        
        {/* Real E-Commerce Price Matrix Row */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPriceText}>₹{Math.round(product.price * 80)}</Text>
          <Text style={styles.originalPriceText}>₹{calculatedOriginalPrice}</Text>
          <Text style={styles.discountText}>{Math.round(product.discountPercentage)}% OFF</Text>
        </View>

        {/* Dynamic Rating & Stock Compliance Counters */}
        <View style={styles.metadataRow}>
          <View style={[styles.ratingCapsule, { backgroundColor: product.rating >= 4.0 ? '#00875a' : '#e65100' }]}>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <MaterialCommunityIcons name="star" size={10} color="#FFFFFF" style={{ marginLeft: 2 }} />
          </View>
          
          <Text style={[
            styles.stockIndicatorText, 
            product.stock < 10 ? { color: '#d9383a', fontWeight: '700' } : { color: '#7e818c' }
          ]}>
            {product.stock < 10 ? `Only ${product.stock} left!` : 'In Stock'}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

// ─── HIGH-END INLINE STYLES SHEET (NO OUTSIDE FILE NEEDED) ────────────────────────────
const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    // marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    // Smooth card premium drop shadows
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  
  // Sleek floating tag look
  bestsellerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ff3f6c',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  
  // Bottom details area styles
  detailsContainer: {
    padding: 12,
    gap: 5,
  },
  textStack: {
    gap: 1,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9496a2',
    letterSpacing: 0.6,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#282c3f',
  },
  
  // Price arrangement styles
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  currentPriceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  originalPriceText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#9496a2',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ff3f6c',
    marginLeft: 6,
  },
  
  // Bottom row grid alignment styles
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  ratingCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  stockIndicatorText: {
    fontSize: 10,
    fontWeight: '500',
  },
});