// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   StyleSheet, 
//   View, 
//   ScrollView, 
//   TouchableOpacity, 
//   TextInput, 
//   Dimensions, 
//   LayoutAnimation, 
//   Platform, 
//   UIManager,
//   Image,
//   Alert
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { BaseFonts } from '@/constants/BaseFonts';
// import Text from "@/skeleton/Text";

// // ── REDUX MATRIX SYSTEM CONNECTION FOR BULK FALLBACKS ──
// // ── REDUX SYSTEM HOOKS & ACTIONS INJECTIONS ──
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/store';
// import { addToCart } from '@/store/slices/cartSlice'; // 👈 Import addToCart action

// const initialAddresses = [
//   { id: '1', name: 'Afraz Mirza', type: 'HOME', raw: '8-e-4 vigyan Nagar Kota, Vigyan Nagar Kota', cityStateZip: 'Kota, Rajasthan 324005', mobile: '7410972065' },
//   { id: '2', name: 'Afraz Mirza', type: 'OFFICE', raw: '8-e-4 vigyan nagar Kota, Dadabari Kota', cityStateZip: 'Kota - 324009', mobile: '7410972065' }
// ];

// export default function CompleteCheckoutEngine() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const dispatch = useDispatch();

//   const [currentStep, setCurrentStep] = useState<'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'>('SUMMARY_ADDRESS'); 
//   const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
//   const [confirmedAddressId, setConfirmedAddressId] = useState<string>('1');
//   const [selectedMethod, setSelectedMethod] = useState<string>('COD'); 
//   const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState<boolean>(false);

//   const confirmedAddressData = initialAddresses.find(a => a.id === confirmedAddressId);

//   // Track pointers to prevent dynamic background add-to-cart sync if order gets successfully processed
//   const isOrderPlaced = useRef(false);

//   const isDirectBuy = params.isDirectBuy === 'true';
//   let checkoutItems: any[] = [];
//   let rawProductObject: any = null;

//   if (isDirectBuy && params.directBuyProduct) {
//     try {
//       rawProductObject = JSON.parse(params.directBuyProduct as string);
//       checkoutItems.push({
//         id: rawProductObject.id,
//         title: rawProductObject.title || rawProductObject.name,
//         price: rawProductObject.price,
//         image: rawProductObject.image || rawProductObject.thumbnail || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
//         discountPercentage: rawProductObject.discountPercentage || 12,
//         quantity: 1
//       });
//     } catch (e) {
//       console.log("Error processing params data", e);
//     }
//   } else {
//     const cart = useSelector((state: RootState) => state.shop.cart);
//     const selectedIds = useSelector((state: RootState) => state.shop.selectedIds);
//     checkoutItems = cart.filter(item => selectedIds.includes(item.id));
//   }

//   // ── 🔄 CRITICAL: AUTO-SAVE BACKUP AUTO TO CART CLEANUP LIFECYCLE ──
//   useEffect(() => {
//     return () => {
//       // Agar direct buy pipeline se aaya hai aur order confirm KIYE BINA screen back ho rahi hai:
//       if (isDirectBuy && rawProductObject && !isOrderPlaced.current) {
//         dispatch(addToCart(rawProductObject)); // Automatic cart drop setup done!
//       }
//     };
//   }, [isDirectBuy, params.directBuyProduct]);

//   // Financial bill logs
//   let totalMRP = 0;
//   let finalAmount = 0;
//   const platformFee = 23; 
//   const codFee = selectedMethod === 'COD' ? 10 : 0;

//   checkoutItems.forEach(item => {
//     const discount = item.discountPercentage || 0;
//     const basePrice = item.price / (1 - (discount / 100));
//     totalMRP += basePrice * item.quantity * 80;
//     finalAmount += item.price * item.quantity * 80;
//   });

//   const totalDiscount = totalMRP - finalAmount;
//   const totalPayable = finalAmount + platformFee + codFee;

//   const toggleAccordion = (methodKey: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setSelectedMethod(selectedMethod === methodKey ? '' : methodKey);
//   };

//   const togglePriceDetails = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setIsPriceDetailsVisible(!isPriceDetailsVisible);
//   };

//   return (
//     <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      
//       {/* ── HEADER ROW TRACKER ── */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => {
//           if (currentStep === 'PAYMENT') setCurrentStep('SUMMARY_ADDRESS');
//           else if (currentStep === 'CHOOSE_ADDRESS') setCurrentStep('SUMMARY_ADDRESS');
//           else router.back();
//         }} style={styles.navBackIcon}>
//           <Ionicons name="arrow-back" size={24} color="#282c3f" />
//         </TouchableOpacity>
//         <Text style={styles.headerMainTitle}>
//           {currentStep === 'PAYMENT' ? 'PAYMENT' : 'ORDER SUMMARY'}
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Steps segment view loop rendering layout */}
//       <View style={styles.progressBarWrapper}>
//         <View style={styles.progressStepNode}>
//           <Ionicons name="checkmark-circle" size={16} color="#2874F0" />
//           <Text style={[styles.progressStepLabel, { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Address</Text>
//         </View>
//         <View style={[styles.progressLineSegment, { backgroundColor: '#2874F0' }]} />
//         <View style={styles.progressStepNode}>
//           <View style={[styles.progressOuterIndicator, { borderColor: '#2874F0' }]}>
//             <View style={[styles.progressInnerIndicator, { backgroundColor: '#2874F0' }]} />
//           </View>
//           <Text style={[styles.progressStepLabel, { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Order Summary</Text>
//         </View>
//         <View style={[styles.progressLineSegment, currentStep === 'PAYMENT' && { backgroundColor: '#2874F0' }]} />
//         <View style={styles.progressStepNode}>
//           <View style={[styles.progressOuterIndicator, currentStep === 'PAYMENT' && { borderColor: '#2874F0' }]}>
//             <View style={[styles.progressInnerIndicator, currentStep === 'PAYMENT' && { backgroundColor: '#2874F0' }]} />
//           </View>
//           <Text style={[styles.progressStepLabel, currentStep === 'PAYMENT' && { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Payment</Text>
//         </View>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentLayout}>
//         {currentStep === 'CHOOSE_ADDRESS' && (
//           <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
//             <Text style={styles.listBlockLabelHeader}>Select Delivery Address</Text>
//             {initialAddresses.map((addr) => {
//               const isCurrentSelected = selectedAddressId === addr.id;
//               return (
//                 <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
//                   <TouchableOpacity style={styles.addressSelectTouchLayout} activeOpacity={0.9} onPress={() => setSelectedAddressId(addr.id)}>
//                     <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#2874F0' }]}>
//                       {isCurrentSelected && <View style={[styles.customRadioInnerCircleFilled, { backgroundColor: '#2874F0' }]} />}
//                     </View>
//                     <View style={styles.addressTextMetaBody}>
//                       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                         <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
//                         <View style={styles.typeCapsuleBadge}><Text style={styles.typeCapsuleTextLabel}>{addr.type}</Text></View>
//                       </View>
//                       <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
//                       <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
//                       <Text style={styles.phoneText}>Mobile: {addr.mobile}</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               );
//             })}
//           </View>
//         )}

//         {currentStep === 'SUMMARY_ADDRESS' && confirmedAddressData && (
//           <View style={{ marginTop: 0 }}>
//             <View style={styles.summaryAddressWhiteCard}>
//               <View style={styles.summaryHeaderRowJustified}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
//                   <Text style={styles.deliverToText}>Deliver to:</Text>
//                   <Text style={styles.userNameText}>{confirmedAddressData.name}</Text>
//                   <View style={styles.badgeHome}><Text style={styles.badgeHomeText}>{confirmedAddressData.type}</Text></View>
//                 </View>
//                 <TouchableOpacity onPress={() => setCurrentStep('CHOOSE_ADDRESS')} activeOpacity={0.7} style={styles.changeButton}>
//                   <Text style={styles.changeBtnText}>Change</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.addressDetailText}>{confirmedAddressData.raw}, {confirmedAddressData.cityStateZip}</Text>
//               <Text style={styles.phoneText}>{confirmedAddressData.mobile}</Text>
//             </View>

//             <Text style={styles.listBlockLabelHeader}>ITEMS IN ORDER</Text>
//             {checkoutItems.map((item, idx) => (
//               <View key={idx} style={styles.productCard}>
//                 <View style={styles.tagSaverBanner}><Text style={styles.tagSaverText}>Saver Deal</Text></View>
//                 <View style={styles.productMainRow}>
//                   <Image source={{ uri: item.image }} style={styles.productImage} />
//                   <View style={styles.productMetaBlock}>
//                     <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
//                     <Text style={styles.productSpecs}>Size: Standard, Qty: {item.quantity}</Text>
//                     <View style={styles.ratingRow}>
//                       {Array.from({ length: 4 }).map((_, i) => <Ionicons key={i} name="star" size={13} color="#388E3C" />)}
//                       <Text style={styles.ratingCountText}>3.8 • (8,587)</Text>
//                     </View>
//                     <View style={styles.priceContainerRow}>
//                       <Text style={styles.discountDownArrow}>↓ {Math.round(item.discountPercentage)}%</Text>
//                       <Text style={styles.originalPriceCross}>₹{Math.round(totalMRP).toLocaleString()}</Text>
//                       <Text style={styles.sellingPriceText}>₹{Math.round(finalAmount).toLocaleString()}</Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={styles.deliveryEstimateRow}>
//                   <Text style={styles.estimateText}>Delivery by Jul 10, Fri</Text>
//                 </View>
//               </View>
//             ))}

//             <View style={styles.invoiceOptionCard}>
//               <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#717478" />
//               <Text style={styles.invoiceText}>Use GST Invoice</Text>
//             </View>
//           </View>
//         )}

//         {currentStep === 'PAYMENT' && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={styles.listBlockLabelHeader}>Select Payment Method</Text>
//             <View style={styles.paymentMethodAccordionUnit}>
//               <TouchableOpacity style={styles.accordionHeaderTouchBarElement} onPress={() => toggleAccordion('COD')}>
//                 <View style={styles.accordionHeaderLeftLayout}>
//                   <View style={[styles.customRadioOuterBorder, selectedMethod === 'COD' && { borderColor: '#2874F0' }]}>
//                     {selectedMethod === 'COD' && <View style={[styles.customRadioInnerCircleFilled, { backgroundColor: '#2874F0' }]} />}
//                   </View>
//                   <Text style={styles.paymentMethodMainName}>Cash on Delivery (Cash/UPI)</Text>
//                 </View>
//               </TouchableOpacity>
//               {selectedMethod === 'COD' && (
//                 <View style={styles.accordionExpandableInnerContentBody}>
//                   <Text style={styles.paymentMethodDescriptorText}>Pay securely right during doorstep dynamic cargo drop executions.</Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         )}
//       </ScrollView>

//       {/* FOOTER CONTROLS ELEMENT MAP */}
//       <View style={styles.stickyFooterPanelSystemWrapper}>
//         {isPriceDetailsVisible && (
//           <View style={styles.priceDropupExpandedContentCard}>
//             <View style={styles.priceDetailsHeaderLineJustified}>
//               <Text style={styles.priceDetailsSectionBoldTitle}>Price Details ({checkoutItems.length} Item)</Text>
//               <TouchableOpacity onPress={togglePriceDetails}><Feather name="chevron-down" size={20} color="#282c3f" /></TouchableOpacity>
//             </View>
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Total MRP</Text>
//               <Text style={styles.calcValueDarkText}>₹{Math.round(totalMRP).toLocaleString()}</Text>
//             </View>
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Discount on MRP</Text>
//               <Text style={[styles.calcValueDarkText, { color: '#00875a' }]}>- ₹{Math.round(totalDiscount).toLocaleString()}</Text>
//             </View>
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Platform Fee</Text>
//               <Text style={styles.calcValueDarkText}>₹{platformFee}</Text>
//             </View>
//           </View>
//         )}

//         <View style={styles.footerMainActionInteractiveBar}>
//           <View style={styles.paymentFooterSplitLayoutRow}>
//             <TouchableOpacity style={styles.footerPriceSummaryTapBlock} onPress={togglePriceDetails}>
//               <Text style={styles.footerCalculatedPriceTotalValText}>₹{Math.round(totalPayable).toLocaleString()}</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Text style={styles.viewPriceDetailsSmallLabel}>View Details</Text>
//                 <Feather name={isPriceDetailsVisible ? "chevron-down" : "chevron-up"} size={12} color="#2874F0" />
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.primaryActionNavigationBtnBlock}
//               onPress={() => {
//                 if (currentStep === 'CHOOSE_ADDRESS') {
//                   setConfirmedAddressId(selectedAddressId);
//                   setCurrentStep('SUMMARY_ADDRESS');
//                 } else if (currentStep === 'SUMMARY_ADDRESS') {
//                   setCurrentStep('PAYMENT');
//                 } else {
//                   // ✅ CONFIRMED: Order success block active flag switched to true to prevent cart duplicate dumps
//                   isOrderPlaced.current = true; 
//                   Alert.alert('Success', 'Order Placed successfully!');
//                   router.dismissAll();
//                 }
//               }}
//             >
//               <Text style={styles.primaryActionNavigationBtnText}>
//                 {currentStep === 'PAYMENT' ? 'PLACE ORDER' : 'CONTINUE'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// // ─── DESIGNS STYLES MATRIX ───
// const styles = StyleSheet.create({
//   rootContainer: { flex: 1, backgroundColor: '#F1F3F6' },
//   scrollContentLayout: { paddingBottom: 120 },
//   headerRow: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EFEFEF' },
//   navBackIcon: { padding: 4 },
//   headerMainTitle: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#212121' },
//   progressBarWrapper: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center' },
//   progressStepNode: { alignItems: 'center', gap: 2 },
//   progressStepLabel: { fontSize: 10, fontFamily: BaseFonts.medium, color: '#a0a2ab' },
//   progressLineSegment: { flex: 1, height: 2, backgroundColor: '#EBEBEB', marginHorizontal: 8 },
//   progressOuterIndicator: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
//   progressInnerIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },
//   listBlockLabelHeader: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#7e818c', marginHorizontal: 16, marginTop: 14, marginBottom: 8, textTransform: 'uppercase' },
//   addressItemWrapperBlock: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: '#EBEBEB' },
//   selectedAddressBorder: { borderColor: '#2874F0' },
//   addressSelectTouchLayout: { flexDirection: 'row', gap: 14 },
//   customRadioOuterBorder: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
//   customRadioInnerCircleFilled: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2874F0' },
//   addressTextMetaBody: { flex: 1, gap: 2 },
//   addressUserBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#212121' },
//   typeCapsuleBadge: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
//   typeCapsuleTextLabel: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#717478' },
//   addressRawParagraphText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#212121', lineHeight: 16 },
//   summaryAddressWhiteCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
//   summaryHeaderRowJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   deliverToText: { fontSize: 14, color: '#878787', fontFamily: BaseFonts.regular },
//   userNameText: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: '#212121' },
//   badgeHome: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
//   badgeHomeText: { fontSize: 9, color: '#717478', fontFamily: BaseFonts.bold },
//   changeButton: { borderWidth: 1, borderColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
//   changeBtnText: { color: '#2874F0', fontFamily: BaseFonts.semiBold, fontSize: 12 },
//   addressDetailText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.regular, marginTop: 8 },
//   phoneText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.regular, marginTop: 4 },
//   productCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
//   tagSaverBanner: { backgroundColor: '#E8F5E9', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, marginBottom: 8 },
//   tagSaverText: { color: '#388E3C', fontSize: 10, fontFamily: BaseFonts.semiBold },
//   productMainRow: { flexDirection: 'row' },
//   productImage: { width: 75, height: 75, resizeMode: 'contain' },
//   productMetaBlock: { flex: 1, marginLeft: 12 },
//   productTitle: { fontSize: 14, fontFamily: BaseFonts.regular, color: '#212121' },
//   productSpecs: { fontSize: 12, color: '#878787', marginTop: 2 },
//   ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
//   ratingCountText: { fontSize: 12, color: '#878787', marginLeft: 6 },
//   priceContainerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
//   discountDownArrow: { color: '#388E3C', fontSize: 13, fontFamily: BaseFonts.semiBold, marginRight: 6 },
//   originalPriceCross: { textDecorationLine: 'line-through', color: '#878787', fontSize: 12, marginRight: 6 },
//   sellingPriceText: { fontSize: 15, fontFamily: BaseFonts.semiBold, color: '#212121' },
//   deliveryEstimateRow: { borderTopWidth: 1, borderColor: '#F0F0F0', marginTop: 12, paddingTop: 10 },
//   estimateText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.medium },
//   invoiceOptionCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, alignItems: 'center', marginBottom: 8 },
//   invoiceText: { fontSize: 14, color: '#212121', marginLeft: 12 },
//   paymentMethodAccordionUnit: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EBEBEB' },
//   accordionHeaderTouchBarElement: { flexDirection: 'row', padding: 16, alignItems: 'center' },
//   accordionHeaderLeftLayout: { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   paymentMethodMainName: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
//   accordionExpandableInnerContentBody: { paddingHorizontal: 44, paddingBottom: 16 },
//   paymentMethodDescriptorText: { fontSize: 12, color: '#878787' },
//   stickyFooterPanelSystemWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#EBEBEB', zIndex: 100 },
//   footerMainActionInteractiveBar: { padding: 12 },
//   paymentFooterSplitLayoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   footerPriceSummaryTapBlock: { flex: 0.8 },
//   footerCalculatedPriceTotalValText: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#212121' },
//   viewPriceDetailsSmallLabel: { fontSize: 11, color: '#2874F0', fontFamily: BaseFonts.semiBold },
//   primaryActionNavigationBtnBlock: { backgroundColor: '#FFC200', flex: 1.2, height: 44, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
//   primaryActionNavigationBtnText: { color: '#212121', fontSize: 14, fontFamily: BaseFonts.bold },
//   priceDropupExpandedContentCard: { paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#FFFFFF' },
//   priceDetailsHeaderLineJustified: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#F3F4F6', paddingBottom: 8, marginBottom: 12 },
//   priceDetailsSectionBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold },
//   priceCalculationRowSplit: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   calcLabelGreyText: { fontSize: 12, color: '#878787' },
//   calcValueDarkText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#212121' }
// });

import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Dimensions, 
  LayoutAnimation, 
  Platform, 
  UIManager,
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather, Octicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BaseFonts } from '@/constants/BaseFonts';
import Text from "@/skeleton/Text";

// ── REDUX MATRIX SYSTEM CONNECTION ──
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart, clearOrderedItems } from '@/store/slices/cartSlice';

const { width } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const initialAddresses = [
  { id: '1', name: 'Afraz Mirza', type: 'HOME', raw: '8-e-4 vigyan Nagar Kota, Vigyan Nagar Kota', cityStateZip: 'Kota, Rajasthan 324005', mobile: '7410972065' },
  { id: '2', name: 'Afraz Mirza', type: 'OFFICE', raw: '8-e-4 vigyan nagar Kota, Dadabari Kota', cityStateZip: 'Kota - 324009', mobile: '7410972065' }
];

export default function CompleteCheckoutEngine() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState<'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'>('SUMMARY_ADDRESS'); 
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [confirmedAddressId, setConfirmedAddressId] = useState<string>('1');
  const [selectedMethod, setSelectedMethod] = useState<string>('COD'); 
  const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState<boolean>(false);

  const confirmedAddressData = initialAddresses.find(a => a.id === confirmedAddressId);
  const isOrderPlaced = useRef(false);

  const isDirectBuy = params.isDirectBuy === 'true';
  let checkoutItems: any[] = [];
  let rawProductObject: any = null;

  // ── 🌟 FIXED DYNAMIC API KEY MAPPER ──
  if (isDirectBuy && params.directBuyProduct) {
    try {
      rawProductObject = JSON.parse(params.directBuyProduct as string);
      // CartItem API parameters structure mapping exactly
      checkoutItems.push({
        id: rawProductObject.id,
        title: rawProductObject.title,
        brand: rawProductObject.brand,
        price: rawProductObject.price,
        thumbnail: rawProductObject.thumbnail, // ✅ Fixed: Pointing exactly to thumbnail
        discountPercentage: rawProductObject.discountPercentage || 0,
        returnPolicy: rawProductObject.returnPolicy,
        shippingInformation: rawProductObject.shippingInformation,
        quantity: 1
      });
    } catch (e) {
      console.log("Error parsing dynamic direct buy parameters", e);
    }
  } else {
    const cart = useSelector((state: RootState) => state.shop.cart);
    const selectedIds = useSelector((state: RootState) => state.shop.selectedIds);
    // Redux items automatically preserve identical API naming architecture
    checkoutItems = cart.filter(item => selectedIds.includes(item.id));
  }

  // ── 🔄 AUTOMATIC CLEANUP CART DISPATCH ──
  useEffect(() => {
    return () => {
      if (isDirectBuy && rawProductObject && !isOrderPlaced.current) {
        dispatch(addToCart(rawProductObject));
      }
    };
  }, [isDirectBuy, params.directBuyProduct]);

  // Financial Calculations
  let totalMRP = 0;
  let finalAmount = 0;
  const platformFee = 23; 
  const codFee = selectedMethod === 'COD' ? 10 : 0;

  checkoutItems.forEach(item => {
    const discount = item.discountPercentage || 0;
    const basePrice = item.price / (1 - (discount / 100));
    totalMRP += basePrice * item.quantity * 80;
    finalAmount += item.price * item.quantity * 80;
  });

  const totalDiscount = totalMRP - finalAmount;
  const totalPayable = finalAmount + platformFee + codFee;

  const toggleAccordion = (methodKey: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedMethod(selectedMethod === methodKey ? '' : methodKey);
  };

  const togglePriceDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPriceDetailsVisible(!isPriceDetailsVisible);
  };

  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      
      {/* ── HEADER ROW TRACKER ── */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => {
          if (currentStep === 'PAYMENT') setCurrentStep('SUMMARY_ADDRESS');
          else if (currentStep === 'CHOOSE_ADDRESS') setCurrentStep('SUMMARY_ADDRESS');
          else router.back();
        }} style={styles.navBackIcon}>
          <Ionicons name="arrow-back" size={24} color="#282c3f" />
        </TouchableOpacity>
        <Text style={styles.headerMainTitle}>
          {currentStep === 'PAYMENT' ? 'PAYMENT' : 'ORDER SUMMARY'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress timeline trackers */}
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressStepNode}>
          <Ionicons name="checkmark-circle" size={16} color="#2874F0" />
          <Text style={[styles.progressStepLabel, { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Address</Text>
        </View>
        <View style={[styles.progressLineSegment, { backgroundColor: '#2874F0' }]} />
        <View style={styles.progressStepNode}>
          <View style={[styles.progressOuterIndicator, { borderColor: '#2874F0' }]}>
            <View style={[styles.progressInnerIndicator, { backgroundColor: '#2874F0' }]} />
          </View>
          <Text style={[styles.progressStepLabel, { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Order Summary</Text>
        </View>
        <View style={[styles.progressLineSegment, currentStep === 'PAYMENT' && { backgroundColor: '#2874F0' }]} />
        <View style={styles.progressStepNode}>
          <View style={[styles.progressOuterIndicator, currentStep === 'PAYMENT' && { borderColor: '#2874F0' }]}>
            <View style={[styles.progressInnerIndicator, currentStep === 'PAYMENT' && { backgroundColor: '#2874F0' }]} />
          </View>
          <Text style={[styles.progressStepLabel, currentStep === 'PAYMENT' && { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Payment</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentLayout}>
        
        {/* 🟩 VIEW 1: ADDRESS SELECTION OVERLAYS */}
        {currentStep === 'CHOOSE_ADDRESS' && (
          <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
            <Text style={styles.listBlockLabelHeader}>Select Delivery Address</Text>
            {initialAddresses.map((addr) => {
              const isCurrentSelected = selectedAddressId === addr.id;
              return (
                <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
                  <TouchableOpacity style={styles.addressSelectTouchLayout} activeOpacity={0.9} onPress={() => setSelectedAddressId(addr.id)}>
                    <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#2874F0' }]}>
                      {isCurrentSelected && <View style={[styles.customRadioInnerCircleFilled, { backgroundColor: '#2874F0' }]} />}
                    </View>
                    <View style={styles.addressTextMetaBody}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
                        <View style={styles.typeCapsuleBadge}><Text style={styles.typeCapsuleTextLabel}>{addr.type}</Text></View>
                      </View>
                      <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
                      <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
                      <Text style={styles.phoneText}>Mobile: {addr.mobile}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* 🟩 VIEW 2: FLIPKART STYLE SUMMARY VIEW (PERFECT KEY CONGRUENCY) */}
        {currentStep === 'SUMMARY_ADDRESS' && confirmedAddressData && (
          <View style={{ marginTop: 0 }}>
            <View style={styles.summaryAddressWhiteCard}>
              <View style={styles.summaryHeaderRowJustified}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.deliverToText}>Deliver to:</Text>
                  <Text style={styles.userNameText}>{confirmedAddressData.name}</Text>
                  <View style={styles.badgeHome}><Text style={styles.badgeHomeText}>{confirmedAddressData.type}</Text></View>
                </View>
                <TouchableOpacity onPress={() => setCurrentStep('CHOOSE_ADDRESS')} activeOpacity={0.7} style={styles.changeButton}>
                  <Text style={styles.changeBtnText}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressDetailText}>{confirmedAddressData.raw}, {confirmedAddressData.cityStateZip}</Text>
              <Text style={styles.phoneText}>{confirmedAddressData.mobile}</Text>
            </View>

            <Text style={styles.listBlockLabelHeader}>ITEMS IN ORDER</Text>
            {checkoutItems.map((item, idx) => (
              <View key={idx} style={styles.productCard}>
                <View style={styles.tagSaverBanner}><Text style={styles.tagSaverText}>Saver Deal</Text></View>
                
                <View style={styles.productMainRow}>
                  {/* ✅ FIXED IMAGE RENDERING: item.thumbnail carries dynamic API image link arrays properly */}
                  <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                  
                  <View style={styles.productMetaBlock}>
                    {item.brand && <Text style={styles.brandText}>{item.brand}</Text>}
                    <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.productSpecs}>Qty: {item.quantity} • Size: Unique</Text>
                    
                    <View style={styles.priceContainerRow}>
                      <Text style={styles.discountDownArrow}>↓ {Math.round(item.discountPercentage)}%</Text>
                      <Text style={styles.originalPriceCross}>₹{Math.round(item.price * 1.5 * 80).toLocaleString()}</Text>
                      <Text style={styles.sellingPriceText}>₹{Math.round(item.price * 80).toLocaleString()}</Text>
                    </View>

                    {/* ✅ CARRIED OVER POLICY FROM CARTITEM DESIGN */}
                    <View style={styles.inlinePolicyRow}>
                      <Octicons name="arrow-switch" size={11} color="#535766" />
                      <Text style={styles.policyText}>{item.returnPolicy || '14 days return'}</Text>
                    </View>

                    {item.shippingInformation && (
                      <View style={styles.inlinePolicyRow}>
                        <MaterialCommunityIcons name="truck-delivery-outline" size={13} color="#388E3C" />
                        <Text style={[styles.policyText, { color: '#388E3C' }]}>{item.shippingInformation}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.invoiceOptionCard}>
              <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#717478" />
              <Text style={styles.invoiceText}>Use GST Invoice</Text>
            </View>
          </View>
        )}

        {/* 🟩 VIEW 3: ACCORDIONS */}
        {currentStep === 'PAYMENT' && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.listBlockLabelHeader}>Select Payment Method</Text>
            <View style={styles.paymentMethodAccordionUnit}>
              <TouchableOpacity style={styles.accordionHeaderTouchBarElement} onPress={() => toggleAccordion('COD')}>
                <View style={styles.accordionHeaderLeftLayout}>
                  <View style={[styles.customRadioOuterBorder, selectedMethod === 'COD' && { borderColor: '#2874F0' }]}>
                    {selectedMethod === 'COD' && <View style={[styles.customRadioInnerCircleFilled, { backgroundColor: '#2874F0' }]} />}
                  </View>
                  <Text style={styles.paymentMethodMainName}>Cash on Delivery (Cash/UPI)</Text>
                </View>
              </TouchableOpacity>
              {selectedMethod === 'COD' && (
                <View style={styles.accordionExpandableInnerContentBody}>
                  <Text style={styles.paymentMethodDescriptorText}>Pay securely right during doorstep dynamic cargo drop executions.</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* FOOTER CONTROLS VIEW STACK */}
      <View style={styles.stickyFooterPanelSystemWrapper}>
        {isPriceDetailsVisible && (
          <View style={styles.priceDropupExpandedContentCard}>
            <View style={styles.priceDetailsHeaderLineJustified}>
              <Text style={styles.priceDetailsSectionBoldTitle}>Price Details ({checkoutItems.length} Item)</Text>
              <TouchableOpacity onPress={togglePriceDetails}><Feather name="chevron-down" size={20} color="#282c3f" /></TouchableOpacity>
            </View>
            <View style={styles.priceCalculationRowSplit}>
              <Text style={styles.calcLabelGreyText}>Total MRP</Text>
              <Text style={styles.calcValueDarkText}>₹{Math.round(totalMRP).toLocaleString()}</Text>
            </View>
            <View style={styles.priceCalculationRowSplit}>
              <Text style={styles.calcLabelGreyText}>Discount on MRP</Text>
              <Text style={[styles.calcValueDarkText, { color: '#00875a' }]}>- ₹{Math.round(totalDiscount).toLocaleString()}</Text>
            </View>
            <View style={styles.priceCalculationRowSplit}>
              <Text style={styles.calcLabelGreyText}>Platform Fee</Text>
              <Text style={styles.calcValueDarkText}>₹{platformFee}</Text>
            </View>
          </View>
        )}

        <View style={styles.footerMainActionInteractiveBar}>
          <View style={styles.paymentFooterSplitLayoutRow}>
            <TouchableOpacity style={styles.footerPriceSummaryTapBlock} onPress={togglePriceDetails}>
              <Text style={styles.footerCalculatedPriceTotalValText}>₹{Math.round(totalPayable).toLocaleString()}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.viewPriceDetailsSmallLabel}>View Details</Text>
                <Feather name={isPriceDetailsVisible ? "chevron-down" : "chevron-up"} size={12} color="#2874F0" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryActionNavigationBtnBlock}
              onPress={() => {
                if (currentStep === 'CHOOSE_ADDRESS') {
                  setConfirmedAddressId(selectedAddressId);
                  setCurrentStep('SUMMARY_ADDRESS');
                } else if (currentStep === 'SUMMARY_ADDRESS') {
                  setCurrentStep('PAYMENT');
                } else {
                  isOrderPlaced.current = true; 
                  // ── CART CLEANUP FEATURE INJECTION ──
      if (!isDirectBuy) {
        // 1. Cart se jo items checkoutItems me aaye hain, unki IDs nikalenge
        const orderedItemIds = checkoutItems.map(item => item.id);
        
        // 2. Action dispatch karke unhe cart se clear kar denge, unselected items safe rahenge
        dispatch(clearOrderedItems(orderedItemIds)); 
      }
                  Alert.alert('Success', 'Order Placed successfully!');
                  router.dismissAll();
                }
              }}
            >
              <Text style={styles.primaryActionNavigationBtnText}>
                {currentStep === 'PAYMENT' ? 'PLACE ORDER' : 'CONTINUE'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── STYLES CORE CONGRUENCY ARCHITECTURE ───
const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: '#F1F3F6' },
  scrollContentLayout: { paddingBottom: 120 },
  headerRow: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EFEFEF' },
  navBackIcon: { padding: 4 },
  headerMainTitle: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#212121' },
  progressBarWrapper: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center' },
  progressStepNode: { alignItems: 'center', gap: 2 },
  progressStepLabel: { fontSize: 10, fontFamily: BaseFonts.medium, color: '#a0a2ab' },
  progressLineSegment: { flex: 1, height: 2, backgroundColor: '#EBEBEB', marginHorizontal: 8 },
  progressOuterIndicator: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
  progressInnerIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },
  listBlockLabelHeader: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#7e818c', marginHorizontal: 16, marginTop: 14, marginBottom: 8, textTransform: 'uppercase' },
  addressItemWrapperBlock: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: '#EBEBEB' },
  selectedAddressBorder: { borderColor: '#2874F0' },
  addressSelectTouchLayout: { flexDirection: 'row', gap: 14 },
  customRadioOuterBorder: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
  customRadioInnerCircleFilled: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2874F0' },
  addressTextMetaBody: { flex: 1, gap: 2 },
  addressUserBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#212121' },
  typeCapsuleBadge: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  typeCapsuleTextLabel: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#717478' },
  addressRawParagraphText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#212121', lineHeight: 16 },
  summaryAddressWhiteCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
  summaryHeaderRowJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deliverToText: { fontSize: 14, color: '#878787', fontFamily: BaseFonts.regular },
  userNameText: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: '#212121' },
  badgeHome: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
  badgeHomeText: { fontSize: 9, color: '#717478', fontFamily: BaseFonts.bold },
  changeButton: { borderWidth: 1, borderColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  changeBtnText: { color: '#2874F0', fontFamily: BaseFonts.semiBold, fontSize: 12 },
  addressDetailText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.regular, marginTop: 8 },
  phoneText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.regular, marginTop: 4 },
  productCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
  tagSaverBanner: { backgroundColor: '#E8F5E9', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, marginBottom: 8 },
  tagSaverText: { color: '#388E3C', fontSize: 10, fontFamily: BaseFonts.semiBold },
  productMainRow: { flexDirection: 'row' },
  productImage: { width: 100, height: 130, borderRadius: 10, resizeMode: 'cover', backgroundColor: '#f9f9f9' },
  productMetaBlock: { flex: 1, marginLeft: 14 },
  brandText: { fontFamily: BaseFonts.semiBold, fontSize: 14, color: '#212121' },
  productTitle: { fontSize: 13, fontFamily: BaseFonts.regular, color: '#757575', marginTop: 2 },
  productSpecs: { fontSize: 12, color: '#878787', marginTop: 4, fontFamily: BaseFonts.regular },
  priceContainerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 4 },
  discountDownArrow: { color: '#FF905A', fontSize: 13, fontFamily: BaseFonts.semiBold, marginRight: 6 },
  originalPriceCross: { textDecorationLine: 'line-through', color: '#878787', fontSize: 12, marginRight: 6 },
  sellingPriceText: { fontSize: 15, fontFamily: BaseFonts.semiBold, color: '#212121' },
  inlinePolicyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 5 },
  policyText: { fontSize: 12, color: '#282c3f', fontFamily: BaseFonts.regular },
  deliveryEstimateRow: { borderTopWidth: 1, borderColor: '#F0F0F0', marginTop: 12, paddingTop: 10 },
  estimateText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.medium },
  invoiceOptionCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, alignItems: 'center', marginBottom: 8 },
  invoiceText: { fontSize: 14, color: '#212121', marginLeft: 12 },
  paymentMethodAccordionUnit: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EBEBEB' },
  accordionHeaderTouchBarElement: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  accordionHeaderLeftLayout: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  paymentMethodMainName: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  accordionExpandableInnerContentBody: { paddingHorizontal: 44, paddingBottom: 16 },
  paymentMethodDescriptorText: { fontSize: 12, color: '#878787' },
  stickyFooterPanelSystemWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#EBEBEB', zIndex: 100 },
  footerMainActionInteractiveBar: { padding: 12 },
  paymentFooterSplitLayoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footerPriceSummaryTapBlock: { flex: 0.8 },
  footerCalculatedPriceTotalValText: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#212121' },
  viewPriceDetailsSmallLabel: { fontSize: 11, color: '#2874F0', fontFamily: BaseFonts.semiBold },
  primaryActionNavigationBtnBlock: { backgroundColor: '#FFC200', flex: 1.2, height: 44, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  primaryActionNavigationBtnText: { color: '#212121', fontSize: 14, fontFamily: BaseFonts.bold },
  priceDropupExpandedContentCard: { paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#FFFFFF' },
  priceDetailsHeaderLineJustified: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#F3F4F6', paddingBottom: 8, marginBottom: 12 },
  priceDetailsSectionBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold },
  priceCalculationRowSplit: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  calcLabelGreyText: { fontSize: 12, color: '#878787' },
  calcValueDarkText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#212121' }
});


// import React, { useState } from 'react';
// import { 
//   StyleSheet, 
//   View, 
//   ScrollView, 
//   TouchableOpacity, 
//   TextInput, 
//   Dimensions, 
//   LayoutAnimation, 
//   Platform, 
//   UIManager,
//   Image,
//   Alert
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { BaseFonts } from '@/constants/BaseFonts';
// import Text from "@/skeleton/Text";

// // ── REDUX FALLBACK INTEGRITY CONNECTIONS ──
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

// const { width } = Dimensions.get('window');

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // Mock Address Data Consistent with Afraz's Profile Details
// const initialAddresses = [
//   { id: '1', name: 'Afraz Mirza', type: 'HOME', raw: '8-e-4 vigyan Nagar Kota, Vigyan Nagar Kota', cityStateZip: 'Kota, Rajasthan 324005', mobile: '7410972065' },
//   { id: '2', name: 'Afraz Mirza', type: 'OFFICE', raw: '8-e-4 vigyan nagar Kota, Dadabari Kota', cityStateZip: 'Kota - 324009', mobile: '7410972065' }
// ];

// export default function CompleteCheckoutEngine() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
  
//   // Checkout Steps Lifecycle: 'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'
//   const [currentStep, setCurrentStep] = useState<'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'>('SUMMARY_ADDRESS'); // Default direct to summary matching single product flows
  
//   // Address selection states
//   const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
//   const [confirmedAddressId, setConfirmedAddressId] = useState<string>('1');

//   // Payment Accordions states
//   const [selectedMethod, setSelectedMethod] = useState<string>('COD'); 
//   const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState<boolean>(false);

//   const selectedAddressData = initialAddresses.find(a => a.id === selectedAddressId);
//   const confirmedAddressData = initialAddresses.find(a => a.id === confirmedAddressId);

//   // ── 🌟 DYNAMIC PRODUCT RESOLUTION ZONE (FLIPKART CLONE FLOW) ──
//   const isDirectBuy = params.isDirectBuy === 'true';
//   let checkoutItems: any[] = [];

//   if (isDirectBuy && params.directBuyProduct) {
//     // 1. Single Item Pass Flow from direct BUY NOW trigger link parameters
//     try {
//       const parsedProduct = JSON.parse(params.directBuyProduct as string);
//       checkoutItems.push({
//         id: parsedProduct.id,
//         title: parsedProduct.title || parsedProduct.name,
//         price: parsedProduct.price,
//         image: parsedProduct.image || parsedProduct.thumbnail || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
//         discountPercentage: parsedProduct.discountPercentage || 12,
//         quantity: 1
//       });
//     } catch (e) {
//       console.log("Error processing params metadata parameters", e);
//     }
//   } else {
//     // 2. Bulk State Checkout Fallback from active cart selections
//     const cart = useSelector((state: RootState) => state.shop.cart);
//     const selectedIds = useSelector((state: RootState) => state.shop.selectedIds);
//     checkoutItems = cart.filter(item => selectedIds.includes(item.id));
//   }

//   // ── FINANCIAL INVOICE STRUCTURE MATRIX ──
//   let totalMRP = 0;
//   let finalAmount = 0;
//   const platformFee = 23; 
//   const codFee = selectedMethod === 'COD' ? 10 : 0;

//   checkoutItems.forEach(item => {
//     const discount = item.discountPercentage || 0;
//     const basePrice = item.price / (1 - (discount / 100));
//     totalMRP += basePrice * item.quantity * 80;
//     finalAmount += item.price * item.quantity * 80;
//   });

//   const totalDiscount = totalMRP - finalAmount;
//   const totalPayable = finalAmount + platformFee + codFee;

//   const toggleAccordion = (methodKey: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setSelectedMethod(selectedMethod === methodKey ? '' : methodKey);
//   };

//   const togglePriceDetails = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setIsPriceDetailsVisible(!isPriceDetailsVisible);
//   };

//   return (
//     <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      
//       {/* ── 1. PROGRESS TIMELINE HEADER ── */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => {
//           if (currentStep === 'PAYMENT') setCurrentStep('SUMMARY_ADDRESS');
//           else if (currentStep === 'CHOOSE_ADDRESS') setCurrentStep('SUMMARY_ADDRESS');
//           else router.back();
//         }} style={styles.navBackIcon}>
//           <Ionicons name="arrow-back" size={24} color="#282c3f" />
//         </TouchableOpacity>
        
//         <Text style={styles.headerMainTitle}>
//           {currentStep === 'PAYMENT' ? 'PAYMENT GATEWAY' : 'ORDER SUMMARY'}
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Flipkart Accurate Step Indicators bar links */}
//       <View style={styles.progressBarWrapper}>
//         <View style={styles.progressStepNode}>
//           <Ionicons name="checkmark-circle" size={16} color="#2874F0" />
//           <Text style={[styles.progressStepLabel, { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Address</Text>
//         </View>
//         <View style={[styles.progressLineSegment, { backgroundColor: '#2874F0' }]} />

//         <View style={styles.progressStepNode}>
//           <View style={[styles.progressOuterIndicator, { borderColor: '#2874F0' }]}>
//             <View style={[styles.progressInnerIndicator, { backgroundColor: '#2874F0' }]} />
//           </View>
//           <Text style={[styles.progressStepLabel, { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Order Summary</Text>
//         </View>
//         <View style={[styles.progressLineSegment, currentStep === 'PAYMENT' && { backgroundColor: '#2874F0' }]} />

//         <View style={styles.progressStepNode}>
//           <View style={[styles.progressOuterIndicator, currentStep === 'PAYMENT' && { borderColor: '#2874F0' }]}>
//             <View style={[styles.progressInnerIndicator, currentStep === 'PAYMENT' && { backgroundColor: '#2874F0' }]} />
//           </View>
//           <Text style={[styles.progressStepLabel, currentStep === 'PAYMENT' && { color: '#2874F0', fontFamily: BaseFonts.bold }]}>Payment</Text>
//         </View>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentLayout}>
        
//         {/* 🟩 VIEW 1: CHOOSE ADDRESS ENGINE ADJUSTMENT OVERLAYS */}
//         {currentStep === 'CHOOSE_ADDRESS' && (
//           <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
//             <Text style={styles.listBlockLabelHeader}>SELECT DELIVERY ADDRESS</Text>
//             {initialAddresses.map((addr) => {
//               const isCurrentSelected = selectedAddressId === addr.id;
//               return (
//                 <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
//                   <TouchableOpacity style={styles.addressSelectTouchLayout} activeOpacity={0.9} onPress={() => setSelectedAddressId(addr.id)}>
//                     <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#2874F0' }]}>
//                       {isCurrentSelected && <View style={[styles.customRadioInnerCircleFilled, { backgroundColor: '#2874F0' }]} />}
//                     </View>
//                     <View style={styles.addressTextMetaBody}>
//                       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                         <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
//                         <View style={styles.typeCapsuleBadge}><Text style={styles.typeCapsuleTextLabel}>{addr.type}</Text></View>
//                       </View>
//                       <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
//                       <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
//                       <Text style={styles.phoneText}>Mobile: {addr.mobile}</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               );
//             })}
//           </View>
//         )}

//         {/* 🟩 VIEW 2: FLIPKART DESIGN SUMMARY (IMAGE EXACT ADAPTATION) */}
//         {currentStep === 'SUMMARY_ADDRESS' && confirmedAddressData && (
//           <View style={{ marginTop: 0 }}>
//             {/* Address summary block */}
//             <View style={styles.summaryAddressWhiteCard}>
//               <View style={styles.summaryHeaderRowJustified}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
//                   <Text style={styles.deliverToText}>Deliver to:</Text>
//                   <Text style={styles.userNameText}>{confirmedAddressData.name}</Text>
//                   <View style={styles.badgeHome}><Text style={styles.badgeHomeText}>{confirmedAddressData.type}</Text></View>
//                 </View>
//                 <TouchableOpacity onPress={() => setCurrentStep('CHOOSE_ADDRESS')} activeOpacity={0.7} style={styles.changeButton}>
//                   <Text style={styles.changeBtnText}>Change</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.addressDetailText}>{confirmedAddressData.raw}, {confirmedAddressData.cityStateZip}</Text>
//               <Text style={styles.phoneText}>{confirmedAddressData.mobile}</Text>
//             </View>

//             {/* Dynamic Product list looping block */}
//             <Text style={styles.listBlockLabelHeader}>ITEMS IN ORDER</Text>
//             {checkoutItems.map((item, idx) => (
//               <View key={idx} style={styles.productCard}>
//                 <View style={styles.tagSaverBanner}><Text style={styles.tagSaverText}>Saver Deal</Text></View>
//                 <View style={styles.productMainRow}>
//                   <Image source={{ uri: item.image }} style={styles.productImage} />
//                   <View style={styles.productMetaBlock}>
//                     <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
//                     <Text style={styles.productSpecs}>Qty: {item.quantity} • Size: Standard</Text>
//                     <View style={styles.ratingRow}>
//                       {Array.from({ length: 4 }).map((_, i) => <Ionicons key={i} name="star" size={12} color="#388E3C" />)}
//                       <Text style={styles.ratingCountText}>3.8 • (8,587)</Text>
//                     </View>
//                     <View style={styles.priceContainerRow}>
//                       <Text style={styles.discountDownArrow}>↓ {Math.round(item.discountPercentage)}%</Text>
//                       <Text style={styles.originalPriceCross}>₹{Math.round(totalMRP).toLocaleString()}</Text>
//                       <Text style={styles.sellingPriceText}>₹{Math.round(finalAmount).toLocaleString()}</Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={styles.deliveryEstimateRow}>
//                   <Text style={styles.estimateText}>Delivery by Jul 10, Fri</Text>
//                 </View>
//               </View>
//             ))}

//             {/* GST Block Element */}
//             <View style={styles.invoiceOptionCard}>
//               <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#717478" />
//               <Text style={styles.invoiceText}>Use GST Invoice</Text>
//             </View>
//           </View>
//         )}

//         {/* 🟩 VIEW 3: ACCORDIONS CHANNELS */}
//         {currentStep === 'PAYMENT' && (
//           <View style={{ marginTop: 12 }}>
//             <Text style={styles.listBlockLabelHeader}>CHOOSE PAYMENT METHOD</Text>
            
//             {/* COD Accordion Setup */}
//             <View style={styles.paymentMethodAccordionUnit}>
//               <TouchableOpacity style={styles.accordionHeaderTouchBarElement} onPress={() => toggleAccordion('COD')}>
//                 <View style={styles.accordionHeaderLeftLayout}>
//                   <View style={[styles.customRadioOuterBorder, selectedMethod === 'COD' && { borderColor: '#2874F0' }]}>
//                     {selectedMethod === 'COD' && <View style={[styles.customRadioInnerCircleFilled, { backgroundColor: '#2874F0' }]} />}
//                   </View>
//                   <Text style={styles.paymentMethodMainName}>Cash on Delivery (Cash/UPI)</Text>
//                 </View>
//               </TouchableOpacity>
//               {selectedMethod === 'COD' && (
//                 <View style={styles.accordionExpandableInnerContentBody}>
//                   <Text style={styles.paymentMethodDescriptorText}>Pay via cash or dynamic UPI scanners during packages handling deliveries.</Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         )}

//       </ScrollView>

//       {/* ── 5. FLOATING COMPLIANCE SYSTEM BOTTOM BAR ── */}
//       <View style={styles.stickyFooterPanelSystemWrapper}>
        
//         {isPriceDetailsVisible && (
//           <View style={styles.priceDropupExpandedContentCard}>
//             <View style={styles.priceDetailsHeaderLineJustified}>
//               <Text style={styles.priceDetailsSectionBoldTitle}>Price Details ({checkoutItems.length} Item)</Text>
//               <TouchableOpacity onPress={togglePriceDetails}><Feather name="chevron-down" size={20} color="#282c3f" /></TouchableOpacity>
//             </View>
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Total MRP</Text>
//               <Text style={styles.calcValueDarkText}>₹{Math.round(totalMRP).toLocaleString()}</Text>
//             </View>
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Discount on MRP</Text>
//               <Text style={[styles.calcValueDarkText, { color: '#00875a' }]}>- ₹{Math.round(totalDiscount).toLocaleString()}</Text>
//             </View>
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Platform Fee</Text>
//               <Text style={styles.calcValueDarkText}>₹{platformFee}</Text>
//             </View>
//           </View>
//         )}

//         <View style={styles.footerMainActionInteractiveBar}>
//           <View style={styles.paymentFooterSplitLayoutRow}>
//             <TouchableOpacity style={styles.footerPriceSummaryTapBlock} onPress={togglePriceDetails}>
//               <Text style={styles.footerCalculatedPriceTotalValText}>₹{Math.round(totalPayable).toLocaleString()}</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Text style={styles.viewPriceDetailsSmallLabel}>View Details</Text>
//                 <Feather name={isPriceDetailsVisible ? "chevron-down" : "chevron-up"} size={12} color="#2874F0" />
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.primaryActionNavigationBtnBlock}
//               onPress={() => {
//                 if (currentStep === 'CHOOSE_ADDRESS') {
//                   setConfirmedAddressId(selectedAddressId);
//                   setCurrentStep('SUMMARY_ADDRESS');
//                 } else if (currentStep === 'SUMMARY_ADDRESS') {
//                   setCurrentStep('PAYMENT');
//                 } else {
//                   Alert.alert('Success', 'Order Placed successfully!');
//                   router.dismissAll();
//                 }
//               }}
//             >
//               <Text style={styles.primaryActionNavigationBtnText}>
//                 {currentStep === 'PAYMENT' ? 'PLACE ORDER' : 'CONTINUE'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//     </SafeAreaView>
//   );
// }

// // ─── STYLES ARCHITECTURE ───
// const styles = StyleSheet.create({
//   rootContainer: { flex: 1, backgroundColor: '#F1F3F6' },
//   scrollContentLayout: { paddingBottom: 120 },
//   headerRow: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EFEFEF' },
//   navBackIcon: { padding: 4 },
//   headerMainTitle: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#212121' },
//   progressBarWrapper: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center' },
//   progressStepNode: { alignItems: 'center', gap: 2 },
//   progressStepLabel: { fontSize: 10, fontFamily: BaseFonts.medium, color: '#a0a2ab' },
//   progressLineSegment: { flex: 1, height: 2, backgroundColor: '#EBEBEB', marginHorizontal: 8 },
//   progressOuterIndicator: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
//   progressInnerIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },
//   listBlockLabelHeader: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#7e818c', marginHorizontal: 16, marginTop: 14, marginBottom: 8, textTransform: 'uppercase' },
//   addressItemWrapperBlock: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: '#EBEBEB' },
//   selectedAddressBorder: { borderColor: '#2874F0' },
//   addressSelectTouchLayout: { flexDirection: 'row', gap: 14 },
//   customRadioOuterBorder: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
//   customRadioInnerCircleFilled: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2874F0' },
//   addressTextMetaBody: { flex: 1, gap: 2 },
//   addressUserBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#212121' },
//   typeCapsuleBadge: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
//   typeCapsuleTextLabel: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#717478' },
//   addressRawParagraphText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#212121', lineHeight: 16 },
//   summaryAddressWhiteCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
//   summaryHeaderRowJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   deliverToText: { fontSize: 14, color: '#878787', fontFamily: BaseFonts.regular },
//   userNameText: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: '#212121' },
//   badgeHome: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
//   badgeHomeText: { fontSize: 9, color: '#717478', fontFamily: BaseFonts.bold },
//   changeButton: { borderWidth: 1, borderColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
//   changeBtnText: { color: '#2874F0', fontFamily: BaseFonts.semiBold, fontSize: 12 },
//   addressDetailText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.regular, marginTop: 8 },
//   phoneText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.regular, marginTop: 4 },
//   productCard: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 8 },
//   tagSaverBanner: { backgroundColor: '#E8F5E9', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, marginBottom: 8 },
//   tagSaverText: { color: '#388E3C', fontSize: 10, fontFamily: BaseFonts.semiBold },
//   productMainRow: { flexDirection: 'row' },
//   productImage: { width: 70, height: 70, resizeMode: 'contain' },
//   productMetaBlock: { flex: 1, marginLeft: 12 },
//   productTitle: { fontSize: 14, fontFamily: BaseFonts.regular, color: '#212121' },
//   productSpecs: { fontSize: 12, color: '#878787', marginTop: 2 },
//   ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
//   ratingCountText: { fontSize: 12, color: '#878787', marginLeft: 6 },
//   priceContainerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
//   discountDownArrow: { color: '#388E3C', fontSize: 13, fontFamily: BaseFonts.semiBold, marginRight: 6 },
//   originalPriceCross: { textDecorationLine: 'line-through', color: '#878787', fontSize: 12, marginRight: 6 },
//   sellingPriceText: { fontSize: 15, fontFamily: BaseFonts.semiBold, color: '#212121' },
//   deliveryEstimateRow: { borderTopWidth: 1, borderColor: '#F0F0F0', marginTop: 12, paddingTop: 10 },
//   estimateText: { fontSize: 13, color: '#212121', fontFamily: BaseFonts.medium },
//   invoiceOptionCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, alignItems: 'center', marginBottom: 8 },
//   invoiceText: { fontSize: 14, color: '#212121', marginLeft: 12 },
//   paymentMethodAccordionUnit: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EBEBEB' },
//   accordionHeaderTouchBarElement: { flexDirection: 'row', padding: 16, alignItems: 'center' },
//   accordionHeaderLeftLayout: { flexDirection: 'row', alignItems: 'center', gap: 12 },
//   paymentMethodMainName: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
//   accordionExpandableInnerContentBody: { paddingHorizontal: 44, paddingBottom: 16 },
//   paymentMethodDescriptorText: { fontSize: 12, color: '#878787' },
//   stickyFooterPanelSystemWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#EBEBEB', zIndex: 100 },
//   footerMainActionInteractiveBar: { padding: 12 },
//   paymentFooterSplitLayoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   footerPriceSummaryTapBlock: { flex: 0.8 },
//   footerCalculatedPriceTotalValText: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#212121' },
//   viewPriceDetailsSmallLabel: { fontSize: 11, color: '#2874F0', fontFamily: BaseFonts.semiBold },
//   primaryActionNavigationBtnBlock: { backgroundColor: '#FFC200', flex: 1.2, height: 44, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
//   primaryActionNavigationBtnText: { color: '#212121', fontSize: 14, fontFamily: BaseFonts.bold },
//   priceDropupExpandedContentCard: { paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#FFFFFF' },
//   priceDetailsHeaderLineJustified: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#F3F4F6', paddingBottom: 8, marginBottom: 12 },
//   priceDetailsSectionBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold },
//   priceCalculationRowSplit: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
//   calcLabelGreyText: { fontSize: 12, color: '#878787' },
//   calcValueDarkText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#212121' }
// });
// import React, { useState } from 'react';
// import { 
//   StyleSheet, 
//   View, 
//   ScrollView, 
//   TouchableOpacity, 
//   TextInput, 
//   Dimensions, 
//   LayoutAnimation, 
//   Platform, 
//   UIManager,
//   Image
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { BaseFonts } from '@/constants/BaseFonts';
// import Text from "@/skeleton/Text";

// const { width } = Dimensions.get('window');

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // Mock Address Data
// const initialAddresses = [
//   { id: '1', name: 'Afraz Mirza', type: 'HOME', raw: '8-e-4 vigyan Nagar Kota, Vigyan Nagar Kota', cityStateZip: 'Kota, Rajasthan 324005', mobile: '7410972065' },
//   { id: '2', name: 'Afraz Mirza', type: 'OFFICE', raw: '8-e-4 vigyan nagar Kota, Dadabari Kota', cityStateZip: 'Kota - 324009', mobile: '7410972065' }
// ];

// export default function CompleteCheckoutEngine() {
//   const router = useRouter();
  
//   // Checkout Steps Lifecycle: 'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'
//   const [currentStep, setCurrentStep] = useState<'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'>('CHOOSE_ADDRESS');
  
//   // Address selection states
//   const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
//   const [confirmedAddressId, setConfirmedAddressId] = useState<string | null>(null);

//   // Payment Accordions states
//   const [selectedMethod, setSelectedMethod] = useState<string>('COD'); // Default COD is clicked/selected
//   const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState<boolean>(false);

//   const selectedAddressData = initialAddresses.find(a => a.id === selectedAddressId);
//   const confirmedAddressData = initialAddresses.find(a => a.id === confirmedAddressId);

//   // Smooth accordion animation controller
//   const toggleAccordion = (methodKey: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     if (selectedMethod === methodKey) {
//       setSelectedMethod(''); // Toggle collapse
//     } else {
//       setSelectedMethod(methodKey);
//     }
//   };

//   const togglePriceDetails = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setIsPriceDetailsVisible(!isPriceDetailsVisible);
//   };

//   return (
//     <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      
//       {/* ── 1. MYNTRA-STYLE PROGRESS HEAD NAVIGATION ── */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => {
//           if (currentStep === 'SUMMARY_ADDRESS') setCurrentStep('CHOOSE_ADDRESS');
//           else if (currentStep === 'PAYMENT') setCurrentStep('SUMMARY_ADDRESS');
//           else router.back();
//         }} style={styles.navBackIcon}>
//           <Ionicons name="arrow-back" size={24} color="#282c3f" />
//         </TouchableOpacity>
        
//         <Text style={styles.headerMainTitle}>
//           {currentStep === 'PAYMENT' ? 'PAYMENT' : 'SELECT ADDRESS'}
//         </Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Modern Visual Progress Tracker Line Segment */}
//       <View style={styles.progressBarWrapper}>

//         <View style={styles.progressStepNode}>

//           <Ionicons name="checkmark-circle" size={16} color="#00875a" />

//           <Text style={[styles.progressStepLabel, { color: '#00875a', fontFamily: BaseFonts.bold }]}>Bag</Text>

//         </View>

//         <View style={[styles.progressLineSegment, currentStep !== 'CHOOSE_ADDRESS' && { backgroundColor: '#00875a' }]} />

        

//         <View style={styles.progressStepNode}>

//           <View style={[styles.progressOuterIndicator, currentStep !== 'CHOOSE_ADDRESS' && { borderColor: '#00875a' }]}>

//             <View style={[styles.progressInnerIndicator, currentStep !== 'CHOOSE_ADDRESS' && { backgroundColor: '#00875a' }]} />

//           </View>

//           <Text style={[styles.progressStepLabel, currentStep !== 'CHOOSE_ADDRESS' && { color: '#00875a', fontFamily: BaseFonts.bold }]}>Address</Text>

//         </View>

//         <View style={[styles.progressLineSegment, currentStep === 'PAYMENT' && { backgroundColor: '#00875a' }]} />

        

//         <View style={styles.progressStepNode}>

//           <View style={[styles.progressOuterIndicator, currentStep === 'PAYMENT' && { borderColor: '#00875a' }]}>

//             <View style={[styles.progressInnerIndicator, currentStep === 'PAYMENT' && { backgroundColor: '#00875a' }]} />

//           </View>

//           <Text style={[styles.progressStepLabel, currentStep === 'PAYMENT' && { color: '#00875a', fontFamily: BaseFonts.bold }]}>Payment</Text>

//         </View>

//       </View>

//       {/* ── MAIN CONTENT LAYER VIEW ROUTING SPLIT ── */}
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentLayout}>
        
//         {/* 🟩 VIEW 1: CHOOSE ADDRESS COMPONENT (SS 1 & 2 Sync) */}
//         {currentStep === 'CHOOSE_ADDRESS' && (
//           <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
//             <TouchableOpacity style={styles.addNewAddressBtnOutline} activeOpacity={0.8}>
//               <Text style={styles.addNewAddressText}>ADD NEW ADDRESS</Text>
//             </TouchableOpacity>

//             <Text style={styles.listBlockLabelHeader}>DEFAULT ADDRESS</Text>
//             {initialAddresses.filter(a => a.type === 'HOME').map((addr) => {
//               const isCurrentSelected = selectedAddressId === addr.id;
//               return (
//                 <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
//                   <TouchableOpacity 
//                     style={styles.addressSelectTouchLayout} 
//                     activeOpacity={0.9}
//                     onPress={() => setSelectedAddressId(addr.id)}
//                   >
//                     <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#ff3f6c' }]}>
//                       {isCurrentSelected && <View style={styles.customRadioInnerCircleFilled} />}
//                     </View>
                    
//                     <View style={styles.addressTextMetaBody}>
//                       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                         <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
//                         <View style={styles.typeCapsuleBadge}>
//                           <Text style={styles.typeCapsuleTextLabel}>{addr.type}</Text>
//                         </View>
//                       </View>
//                       <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
//                       <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
//                       {isCurrentSelected && (
//                         <Text style={[styles.addressRawParagraphText, { marginTop: 6, color: '#111827', fontFamily: BaseFonts.semiBold }]}>
//                           Mobile: <Text style={{ fontFamily: BaseFonts.bold }}>{addr.mobile}</Text>
//                         </Text>
//                       )}
//                     </View>
//                   </TouchableOpacity>

//                   {/* Dynamic Action Buttons Appear only if Checkbox/Radio is Selected (Matches SS 2) */}
//                   {isCurrentSelected && (
//                     <View style={styles.addressActionRowActionTriggers}>
//                       <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
//                         <Text style={styles.addressMetaActionText}>REMOVE</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
//                         <Text style={styles.addressMetaActionText}>EDIT</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               );
//             })}

//             <Text style={[styles.listBlockLabelHeader, { marginTop: 20 }]}>OTHER ADDRESS</Text>
//             {initialAddresses.filter(a => a.type === 'OFFICE').map((addr) => {
//               const isCurrentSelected = selectedAddressId === addr.id;
//               return (
//                 <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
//                   <TouchableOpacity 
//                     style={styles.addressSelectTouchLayout} 
//                     activeOpacity={0.9}
//                     onPress={() => setSelectedAddressId(addr.id)}
//                   >
//                     <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#ff3f6c' }]}>
//                       {isCurrentSelected && <View style={styles.customRadioInnerCircleFilled} />}
//                     </View>
                    
//                     <View style={styles.addressTextMetaBody}>
//                       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                         <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
//                         <View style={[styles.typeCapsuleBadge, { backgroundColor: '#E0F2FE' }]}>
//                           <Text style={[styles.typeCapsuleTextLabel, { color: '#0369a1' }]}>{addr.type}</Text>
//                         </View>
//                       </View>
//                       <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
//                       <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
//                     </View>
//                   </TouchableOpacity>

//                   {isCurrentSelected && (
//                     <View style={styles.addressActionRowActionTriggers}>
//                       <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
//                         <Text style={styles.addressMetaActionText}>REMOVE</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
//                         <Text style={styles.addressMetaActionText}>EDIT</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               );
//             })}
//           </View>
//         )}

//         {/* 🟩 VIEW 2: CONFIRMED SUMMARY ADDRESS ESTIMATES (SS 3 Sync) */}
//         {currentStep === 'SUMMARY_ADDRESS' && confirmedAddressData && (
//           <View style={{ marginTop: 12 }}>
//             <View style={styles.summaryAddressWhiteCard}>
//               <View style={styles.summaryHeaderRowJustified}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
//                   <Text style={styles.addressUserBoldTitle}>{confirmedAddressData.name}</Text>
//                   <Text style={styles.defaultGrayLabel}>(Default)</Text>
//                   <View style={styles.typeCapsuleBadge}>
//                     <Text style={styles.typeCapsuleTextLabel}>{confirmedAddressData.type}</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity onPress={() => setCurrentStep('CHOOSE_ADDRESS')} activeOpacity={0.7}>
//                   <Text style={styles.changeAddressPinkLink}>Change</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={[styles.addressRawParagraphText, { marginTop: 4, width: '90%' }]}>
//                 {confirmedAddressData.raw}
//               </Text>
//               <Text style={styles.addressRawParagraphText}>{confirmedAddressData.cityStateZip}</Text>
//               <Text style={[styles.addressRawParagraphText, { marginTop: 8, color: '#111827' }]}>
//                 Mobile: <Text style={{ fontFamily: BaseFonts.bold }}>{confirmedAddressData.mobile}</Text>
//               </Text>
//             </View>

//             <Text style={styles.listBlockLabelHeader}>DELIVERY ESTIMATES</Text>
//             <View style={styles.deliveryEstimateWhiteCard}>
//               <View style={styles.productAvatarPlaceholderBox}>
//                 <Ionicons name="shirt-outline" size={24} color="#9496a2" />
//               </View>
//               <Text style={styles.estimateArrivalTextBody}>
//                 Estimated delivery by <Text style={{ fontFamily: BaseFonts.bold, color: '#111827' }}>30 Jun 2026</Text>
//               </Text>
//             </View>
//           </View>
//         )}

//         {/* 🟩 VIEW 3: PAYMENT SCREEN SYSTEM ACCORDIONS (SS 4, 5, 6, 7 Sync) */}
//         {currentStep === 'PAYMENT' && (
//           <View style={{ marginTop: 12 }}>
            
//             {/* Bank Offers Trigger Banner */}
//             <TouchableOpacity style={styles.bankOffersWhiteRowContainer} activeOpacity={0.7}>
//               <Text style={styles.offersRowLeftLabel}>Coupons & Bank Offers</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//                 <Text style={styles.offersActionPinkLink}>All offers</Text>
//                 <Feather name="chevron-right" size={16} color="#ff3f6c" />
//               </View>
//             </TouchableOpacity>

//             <Text style={styles.listBlockLabelHeader}>RECOMMENDED PAYMENT OPTIONS</Text>
            
//             {/* ── CARD CHANNEL 1: CASH ON DELIVERY (COD - Default Selected) ── */}
//             <View style={styles.paymentMethodAccordionUnit}>
//               <TouchableOpacity 
//                 style={styles.accordionHeaderTouchBarElement}
//                 activeOpacity={0.8}
//                 onPress={() => toggleAccordion('COD')}
//               >
//                 <View style={styles.accordionHeaderLeftLayout}>
//                   <View style={[styles.customRadioOuterBorder, selectedMethod === 'COD' && { borderColor: '#ff3f6c' }]}>
//                     {selectedMethod === 'COD' && <View style={styles.customRadioInnerCircleFilled} />}
//                   </View>
//                   <Text style={styles.paymentMethodMainName}>Cash on Delivery (Cash/UPI)</Text>
//                 </View>
//                 <MaterialCommunityIcons name="cash-register" size={20} color="#535766" />
//               </TouchableOpacity>

//               {selectedMethod === 'COD' && (
//                 <View style={styles.accordionExpandableInnerContentBody}>
//                   <Text style={styles.paymentMethodDescriptorText}>
//                     For this option, there is a fee of ₹ 10. You can Pay online to avoid this.
//                   </Text>
//                   <TouchableOpacity style={styles.placeOrderPinkActionBtn} activeOpacity={0.85}>
//                     <Text style={styles.placeOrderPinkActionBtnText}>Place Order</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>

//             <Text style={styles.listBlockLabelHeader}>ONLINE PAYMENT OPTIONS</Text>

//             {/* ── CARD CHANNEL 2: UPI PAYMENTS (SS 6 Sync) ── */}
//             <View style={styles.paymentMethodAccordionUnit}>
//               <TouchableOpacity 
//                 style={styles.accordionHeaderTouchBarElement}
//                 activeOpacity={0.8}
//                 onPress={() => toggleAccordion('UPI')}
//               >
//                 <View style={styles.accordionHeaderLeftLayout}>
//                   <View style={[styles.customRadioOuterBorder, selectedMethod === 'UPI' && { borderColor: '#ff3f6c' }]}>
//                     {selectedMethod === 'UPI' && <View style={styles.customRadioInnerCircleFilled} />}
//                   </View>
//                   <Text style={styles.paymentMethodMainName}>UPI (Pay via any App)</Text>
//                 </View>
//                 <Feather name={selectedMethod === 'UPI' ? "chevron-up" : "chevron-down"} size={18} color="#282c3f" />
//               </TouchableOpacity>

//               {selectedMethod === 'UPI' && (
//                 <View style={[styles.accordionExpandableInnerContentBody, { gap: 16, paddingTop: 6 }]}>
//                   {/* PhonePe Option Link Sub Row */}
//                   <TouchableOpacity style={styles.upiAppInnerRowSelection} activeOpacity={0.7}>
//                     <View style={styles.customRadioOuterBorder}>
//                       <View style={styles.customRadioInnerCircleFilled} />
//                     </View>
//                     <View style={styles.upiAppLogoLabelAlignment}>
//                       <MaterialCommunityIcons name="purple" size={18} color="#5f259f" />
//                       <Text style={styles.upiAppNameLabel}>PhonePe</Text>
//                     </View>
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.placeOrderPinkActionBtn} activeOpacity={0.85}>
//                     <Text style={styles.placeOrderPinkActionBtnText}>Pay Now</Text>
//                   </TouchableOpacity>

//                   {/* Google Pay Option Link Sub Row */}
//                   <TouchableOpacity style={styles.upiAppInnerRowSelection} activeOpacity={0.7}>
//                     <View style={styles.customRadioOuterBorder} />
//                     <View style={styles.upiAppLogoLabelAlignment}>
//                       <Ionicons name="logo-google" size={16} color="#4285F4" />
//                       <Text style={styles.upiAppNameLabel}>Google Pay</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>

//             {/* ── CARD CHANNEL 3: CREDIT/DEBIT CARDS (SS 7 Sync) ── */}
//             <View style={styles.paymentMethodAccordionUnit}>
//               <TouchableOpacity 
//                 style={styles.accordionHeaderTouchBarElement}
//                 activeOpacity={0.8}
//                 onPress={() => toggleAccordion('CARD')}
//               >
//                 <View style={styles.accordionHeaderLeftLayout}>
//                   <View style={[styles.customRadioOuterBorder, selectedMethod === 'CARD' && { borderColor: '#ff3f6c' }]}>
//                     {selectedMethod === 'CARD' && <View style={styles.customRadioInnerCircleFilled} />}
//                   </View>
//                   <Text style={styles.paymentMethodMainName}>Credit/Debit Card</Text>
//                   <View style={styles.offersGreenBadgeCapsule}>
//                     <Text style={styles.offersGreenBadgeText}>11 Offers</Text>
//                   </View>
//                 </View>
//                 <Feather name={selectedMethod === 'CARD' ? "chevron-up" : "chevron-down"} size={18} color="#282c3f" />
//               </TouchableOpacity>

//               {selectedMethod === 'CARD' && (
//                 <View style={[styles.accordionExpandableInnerContentBody, { gap: 14 }]}>
//                   {/* Offer inline notification frame strip */}
//                   <View style={styles.inlineCardPromoBannerStrip}>
//                     <MaterialCommunityIcons name="ticket-percent" size={22} color="#d9383a" />
//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.promoBannerBoldHeadlineText}>10% Instant Discount</Text>
//                       <Text style={styles.promoBannerDescriptionContent}>On IDFC FIRST SWYP Credit Card on min spend loop details...</Text>
//                       <Text style={styles.promoBannerActionPinkLink}>View Eligible Styles &gt;</Text>
//                     </View>
//                   </View>

//                   <Text style={styles.paymentCardAlertTextNotice}>
//                     Please Ensure your card can be used for online transactions. <Text style={{ color: '#ff3f6c', fontFamily: BaseFonts.bold }}>Know More</Text>
//                   </Text>

//                   <TextInput style={styles.cardInputTextLineEngine} placeholder="Card Number" placeholderTextColor="#a0a2ab" keyboardType="numeric" maxLength={16} />
                  
//                   <View style={{ flexDirection: 'row', gap: 12 }}>
//                     <TextInput style={[styles.cardInputTextLineEngine, { flex: 1 }]} placeholder="Valid Thru (MM/YY)" placeholderTextColor="#a0a2ab" keyboardType="numeric" maxLength={5} />
//                     <TextInput style={[styles.cardInputTextLineEngine, { flex: 1 }]} placeholder="CVV" placeholderTextColor="#a0a2ab" keyboardType="numeric" secureTextEntry maxLength={3} />
//                   </View>

//                   <TouchableOpacity style={styles.placeOrderPinkActionBtn} activeOpacity={0.85}>
//                     <Text style={styles.placeOrderPinkActionBtnText}>Pay Now</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>

//           </View>
//         )}

//       </ScrollView>

//       {/* ── 5. FLOATING COMPLIANCE BOTTOM ACTION HOOK BAR (SS 4 & 5 Sync) ── */}
//       <View style={styles.stickyFooterPanelSystemWrapper}>
        
//         {/* Expanded Price Details Dropup Sheet Mechanics inside Checkout Interface */}
//         {isPriceDetailsVisible && (
//           <View style={styles.priceDropupExpandedContentCard}>
//             <View style={styles.priceDetailsHeaderLineJustified}>
//               <Text style={styles.priceDetailsSectionBoldTitle}>Price Details (1 item)</Text>
//               <TouchableOpacity onPress={togglePriceDetails} activeOpacity={0.7}>
//                 <Feather name="chevron-down" size={20} color="#282c3f" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Total MRP</Text>
//               <Text style={styles.calcValueDarkText}>₹10,599</Text>
//             </View>
            
//             <View style={styles.priceCalculationRowSplit}>
//               <Text style={styles.calcLabelGreyText}>Discount on MRP</Text>
//               <Text style={[styles.calcValueDarkText, { color: '#00875a' }]}>- ₹8,092</Text>
//             </View>

//             <View style={styles.priceCalculationRowSplit}>
//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//                 <Text style={styles.calcLabelGreyText}>Platform Fee</Text>
//                 <Text style={styles.knowMoreBlueTextLink}>Know More</Text>
//               </View>
//               <Text style={styles.calcValueDarkText}>₹23</Text>
//             </View>

//             <View style={styles.priceCalculationRowSplit}>
//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
//                 <Text style={styles.calcLabelGreyText}>Cash/Pay on Delivery Fee</Text>
//                 <Text style={styles.knowMoreBlueTextLink}>Know More</Text>
//               </View>
//               <Text style={styles.calcValueDarkText}>₹10</Text>
//             </View>
            
//             <View style={styles.bottomSheetHorizontalDividerLine} />
//           </View>
//         )}

//         {/* Solid Always Visible Bottom Matrix Action Interface Control */}
//         <View style={styles.footerMainActionInteractiveBar}>
//           {currentStep === 'CHOOSE_ADDRESS' ? (
//             <TouchableOpacity 
//               style={[styles.primaryActionNavigationBtnBlock, !selectedAddressId && { backgroundColor: '#dbdbdb' }]}
//               disabled={!selectedAddressId}
//               onPress={() => {
//                 setConfirmedAddressId(selectedAddressId);
//                 setCurrentStep('SUMMARY_ADDRESS');
//               }}
//               activeOpacity={0.85}
//             >
//               <Text style={styles.primaryActionNavigationBtnText}>
//                 {selectedAddressId ? 'CONFIRM' : 'PLEASE CHOOSE ADDRESS'}
//               </Text>
//             </TouchableOpacity>
//           ) : currentStep === 'SUMMARY_ADDRESS' ? (
//             <TouchableOpacity 
//               style={styles.primaryActionNavigationBtnBlock}
//               onPress={() => setCurrentStep('PAYMENT')}
//               activeOpacity={0.85}
//             >
//               <Text style={styles.primaryActionNavigationBtnText}>CONTINUE</Text>
//             </TouchableOpacity>
//           ) : (
//             /* Payment Screen Interactive Toggle Strip Frame with Dropup Toggle */
//             <View style={styles.paymentFooterSplitLayoutRow}>
//               <TouchableOpacity style={styles.footerPriceSummaryTapBlock} activeOpacity={0.7} onPress={togglePriceDetails}>
//                 <View>
//                   <Text style={styles.footerCalculatedPriceTotalValText}>₹2,540</Text>
//                   <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//                     <Text style={styles.viewPriceDetailsSmallLabel}>View Details</Text>
//                     <Feather name={isPriceDetailsVisible ? "chevron-down" : "chevron-up"} size={12} color="#ff3f6c" />
//                   </View>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.primaryActionNavigationBtnBlock, { flex: 1.2, marginTop: 0, borderRadius: 12 }]}
//                 activeOpacity={0.85}
//                 onPress={() => Alert.alert('Order Authenticated', 'Redirecting order request execution corridors successfully.')}
//               >
//                 <Text style={styles.primaryActionNavigationBtnText}>PLACE ORDER</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//       </View>

//     </SafeAreaView>
//   );
// }

// // ─── PIXEL-PERFECT COMMERCIALLY DESIGNED CSS STYLE SHEETS ────────────────────────────
// const styles = StyleSheet.create({
//   rootContainer: { flex: 1, backgroundColor: '#F5F5F7' },
//   scrollContentLayout: { paddingBottom: 160 },
  
//   // 1. Navigation Header
//   headerRow: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EFEFEF'
//   },
//   navBackIcon: { padding: 4 },
//   headerMainTitle: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.4 },

//   // 2. Step Progress Wireframe Segment Bar Matrix Link Styles
//   progressBarWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EBEBEB'
//   },
//   progressStepNode: { alignItems: 'center', gap: 4 },
//   progressStepLabel: { fontSize: 10, fontFamily: BaseFonts.medium, color: '#a0a2ab' },
//   progressLineSegment: { flex: 1, height: 2, backgroundColor: '#EBEBEB', mx: 8, marginTop: -14, marginHorizontal: 8 },
//   progressOuterIndicator: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
//   progressInnerIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },

//   // 3. Addresses Elements Style Arrays (SS 1 & 2 Sync layout parameters)
//   addNewAddressBtnOutline: {
//     borderWidth: 1,
//     borderColor: '#282c3f',
//     borderRadius: 8,
//     paddingVertical: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     marginTop: 14,
//     marginBottom: 8
//   },
//   addNewAddressText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
//   listBlockLabelHeader: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#7e818c', marginHorizontal: 16, marginTop: 18, marginBottom: 10, letterSpacing: 0.6 },
  
//   addressItemWrapperBlock: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#EBEBEB'
//   },
//   selectedAddressBorder: { borderColor: '#ff3f6c' },
//   addressSelectTouchLayout: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  
//   customRadioOuterBorder: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center', marginTop: 2 },
//   customRadioInnerCircleFilled: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff3f6c' },
  
//   addressTextMetaBody: { flex: 1, gap: 4 },
//   addressUserBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
//   typeCapsuleBadge: { backgroundColor: '#E6F4EA', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
//   typeCapsuleTextLabel: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#00875a' },
//   addressRawParagraphText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 18 },
  
//   addressActionRowActionTriggers: { flexDirection: 'row', gap: 12, marginTop: 14, borderTopWidth: 0.5, borderTopColor: '#EBEBEB', paddingTop: 12, paddingLeft: 32 },
//   addressMetaActionButton: { borderWidth: 1, borderColor: '#282c3f', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6, backgroundColor: '#FFFFFF' },
//   addressMetaActionText: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#282c3f' },

//   // 4. Summaries and delivery estimate boxes (SS 3 Sync layout parameters)
//   summaryAddressWhiteCard: { backgroundColor: '#FFFFFF', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
//   summaryHeaderRowJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
//   defaultGrayLabel: { fontSize: 11, fontFamily: BaseFonts.medium, color: '#9496a2' },
//   changeAddressPinkLink: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#ff3f6c' },
//   deliveryEstimateWhiteCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, alignItems: 'center', gap: 14, borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
//   productAvatarPlaceholderBox: { width: 44, height: 50, backgroundColor: '#EFF1F3', borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#dbdbdb' },
//   estimateArrivalTextBody: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#535766' },

//   // 5. Accordion Methods for Payments (SS 4, 5, 6, 7 layout setups)
//   bankOffersWhiteRowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
//   offersRowLeftLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
//   offersActionPinkLink: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#ff3f6c' },
  
//   paymentMethodAccordionUnit: { backgroundColor: '#FFFFFF', borderBottomWidth: 0.5, borderBottomColor: '#EBEBEB', overflow: 'hidden' },
//   accordionHeaderTouchBarElement: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 },
//   accordionHeaderLeftLayout: { flexDirection: 'row', alignItems: 'center', gap: 14 },
//   paymentMethodMainName: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
//   offersGreenBadgeCapsule: { backgroundColor: '#E6F4EA', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginLeft: 2 },
//   offersGreenBadgeText: { color: '#00875a', fontSize: 10, fontFamily: BaseFonts.bold },
  
//   accordionExpandableInnerContentBody: { paddingHorizontal: 18, paddingBottom: 18, paddingTop: 2 },
//   paymentMethodDescriptorText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 18, marginBottom: 14, paddingLeft: 32 },
//   placeOrderPinkActionBtn: { backgroundColor: '#ff3f6c', paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: '100%', elevation: 1 },
//   placeOrderPinkActionBtnText: { color: '#FFFFFF', fontSize: 14, fontFamily: BaseFonts.bold, letterSpacing: 0.4 },
  
//   upiAppInnerRowSelection: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10, paddingLeft: 6 },
//   upiAppLogoLabelAlignment: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   upiAppNameLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },

//   inlineCardPromoBannerStrip: { flexDirection: 'row', backgroundColor: '#FFF0F2', borderRadius: 12, padding: 14, gap: 12, borderWidth: 0.5, borderColor: '#FFE4E8', marginBottom: 12 },
//   promoBannerBoldHeadlineText: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#111827' },
//   promoBannerDescriptionContent: { fontSize: 10.5, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 14, marginTop: 2 },
//   promoBannerActionPinkLink: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#ff3f6c', marginTop: 4 },
//   paymentCardAlertTextNotice: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#535766', marginBottom: 12 },
//   cardInputTextLineEngine: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, height: 44, paddingHorizontal: 14, fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f', backgroundColor: '#FFFFFF', marginBottom: 12 },

//   // 6. Sticky Footers Matrix Layout Map Framework
//   stickyFooterPanelSystemWrapper: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#EBEBEB',
//     zIndex: 100,
//     // Native ambient dynamic shadows mapping
//     ...Platform.select({
//       ios: { shadowColor: '#000000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: -3 } },
//       android: { elevation: 12 }
//     })
//   },
//   footerMainActionInteractiveBar: { padding: 14, backgroundColor: '#FFFFFF' },
//   primaryActionNavigationBtnBlock: { backgroundColor: '#ff3f6c', height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 2 },
//   primaryActionNavigationBtnText: { color: '#FFFFFF', fontSize: 14, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },
  
//   paymentFooterSplitLayoutRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
//   footerPriceSummaryTapBlock: { flex: 0.7, paddingLeft: 4 },
//   footerCalculatedPriceTotalValText: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#111827' },
//   viewPriceDetailsSmallLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#ff3f6c' },

//   // 7. Dynamic Dropup Details Panels Configs (SS 5 Sync parameters mapping)
//   priceDropupExpandedContentCard: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 6, backgroundColor: '#FFFFFF' },
//   priceDetailsHeaderLineJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottomWidth: 0.5, borderBottomColor: '#F3F4F6', paddingBottom: 10 },
//   priceDetailsSectionBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
//   priceCalculationRowSplit: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
//   calcLabelGreyText: { fontSize: 12.5, fontFamily: BaseFonts.regular, color: '#7e818c' },
//   calcValueDarkText: { fontSize: 12.5, fontFamily: BaseFonts.medium, color: '#282c3f' },
//   knowMoreBlueTextLink: { fontSize: 10, fontFamily: BaseFonts.bold, color: '#ff3f6c' },
//   bottomSheetHorizontalDividerLine: { height: 1, backgroundColor: '#EBEBEB', marginTop: 6 }
// });