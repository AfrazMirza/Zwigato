// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useShop } from '../../../src/context/ShopContext';
// import Header from '../../../src/components/common/Header';
// import CartItem from '../../../src/components/modules/cart/CartItem';
// import { COLORS } from '../../../src/constants/colors';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import RemoveItemModal from '../../../src/components/modules/cart/RemoveItemModal';    
// import { BaseFonts } from '../../../src/constants/BaseFonts';
// import { getStoredToken } from '../../../src/controller/tokenController';

// export default function CartScreen() {
//   const { cart, removeFromCart, selectedIds, toggleSelection, toggleAll, toggleFavorite } = useShop();
//  const router = useRouter();
//   // Price Calculation Logic for selected items only
//   const selectedItems = cart.filter(item => selectedIds.includes(item.id));
//   const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 80;
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedItemForModal, setSelectedItemForModal] = useState(null);

//   // 1. Total MRP (Before discount)
// const totalMRP = selectedItems.reduce((sum, item) => {
//   // DummyJSON me 'price' discounted hoti hai, toh original price nikalne ke liye:
//   const originalPrice = item.price / (1 - (item.discountPercentage / 100));
//   return sum + (originalPrice * item.quantity);
// }, 0) * 80; // INR Conversion

// // 2. Total Final Amount (Jo user pay karega)
// const finalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 80;

// // 3. Discount Amount
// const totalDiscount = totalMRP - finalAmount;

// // 4. Platform Fee (As per image)
// const platformFee = selectedItems.length > 0 ? 23 : 0;

// // 5. Total Payable
// const payableAmount = finalAmount + platformFee;

//   // Function to open modal
//   const openRemoveModal = (item) => {
//     setSelectedItemForModal(item);
//     setModalVisible(true);
//   };

//   // Logic: Remove item directly
//   const handleDirectRemove = () => {
//     if (selectedItemForModal) {
//       removeFromCart(selectedItemForModal.id);
//       setModalVisible(false);
//       setSelectedItemForModal(null);
//     }
//   };

//   // Logic: Move to Wishlist (Referencing image_1.png actions)
//   const handleMoveToWishlist = () => {
//     if (selectedItemForModal) {
//       toggleFavorite(selectedItemForModal); // Context calls add function
//       removeFromCart(selectedItemForModal.id); // Context calls remove function
//       setModalVisible(false);
//       setSelectedItemForModal(null);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     const userToken = await await getStoredToken();
//     if (!userToken) {
//       Alert.alert(
//         'Login Required',
//         'Please sign in to place your order.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Login', onPress: () => router.push('/signIn') },
//         ]
//       );
//       return;
//     }
  
//     // Token mil gaya toh seedhe checkout page par bhej do!
//     router.push('/checkout');
//   };

//   // // ── TRIGGER HANDLER FOR MULTI-STEP CHECKOUT SCREEN ──
//   // const handlePlaceOrder = () => {
//   //   if (cart.length === 0) {
//   //     alert("Bhai aapka cart khali hai!");
//   //     return;
//   //   }
    
//   //   // Smoothly routes the dynamic context path directly to app/checkout.tsx
//   //   router.push('/checkout');
//   // };

//   const PriceDetails = () => {
//   if (selectedItems.length === 0) return null;

//   return (
//     <View style={styles.priceSection}>
//       <Text style={styles.priceHeader}>Price Details ({selectedItems.length} Items)</Text>
      
//       <View style={styles.priceCard}>
//         {/* Total MRP */}
//         <View style={styles.priceRow}>
//           <Text style={styles.label}>Total MRP</Text>
//           <Text style={styles.value}>₹{Math.round(totalMRP).toLocaleString()}</Text>
//         </View>

//         {/* Discount */}
//         <View style={styles.priceRow}>
//           <Text style={styles.label}>Discount on MRP</Text>
//           <Text style={[styles.value, { color: '#03A685' }]}>- ₹{Math.round(totalDiscount).toLocaleString()}</Text>
//         </View>

//         {/* Platform Fee */}
//         <View style={styles.priceRow}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.label}>Platform Fee</Text>
//             <TouchableOpacity><Text style={styles.knowMore}> Know More</Text></TouchableOpacity>
//           </View>
//           <Text style={styles.value}>₹{platformFee}</Text>
//         </View>

//         <View style={styles.dashedDivider} />

//         {/* Total Amount */}
//         <View style={[styles.priceRow, { marginTop: 5 }]}>
//           <Text style={styles.totalLabel}>Total Amount</Text>
//           <Text style={styles.totalValue}>₹{Math.round(payableAmount).toLocaleString()}</Text>
//         </View>

//         {/* Savings Banner */}
//         <View style={styles.savingsBanner}>
//           <View style={styles.savingsContent}>
//              <Ionicons name="pricetag" size={16} color="#03A685" />
//              <Text style={styles.savingsText}>
//                You're saving <Text style={{fontFamily: BaseFonts.semiBold,}}>₹{Math.round(totalDiscount).toLocaleString()}</Text> on this order
//              </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
//       <Header title="SHOPING BAG" showBack={true} ShowCart={false}/>
      
//       <View style={styles.topInfo}>
        
//          {cart.length === 0 ? null : (
//         <View style={styles.selectionBar}>
//         <Text style={styles.bagTitle}>Your Bag <Text style={styles.bagCount}>({cart.length} Items)</Text></Text>
//           <TouchableOpacity onPress={toggleAll} style={{flexDirection:'row', alignItems:'center'}}>
//             <Ionicons name={selectedIds.length === cart.length ? "checkbox" : "square-outline"} size={20} color={COLORS.primary}/>
//             <Text style={styles.selCountText}>{selectedIds.length}/{cart.length} ITEMS SELECTED</Text>
//           </TouchableOpacity>
//           {/* <View style={styles.topIcons}>
//             <Ionicons name="share-social-outline" size={20} style={{marginRight:15}}/>
//             <Ionicons name="heart-outline" size={20}/>
//           </View> */}
//         </View>
//         )}
        
//       </View>

//             {/*  TO DO 
            
//             Always use keyExtracter with flatlist also learn why we use it
            
//             */}
//       <FlatList
//         data={cart}
//         renderItem={({ item }) => (
         
//           <CartItem 
//             item={item} 
//             isSelected={selectedIds.includes(item.id)} 
//             onToggle={toggleSelection}
//             onRemove={() => openRemoveModal(item)}
//           />
//         )}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//         {/* <Header title="SHOPING BAG" showBack={true} ShowCart={false}/> */}
//         <Ionicons name="cart-outline" size={100} color={COLORS.border} />
//         <Text style={styles.emptyTitle}>Hey, it feels so light!</Text>
//         <Text style={styles.emptySubtitle}>There is nothing in your bag. Let's add some items.</Text>
//         <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/wishlist')}><Text style={styles.shopBtnText}>ADD ITEMS FROM WISHLIST</Text></TouchableOpacity>
//       </View>
//         }
//         ListFooterComponent={PriceDetails}
//         contentContainerStyle={{ paddingBottom: 90}}
//       />

//       {cart.length === 0 ? null : (
//   <View style={styles.footer}>
//     <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder} activeOpacity={0.85}>
//       <Text style={styles.orderText}>PLACE ORDER</Text>
//     </TouchableOpacity>
//   </View>
// )}

// <RemoveItemModal 
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         item={selectedItemForModal}
//         onRemove={handleDirectRemove}           // 'REMOVE' button ke liye
//         onMoveToWishlist={handleMoveToWishlist} // 'MOVE TO WISHLIST' button ke liye
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   emptyContainer: { flex: 1, alignItems: 'center', backgroundColor: '#fff', padding: 15 },
//   emptyTitle: { fontSize: 18, fontFamily: BaseFonts.semiBold, marginTop: 20 },
//   emptySubtitle: { textAlign: 'center', color: '#878787', fontFamily: BaseFonts.regular, marginTop: 10,},
//   shopBtn: { marginTop: 30, borderWidth: 1, borderColor: COLORS.primary, padding: 15, borderRadius: 4 },
//   shopBtnText: { color: COLORS.primary, fontFamily: BaseFonts.bold, },
//   topInfo: { padding: 15, borderBottomWidth: 8, borderBottomColor: '#f5f5f5' },
//   bagTitle: { fontSize: 16, fontFamily: BaseFonts.semiBold, },
//   bagCount: { fontFamily: BaseFonts.regular, color: '#878787' },
//   selectionBar: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
//   selCountText: { fontFamily: BaseFonts.semiBold, fontSize: 13, marginLeft: 10, color: COLORS.text },
//   topIcons: { flexDirection: 'row' },
//   footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
//   footerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
//   footerCount: { fontFamily: BaseFonts.semiBold, color: COLORS.text },
//   footerPrice: { fontFamily: BaseFonts.semiBold, fontSize: 18 },
//   placeOrderBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 4, alignItems: 'center' },
//   orderText: { color: '#fff', fontFamily: BaseFonts.bold, fontSize: 16 },

//   priceSection: { padding: 16, backgroundColor: '#F3F3F3' },
//   priceHeader: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: '#535766', marginBottom: 12, textTransform: 'uppercase' },
//   priceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 8 },
//   priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
//   label: { fontSize: 14, color: '#282C3F' },
//   value: { fontSize: 14, color: '#282C3F' },
//   knowMore: { color: '#FF3F6C', fontSize: 12, textDecorationLine: 'underline', fontFamily: BaseFonts.medium, },
//   dashedDivider: { 
//     height: 1, 
//     borderWidth: 1, 
//     borderColor: '#EAEAEC', 
//     borderStyle: 'dashed', 
//     marginVertical: 12,
//     borderRadius: 1
//   },
//   totalLabel: { fontSize: 16, fontFamily: BaseFonts.semiBold, color: '#3E4152' },
//   totalValue: { fontSize: 16, fontFamily: BaseFonts.semiBold, color: '#3E4152' },
//   savingsBanner: { 
//     backgroundColor: '#E6F7F3', 
//     padding: 12, 
//     borderRadius: 8, 
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: '#D0F0E8'
//   },
//   savingsContent: { flexDirection: 'row', alignItems: 'center' },
//   savingsText: { color: '#03A685', fontSize: 13, marginLeft: 8 },
// });

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import  Header  from '../../../src/components/common/Header'; // Context se direct normal global component mapping
import CartItem from '../../../src/components/modules/cart/CartItem';
import { COLORS } from '../../../src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RemoveItemModal from '../../../src/components/modules/cart/RemoveItemModal';    
import { BaseFonts } from '../../../src/constants/BaseFonts';
import { getStoredToken } from '../../../src/controller/tokenController';

// ── REDUX SYSTEM HOOKS & ACTIONS PACKAGES ──
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../src/store/store';
import { 
  removeFromCart, 
  toggleSelection, 
  toggleAll, 
  toggleFavorite 
} from '../../../src/store/slices/cartSlice';

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ── REDUX HOOKS SUBSCRIPTIONS ──
  const cart = useSelector((state: RootState) => state.shop.cart);
  const selectedIds = useSelector((state: RootState) => state.shop.selectedIds);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<any>(null);

  // Price Calculation Logic for selected items only
  const selectedItems = cart.filter(item => selectedIds.includes(item.id));
  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 80;

  // 1. Total MRP (Before discount)
  const totalMRP = selectedItems.reduce((sum, item) => {
    const discount = item.discountPercentage || 0;
    const originalPrice = item.price / (1 - (discount / 100));
    return sum + (originalPrice * item.quantity);
  }, 0) * 80;

  // 2. Total Final Amount
  const finalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 80;

  // 3. Discount Amount
  const totalDiscount = totalMRP - finalAmount;

  // 4. Platform Fee
  const platformFee = selectedItems.length > 0 ? 23 : 0;

  // 5. Total Payable
  const payableAmount = finalAmount + platformFee;

  const openRemoveModal = (item: any) => {
    setSelectedItemForModal(item);
    setModalVisible(true);
  };

  const handleDirectRemove = () => {
    if (selectedItemForModal) {
      // ✅ Redux Action Dispatched
      dispatch(removeFromCart(selectedItemForModal.id));
      setModalVisible(false);
      setSelectedItemForModal(null);
    }
  };

  const handleMoveToWishlist = () => {
    if (selectedItemForModal) {
      // ✅ Redux Actions Dispatched
      dispatch(toggleFavorite(selectedItemForModal));
      dispatch(removeFromCart(selectedItemForModal.id));
      setModalVisible(false);
      setSelectedItemForModal(null);
    }
  };

  const handlePlaceOrder = async () => {

    // Validation check: Agar user ne ek bhi item select nahi kiya toh rok do
    if (selectedItems.length === 0) {
      Alert.alert('Empty Selection', 'Bhai kam se kam ek item toh select karo order place karne ke liye!');
      return;
    }
    const userToken = await getStoredToken(); // Fix: Removed duplicate await line crash
    if (!userToken) {
      Alert.alert(
        'Login Required',
        'Please sign in to place your order.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/signIn') },
        ]
      );
      return;
    }
   // ✅ FIXED FOR ROUTING: Normal cart se jaate waqt isDirectBuy: 'false' bhejenge
    // Takki checkout screen samajh jaye ki Redux se selectedItems uthane hain
    router.push({
      pathname: '/checkout',
      params: { 
        isDirectBuy: 'false' 
      }
    });
  };

  //   // // ── TRIGGER HANDLER FOR MULTI-STEP CHECKOUT SCREEN ──
//   // const handlePlaceOrder = () => {
//   //   if (cart.length === 0) {
//   //     alert("Bhai aapka cart khali hai!");
//   //     return;
//   //   }
    
//   //   // Smoothly routes the dynamic context path directly to app/checkout.tsx
//   //   router.push('/checkout');
//   // };

  const PriceDetails = () => {
    if (selectedItems.length === 0) return null;

    return (
      <View style={styles.priceSection}>
        <Text style={styles.priceHeader}>Price Details ({selectedItems.length} Items)</Text>
        
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.label}>Total MRP</Text>
            <Text style={styles.value}>₹{Math.round(totalMRP).toLocaleString()}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.label}>Discount on MRP</Text>
            <Text style={[styles.value, { color: '#03A685' }]}>- ₹{Math.round(totalDiscount).toLocaleString()}</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.label}>Platform Fee</Text>
              <TouchableOpacity><Text style={styles.knowMore}> Know More</Text></TouchableOpacity>
            </View>
            <Text style={styles.value}>₹{platformFee}</Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={[styles.priceRow, { marginTop: 5 }]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{Math.round(payableAmount).toLocaleString()}</Text>
          </View>

          <View style={styles.savingsBanner}>
            <View style={styles.savingsContent}>
               <Ionicons name="pricetag" size={16} color="#03A685" />
               <Text style={styles.savingsText}>
                 You're saving <Text style={{fontFamily: BaseFonts.semiBold}}>₹{Math.round(totalDiscount).toLocaleString()}</Text> on this order
               </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      <Header title="SHOPING BAG" showBack={true} ShowCart={false}/>
      
      <View style={styles.topInfo}>
         {cart.length === 0 ? null : (
          <View style={styles.selectionBar}>
            <Text style={styles.bagTitle}>Your Bag <Text style={styles.bagCount}>({cart.length} Items)</Text></Text>
            <TouchableOpacity onPress={() => dispatch(toggleAll())} style={{flexDirection:'row', alignItems:'center'}}>
              <Ionicons name={selectedIds.length === cart.length ? "checkbox" : "square-outline"} size={20} color={COLORS.primary}/>
              <Text style={styles.selCountText}>{selectedIds.length}/{cart.length} ITEMS SELECTED</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem 
            item={item} 
            isSelected={selectedIds.includes(item.id)} 
            onToggle={(id : number) => dispatch(toggleSelection(id))}
            onRemove={() => openRemoveModal(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={100} color={COLORS.border} />
            <Text style={styles.emptyTitle}>Hey, it feels so light!</Text>
            <Text style={styles.emptySubtitle}>There is nothing in your bag. Let's add some items.</Text>
            <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/wishlist')}>
              <Text style={styles.shopBtnText}>ADD ITEMS FROM WISHLIST</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={PriceDetails}
        contentContainerStyle={{ paddingBottom: 90}}
      />

      {cart.length === 0 ? null : (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder} activeOpacity={0.85}>
            <Text style={styles.orderText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      )}

      <RemoveItemModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={selectedItemForModal}
        onRemove={handleDirectRemove}           
        onMoveToWishlist={handleMoveToWishlist} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, alignItems: 'center', backgroundColor: '#fff', padding: 15 },
  emptyTitle: { fontSize: 18, fontFamily: BaseFonts.semiBold, marginTop: 20 },
  emptySubtitle: { textAlign: 'center', color: '#878787', fontFamily: BaseFonts.regular, marginTop: 10,},
  shopBtn: { marginTop: 30, borderWidth: 1, borderColor: COLORS.primary, padding: 15, borderRadius: 4 },
  shopBtnText: { color: COLORS.primary, fontFamily: BaseFonts.bold, },
  topInfo: { padding: 15, borderBottomWidth: 8, borderBottomColor: '#f5f5f5' },
  bagTitle: { fontSize: 16, fontFamily: BaseFonts.semiBold, },
  bagCount: { fontFamily: BaseFonts.regular, color: '#878787' },
  selectionBar: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
  selCountText: { fontFamily: BaseFonts.semiBold, fontSize: 13, marginLeft: 10, color: COLORS.text },
  topIcons: { flexDirection: 'row' },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  footerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  footerCount: { fontFamily: BaseFonts.semiBold, color: COLORS.text },
  footerPrice: { fontFamily: BaseFonts.semiBold, fontSize: 18 },
  placeOrderBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 4, alignItems: 'center' },
  orderText: { color: '#fff', fontFamily: BaseFonts.bold, fontSize: 16 },
  priceSection: { padding: 16, backgroundColor: '#F3F3F3' },
  priceHeader: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: '#535766', marginBottom: 12, textTransform: 'uppercase' },
  priceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  label: { fontSize: 14, color: '#282C3F' },
  value: { fontSize: 14, color: '#282C3F' },
  knowMore: { color: '#FF3F6C', fontSize: 12, textDecorationLine: 'underline', fontFamily: BaseFonts.medium, },
  dashedDivider: { height: 1, borderWidth: 1, borderColor: '#EAEAEC', borderStyle: 'dashed', marginVertical: 12, borderRadius: 1 },
  totalLabel: { fontSize: 16, fontFamily: BaseFonts.semiBold, color: '#3E4152' },
  totalValue: { fontSize: 16, fontFamily: BaseFonts.semiBold, color: '#3E4152' },
  savingsBanner: { backgroundColor: '#E6F7F3', padding: 12, borderRadius: 8, marginTop: 20, borderWidth: 1, borderColor: '#D0F0E8' },
  savingsContent: { flexDirection: 'row', alignItems: 'center' },
  savingsText: { color: '#03A685', fontSize: 13, marginLeft: 8 },
});