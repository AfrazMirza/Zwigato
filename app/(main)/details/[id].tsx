// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, StyleSheet, type NativeSyntheticEvent, type NativeScrollEvent, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// // Custom Imports
// import { useShop } from '../../../src/context/ShopContext';
// import { getProducts } from '../../../src/api/productService';
// import { productStyle } from '../../../assets/styles/productStyle'; // Clean reference import
// import Header from '../../../src/components/common/Header';

// type ProductReview = {
//   rating: number;
//   comment: string;
//   reviewerName: string;
// };

// type Product = {
//   id: number;
//   title: string;
//   brand?: string;
//   price: number;
//   discountPercentage?: number;
//   rating: number;
//   stock: number;
//   thumbnail?: string;
//   images?: string[];
//   description?: string;
//   category?: string;
//   minimumOrderQuantity?: number;
//   shippingInformation?: string;
//   warrantyInformation?: string;
//   returnPolicy?: string;
//   weight?: number;
//   sku?: string;
//   dimensions?: {
//     width?: number | string;
//     height?: number | string;
//     depth?: number | string;
//   };
//   reviews?: ProductReview[];
// };

// export default function ProductDetails() {
//   const { id } = useLocalSearchParams();
//   const { toggleFavorite, favorites, cart, addToCart } = useShop();
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showFullDesc, setShowFullDesc] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(1);

//   const router = useRouter();

//   // const handleAddToCart = async () => {
//   //   const userToken = await AsyncStorage.getItem('userToken');
//   //   if (!userToken) {
//   //     Alert.alert(
//   //       'Login Required',
//   //       'Please sign in to add items to your cart.',
//   //       [
//   //         { text: 'Cancel', style: 'cancel' },
//   //         { text: 'Login', onPress: () => router.push('/signIn') },
//   //       ]
//   //     );
//   //     return;
//   //   }

//   //   addToCart(product);
//   //   router.navigate('/cart');
//   // };

//   const handleAddToCart = () => {
//     addToCart(product);
//     router.navigate('/cart');
//   };

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const viewSize = event.nativeEvent.layoutMeasurement.width;
//     const index = Math.floor(contentOffset / viewSize) + 1;
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       const data = await getProducts();
//       const selected = data.find((p: Product) => p.id.toString() === String(id));
//       setProduct(selected ?? null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  
//   if (!product) return (
//     <View style={productStyle.errorContainer}>
//       <View style={productStyle.content}>
//         <View style={productStyle.logoBox}>
//           <Image 
//             source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} 
//             style={productStyle.logoImage} 
//           />
//         </View>
//         <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
//         <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
//         <TouchableOpacity style={productStyle.retryBtn} onPress={() => router.replace('/')}>
//           <Text style={productStyle.retryText}>GO TO HOME</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const isFavorite = favorites.find((p: Product) => p.id === product.id);

//   const renderReviewItem = ({ item }: { item: ProductReview }) => (
//     <View style={productStyle.modalReviewCard}>
//       <View style={productStyle.modalRevHeader}>
//         <View style={[productStyle.ratingBadgeSmall, { backgroundColor: item.rating >= 3 ? '#388E3C' : '#FF6161' }]}>
//           <Text style={productStyle.ratingTextSmall}>{item.rating} ★</Text>
//         </View>
//         <Text style={productStyle.modalRevTitle}>{item.rating >= 4 ? 'Excellent' : 'Good'}</Text>
//       </View>
//       <Text style={productStyle.modalComment} numberOfLines={3}>{item.comment}</Text>
//       <View style={productStyle.modalUserInfo}>
//         <Text style={productStyle.modalUserName}>{item.reviewerName}</Text>
//         <View style={productStyle.verifiedRow}>
//           <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
//           <Text style={productStyle.verifiedText}>Verified Buyer</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={productStyle.container}>
//       <Header title="Products" showBack={true}/>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={productStyle.scrollContent}>
        
//         {/* 1. Header Image Carousel Section */}
//         <View style={productStyle.imageCard}>
//           <ScrollView 
//             horizontal 
//             pagingEnabled 
//             showsHorizontalScrollIndicator={false}
//             style={productStyle.carousel}
//             onMomentumScrollEnd={handleScroll}
//             scrollEventThrottle={16}
//           >
//             {product.images && product.images.length > 0 ? (
//               product.images.map((img: string, index: number) => (
//                 <Image key={index} source={{ uri: img }} style={productStyle.carouselImage} />
//               ))
//             ) : (
//               <Image source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} style={productStyle.carouselImage} />
//             )}
//           </ScrollView>

//           <TouchableOpacity style={productStyle.favCircle} onPress={() => toggleFavorite(product)}>
//             <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
//           </TouchableOpacity>

//           {product.images && product.images.length > 1 && (
//             <View style={productStyle.imageBadge}>
//               <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
//             </View>
//           )}
//         </View>

//         {/* 2. Main Pricing Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.brandTag}>{product.brand?.toUpperCase()}</Text>
//           <Text style={productStyle.mainTitle}>{product.title}</Text>
          
//           <View style={productStyle.priceRow}>
//             <Text style={productStyle.currentPrice}>₹{Math.round(product.price * 80)}</Text>
//             <Text style={productStyle.strikePrice}>₹{Math.round(product.price * 1.2 * 80)}</Text>
//             <Text style={productStyle.discountTag}>{product.discountPercentage}% OFF</Text>
//           </View>
          
//           <TouchableOpacity style={productStyle.ratingTriggerBtn} onPress={() => setModalVisible(true)}>
//             <View style={productStyle.ratingBadgeSmall}>
//               <Text style={productStyle.ratingTextSmall}>{product.rating}</Text>
//               <MaterialCommunityIcons name="star" size={12} color="white" />
//             </View>
//             <Text style={productStyle.reviewLinkText}>|  {product.reviews?.length} ratings {'>'}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 3. Stock & MOQ Card */}
//         <View style={productStyle.stockInfoCard}>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
//           </View>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
//           </View>
//           {!cart.find((i: Product) => i.id === product.id) && (
//             <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
//           )}
//         </View>

//         {/* 4. Delivery & Warranty Section */}
//         <View style={productStyle.trustCard}>
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.shippingInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.warrantyInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="keyboard-return" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.returnPolicy}</Text>
//           </View>
//         </View>

//         {/* 5. Specifications */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Specifications</Text>
//           <View style={productStyle.specGrid}>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth || '0'}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Category</Text><Text style={productStyle.val}>{product.category}</Text></View>
//           </View>
//         </View>

//         {/* 6. Description Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Product Description</Text>
//           <Text style={productStyle.descText} numberOfLines={showFullDesc ? undefined : 2}>
//             {product.description}
//           </Text>
//           <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
//             <Text style={productStyle.readMoreBtn}>{showFullDesc ? "Read Less" : "Read More"}</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* MODAL SECTION */}
//       <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//         <View style={productStyle.modalOverlay}>
//           <View style={productStyle.modalContent}>
//             <View style={productStyle.modalHeader}>
//               <View>
//                 <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
//                 <View style={productStyle.overallRatingRow}>
//                   <Text style={productStyle.overallRatingText}>{product.rating} ★</Text>
//                   <Text style={productStyle.veryGoodText}>Very Good</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Ionicons name="close" size={28} color="#212121" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={product.reviews}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               renderItem={renderReviewItem}
//               contentContainerStyle={productStyle.modalListPadding}
//               snapToInterval={Dimensions.get('window').width * 0.82}
//               decelerationRate="fast"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* STICKY FOOTER */}
//       <View style={productStyle.stickyAction}>
//         <TouchableOpacity style={productStyle.wishBtn} onPress={() => toggleFavorite(product)}>
//           <Text style={productStyle.wishBtnText}>WISHLIST</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }]} 
//           disabled={product.stock === 0}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={20} color="white" />
//           <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }


// 2 code 

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, StyleSheet, type NativeSyntheticEvent, type NativeScrollEvent, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// // Custom Imports
// import { getProducts } from '../../../src/api/productService';
// import { productStyle } from '../../../assets/styles/productStyle'; 
// import Header from '../../../src/components/common/Header';

// // ── REDUX SYSTEM HOOKS & ACTIONS PACKAGES ──
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../../src/store/store';
// import { addToCart, toggleFavorite } from '../../../src/store/slices/cartSlice';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// type ProductReview = {
//   rating: number;
//   comment: string;
//   reviewerName: string;
// };

// type Product = {
//   id: number;
//   title: string;
//   brand?: string;
//   price: number;
//   discountPercentage?: number;
//   rating: number;
//   stock: number;
//   thumbnail?: string;
//   images?: string[];
//   description?: string;
//   category?: string;
//   minimumOrderQuantity?: number;
//   shippingInformation?: string;
//   warrantyInformation?: string;
//   returnPolicy?: string;
//   weight?: number;
//   sku?: string;
//   dimensions?: {
//     width?: number | string;
//     height?: number | string;
//     depth?: number | string;
//   };
//   reviews?: ProductReview[];
// };

// export default function ProductDetails() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // ── REDUX CENTRAL SUBSCRIPTIONS ──
//   const favorites = useSelector((state: RootState) => state.shop.favorites);
//   const cart = useSelector((state: RootState) => state.shop.cart);
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showFullDesc, setShowFullDesc] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(1);

//   // Component function ke andar:
// const scrollY = useSharedValue(0);

// const stickyStyle = useAnimatedStyle(() => {
//   // 👈 Agar scroll 300px se zyada ho toh slide up karke dikhao, varna niche chupa do
//   const shouldShow = scrollY.value > 300;
//   return {
//     transform: [{ translateY: withTiming(shouldShow ? 0 : 100, { duration: 250 }) }],
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderColor: '#EBEBEB',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   };
// });
//   // ✅ FIXED: Exact original flow with absolute Redux transmission pipeline
//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart(product)); // Redux central engine me push karega
//       router.navigate('/cart');    // Instantly original transition redirect loop
//     }
//   };

//   const handleWishlistToggle = () => {
//     if (product) {
//       dispatch(toggleFavorite(product)); // Redux cluster updates synchronously
//     }
//   };

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const viewSize = event.nativeEvent.layoutMeasurement.width;
//     const index = Math.floor(contentOffset / viewSize) + 1;
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       const data = await getProducts();
//       const selected = data.find((p: Product) => p.id.toString() === String(id));
//       setProduct(selected ?? null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  
//   if (!product) return (
//     <View style={productStyle.errorContainer}>
//       <View style={productStyle.content}>
//         <View style={productStyle.logoBox}>
//           <Image 
//             source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} 
//             style={productStyle.logoImage} 
//           />
//         </View>
//         <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
//         <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
//         <TouchableOpacity style={productStyle.retryBtn} onPress={() => router.replace('/')}>
//           <Text style={productStyle.retryText}>GO TO HOME</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // ✅ Redux state selector mapping for active heart compliance matrix
//   const isFavorite = favorites.some((p: Product) => p.id === product.id);

//   const renderReviewItem = ({ item }: { item: ProductReview }) => (
//     <View style={productStyle.modalReviewCard}>
//       <View style={productStyle.modalRevHeader}>
//         <View style={[productStyle.ratingBadgeSmall, { backgroundColor: item.rating >= 3 ? '#388E3C' : '#FF6161' }]}>
//           <Text style={productStyle.ratingTextSmall}>{item.rating} ★</Text>
//         </View>
//         <Text style={productStyle.modalRevTitle}>{item.rating >= 4 ? 'Excellent' : 'Good'}</Text>
//       </View>
//       <Text style={productStyle.modalComment} numberOfLines={3}>{item.comment}</Text>
//       <View style={productStyle.modalUserInfo}>
//         <Text style={productStyle.modalUserName}>{item.reviewerName}</Text>
//         <View style={productStyle.verifiedRow}>
//           <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
//           <Text style={productStyle.verifiedText}>Verified Buyer</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={productStyle.container}>
//       <Header title="Products" showBack={true}/>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={productStyle.scrollContent}>
        
//         {/* 1. Header Image Carousel Section */}
//         <View style={productStyle.imageCard}>
//           <ScrollView 
//             horizontal 
//             pagingEnabled 
//             showsHorizontalScrollIndicator={false}
//             style={productStyle.carousel}
//             onMomentumScrollEnd={handleScroll}
//             scrollEventThrottle={16}
//           >
//             {product.images && product.images.length > 0 ? (
//               product.images.map((img: string, index: number) => (
//                 <Image key={index} source={{ uri: img }} style={productStyle.carouselImage} />
//               ))
//             ) : (
//               <Image source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} style={productStyle.carouselImage} />
//             )}
//           </ScrollView>

//           <TouchableOpacity style={productStyle.favCircle} onPress={handleWishlistToggle}>
//             <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
//           </TouchableOpacity>

//           {product.images && product.images.length > 1 && (
//             <View style={productStyle.imageBadge}>
//               <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
//             </View>
//           )}
//         </View>

//         {/* 2. Main Pricing Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.brandTag}>{product.brand?.toUpperCase()}</Text>
//           <Text style={productStyle.mainTitle}>{product.title}</Text>
          
//           <View style={productStyle.priceRow}>
//             <Text style={productStyle.currentPrice}>₹{Math.round(product.price * 80)}</Text>
//             <Text style={productStyle.strikePrice}>₹{Math.round(product.price * 1.2 * 80)}</Text>
//             <Text style={productStyle.discountTag}>{product.discountPercentage}% OFF</Text>
//           </View>
          
//           <TouchableOpacity style={productStyle.ratingTriggerBtn} onPress={() => setModalVisible(true)}>
//             <View style={productStyle.ratingBadgeSmall}>
//               <Text style={productStyle.ratingTextSmall}>{product.rating}</Text>
//               <MaterialCommunityIcons name="star" size={12} color="white" />
//             </View>
//             <Text style={productStyle.reviewLinkText}>|  {product.reviews?.length} ratings {'>'}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 3. Stock & MOQ Card */}
//         <View style={productStyle.stockInfoCard}>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
//           </View>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
//           </View>
//           {!cart.some((i: Product) => i.id === product.id) && (
//             <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
//           )}
//         </View>

//         {/* 4. Delivery & Warranty Section */}
//         <View style={productStyle.trustCard}>
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.shippingInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.warrantyInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="keyboard-return" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.returnPolicy}</Text>
//           </View>
//         </View>

//         {/* 5. Specifications */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Specifications</Text>
//           <View style={productStyle.specGrid}>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth || '0'}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Category</Text><Text style={productStyle.val}>{product.category}</Text></View>
//           </View>
//         </View>

//         {/* 6. Description Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Product Description</Text>
//           <Text style={productStyle.descText} numberOfLines={showFullDesc ? undefined : 2}>
//             {product.description}
//           </Text>
//           <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
//             <Text style={productStyle.readMoreBtn}>{showFullDesc ? "Read Less" : "Read More"}</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* MODAL SECTION */}
//       <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//         <View style={productStyle.modalOverlay}>
//           <View style={productStyle.modalContent}>
//             <View style={productStyle.modalHeader}>
//               <View>
//                 <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
//                 <View style={productStyle.overallRatingRow}>
//                   <Text style={productStyle.overallRatingText}>{product.rating} ★</Text>
//                   <Text style={productStyle.veryGoodText}>Very Good</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Ionicons name="close" size={28} color="#212121" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={product.reviews}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               renderItem={renderReviewItem}
//               contentContainerStyle={productStyle.modalListPadding}
//               snapToInterval={Dimensions.get('window').width * 0.82}
//               decelerationRate="fast"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* STICKY FOOTER */}
//       <View style={productStyle.stickyAction}>
//         <TouchableOpacity style={productStyle.wishBtn} onPress={handleWishlistToggle}>
//           <Text style={productStyle.wishBtnText}>WISHLIST</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }]} 
//           disabled={product.stock === 0}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={20} color="white" />
//           <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

//3 code 
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Custom Imports
import { getProducts } from '../../../src/api/productService';
import { productStyle } from '../../../assets/styles/productStyle'; 
import Header from '../../../src/components/common/Header';
import { BaseFonts } from '../../../src/constants/BaseFonts';

// ── REDUX SYSTEM HOOKS & ACTIONS PACKAGES ──
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../src/store/store';
import { addToCart, toggleFavorite } from '../../../src/store/slices/cartSlice';

// ── REANIMATED SYSTEM MATRIX ──
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  useAnimatedScrollHandler, 
  withSpring,
  FadeInDown
} from 'react-native-reanimated';

type ProductReview = {
  rating: number;
  comment: string;
  reviewerName: string;
};

type Product = {
  id: number;
  title: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  thumbnail?: string;
  images?: string[];
  description?: string;
  category?: string;
  minimumOrderQuantity?: number;
  shippingInformation?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
  weight?: number;
  sku?: string;
  dimensions?: {
    width?: number | string;
    height?: number | string;
    depth?: number | string;
  };
  reviews?: ProductReview[];
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ── REDUX CENTRAL SUBSCRIPTIONS ──
  const favorites = useSelector((state: RootState) => state.shop.favorites);
  const cart = useSelector((state: RootState) => state.shop.cart);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  // ── REANIMATED INTERACTIVE VALUES ──
  const scrollY = useSharedValue(0);
  const favScale = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // ✅ USER PREFERENCE: Clean strip view with product description metadata + single explicit action
  const stickyStyle = useAnimatedStyle(() => {
    const shouldShow = scrollY.value > 50;
    return {
      transform: [{ translateY: withTiming(shouldShow ? 0 : 120, { duration: 250 }) }],
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderColor: '#EBEBEB',
      elevation: 20,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 5,
      zIndex: 999,
    };
  });

  const favAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: favScale.value }],
    };
  });

  // ✅ FIXED MIX: Spring pop animation loop applied directly on wishlist action trigger
  const handleWishlistToggle = () => {
    if (product) {
      favScale.value = 0.8;
      favScale.value = withSpring(1.3, { damping: 4, stiffness: 150 }, () => {
        favScale.value = withSpring(1);
      });
      dispatch(toggleFavorite(product)); 
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); 
      router.navigate('/cart');    
    }
  };

const handleBuyNow = () => {
  if (product) {
    // 1. Cart me background sync chahiye to dispatch chala do, optional hai:
    // dispatch(addToCart(product)); 
    
    // 2. ✅ FIXED LOGIC: Router params me single product data stringify karke direct checkout bhejenge
    router.push({
      pathname: '/checkout',
      params: { 
        directBuyProduct: JSON.stringify(product),
        isDirectBuy: 'true'
      }
    });
  }
};

  const handleHorizontalScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(contentOffset / viewSize) + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const data = await getProducts();
      const selected = data.find((p: Product) => p.id.toString() === String(id));
      setProduct(selected ?? null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  
  if (!product) return (
    <View style={productStyle.errorContainer}>
      <View style={productStyle.content}>
        <View style={productStyle.logoBox}>
          <Image 
            source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} 
            style={productStyle.logoImage} 
          />
        </View>
        <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
        <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
        <TouchableOpacity style={productStyle.retryBtn} onPress={() => router.replace('/')}>
          <Text style={productStyle.retryText}>GO TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const isFavorite = favorites.some((p: Product) => p.id === product.id);

  const renderReviewItem = ({ item }: { item: ProductReview }) => (
    <View style={productStyle.modalReviewCard}>
      <View style={productStyle.modalRevHeader}>
        <View style={[productStyle.ratingBadgeSmall, { backgroundColor: item.rating >= 3 ? '#388E3C' : '#FF6161' }]}>
          <Text style={productStyle.ratingTextSmall}>{item.rating} ★</Text>
        </View>
        <Text style={productStyle.modalRevTitle}>{item.rating >= 4 ? 'Excellent' : 'Good'}</Text>
      </View>
      <Text style={productStyle.modalComment} numberOfLines={3}>{item.comment}</Text>
      <View style={productStyle.modalUserInfo}>
        <Text style={productStyle.modalUserName}>{item.reviewerName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
          <Text style={productStyle.verifiedText}>Verified Buyer</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header title="Products" showBack={true}/>
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[productStyle.scrollContent, { paddingBottom: 90 }]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* 1. Header Image Carousel Section */}
        <View style={productStyle.imageCard}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            style={productStyle.carousel}
            onMomentumScrollEnd={handleHorizontalScroll}
            scrollEventThrottle={16}
          >
            {product.images && product.images.length > 0 ? (
              product.images.map((img: string, index: number) => (
                <Image key={index} source={{ uri: img }} style={productStyle.carouselImage} />
              ))
            ) : (
              <Image source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} style={productStyle.carouselImage} />
            )}
          </ScrollView>

          {/* ✅ ANIMATION ADD-ON: Wrapped inside Reanimated scaling nodes */}
          <TouchableOpacity activeOpacity={0.9} style={productStyle.favCircle} onPress={handleWishlistToggle}>
            <Animated.View style={favAnimatedStyle}>
              <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
            </Animated.View>
          </TouchableOpacity>

          {product.images && product.images.length > 1 && (
            <View style={productStyle.imageBadge}>
              <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
            </View>
          )}
        </View>

        {/* ✅ ANIMATION ADD-ON: Pricing Card Popup Transition Effect */}
        <Animated.View entering={FadeInDown.duration(400).delay(100)} style={productStyle.card}>
          <Text style={productStyle.brandTag}>{product.brand?.toUpperCase()}</Text>
          <Text style={productStyle.mainTitle}>{product.title}</Text>
          
          <View style={productStyle.priceRow}>
            <Text style={productStyle.currentPrice}>₹{Math.round(product.price * 80)}</Text>
            <Text style={productStyle.strikePrice}>₹{Math.round(product.price * 1.2 * 80)}</Text>
            <Text style={productStyle.discountTag}>{product.discountPercentage}% OFF</Text>
          </View>
          
          <TouchableOpacity style={productStyle.ratingTriggerBtn} onPress={() => setModalVisible(true)}>
            <View style={productStyle.ratingBadgeSmall}>
              <Text style={productStyle.ratingTextSmall}>{product.rating}</Text>
              <MaterialCommunityIcons name="star" size={12} color="white" />
            </View>
            <Text style={productStyle.reviewLinkText}>|  {product.reviews?.length} ratings {'>'}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ✅ ANIMATION ADD-ON: Stock Metadata Popup Transition */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)} style={productStyle.stockInfoCard}>
          <View style={productStyle.infoRow}>
            <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
            <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
          </View>
          <View style={productStyle.infoRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
            <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
          </View>
          {!cart.some((i: Product) => i.id === product.id) && (
            <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
          )}
        </Animated.View>

        {/* ✅ ANIMATION ADD-ON: Delivery Trust Cards Popup Transition */}
        <Animated.View entering={FadeInDown.duration(400).delay(300)} style={productStyle.trustCard}>
          <View style={productStyle.trustItem}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#2874F0" />
            <Text style={productStyle.trustLabel}>{product.shippingInformation}</Text>
          </View>
          <View style={productStyle.verticalDivider} />
          <View style={productStyle.trustItem}>
            <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2874F0" />
            <Text style={productStyle.trustLabel}>{product.warrantyInformation}</Text>
          </View>
          <View style={productStyle.verticalDivider} />
          <View style={productStyle.trustItem}>
            <MaterialCommunityIcons name="keyboard-return" size={24} color="#2874F0" />
            <Text style={productStyle.trustLabel}>{product.returnPolicy}</Text>
          </View>
        </Animated.View>

        {/* 5. Specifications */}
        <View style={productStyle.card}>
          <Text style={productStyle.sectionHeader}>Specifications</Text>
          <View style={productStyle.specGrid}>
            <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
            <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
            <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth || '0'}</Text></View>
            <View style={productStyle.specBox}><Text style={productStyle.label}>Category</Text><Text style={productStyle.val}>{product.category}</Text></View>
          </View>
        </View>

        {/* 6. Description Card */}
        <View style={productStyle.card}>
          <Text style={productStyle.sectionHeader}>Product Description</Text>
          <Text style={productStyle.descText} numberOfLines={showFullDesc ? undefined : 2}>
            {product.description}
          </Text>
          <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
            <Text style={productStyle.readMoreBtn}>{showFullDesc ? "Read Less" : "Read More"}</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      {/* MODAL SECTION */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={productStyle.modalOverlay}>
          <View style={productStyle.modalContent}>
            <View style={productStyle.modalHeader}>
              <View>
                <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
                <View style={productStyle.overallRatingRow}>
                  <Text style={productStyle.overallRatingText}>{product.rating} ★</Text>
                  <Text style={productStyle.veryGoodText}>Very Good</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#212121" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={product.reviews}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderReviewItem}
              contentContainerStyle={productStyle.modalListPadding}
              snapToInterval={Dimensions.get('window').width * 0.82}
              decelerationRate="fast"
            />
          </View>
        </View>
      </Modal>

      {/* STANDARD STATIC FOOTER BUTTONS */}
      {/* <View style={productStyle.stickyAction}>
        <TouchableOpacity style={productStyle.wishBtn} onPress={handleWishlistToggle}>
          <Text style={productStyle.wishBtnText}>WISHLIST</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }]} 
          disabled={product.stock === 0}
          onPress={handleAddToCart}
        >
          <MaterialCommunityIcons name="shopping-outline" size={20} color="white" />
          <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
        </TouchableOpacity>
      </View> */}

      {/* ✅ TARGET STICKY ADD TO BAG STRIP PANEL */}
      <Animated.View style={stickyStyle}>
        <View>
          <Text numberOfLines={1} style={{ fontSize: 11, color: '#9496a2', fontFamily: BaseFonts.bold, maxWidth: 150 }}>{product.title}</Text>
          <Text style={{ fontSize: 16, fontFamily: BaseFonts.bold, color: '#111827' }}>₹{Math.round(product.price * 80)}</Text>
        </View>
        {/* 🛒 FLIPKART STYLE: Animated Cart Icon Shortcut Trigger */}
    <TouchableOpacity 
      activeOpacity={0.8}
      style={{
        backgroundColor: '#F5F5F6',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EAEAEC',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
      onPress={handleAddToCart}
    >
     <Ionicons name="bag-handle-outline" size={22} color="#282c3f" />  
      
      {/* Dynamic Redux Badge Count tracking inside sticky view portal
      {cart && cart.length > 0 && (
        <View style={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: '#ff3f6c',
          borderRadius: 10,
          minWidth: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 2
        }}>
          <Text style={{ color: '#FFF', fontSize: 9, fontFamily: BaseFonts.bold }}>
            {cart.length}
          </Text>
        </View>
      )} */}
    </TouchableOpacity>

        <TouchableOpacity 
          style={{ backgroundColor: '#ff3f6c', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8 }}
          onPress={handleBuyNow}
        >
          <MaterialCommunityIcons name="shopping-outline" size={16} color="white" style={{ marginRight: 6 }} />
          <Text style={{ color: 'white', fontFamily: BaseFonts.bold, fontSize: 13 }}>BUY NOW</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
//4code 
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, Alert, ScrollView } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// // Custom Imports
// import { getProducts } from '../../../src/api/productService';
// import { productStyle } from '../../../assets/styles/productStyle'; 
// import Header from '../../../src/components/common/Header';
// import { BaseFonts } from '../../../src/constants/BaseFonts';

// // ── REDUX SYSTEM HOOKS & ACTIONS PACKAGES ──
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../../src/store/store';
// import { addToCart, toggleFavorite } from '../../../src/store/slices/cartSlice';

// // ── REANIMATED SYSTEM MATRIX ──
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, useAnimatedScrollHandler } from 'react-native-reanimated';

// type ProductReview = {
//   rating: number;
//   comment: string;
//   reviewerName: string;
// };

// type Product = {
//   id: number;
//   title: string;
//   brand?: string;
//   price: number;
//   discountPercentage?: number;
//   rating: number;
//   stock: number;
//   thumbnail?: string;
//   images?: string[];
//   description?: string;
//   category?: string;
//   minimumOrderQuantity?: number;
//   shippingInformation?: string;
//   warrantyInformation?: string;
//   returnPolicy?: string;
//   weight?: number;
//   sku?: string;
//   dimensions?: {
//     width?: number | string;
//     height?: number | string;
//     depth?: number | string;
//   };
//   reviews?: ProductReview[];
// };

// export default function ProductDetails() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // ── REDUX CENTRAL SUBSCRIPTIONS ──
//   const favorites = useSelector((state: RootState) => state.shop.favorites);
//   const cart = useSelector((state: RootState) => state.shop.cart);
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showFullDesc, setShowFullDesc] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(1);

//   // ── REANIMATED REAL-TIME SCROLL TRACKER MATRIX ──
//   const scrollY = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.contentOffset.y;
//     },
//   });

//   const stickyStyle = useAnimatedStyle(() => {
//     const shouldShow = scrollY.value > 300;
//     return {
//       transform: [{ translateY: withTiming(shouldShow ? 0 : 120, { duration: 200 }) }],
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       backgroundColor: '#FFFFFF',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       borderTopWidth: 1,
//       borderColor: '#EBEBEB',
//       elevation: 20,
//       shadowColor: '#000',
//       shadowOpacity: 0.15,
//       shadowRadius: 5,
//       zIndex: 999,
//     };
//   });

//   // ✅ FIXED: Redux Dispatch Loop followed by exact original transition redirect loop
//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart(product)); 
//       router.navigate('/cart');    
//     }
//   };

//   const handleWishlistToggle = () => {
//     if (product) {
//       dispatch(toggleFavorite(product)); 
//     }
//   };

//   const handleHorizontalScroll = (event: any) => {
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const viewSize = event.nativeEvent.layoutMeasurement.width;
//     const index = Math.floor(contentOffset / viewSize) + 1;
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       const data = await getProducts();
//       const selected = data.find((p: Product) => p.id.toString() === String(id));
//       setProduct(selected ?? null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  
//   if (!product) return (
//     <View style={productStyle.errorContainer}>
//       <View style={productStyle.content}>
//         <View style={productStyle.logoBox}>
//           <Image 
//             source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} 
//             style={productStyle.logoImage} 
//           />
//         </View>
//         <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
//         <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
//         <TouchableOpacity style={productStyle.retryBtn} onPress={() => router.replace('/')}>
//           <Text style={productStyle.retryText}>GO TO HOME</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const isFavorite = favorites.some((p: Product) => p.id === product.id);

//   const renderReviewItem = ({ item }: { item: ProductReview }) => (
//     <View style={productStyle.modalReviewCard}>
//       <View style={productStyle.modalRevHeader}>
//         <View style={[productStyle.ratingBadgeSmall, { backgroundColor: item.rating >= 3 ? '#388E3C' : '#FF6161' }]}>
//           <Text style={productStyle.ratingTextSmall}>{item.rating} ★</Text>
//         </View>
//         <Text style={productStyle.modalRevTitle}>{item.rating >= 4 ? 'Excellent' : 'Good'}</Text>
//       </View>
//       <Text style={productStyle.modalComment} numberOfLines={3}>{item.comment}</Text>
//       <View style={productStyle.modalUserInfo}>
//         <Text style={productStyle.modalUserName}>{item.reviewerName}</Text>
//         <View style={productStyle.verifiedRow}>
//           <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
//           <Text style={productStyle.verifiedText}>Verified Buyer</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
//       <Header title="Products" showBack={true}/>
      
//       {/* ✅ FIXED: Converted standard ScrollView to Reanimated.ScrollView to bind scroll listener */}
//       <Animated.ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={[productStyle.scrollContent, { paddingBottom: 80 }]}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//       >
//         {/* 1. Header Image Carousel Section */}
//         <View style={productStyle.imageCard}>
//           <Animated.ScrollView 
//             horizontal 
//             pagingEnabled 
//             showsHorizontalScrollIndicator={false}
//             style={productStyle.carousel}
//             onMomentumScrollEnd={handleHorizontalScroll}
//             scrollEventThrottle={16}
//           >
//             {product.images && product.images.length > 0 ? (
//               product.images.map((img: string, index: number) => (
//                 <Image key={index} source={{ uri: img }} style={productStyle.carouselImage} />
//               ))
//             ) : (
//               <Image source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} style={productStyle.carouselImage} />
//             )}
//           </Animated.ScrollView>

//           <TouchableOpacity style={productStyle.favCircle} onPress={handleWishlistToggle}>
//             <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
//           </TouchableOpacity>

//           {product.images && product.images.length > 1 && (
//             <View style={productStyle.imageBadge}>
//               <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
//             </View>
//           )}
//         </View>

//         {/* 2. Main Pricing Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.brandTag}>{product.brand?.toUpperCase()}</Text>
//           <Text style={productStyle.mainTitle}>{product.title}</Text>
          
//           <View style={productStyle.priceRow}>
//             <Text style={productStyle.currentPrice}>₹{Math.round(product.price * 80)}</Text>
//             <Text style={productStyle.strikePrice}>₹{Math.round(product.price * 1.2 * 80)}</Text>
//             <Text style={productStyle.discountTag}>{product.discountPercentage}% OFF</Text>
//           </View>
          
//           <TouchableOpacity style={productStyle.ratingTriggerBtn} onPress={() => setModalVisible(true)}>
//             <View style={productStyle.ratingBadgeSmall}>
//               <Text style={productStyle.ratingTextSmall}>{product.rating}</Text>
//               <MaterialCommunityIcons name="star" size={12} color="white" />
//             </View>
//             <Text style={productStyle.reviewLinkText}>|  {product.reviews?.length} ratings {'>'}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 3. Stock & MOQ Card */}
//         <View style={productStyle.stockInfoCard}>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
//           </View>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
//           </View>
//           {!cart.some((i: Product) => i.id === product.id) && (
//             <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
//           )}
//         </View>

//         {/* 4. Delivery & Warranty Section */}
//         <View style={productStyle.trustCard}>
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.shippingInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.warrantyInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="keyboard-return" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.returnPolicy}</Text>
//           </View>
//         </View>

//         {/* 5. Specifications */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Specifications</Text>
//           <View style={productStyle.specGrid}>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth || '0'}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Category</Text><Text style={productStyle.val}>{product.category}</Text></View>
//           </View>
//         </View>

//         {/* 6. Description Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Product Description</Text>
//           <Text style={productStyle.descText} numberOfLines={showFullDesc ? undefined : 2}>
//             {product.description}
//           </Text>
//           <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
//             <Text style={productStyle.readMoreBtn}>{showFullDesc ? "Read Less" : "Read More"}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.ScrollView>

//       {/* MODAL SECTION */}
//       <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//         <View style={productStyle.modalOverlay}>
//           <View style={productStyle.modalContent}>
//             <View style={productStyle.modalHeader}>
//               <View>
//                 <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
//                 <View style={productStyle.overallRatingRow}>
//                   <Text style={productStyle.overallRatingText}>{product.rating} ★</Text>
//                   <Text style={productStyle.veryGoodText}>Very Good</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Ionicons name="close" size={28} color="#212121" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={product.reviews}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               renderItem={renderReviewItem}
//               contentContainerStyle={productStyle.modalListPadding}
//               snapToInterval={Dimensions.get('window').width * 0.82}
//               decelerationRate="fast"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* STICKY FOOTER */}
//       <View style={productStyle.stickyAction}>
//         <TouchableOpacity style={productStyle.wishBtn} onPress={handleWishlistToggle}>
//           <Text style={productStyle.wishBtnText}>WISHLIST</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }]} 
//           disabled={product.stock === 0}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={20} color="white" />
//           <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ PREMIUM STICKY ADD TO BAG STRIP PANEL */}
//       <Animated.View style={stickyStyle}>
//         <View>
//           <Text numberOfLines={1} style={{ fontSize: 11, color: '#9496a2', fontFamily: BaseFonts.bold, maxWidth: 150 }}>{product.title}</Text>
//           <Text style={{ fontSize: 16, fontFamily: BaseFonts.bold, color: '#111827' }}>₹{Math.round(product.price * 80)}</Text>
//         </View>
//         <TouchableOpacity 
//           style={{ backgroundColor: '#ff3f6c', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 8 }}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={16} color="white" style={{ marginRight: 6 }} />
//           <Text style={{ color: 'white', fontFamily: BaseFonts.bold, fontSize: 13 }}>ADD TO BAG</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// 4 code
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, ScrollView } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// // Custom Imports
// import { getProducts } from '../../../src/api/productService';
// import { productStyle } from '../../../assets/styles/productStyle'; 
// import Header from '../../../src/components/common/Header';
// import { BaseFonts } from '../../../src/constants/BaseFonts';

// // ── REDUX SYSTEM HOOKS & ACTIONS PACKAGES ──
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../../src/store/store';
// import { addToCart, toggleFavorite } from '../../../src/store/slices/cartSlice';

// // ── REANIMATED SYSTEM MATRIX ──
// import Animated, { 
//   useSharedValue, 
//   useAnimatedStyle, 
//   withTiming, 
//   useAnimatedScrollHandler, 
//   withSpring,
//   FadeInDown
// } from 'react-native-reanimated';

// type ProductReview = {
//   rating: number;
//   comment: string;
//   reviewerName: string;
// };

// type Product = {
//   id: number;
//   title: string;
//   brand?: string;
//   price: number;
//   discountPercentage?: number;
//   rating: number;
//   stock: number;
//   thumbnail?: string;
//   images?: string[];
//   description?: string;
//   category?: string;
//   minimumOrderQuantity?: number;
//   shippingInformation?: string;
//   warrantyInformation?: string;
//   returnPolicy?: string;
//   weight?: number;
//   sku?: string;
//   dimensions?: {
//     width?: number | string;
//     height?: number | string;
//     depth?: number | string;
//   };
//   reviews?: ProductReview[];
// };

// export default function ProductDetails() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // ── REDUX CENTRAL SUBSCRIPTIONS ──
//   const favorites = useSelector((state: RootState) => state.shop.favorites);
//   const cart = useSelector((state: RootState) => state.shop.cart);
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showFullDesc, setShowFullDesc] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(1);

//   // ── ANIMATION SHARED VALUES ──
//   const scrollY = useSharedValue(0);
//   const favScale = useSharedValue(1);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.offsetY;
//     },
//   });

//   const stickyStyle = useAnimatedStyle(() => {
//     const shouldShow = scrollY.value > 300;
//     return {
//       transform: [{ translateY: withTiming(shouldShow ? 0 : 120, { duration: 200 }) }],
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       backgroundColor: '#FFFFFF',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       borderTopWidth: 1,
//       borderColor: '#EBEBEB',
//       elevation: 20,
//       shadowColor: '#000',
//       shadowOpacity: 0.15,
//       shadowRadius: 5,
//       zIndex: 999,
//     };
//   });

//   // Fav Circle Animation Style
//   const favAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: favScale.value }],
//     };
//   });

//   // ✅ LOGIC SAFE: Purely wrapping original behavior with Spring Pop
//   const handleWishlistToggle = () => {
//     if (product) {
//       favScale.value = 0.8;
//       favScale.value = withSpring(1.3, { damping: 4, stiffness: 150 }, () => {
//         favScale.value = withSpring(1);
//       });
//       dispatch(toggleFavorite(product)); 
//     }
//   };

//   // ✅ LOGIC SAFE: Exact original flow untouched
//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart(product)); 
//       router.navigate('/cart');    
//     }
//   };

//   const handleHorizontalScroll = (event: any) => {
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const viewSize = event.nativeEvent.layoutMeasurement.width;
//     const index = Math.floor(contentOffset / viewSize) + 1;
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       const data = await getProducts();
//       const selected = data.find((p: Product) => p.id.toString() === String(id));
//       setProduct(selected ?? null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  
//   if (!product) return (
//     <View style={productStyle.errorContainer}>
//       <View style={productStyle.content}>
//         <View style={productStyle.logoBox}>
//           <Image 
//             source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} 
//             style={productStyle.logoImage} 
//           />
//         </View>
//         <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
//         <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
//         <TouchableOpacity style={productStyle.retryBtn} onPress={() => router.replace('/')}>
//           <Text style={productStyle.retryText}>GO TO HOME</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const isFavorite = favorites.some((p: Product) => p.id === product.id);

//   const renderReviewItem = ({ item }: { item: ProductReview }) => (
//     <View style={productStyle.modalReviewCard}>
//       <View style={productStyle.modalRevHeader}>
//         <View style={[productStyle.ratingBadgeSmall, { backgroundColor: item.rating >= 3 ? '#388E3C' : '#FF6161' }]}>
//           <Text style={productStyle.ratingTextSmall}>{item.rating} ★</Text>
//         </View>
//         <Text style={productStyle.modalRevTitle}>{item.rating >= 4 ? 'Excellent' : 'Good'}</Text>
//       </View>
//       <Text style={productStyle.modalComment} numberOfLines={3}>{item.comment}</Text>
//       <View style={productStyle.modalUserInfo}>
//         <Text style={productStyle.modalUserName}>{item.reviewerName}</Text>
//         <View style={verifiedRow}>
//           <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
//           <Text style={productStyle.verifiedText}>Verified Buyer</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
//       <Header title="Products" showBack={true}/>
      
//       <Animated.ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={[productStyle.scrollContent, { paddingBottom: 90 }]}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//       >
//         {/* 1. Header Image Carousel Section */}
//         <View style={productStyle.imageCard}>
//           <ScrollView 
//             horizontal 
//             pagingEnabled 
//             showsHorizontalScrollIndicator={false}
//             style={productStyle.carousel}
//             onMomentumScrollEnd={handleHorizontalScroll}
//             scrollEventThrottle={16}
//           >
//             {product.images && product.images.length > 0 ? (
//               product.images.map((img: string, index: number) => (
//                 <Image key={index} source={{ uri: img }} style={productStyle.carouselImage} />
//               ))
//             ) : (
//               <Image source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} style={productStyle.carouselImage} />
//             )}
//           </ScrollView>

//           {/* ✅ UI UPGRADE: Animated Heart Bounce */}
//           <TouchableOpacity activeOpacity={0.9} style={productStyle.favCircle} onPress={handleWishlistToggle}>
//             <Animated.View style={favAnimatedStyle}>
//               <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
//             </Animated.View>
//           </TouchableOpacity>

//           {product.images && product.images.length > 1 && (
//             <View style={productStyle.imageBadge}>
//               <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
//             </View>
//           )}
//         </View>

//         {/* 2. Main Pricing Card with Smooth Entry */}
//         <Animated.View entering={FadeInDown.duration(400).delay(100)} style={productStyle.card}>
//           <Text style={productStyle.brandTag}>{product.brand?.toUpperCase()}</Text>
//           <Text style={productStyle.mainTitle}>{product.title}</Text>
          
//           <View style={productStyle.priceRow}>
//             <Text style={productStyle.currentPrice}>₹{Math.round(product.price * 80)}</Text>
//             <Text style={productStyle.strikePrice}>₹{Math.round(product.price * 1.2 * 80)}</Text>
//             <Text style={productStyle.discountTag}>{product.discountPercentage}% OFF</Text>
//           </View>
          
//           <TouchableOpacity style={productStyle.ratingTriggerBtn} onPress={() => setModalVisible(true)}>
//             <View style={productStyle.ratingBadgeSmall}>
//               <Text style={productStyle.ratingTextSmall}>{product.rating}</Text>
//               <MaterialCommunityIcons name="star" size={12} color="white" />
//             </View>
//             <Text style={productStyle.reviewLinkText}>|  {product.reviews?.length} ratings {'>'}</Text>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* 3. Stock & MOQ Card */}
//         <Animated.View entering={FadeInDown.duration(400).delay(200)} style={productStyle.stockInfoCard}>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
//           </View>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
//           </View>
//           {!cart.some((i: Product) => i.id === product.id) && (
//             <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
//           )}
//         </Animated.View>

//         {/* 4. Delivery & Warranty Section */}
//         <Animated.View entering={FadeInDown.duration(400).delay(300)} style={productStyle.trustCard}>
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.shippingInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.warrantyInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="keyboard-return" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.returnPolicy}</Text>
//           </View>
//         </Animated.View>

//         {/* 5. Specifications */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Specifications</Text>
//           <View style={productStyle.specGrid}>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth || '0'}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Category</Text><Text style={productStyle.val}>{product.category}</Text></View>
//           </View>
//         </View>

//         {/* 6. Description Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Product Description</Text>
//           <Text style={productStyle.descText} numberOfLines={showFullDesc ? undefined : 2}>
//             {product.description}
//           </Text>
//           <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
//             <Text style={productStyle.readMoreBtn}>{showFullDesc ? "Read Less" : "Read More"}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.ScrollView>

//       {/* MODAL SECTION */}
//       <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//         <View style={productStyle.modalOverlay}>
//           <View style={productStyle.modalContent}>
//             <View style={productStyle.modalHeader}>
//               <View>
//                 <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
//                 <View style={productStyle.overallRatingRow}>
//                   <Text style={productStyle.overallRatingText}>{product.rating} ★</Text>
//                   <Text style={productStyle.veryGoodText}>Very Good</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Ionicons name="close" size={28} color="#212121" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={product.reviews}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               renderItem={renderReviewItem}
//               contentContainerStyle={productStyle.modalListPadding}
//               snapToInterval={Dimensions.get('window').width * 0.82}
//               decelerationRate="fast"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* FIXED FOOTER BUTTONS: Enhanced UI layout mapping */}
//       <View style={[productStyle.stickyAction, { borderTopWidth: 1, borderColor: '#F0F0F0', height: 70, backgroundColor: '#FFF' }]}>
//         <TouchableOpacity 
//           style={[productStyle.wishBtn, { flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]} 
//           onPress={handleWishlistToggle}
//         >
//           <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={18} color={isFavorite ? "#ff3f6c" : "#282c3f"} style={{ marginRight: 6 }} />
//           <Text style={[productStyle.wishBtnText, { color: isFavorite ? "#ff3f6c" : "#282c3f", fontFamily: BaseFonts.bold }]}>WISHLIST</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }, { flex: 1.3, borderRadius: 4, height: 48, justifyContent: 'center' }]} 
//           disabled={product.stock === 0}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={20} color="white" style={{ marginRight: 6 }} />
//           <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ PREMIUM STICKY ADD TO BAG STRIP PANEL */}
//       <Animated.View style={stickyStyle}>
//         <View>
//           <Text numberOfLines={1} style={{ fontSize: 11, color: '#9496a2', fontFamily: BaseFonts.bold, maxWidth: 150 }}>{product.title}</Text>
//           <Text style={{ fontSize: 16, fontFamily: BaseFonts.bold, color: '#111827' }}>₹{Math.round(product.price * 80)}</Text>
//         </View>
//         <TouchableOpacity 
//           style={{ backgroundColor: '#ff3f6c', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 8 }}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={16} color="white" style={{ marginRight: 6 }} />
//           <Text style={{ color: 'white', fontFamily: BaseFonts.bold, fontSize: 13 }}>ADD TO BAG</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

//5 code 
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions, ScrollView } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// // Custom Imports
// import { getProducts } from '../../../src/api/productService';
// import { productStyle } from '../../../assets/styles/productStyle'; 
// import Header from '../../../src/components/common/Header';
// import { BaseFonts } from '../../../src/constants/BaseFonts';

// // ── REDUX SYSTEM HOOKS & ACTIONS PACKAGES ──
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../../src/store/store';
// import { addToCart, toggleFavorite } from '../../../src/store/slices/cartSlice';

// // ── REANIMATED SYSTEM MATRIX ──
// import Animated, { 
//   useSharedValue, 
//   useAnimatedStyle, 
//   withTiming, 
//   useAnimatedScrollHandler, 
//   withSpring,
//   FadeInDown
// } from 'react-native-reanimated';

// type ProductReview = {
//   rating: number;
//   comment: string;
//   reviewerName: string;
// };

// type Product = {
//   id: number;
//   title: string;
//   brand?: string;
//   price: number;
//   discountPercentage?: number;
//   rating: number;
//   stock: number;
//   thumbnail?: string;
//   images?: string[];
//   description?: string;
//   category?: string;
//   minimumOrderQuantity?: number;
//   shippingInformation?: string;
//   warrantyInformation?: string;
//   returnPolicy?: string;
//   weight?: number;
//   sku?: string;
//   dimensions?: {
//     width?: number | string;
//     height?: number | string;
//     depth?: number | string;
//   };
//   reviews?: ProductReview[];
// };

// export default function ProductDetails() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // ── REDUX CENTRAL SUBSCRIPTIONS ──
//   const favorites = useSelector((state: RootState) => state.shop.favorites);
//   const cart = useSelector((state: RootState) => state.shop.cart);
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showFullDesc, setShowFullDesc] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(1);

//   // ── ANIMATION SHARED VALUES ──
//   const scrollY = useSharedValue(0);
//   const favScale = useSharedValue(1);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.contentOffset.y;
//     },
//   });

//   // ✅ FIXED STICKY STYLE: Duno buttons (Wishlist & Cart) ek saath seamless strip me transition karenge
//   const stickyStyle = useAnimatedStyle(() => {
//     const shouldShow = scrollY.value > 300;
//     return {
//       transform: [{ translateY: withTiming(shouldShow ? 0 : 120, { duration: 200 }) }],
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       backgroundColor: '#FFFFFF',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: 12,
//       paddingVertical: 10,
//       borderTopWidth: 1,
//       borderColor: '#EBEBEB',
//       elevation: 25,
//       shadowColor: '#000',
//       shadowOpacity: 0.15,
//       shadowRadius: 5,
//       zIndex: 999,
//     };
//   });

//   const favAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: favScale.value }],
//     };
//   });

//   const handleWishlistToggle = () => {
//     if (product) {
//       favScale.value = 0.8;
//       favScale.value = withSpring(1.3, { damping: 4, stiffness: 150 }, () => {
//         favScale.value = withSpring(1);
//       });
//       dispatch(toggleFavorite(product)); 
//     }
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart(product)); 
//       router.navigate('/cart');    
//     }
//   };

//   const handleHorizontalScroll = (event: any) => {
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const viewSize = event.nativeEvent.layoutMeasurement.width;
//     const index = Math.floor(contentOffset / viewSize) + 1;
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       const data = await getProducts();
//       const selected = data.find((p: Product) => p.id.toString() === String(id));
//       setProduct(selected ?? null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  
//   if (!product) return (
//     <View style={productStyle.errorContainer}>
//       <View style={productStyle.content}>
//         <View style={productStyle.logoBox}>
//           <Image 
//             source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} 
//             style={productStyle.logoImage} 
//           />
//         </View>
//         <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
//         <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
//         <TouchableOpacity style={productStyle.retryBtn} onPress={() => router.replace('/')}>
//           <Text style={productStyle.retryText}>GO TO HOME</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const isFavorite = favorites.some((p: Product) => p.id === product.id);

//   const renderReviewItem = ({ item }: { item: ProductReview }) => (
//     <View style={productStyle.modalReviewCard}>
//       <View style={productStyle.modalRevHeader}>
//         <View style={[productStyle.ratingBadgeSmall, { backgroundColor: item.rating >= 3 ? '#388E3C' : '#FF6161' }]}>
//           <Text style={productStyle.ratingTextSmall}>{item.rating} ★</Text>
//         </View>
//         <Text style={productStyle.modalRevTitle}>{item.rating >= 4 ? 'Excellent' : 'Good'}</Text>
//       </View>
//       <Text style={productStyle.modalComment} numberOfLines={3}>{item.comment}</Text>
//       <View style={productStyle.modalUserInfo}>
//         <Text style={productStyle.modalUserName}>{item.reviewerName}</Text>
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
//           <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
//           <Text style={productStyle.verifiedText}>Verified Buyer</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
//       <Header title="Products" showBack={true}/>
      
//       <Animated.ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={[productStyle.scrollContent, { paddingBottom: 95 }]}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//       >
//         {/* 1. Header Image Carousel Section */}
//         <View style={productStyle.imageCard}>
//           <ScrollView 
//             horizontal 
//             pagingEnabled 
//             showsHorizontalScrollIndicator={false}
//             style={productStyle.carousel}
//             onMomentumScrollEnd={handleHorizontalScroll}
//             scrollEventThrottle={16}
//           >
//             {product.images && product.images.length > 0 ? (
//               product.images.map((img: string, index: number) => (
//                 <Image key={index} source={{ uri: img }} style={productStyle.carouselImage} />
//               ))
//             ) : (
//               <Image source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} style={productStyle.carouselImage} />
//             )}
//           </ScrollView>

//           <TouchableOpacity activeOpacity={0.9} style={productStyle.favCircle} onPress={handleWishlistToggle}>
//             <Animated.View style={favAnimatedStyle}>
//               <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
//             </Animated.View>
//           </TouchableOpacity>

//           {product.images && product.images.length > 1 && (
//             <View style={productStyle.imageBadge}>
//               <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
//             </View>
//           )}
//         </View>

//         {/* 2. Main Pricing Card */}
//         <Animated.View entering={FadeInDown.duration(400).delay(100)} style={productStyle.card}>
//           <Text style={productStyle.brandTag}>{product.brand?.toUpperCase()}</Text>
//           <Text style={productStyle.mainTitle}>{product.title}</Text>
          
//           <View style={productStyle.priceRow}>
//             <Text style={productStyle.currentPrice}>₹{Math.round(product.price * 80)}</Text>
//             <Text style={productStyle.strikePrice}>₹{Math.round(product.price * 1.2 * 80)}</Text>
//             <Text style={productStyle.discountTag}>{product.discountPercentage}% OFF</Text>
//           </View>
          
//           <TouchableOpacity style={productStyle.ratingTriggerBtn} onPress={() => setModalVisible(true)}>
//             <View style={productStyle.ratingBadgeSmall}>
//               <Text style={productStyle.ratingTextSmall}>{product.rating}</Text>
//               <MaterialCommunityIcons name="star" size={12} color="white" />
//             </View>
//             <Text style={productStyle.reviewLinkText}>|  {product.reviews?.length} ratings {'>'}</Text>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* 3. Stock & MOQ Card */}
//         <Animated.View entering={FadeInDown.duration(400).delay(200)} style={productStyle.stockInfoCard}>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
//           </View>
//           <View style={productStyle.infoRow}>
//             <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
//             <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
//           </View>
//           {!cart.some((i: Product) => i.id === product.id) && (
//             <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
//           )}
//         </Animated.View>

//         {/* 4. Delivery & Warranty Section */}
//         <Animated.View entering={FadeInDown.duration(400).delay(300)} style={productStyle.trustCard}>
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.shippingInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="shield-check-outline" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.warrantyInformation}</Text>
//           </View>
//           <View style={productStyle.verticalDivider} />
//           <View style={productStyle.trustItem}>
//             <MaterialCommunityIcons name="keyboard-return" size={24} color="#2874F0" />
//             <Text style={productStyle.trustLabel}>{product.returnPolicy}</Text>
//           </View>
//         </Animated.View>

//         {/* 5. Specifications */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Specifications</Text>
//           <View style={productStyle.specGrid}>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth || '0'}</Text></View>
//             <View style={productStyle.specBox}><Text style={productStyle.label}>Category</Text><Text style={productStyle.val}>{product.category}</Text></View>
//           </View>
//         </View>

//         {/* 6. Description Card */}
//         <View style={productStyle.card}>
//           <Text style={productStyle.sectionHeader}>Product Description</Text>
//           <Text style={productStyle.descText} numberOfLines={showFullDesc ? undefined : 2}>
//             {product.description}
//           </Text>
//           <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
//             <Text style={productStyle.readMoreBtn}>{showFullDesc ? "Read Less" : "Read More"}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.ScrollView>

//       {/* MODAL SECTION */}
//       <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//         <View style={productStyle.modalOverlay}>
//           <View style={productStyle.modalContent}>
//             <View style={productStyle.modalHeader}>
//               <View>
//                 <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
//                 <View style={productStyle.overallRatingRow}>
//                   <Text style={productStyle.overallRatingText}>{product.rating} ★</Text>
//                   <Text style={productStyle.veryGoodText}>Very Good</Text>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Ionicons name="close" size={28} color="#212121" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={product.reviews}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               renderItem={renderReviewItem}
//               contentContainerStyle={productStyle.modalListPadding}
//               snapToInterval={Dimensions.get('window').width * 0.82}
//               decelerationRate="fast"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* STANDARD STATIC FOOTER BUTTONS */}
//       <View style={[productStyle.stickyAction, { borderTopWidth: 1, borderColor: '#F0F0F0', height: 70, backgroundColor: '#FFF' }]}>
//         <TouchableOpacity 
//           style={[productStyle.wishBtn, { flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]} 
//           onPress={handleWishlistToggle}
//         >
//           <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={18} color={isFavorite ? "#ff3f6c" : "#282c3f"} style={{ marginRight: 6 }} />
//           <Text style={[productStyle.wishBtnText, { color: isFavorite ? "#ff3f6c" : "#282c3f", fontFamily: BaseFonts.bold }]}>WISHLIST</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }, { flex: 1.3, borderRadius: 4, height: 48, justifyContent: 'center' }]} 
//           disabled={product.stock === 0}
//           onPress={handleAddToCart}
//         >
//           <MaterialCommunityIcons name="shopping-outline" size={20} color="white" style={{ marginRight: 6 }} />
//           <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ✅ FIXED STICKY ACTION PANEL: Ab isme Title, Price aur DONO Action Buttons ek sath aayenge */}
//       <Animated.View style={stickyStyle}>
//         <View style={{ flex: 1, paddingRight: 8 }}>
//           <Text numberOfLines={1} style={{ fontSize: 12, color: '#282c3f', fontFamily: BaseFonts.semiBold }}>{product.title}</Text>
//           <Text style={{ fontSize: 14, fontFamily: BaseFonts.bold, color: '#ff3f6c', marginTop: 1 }}>₹{Math.round(product.price * 80)}</Text>
//         </View>
        
//         <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1.4, justifyContent: 'end' }}>
//           {/* Quick Wishlist Icon Button */}
//           <TouchableOpacity 
//             style={{ padding: 10, borderWidth: 1, borderColor: '#d4d5d9', borderRadius: 6, marginRight: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}
//             onPress={handleWishlistToggle}
//           >
//             <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={isFavorite ? "#ff3f6c" : "#282c3f"} />
//           </TouchableOpacity>

//           {/* Quick Add To Bag Button */}
//           <TouchableOpacity 
//             style={{ backgroundColor: '#282c3f', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 6, flex: 1, justifyContent: 'center' }}
//             disabled={product.stock === 0}
//             onPress={handleAddToCart}
//           >
//             <MaterialCommunityIcons name="shopping-outline" size={15} color="white" style={{ marginRight: 4 }} />
//             <Text style={{ color: 'white', fontFamily: BaseFonts.bold, fontSize: 11 }}>{product.stock === 0 ? "OUT" : "BUY NOW"}</Text>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     </View>
//   );
// }