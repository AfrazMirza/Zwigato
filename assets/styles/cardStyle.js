import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../src/constants/colors";
import { BaseFonts } from '../../src/constants/BaseFonts';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 15;

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: CARD_WIDTH,
    margin: 5,
    borderRadius: 8,
    // Shadow logic
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    backgroundColor: COLORS.imageBg,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 0,
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  badgeText: { 
    color: COLORS.white, 
    fontSize: 10, 
    fontFamily: BaseFonts.bold,
  },
  details: { padding: 10 },
  title: { 
    fontSize: 14, 
    fontFamily: BaseFonts.medium,
    color: COLORS.text 
  },
  brand: { 
    fontSize: 12, 
    color: COLORS.textLight, 
    marginTop: 2 
  },
  priceRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5 
  },
  price: { 
    fontSize: 16, 
    fontFamily: BaseFonts.bold,
    color: COLORS.text 
  },
  discount: { 
    fontSize: 12, 
    color: COLORS.success, 
    marginLeft: 8, 
   fontFamily: BaseFonts.bold,
  },
  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 8 
  },
  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: COLORS.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  ratingText: { 
    color: COLORS.white, 
    fontSize: 12, 
    fontFamily: BaseFonts.bold,
    marginRight: 2 
  },
  stockText: { 
    fontSize: 10, 
    color: COLORS.error, 
    fontFamily: BaseFonts.bold,
  },
});