import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useShop } from '../src/context/ShopContext';
import Header from '../src/components/Header';
import { wishlistStyles as styles } from '../assets/styles/wishlistStyle';
import { useRouter } from 'expo-router';
import { BaseFonts } from '../src/constants/BaseFonts';

export default function WishlistScreen() {
  const { favorites, toggleFavorite, addToCart, removedItem, showSnackbar, undoRemoveFromWishlist } = useShop();
  const router = useRouter();
  const handleMoveToBag = (item) => {
    addToCart(item); // Bag mein add karo
    toggleFavorite(item); // Wishlist se remove karo
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
        <TouchableOpacity onPress={() =>  {console.log("clicked", item.id); router.navigate(`/details/${item.id}`);}}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        
        {/* Rating Overlay */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Ionicons name="star" size={10} color="#388E3C" />
          <Text style={styles.ratingText}> | {item.reviews?.length || 0}</Text>
        </View>

        {/* Remove Icon */}
        <TouchableOpacity 
          style={styles.removeBtn} 
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons name="trash-outline" size={16} color="#282c3f" />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.brand}>{item.brand}</Text>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{Math.round(item.price * 80)}</Text>
          <Text style={styles.mrp}>₹{Math.round(item.price * 1.5 * 80)}</Text>
          <Text style={styles.off}>(50% OFF)</Text>
        </View>
      </View>
      </TouchableOpacity>

      {/* Move to Bag Action */}
      <TouchableOpacity style={styles.moveBtn} onPress={() => handleMoveToBag(item)}>
        <Text style={styles.moveBtnText}>MOVE TO BAG</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Myntra Custom Header */}
      <Header title="Wishlist" showBack={true} ShowWishlist={false} />
      
      <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
        <Text style={{ fontFamily: BaseFonts.bold, fontSize: 14 }}>
          {favorites.length} Items
        </Text>
      </View>

      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
        //   <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
        //     <Ionicons name="heart-outline" size={80} color="#e0e0e0" />
        //     <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Your Wishlist is empty</Text>
        //   </View>
        <View style={styles.emptyContainer}>
        {/* <Header title="SHOPPING BAG" showBack={true} /> */}
        {/* <Ionicons name="cart-outline" size={100} color={COLORS.border} /> */}
        <Ionicons name="heart-outline" size={80} color="#e0e0e0" />
        <Text style={styles.emptyTitle}>Hey, it feels so light!</Text>
        <Text style={styles.emptySubtitle}>There is nothing in your wishlist. Let's add some items.</Text>
        <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/')}><Text style={styles.shopBtnText}>ADD ITEMS </Text></TouchableOpacity>
      </View>
        }
      />

      {/* SNACKBAR COMPONENT */}
      {showSnackbar && removedItem && (
        <View style={styles.snackbar}>
          <Text style={styles.snackbarText} numberOfLines={1}>
            Removed {removedItem.title}
          </Text>
          <TouchableOpacity onPress={undoRemoveFromWishlist}>
            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}