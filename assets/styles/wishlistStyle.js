import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../src/constants/colors";
import { BaseFonts } from '../../src/constants/BaseFonts';

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 15;

export const wishlistStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  listContent: { padding: 10 },
  
  // Grid Card
  card: {
    width: CARD_WIDTH,
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#f9f9f9',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  removeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    padding: 4,
  },
  
  // Details
  details: { padding: 10, alignItems: 'center' },
  brand: { fontFamily: BaseFonts.semiBold, fontSize: 13, color: COLORS.text, textAlign: 'center' },
  title: { fontSize: 12, color: COLORS.textLight, marginTop: 2, textAlign: 'center' },
  
  // Price Section
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: COLORS.text },
  mrp: { fontSize: 12, textDecorationLine: 'line-through', color: COLORS.textLight, marginLeft: 5 },
  off: { fontSize: 12, color: '#ff905a', marginLeft: 5 },

  // Rating Badge (Image par overlay)
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: 'center',
  },
  ratingText: { fontSize: 11, fontFamily: BaseFonts.semiBold, marginRight: 2 },

  // Move to Bag Button
  moveBtn: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveBtnText: {
    color: '#ff3f6c', // Myntra Pink
    fontFamily: BaseFonts.semiBold,
    fontSize: 13,
  },
  emptyContainer: { flex: 1, alignItems: 'center', backgroundColor: '#fff', padding: 15 },
  emptyTitle: { fontSize: 18, fontFamily: BaseFonts.semiBold, marginTop: 20 },
  emptySubtitle: { textAlign: 'center', color: '#878787',fontFamily: BaseFonts.regular, marginTop: 10,},
  shopBtn: { marginTop: 30, borderWidth: 1, borderColor: COLORS.primary, padding: 15, borderRadius: 4 },
  shopBtnText: { color: COLORS.primary, fontFamily: BaseFonts.bold,},
  snackbar: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
    backgroundColor: '#282c3f', borderRadius: 4, padding: 15,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    zIndex: 1000, // Elevate above everything
  },
  snackbarText: { color: '#fff', fontSize: 13, flex: 1, marginRight: 10 },
  undoText: { color: '#ff3f6c', fontFamily: BaseFonts.semiBold, fontSize: 14 }, // Myntra Pink
});