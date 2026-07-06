// // import React from 'react';
// // import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Ionicons, Feather } from '@expo/vector-icons';
// // import { BaseFonts } from '@/constants/BaseFonts';
// // // import { BaseFonts } from '../src/constants/BaseFont'; // Path backup checked

// // const { width } = Dimensions.get('window');
// // const COLUMN_WIDTH = (width - 40) / 2;

// // const EXPLORE_CATEGORIES = [
// //   { id: '1', name: 'Western Wear', items: '120+ Brands', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500' },
// //   { id: '2', name: 'Ethnic Wear', items: '85+ Brands', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500' },
// //   { id: '3', name: 'Footwear & Shoes', items: '200+ Brands', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' },
// //   { id: '4', name: 'Watches & Accessories', items: '90+ Brands', img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500' },
// //   { id: '5', name: 'Beauty & Cosmetics', items: '150+ Brands', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500' },
// //   { id: '6', name: 'Gadgets & Audio', items: '50+ Brands', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
// // ];

// // export default function ExploreScreen() {
// //   return (
// //     <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
// //       {/* HEADER */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerTitle}>CHOOSE CATEGORY</Text>
// //         <TouchableOpacity style={styles.searchIconBtn}>
// //           <Feather name="search" size={20} color="#282c3f" />
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
// //         {/* BANNER PROMO */}
// //         <View style={styles.promoCard}>
// //           <Image 
// //             source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800' }} 
// //             style={styles.promoImg} 
// //           />
// //           <View style={styles.promoOverlay}>
// //             <Text style={styles.promoTag}>SEASON SALE</Text>
// //             <Text style={styles.promoTitle}>UP TO 70% OFF</Text>
// //           </View>
// //         </View>

// //         {/* GRID LAYOUT */}
// //         <Text style={styles.sectionTitle}>Shop by Department</Text>
// //         <View style={styles.gridContainer}>
// //           {EXPLORE_CATEGORIES.map((cat) => (
// //             <TouchableOpacity key={cat.id} style={styles.gridCard} activeOpacity={0.9}>
// //               <Image source={{ uri: cat.img }} style={styles.cardImg} />
// //               <View style={styles.cardOverlay}>
// //                 <Text style={styles.catName}>{cat.name.toUpperCase()}</Text>
// //                 <Text style={styles.catSub}>{cat.items}</Text>
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   root: { flex: 1, backgroundColor: '#FFFFFF' },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#f4f4f5',
// //   },
// //   headerTitle: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.6 },
// //   searchIconBtn: { padding: 4 },
// //   scrollContent: { paddingBottom: 110, paddingHorizontal: 14 },
// //   promoCard: { width: '100%', height: 140, borderRadius: 16, overflow: 'hidden', marginTop: 14, marginBottom: 20 },
// //   promoImg: { width: '100%', height: '100%', resizeMode: 'cover' },
// //   promoOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', paddingHorizontal: 20 },
// //   promoTag: { color: '#FFE082', fontSize: 11, fontFamily: BaseFonts.bold, letterSpacing: 1 },
// //   promoTitle: { color: '#FFFFFF', fontSize: 20, fontFamily: BaseFonts.bold, marginTop: 4 },
// //   sectionTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.5, marginBottom: 12, paddingLeft: 2 },
// //   gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
// //   gridCard: { width: COLUMN_WIDTH, height: 180, borderRadius: 14, overflow: 'hidden', marginBottom: 12 },
// //   cardImg: { width: '100%', height: '100%', resizeMode: 'cover' },
// //   cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 12 },
// //   catName: { color: '#FFFFFF', fontSize: 12, fontFamily: BaseFonts.bold, letterSpacing: 0.3 },
// //   catSub: { color: '#e2e2e4', fontSize: 10, fontFamily: BaseFonts.medium, marginTop: 2 },
// // });

// import React, { useState } from 'react';
// import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { BaseFonts } from '@/constants/BaseFonts';

// const { width, height } = Dimensions.get('window');

// // ─── ENTERPRISE MULTI-VENDOR TAXONOMY DATA ───
// const MASTER_DEPARTMENTS = [
//   { id: 'dep_1', name: 'Fashion & Apparel', icon: 'shirt-outline' },
//   { id: 'dep_2', name: 'Electronics & Tech', icon: 'laptop-outline' },
//   { id: 'dep_3', name: 'Beauty & Grooming', icon: 'sparkles-outline' },
//   { id: 'dep_4', name: 'Home & Living', icon: 'bed-outline' },
//   { id: 'dep_5', name: 'Gadgets & Audio', icon: 'headset-outline' },
//   { id: 'dep_6', name: 'Accessories', icon: 'watch-outline' },
// ];

// const SUB_CATEGORIES_DATA: Record<string, Array<{ id: string; name: string; items: string; img: string }>> = {
//   dep_1: [
//     { id: 'sub_1_1', name: 'Western Wear', items: '120+ Brands', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500' },
//     { id: 'sub_1_2', name: 'Ethnic Wear', items: '85+ Brands', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500' },
//     { id: 'sub_1_3', name: 'Footwear & Shoes', items: '200+ Brands', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' },
//     { id: 'sub_1_4', name: 'Innerwear', items: '40+ Brands', img: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500' },
//   ],
//   dep_2: [
//     { id: 'sub_2_1', name: 'Smartphones', items: '15+ Brands', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' },
//     { id: 'sub_2_2', name: 'Laptops', items: '12+ Brands', img: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500' },
//     { id: 'sub_2_3', name: 'Smart Watches', items: '30+ Brands', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500' },
//   ],
//   dep_3: [
//     { id: 'sub_3_1', name: 'Cosmetics', items: '150+ Brands', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500' },
//     { id: 'sub_3_2', name: 'Fragrances', items: '60+ Brands', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500' },
//   ],
//   dep_4: [
//     { id: 'sub_4_1', name: 'Bedding & Linen', items: '45+ Brands', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500' },
//     { id: 'sub_4_2', name: 'Decor & Lamps', items: '80+ Brands', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500' },
//   ],
//   dep_5: [
//     { id: 'sub_5_1', name: 'Headphones', items: '50+ Brands', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
//     { id: 'sub_5_2', name: 'Bluetooth Speakers', items: '25+ Brands', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500' },
//   ],
//   dep_6: [
//     { id: 'sub_6_1', name: 'Watches', items: '90+ Brands', img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500' },
//     { id: 'sub_6_2', name: 'Sunglasses', items: '35+ Brands', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' },
//   ],
// };

// export default function ExploreScreen() {
//   const [activeDept, setActiveDept] = useState('dep_1');
//   const router = useRouter();

//   const activeSubCategories = SUB_CATEGORIES_DATA[activeDept] || [];

//   return (
//     <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      
//       {/* HEADER MATCHING ZWIGATO BRAND SPECS */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>CHOOSE DEPARTMENT</Text>
//         <TouchableOpacity 
//           style={styles.searchIconBtn} 
//           onPress={() => router.push('/search')} // Redirects directly into our premium stack router
//         >
//           <Feather name="search" size={20} color="#282c3f" />
//         </TouchableOpacity>
//       </View>

//       {/* CORE DUAL-PANEL CONTAINER */}
//       <View style={styles.panelContainer}>
        
//         {/* LEFT COLUMN: FIXED VERTICAL NAVIGATION DEPARTMENTS */}
//         <View style={styles.leftSidebar}>
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
//             {MASTER_DEPARTMENTS.map((dept) => {
//               const isSelected = dept.id === activeDept;
//               return (
//                 <TouchableOpacity
//                   key={dept.id}
//                   style={[styles.deptTab, isSelected && styles.deptTabActive]}
//                   onPress={() => setActiveDept(dept.id)}
//                   activeOpacity={0.8}
//                 >
//                   <Ionicons 
//                     name={dept.icon as any} 
//                     size={20} 
//                     color={isSelected ? '#000000' : '#7e818c'} 
//                   />
//                   <Text style={[styles.deptText, isSelected && styles.deptTextActive]}>
//                     {dept.name}
//                   </Text>
//                   {isSelected && <View style={styles.activeIndicator} />}
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* RIGHT COLUMN: DYNAMIC GRID SUB-CATEGORIES TIMELINE */}
//         <View style={styles.rightContent}>
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.rightScrollContent}>
            
//             {/* SUB-HEADER BANNER INLINE INSIDE SELECTION */}
//             <View style={styles.miniPromo}>
//               <Text style={styles.miniPromoTag}>EXCLUSIVE CATALOG</Text>
//               <Text style={styles.miniPromoTitle}>Verified Merchant Outlets</Text>
//             </View>

//             {/* DYNAMIC GRIDS */}
//             <View style={styles.gridContainer}>
//               {activeSubCategories.map((sub) => (
//                 <TouchableOpacity 
//                   key={sub.id} 
//                   style={styles.gridCard} 
//                   activeOpacity={0.9}
//                   onPress={() => router.push(`/explore/${sub.name.toLowerCase().replace(/ /g, '-')}`)}
//                 >
//                   <View style={styles.imgWrapper}>
//                     <Image source={{ uri: sub.img }} style={styles.cardImg} />
//                   </View>
//                   <View style={styles.cardMeta}>
//                     <Text style={styles.catName} numberOfLines={1}>{sub.name}</Text>
//                     <Text style={styles.catSub}>{sub.items}</Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>

//           </ScrollView>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }

// // ─── ENTERPRISE STRUCTURAL GRID DESIGN ARCHITECTURE ──────────────────────────────
// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: '#FFFFFF' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f4f4f5',
//     backgroundColor: '#FFFFFF',
//   },
//   headerTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.6 },
//   searchIconBtn: { padding: 4 },
  
//   // Panel Splitting Wrapper
//   panelContainer: {
//     flex: 1,
//     flexDirection: 'row',
//   },

//   // Left Section Styles (Width locked at 28% for perfect balancing thresholds)
//   leftSidebar: {
//     width: width * 0.28,
//     backgroundColor: '#F5F5F6',
//     borderRightWidth: 1,
//     borderRightColor: '#EAEAEA',
//   },
//   deptTab: {
//     width: '100%',
//     paddingVertical: 18,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     backgroundColor: '#F5F5F6',
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#EAEAEA',
//   },
//   deptTabActive: {
//     backgroundColor: '#FFFFFF',
//   },
//   activeIndicator: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: 4,
//     backgroundColor: '#FFE450', // Synced directly with your floating squircle highlights box!
//   },
//   deptText: {
//     fontSize: 10,
//     fontFamily: BaseFonts.medium,
//     color: '#7e818c',
//     textAlign: 'center',
//     marginTop: 6,
//   },
//   deptTextActive: {
//     color: '#000000',
//     fontFamily: BaseFonts.bold,
//   },

//   // Right Content Styles (Occupies remainder 72% layout space)
//   rightContent: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   rightScrollContent: {
//     padding: 12,
//     paddingBottom: 110, // Gives safety padding clear above floating navigation absolute bar bounds
//   },
//   miniPromo: {
//     backgroundColor: '#282c3f',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   miniPromoTag: { color: '#FFE450', fontSize: 9, fontFamily: BaseFonts.bold, letterSpacing: 0.8 },
//   miniPromoTitle: { color: '#FFFFFF', fontSize: 13, fontFamily: BaseFonts.medium, marginTop: 2 },

//   // Grid Controls (2 items per row inside right viewport container)
//   gridContainer: { 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     justifyContent: 'space-between' 
//   },
//   gridCard: { 
//     width: '48%', 
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12, 
//     overflow: 'hidden', 
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#f4f4f5',
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.03,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 }
//   },
//   imgWrapper: {
//     width: '100%',
//     height: 100,
//     backgroundColor: '#F5F5F6',
//   },
//   cardImg: { width: '100%', height: '100%', resizeMode: 'cover' },
//   cardMeta: {
//     padding: 8,
//     alignItems: 'flex-start',
//   },
//   catName: { color: '#282c3f', fontSize: 11, fontFamily: BaseFonts.semiBold, letterSpacing: 0.2 },
//   catSub: { color: '#9496a2', fontSize: 9, fontFamily: BaseFonts.regular, marginTop: 1 },
// });