    import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../src/constants/colors";
import { BaseFonts } from '../src/constants/BaseFonts';

const { width } = Dimensions.get("window");

export const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { padding: 10, paddingBottom: 100 },
  
  // Cart Item Card
  cartItem: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.white, 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 10,
    alignItems: 'center'
  },
  image: { width: 80, height: 80, resizeMode: 'contain', backgroundColor: COLORS.imageBg, borderRadius: 4 },
  info: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 15, fontFamily: BaseFonts.medium, color: COLORS.text },
  itemPrice: { fontSize: 16, fontFamily: BaseFonts.bold, color: COLORS.text, marginTop: 4 },
  
  // Quantity Controls
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  qtyBtn: { padding: 5, paddingHorizontal: 10 },
  qtyText: { fontSize: 14, fontFamily: BaseFonts.bold, marginHorizontal: 10 },

  // Bill Summary
  summaryCard: { backgroundColor: COLORS.white, padding: 16, marginTop: 5 },
  summaryTitle: { fontSize: 16, fontFamily: BaseFonts.bold, marginBottom: 15, color: COLORS.text },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalText: { fontSize: 18, fontFamily: BaseFonts.bold, color: COLORS.text, marginTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 10 },
  
  // Checkout Button
  checkoutBtn: { 
    position: 'absolute', bottom: 20, alignSelf: 'center',
    backgroundColor: COLORS.secondary, width: '90%', 
    padding: 15, borderRadius: 8, alignItems: 'center' 
  },
  checkoutText: { color: COLORS.white, fontSize: 16, fontFamily: BaseFonts.semiBold, },

});