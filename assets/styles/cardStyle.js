// import { StyleSheet, Dimensions } from "react-native";
// import { COLORS } from "../../src/constants/colors";
// import { BaseFonts } from '../../src/constants/BaseFonts';

// const { width } = Dimensions.get('window');
// const CARD_WIDTH = width / 2 - 15;

// export const cardStyles = StyleSheet.create({
//   card: {
//     backgroundColor: COLORS.white,
//     width: CARD_WIDTH,
//     margin: 5,
//     borderRadius: 8,
//     // Shadow logic
//     shadowColor: COLORS.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   imageContainer: {
//     height: 180,
//     backgroundColor: COLORS.imageBg,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   badge: {
//     position: 'absolute',
//     top: 10,
//     left: 0,
//     backgroundColor: COLORS.error,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderTopRightRadius: 4,
//     borderBottomRightRadius: 4,
//   },
//   badgeText: { 
//     color: COLORS.white, 
//     fontSize: 10, 
//     fontFamily: BaseFonts.bold,
//   },
//   details: { padding: 10 },
//   title: { 
//     fontSize: 14, 
//     fontFamily: BaseFonts.medium,
//     color: COLORS.text 
//   },
//   brand: { 
//     fontSize: 12, 
//     color: COLORS.textLight, 
//     marginTop: 2 
//   },
//   priceRow: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     marginTop: 5 
//   },
//   price: { 
//     fontSize: 16, 
//     fontFamily: BaseFonts.bold,
//     color: COLORS.text 
//   },
//   discount: { 
//     fontSize: 12, 
//     color: COLORS.success, 
//     marginLeft: 8, 
//    fontFamily: BaseFonts.bold,
//   },
//   ratingRow: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'space-between', 
//     marginTop: 8 
//   },
//   ratingBadge: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.success,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   ratingText: { 
//     color: COLORS.white, 
//     fontSize: 12, 
//     fontFamily: BaseFonts.bold,
//     marginRight: 2 
//   },
//   stockText: { 
//     fontSize: 10, 
//     color: COLORS.error, 
//     fontFamily: BaseFonts.bold,
//   },
// });

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// Dynamic width tracking for clean 2-column list rendering grids
const cardWidth = (width - 40) / 2; 

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
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
    height: 170,
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
    gap: 8,
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