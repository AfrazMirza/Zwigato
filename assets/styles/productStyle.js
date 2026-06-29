// import { StyleSheet, Dimensions } from "react-native";
// import { COLORS } from "../../src/constants/colors";
// import { BaseFonts } from '../../src/constants/BaseFonts';
// const { width } = Dimensions.get("window");

// // // Professional Colors (Aap apne colors constant se replace kar sakte hain)
// // const COLORS = {
// //   primary: '#2874F0',
// //   success: '#388E3C',
// //   error: '#D32F2F',
// //   text: '#212121',
// //   textLight: '#878787',
// //   white: '#FFFFFF',
// //   background: '#F1F3F6',
// //   border: '#E0E0E0',
// //   warning: '#FFE11B',
// //   warningLight: '#FFFEEB'
// // };

// export const productStyle = StyleSheet.create({
//   // Main Containers
//   container: { flex: 1, backgroundColor: COLORS.background },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   scrollContent: { paddingBottom: 80 },

//   // Shared Card Component
//   card: { backgroundColor: COLORS.white, padding: 16, marginBottom: 8 },
  
//   // Image Section
//   imageCard: { 
//     backgroundColor: COLORS.white, 
//     width: width, 
//     height: 380, 
//     justifyContent: 'center', 
//     marginBottom: 8 
//   },
//   mainImage: { width: '100%', height: '85%', resizeMode: 'contain' },
//   favCircle: { 
//     position: 'absolute', top: 20, right: 20, 
//     backgroundColor: COLORS.white, padding: 10, 
//     borderRadius: 30, elevation: 5 
//   },

//   // Info & Pricing
//   brandTag: { color: COLORS.textLight, fontSize: 12, ffontFamily: BaseFonts.bold, letterSpacing: 1 },
//   mainTitle: { fontSize: 18, color: COLORS.text, marginTop: 4, lineHeight: 24 },
//   priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 12 },
//   currentPrice: { fontSize: 26, fontFamily: BaseFonts.semiBold, color: COLORS.text },
//   strikePrice: { fontSize: 16, color: COLORS.textLight, textDecorationLine: 'line-through', marginLeft: 10 },
//   discountTag: { fontSize: 16, color: COLORS.success, fontFamily: BaseFonts.semiBold, marginLeft: 10 },

//   // Rating Badge (Used in main screen)
//   ratingTriggerBtn: {
//     flexDirection: 'row', alignItems: 'center',
//     backgroundColor: COLORS.background, paddingHorizontal: 10,
//     paddingVertical: 5, borderRadius: 15, alignSelf: 'flex-start', marginTop: 10,
//   },
//   ratingBadgeSmall: {
//     flexDirection: 'row', backgroundColor: COLORS.success,
//     paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignItems: 'center',
//   },
//   ratingTextSmall: { color: COLORS.white, fontFamily: BaseFonts.semiBold, fontSize: 12, marginRight: 2 },
//   reviewLinkText: { marginLeft: 8, color: COLORS.textLight, fontSize: 12, fontFamily: BaseFonts.medium, },

//   // Stock & MOQ Information
//   stockInfoCard: { 
//     backgroundColor: COLORS.warningLight, padding: 12, 
//     marginHorizontal: 16, borderRadius: 8, marginBottom: 15, 
//     borderWidth: 1, borderColor: COLORS.warning 
//   },
//   infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
//   infoLabel: { marginLeft: 8, fontSize: 13, color: COLORS.text },
//   infoVal: { fontFamily: BaseFonts.bold, fontSize: 13 },
//   moqNote: { fontSize: 11, color: COLORS.error, fontFamily: BaseFonts.medium, },

//   // Trust/Warranty Badges
//   trustCard: { flexDirection: 'row', backgroundColor: COLORS.white, paddingVertical: 20, marginBottom: 8, justifyContent: 'space-around' },
//   trustItem: { alignItems: 'center', flex: 1 },
//   trustLabel: { fontSize: 10, color: COLORS.text, marginTop: 6, textAlign: 'center', fontFamily: BaseFonts.medium, },
//   verticalDivider: { width: 1, height: '70%', backgroundColor: COLORS.border },

//   // Specifications Grid
//   sectionHeader: { fontSize: 16, fontFamily: BaseFonts.bold, color: COLORS.text, marginBottom: 15 },
//   specGrid: { flexDirection: 'row', flexWrap: 'wrap' },
//   specBox: { width: '50%', marginBottom: 15 },
//   label: { fontSize: 12, color: COLORS.textLight },
//   val: { fontSize: 14, color: COLORS.text, fontFamily: BaseFonts.medium, marginTop: 2 },

//   // Description
//   descText: { fontSize: 14, color: '#444', lineHeight: 22 },
//   readMoreBtn: { color: COLORS.primary, fontFamily: BaseFonts.semiBold, marginTop: 8 },

//   // Sticky Footer
//   stickyAction: { 
//     position: 'absolute', bottom: 0, width: width, height: 65, 
//     flexDirection: 'row', backgroundColor: COLORS.white, 
//     borderTopWidth: 1, borderTopColor: COLORS.border 
//   },
//   wishBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   wishBtnText: { fontSize: 16, fontFamily: BaseFonts.bold, color: COLORS.text },
//   cartBtn: { 
//     flex: 1, backgroundColor: COLORS.primary, 
//     flexDirection: 'row', justifyContent: 'center', alignItems: 'center' 
//   },
//   cartBtnText: { fontSize: 16, fontFamily: BaseFonts.bold, color: COLORS.white, marginLeft: 8 },

//   // Modal Styles
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 10, height: 250 },
//   modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
//   modalMainTitle: { fontSize: 18, fontFamily: BaseFonts.semiBold, color: COLORS.text },
//   overallRatingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
//   overallRatingText: { fontSize: 18, fontFamily: BaseFonts.semiBold, color: COLORS.text, marginRight: 10 },
//   veryGoodText: { color: COLORS.success, backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 12, fontFamily: BaseFonts.semiBold, },
//   basedOnText: { fontSize: 12, color: COLORS.textLight, marginTop: 5 },
  
//   // Modal Review Cards (Horizontal)
//   modalListPadding: { paddingHorizontal: 15, paddingVertical: 15 },
//   modalReviewCard: { backgroundColor: COLORS.background, width: width * 0.8, marginRight: 5, borderRadius: 12, padding: 15, height: 130, justifyContent: 'space-between' },
//   modalRevHeader: { flexDirection: 'row', alignItems: 'center', },
//   modalRevTitle: { fontFamily: BaseFonts.semiBold, fontSize: 14, marginLeft: 10 },
//   modalComment: { fontSize: 14, color: '#444', lineHeight: 20 },
// //   modalUserInfo: { marginTop: 10 },
//   modalUserName: { fontSize: 13, fontFamily: BaseFonts.semiBold, color: COLORS.text },
//   verifiedRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
//   verifiedText: { fontSize: 11, color: COLORS.textLight, marginLeft: 4 },
//   helpfulRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#DDD', paddingTop: 10, marginTop: 10 },
//   likeBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
//   likeCount: { marginLeft: 5, fontSize: 12, color: COLORS.textLight },

//   errorContainer: {
//   flex: 1,
// //   backgroundColor: '#9DA89D', // Image jaisa muted greenish-gray color
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: 40,
// },
// content: {
//   alignItems: 'center',
//   paddingHorizontal: 10,
// },
// logoBox: {
//     borderWidth: 1,
//   borderColor: COLORS.primary,
//   backgroundColor: '#fff',
//   padding: 15,
//   borderRadius: 12,
//   marginBottom: 30,
//   // Shadow for professional look
//   elevation: 5,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.1,
//   shadowRadius: 4,
// },
// logoImage: {
//   width: 50,
//   height: 50,
//   resizeMode: 'contain',
// },
// sorryText: {
//   fontSize: 22,
//   color: '#000',
//   textAlign: 'center',
//   fontFamily: 'serif', // Serif font Myntra style ke liye
//   lineHeight: 30,
//   marginBottom: 15,
// },
// refreshText: {
//   fontSize: 16,
//   color: '#000',
//   textAlign: 'center',
//   fontFamily: 'serif',
//   lineHeight: 24,
// },
// retryBtn: {
//   marginTop: 40,
//   borderWidth: 1,
//   borderColor: COLORS.primary,
//   backgroundColor: COLORS.primary,
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 2,
// },
// retryText: {
//   color: '#fff',
//   fontFamily: BaseFonts.semiBold,
//   letterSpacing: 1,
// },

// // productStyle update:
// carousel: {
//   width: width,
//   height: 400, // Aap height badha sakte hain "Larger" look ke liye
// },
// carouselImage: {
//   width: width,
//   height: 400,
//   resizeMode: 'contain', // 'cover' bhi use kar sakte hain agar full bleed chahiye
//   backgroundColor: '#fff',
// },
// imageCard: {
//   position: 'relative',
//   backgroundColor: '#f9f9f9',

//   borderBottomWidth: 1,
//   borderBottomColor: '#E5E5E5'
//   // borderRadius: 15,
//   //   overflow: 'hidden',
//   //   elevation: 2,
// },
// favCircle: {
//   position: 'absolute',
//   right: 20,
//   bottom: 20,
//   backgroundColor: '#fff',
//   padding: 10,
//   borderRadius: 25,
//   elevation: 5,
//   shadowColor: '#000',
//   shadowOpacity: 0.1,
//   shadowRadius: 5,
// },
// imageBadge: {
//   position: 'absolute',
//   bottom: 20,
//   left: 20,
//   backgroundColor: 'rgba(116, 112, 112, 0.5)',
//   paddingHorizontal: 10,
//   paddingVertical: 4,
//   borderRadius: 12,
// },
// badgeText: {
//   color: '#fff',
//   fontSize: 12,
//   fontFamily: BaseFonts.semiBold,
// },
// });

import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../src/constants/colors";
import { BaseFonts } from '../../src/constants/BaseFonts';
const { width } = Dimensions.get("window");

export const productStyle = StyleSheet.create({
  // Main Containers
  container: { flex: 1, backgroundColor: '#F5F5F7' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 100 },

  // Shared Card Component
  card: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
  
  // Carousel & Image System Fixes
  imageCard: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: width,
    height: 400,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },
  carousel: {
    width: width,
    height: 400,
  },
  carouselImage: {
    width: width,
    height: 400,
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  favCircle: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  imageBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: BaseFonts.semiBold,
  },

  // Info & Pricing Typo Corrections
  brandTag: { color: '#878787', fontSize: 13, fontFamily: BaseFonts.bold, letterSpacing: 1.2 },
  mainTitle: { fontSize: 16, fontFamily: BaseFonts.medium, color: '#212121', marginTop: 4, lineHeight: 22 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  currentPrice: { fontSize: 24, fontFamily: BaseFonts.semiBold, color: '#212121' },
  strikePrice: { fontSize: 14, color: '#878787', textDecorationLine: 'line-through', marginLeft: 10 },
  discountTag: { fontSize: 14, color: '#388E3C', fontFamily: BaseFonts.semiBold, marginLeft: 10 },

  // Ratings Triggers
  ratingTriggerBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F5F7', paddingHorizontal: 10,
    paddingVertical: 6, borderRadius: 15, alignSelf: 'flex-start', marginTop: 12,
  },
  ratingBadgeSmall: {
    flexDirection: 'row', backgroundColor: '#388E3C',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignItems: 'center',
  },
  ratingTextSmall: { color: '#FFFFFF', fontFamily: BaseFonts.semiBold, fontSize: 11, marginRight: 2 },
  reviewLinkText: { marginLeft: 8, color: '#878787', fontSize: 12, fontFamily: BaseFonts.medium },

  // Stock Warning layout
  stockInfoCard: { 
    backgroundColor: '#FFFEEB', padding: 14, 
    marginHorizontal: 16, borderRadius: 12, marginBottom: 16, 
    borderWidth: 1, borderColor: '#FFE11B', marginTop: 8
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  infoLabel: { marginLeft: 8, fontSize: 13, color: '#212121' },
  infoVal: { fontFamily: BaseFonts.bold, fontSize: 13, color: '#212121' },
  moqNote: { fontSize: 11, color: '#D32F2F', fontFamily: BaseFonts.medium, marginTop: 4 },

  // Trust/Warranty Cards Layout
  trustCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingVertical: 16, marginBottom: 8, justifyContent: 'space-around', alignItems: 'center' },
  trustItem: { alignItems: 'center', flex: 1, paddingHorizontal: 4 },
  trustLabel: { fontSize: 10, color: '#212121', marginTop: 6, textAlign: 'center', fontFamily: BaseFonts.medium, lineHeight: 14 },
  verticalDivider: { width: 1, height: '60%', backgroundColor: '#E0E0E0' },

  // Specifications Grid Layout
  sectionHeader: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#212121', marginBottom: 12 },
  specGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  specBox: { width: '50%', marginBottom: 14 },
  label: { fontSize: 12, color: '#878787', fontFamily: BaseFonts.regular },
  val: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.medium, marginTop: 2 },

  // Description
  descText: { fontSize: 13, color: '#444444', lineHeight: 20, fontFamily: BaseFonts.regular },
  readMoreBtn: { color: '#2874F0', fontFamily: BaseFonts.semiBold, marginTop: 6, fontSize: 13 },

  // Sticky Footers Fixed Boundaries
  stickyAction: { 
    position: 'absolute', bottom: 0, width: width, height: 68, 
    flexDirection: 'row', backgroundColor: '#FFFFFF', 
    borderTopWidth: 1, borderTopColor: '#E0E0E0', zIndex: 10
  },
  wishBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  wishBtnText: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#212121', letterSpacing: 0.5 },
  cartBtn: { 
    flex: 1, backgroundColor: '#2874F0', 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center' 
  },
  cartBtnText: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#FFFFFF', marginLeft: 8, letterSpacing: 0.5 },

  // Modal Views Styling Adjustments
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 20, height: 280 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  modalMainTitle: { fontSize: 16, fontFamily: BaseFonts.semiBold, color: '#212121' },
  overallRatingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  overallRatingText: { fontSize: 20, fontFamily: BaseFonts.semiBold, color: '#212121', marginRight: 10 },
  veryGoodText: { color: '#388E3C', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 11, fontFamily: BaseFonts.semiBold },
  
  // Horizontal Reviews Content Fixes
  modalListPadding: { paddingLeft: 16, paddingRight: 16 },
  modalReviewCard: { backgroundColor: '#F5F5F7', width: width * 0.78, marginRight: 12, borderRadius: 16, padding: 14, height: 150, justifyContent: 'space-between', borderWidth: 1, borderColor: '#E5E5E5' },
  modalRevHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  modalRevTitle: { fontFamily: BaseFonts.semiBold, fontSize: 13, marginLeft: 8, color: '#212121' },
  modalComment: { fontSize: 12, color: '#444444', lineHeight: 18, fontFamily: BaseFonts.regular, flex: 1, marginTop: 4 },
  modalUserInfo: { marginTop: 6, borderTopWidth: 0.5, borderTopColor: '#E0E0E0', paddingTop: 6 },
  modalUserName: { fontSize: 12, fontFamily: BaseFonts.semiBold, color: '#212121' },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  verifiedText: { fontSize: 10, color: '#878787', marginLeft: 4 },

  // Full Screen Error Patterns
  errorContainer: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', padding: 40 },
  content: { alignItems: 'center', paddingHorizontal: 10 },
  logoBox: { borderWidth: 1, borderColor: '#2874F0', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 24, elevation: 4 },
  logoImage: { width: 60, height: 60, resizeMode: 'contain' },
  sorryText: { fontSize: 18, color: '#212121', textAlign: 'center', fontFamily: 'serif', lineHeight: 26, marginBottom: 10 },
  refreshText: { fontSize: 14, color: '#878787', textAlign: 'center', fontFamily: 'serif', lineHeight: 20 },
  retryBtn: { marginTop: 32, backgroundColor: '#2874F0', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 4 },
  retryText: { color: '#FFFFFF', fontFamily: BaseFonts.semiBold, letterSpacing: 0.5, fontSize: 14 },
});