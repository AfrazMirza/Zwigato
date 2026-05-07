// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const ProductCard = ({ product, onPress }) => {
//   // Logic to calculate discount percentage display
//   const discount = Math.round(product.discountPercentage);

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Image source={{ uri: product.thumbnail }} style={styles.image} />
//       <View style={styles.info}>
//         <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
//         <View style={styles.ratingRow}>
//           <Text style={styles.ratingText}>{product.rating} ★</Text>
//         </View>
//         <View style={styles.priceRow}>
//           <Text style={styles.price}>${product.price}</Text>
//           <Text style={styles.discountText}>{discount}% off</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: { backgroundColor: '#fff', borderRadius: 8, margin: 8, width: '45%', elevation: 3, overflow: 'hidden' },
//   image: { width: '100%', height: 150, resizeMode: 'cover' },
//   info: { padding: 10 },
//   title: { fontSize: 14, fontWeight: '600' },
//   ratingRow: { backgroundColor: '#388e3c', alignSelf: 'flex-start', paddingHorizontal: 6, borderRadius: 4, marginVertical: 4 },
//   ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
//   priceRow: { flexDirection: 'row', alignItems: 'center' },
//   price: { fontSize: 16, fontWeight: 'bold' },
//   discountText: { marginLeft: 8, color: '#388e3c', fontSize: 12 }
// });

// export default ProductCard;

// import React from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Get screen width to make the card responsive
// const { width } = Dimensions.get('window');
// const CARD_WIDTH = width / 2 - 15; // 2 columns with spacing

// const ProductCard = ({ product, onPress }) => {
//   // Logic: Calculate if it's a "Top Rated" item (Rating > 4.5)
//   const isTopRated = product.rating >= 4.5;

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
//       {/* Product Image */}
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: product.thumbnail }} style={styles.image} />
//         {isTopRated && (
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>Bestseller</Text>
//           </View>
//         )}
//       </View>

//       {/* Product Details */}
//       <View style={styles.details}>
//         <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
//         <Text numberOfLines={1} style={styles.brand}>{product.brand}</Text>
        
//         <View style={styles.priceRow}>
//           <Text style={styles.price}>₹{Math.round(product.price * 80)}</Text>
//           <Text style={styles.discount}>{product.discountPercentage}% off</Text>
//         </View>

//         <View style={styles.ratingRow}>
//           <View style={styles.ratingBadge}>
//             <Text style={styles.ratingText}>{product.rating}</Text>
//             <MaterialCommunityIcons name="star" size={12} color="white" />
//           </View>
//           <Text style={styles.stockText}>
//             {product.stock < 10 ? `Only ${product.stock} left!` : 'In Stock'}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     width: CARD_WIDTH,
//     margin: 5,
//     borderRadius: 8,
//     // Shadow for iOS
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     // Elevation for Android (Flipkart style)
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   imageContainer: {
//     height: 180,
//     backgroundColor: '#f9f9f9',
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
//     backgroundColor: '#ff4d4d',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderTopRightRadius: 4,
//     borderBottomRightRadius: 4,
//   },
//   badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
//   details: { padding: 10 },
//   title: { fontSize: 14, fontWeight: '500', color: '#212121' },
//   brand: { fontSize: 12, color: '#878787', marginTop: 2 },
//   priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
//   price: { fontSize: 16, fontWeight: 'bold', color: '#212121' },
//   discount: { fontSize: 12, color: '#388e3c', marginLeft: 8, fontWeight: 'bold' },
//   ratingRow: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'space-between', 
//     marginTop: 8 
//   },
//   ratingBadge: {
//     flexDirection: 'row',
//     backgroundColor: '#388e3c',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginRight: 2 },
//   stockText: { fontSize: 10, color: '#ff6161', fontWeight: 'bold' },
// });

// export default ProductCard;

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cardStyles as styles } from '../../assets/styles/cardStyle'; // Import Styles

const ProductCard = ({ product, onPress }) => {
  const isTopRated = product.rating >= 4.5;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        {isTopRated && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Bestseller</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text numberOfLines={1} style={styles.brand}>{product.brand}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{Math.round(product.price * 80)}</Text>
          <Text style={styles.discount}>{product.discountPercentage}% off</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <MaterialCommunityIcons name="star" size={12} color="white" />
          </View>
          <Text style={styles.stockText}>
            {product.stock < 10 ? `Only ${product.stock} left!` : 'In Stock'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;