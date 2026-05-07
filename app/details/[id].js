import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Custom Imports
import { useShop } from '../../src/context/ShopContext';
import { getProducts } from '../../src/api/productService';
import { productStyle } from '../../assets/styles/productStyle'; // External Style Import
import Header from '../../src/components/Header';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { toggleFavorite, favorites, cart } = useShop();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);


  const router = useRouter();
  const { addToCart } = useShop();

  const handleAddToCart = () => {
    addToCart(product); // Item context mein add hua
    router.navigate('/cart'); // Ab screen change hokar cart par chali gayi
  };

  const handleScroll = (event) => {
  const contentOffset = event.nativeEvent.contentOffset.x;
  const viewSize = event.nativeEvent.layoutMeasurement.width;
  const index = Math.floor(contentOffset / viewSize) + 1; // Current Page Number
  setCurrentIndex(index);
};

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const data = await getProducts();
      const selected = data.find(p => p.id.toString() === id);
      setProduct(selected);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={productStyle.loader} />;
  if (!product) return (
    <View style={productStyle.errorContainer}>
      {/* Background Gradient Effect (Using simple backgroundColor as fallback) */}
      <View style={productStyle.content}>
        
        {/* Myntra Logo Icon Placeholder */}
        <View style={productStyle.logoBox}>
          <Image 
            source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} // Replace with your local asset
            style={productStyle.logoImage} 
          />
        </View>

        <Text style={productStyle.sorryText}>Sorry, this page is temporarily unavailable.</Text>
        
        <Text style={productStyle.refreshText}>
          Please refresh the page or try after some time.
        </Text>

        <TouchableOpacity 
          style={productStyle.retryBtn} 
          onPress={() => router.replace('/')}
        >
          <Text style={productStyle.retryText}>GO TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const isFavorite = favorites.find(p => p.id === product.id);

  // Sub-Component: Horizontal Review Card
  const renderReviewItem = ({ item }) => (
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
        <View style={productStyle.verifiedRow}>
          <MaterialCommunityIcons name="check-decagram" size={14} color="#878787" />
          <Text style={productStyle.verifiedText}>Verified Buyer</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={productStyle.container}>
      <Header title="Products" showBack={true}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={productStyle.scrollContent}>
        
        {/* 1. Header Image
        <View style={productStyle.imageCard}>
          <Image source={{ uri: product.thumbnail }} style={productStyle.mainImage} />
          <TouchableOpacity style={productStyle.favCircle} onPress={() => toggleFavorite(product)}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ff3f6c" : "#757575"} />
          </TouchableOpacity>
        </View> */}

        {/* 1. Header Image Carousel */}
<View style={productStyle.imageCard}>
  <ScrollView 
    horizontal 
    pagingEnabled 
    showsHorizontalScrollIndicator={false}
    style={productStyle.carousel}
    onMomentumScrollEnd={handleScroll}
    scrollEventThrottle={16}
  >
    {product.images && product.images.length > 0 ? (
      product.images.map((img, index) => (
        <Image 
          key={index} 
          source={{ uri: img }} 
          style={productStyle.carouselImage} 
        />
      ))
    ) : (
      // Fallback if no images array: Show thumbnail or placeholder
      <Image 
        source={{ uri: product.thumbnail || 'https://via.placeholder.com/400' }} 
        style={productStyle.carouselImage} 
      />
    )}
  </ScrollView>

  {/* Favorite Button */}
  <TouchableOpacity 
    style={productStyle.favCircle} 
    onPress={() => toggleFavorite(product)}
  >
    <Ionicons 
      name={isFavorite ? "heart" : "heart-outline"} 
      size={24} 
      color={isFavorite ? "#ff3f6c" : "#757575"} 
    />
  </TouchableOpacity>

  {/* Image Counter Badge (Optional but looks pro) */}
  {product.images?.length > 1 && (
    <View style={productStyle.imageBadge}>
      <Text style={productStyle.badgeText}>{currentIndex}/{product.images.length}</Text>
    </View>
  )}
</View>

        {/* 2. Main Pricing Card */}
        <View style={productStyle.card}>
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
        </View>

        {/* 3. Stock & MOQ Card */}
        <View style={productStyle.stockInfoCard}>
          <View style={productStyle.infoRow}>
            <MaterialCommunityIcons name="package-variant" size={20} color="#878787" />
            <Text style={productStyle.infoLabel}>Stock: <Text style={productStyle.infoVal}>{product.stock}</Text></Text>
          </View>
          <View style={productStyle.infoRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#878787" />
            <Text style={productStyle.infoLabel}>MOQ: <Text style={productStyle.infoVal}>{product.minimumOrderQuantity} units</Text></Text>
          </View>
          {!cart.find(i => i.id === product.id) && (
            <Text style={productStyle.moqNote}>*Initial order requires minimum units.</Text>
          )}
        </View>

          {/* 4. Delivery & Warranty Section (Iconography) */}
             <View style={productStyle.trustCard}>
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
             </View>


        {/* 5. Specifications */}
        <View style={productStyle.card}>
          <Text style={productStyle.sectionHeader}>Specifications</Text>
          <View style={productStyle.specGrid}>
            <View style={productStyle.specBox}><Text style={productStyle.label}>Weight</Text><Text style={productStyle.val}>{product.weight} kg</Text></View>
            <View style={productStyle.specBox}><Text style={productStyle.label}>SKU</Text><Text style={productStyle.val}>{product.sku}</Text></View>
            <View style={productStyle.specBox}><Text style={productStyle.label}>Dimensions</Text><Text style={productStyle.val}>{product.dimensions?.width}x{product.dimensions?.height}</Text></View>
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
      </ScrollView>

      {/* MODAL SECTION */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={productStyle.modalOverlay}>
          <View style={productStyle.modalContent}>
            <View style={productStyle.modalHeader}>
              <View>
                <Text style={productStyle.modalMainTitle}>Ratings and reviews</Text>
                <Text style={productStyle.overallRatingText}>{product.rating} ★ <Text style={productStyle.veryGoodText}>Very Good</Text></Text>
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
              snapToInterval={Dimensions.get('window').width * 0.85}
              decelerationRate="fast"
            />
          </View>
        </View>
      </Modal>

      {/* STICKY FOOTER */}
      <View style={productStyle.stickyAction}>
        <TouchableOpacity style={productStyle.wishBtn} onPress={() => toggleFavorite(product)}>
          <Text style={productStyle.wishBtnText}>WISHLIST</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[productStyle.cartBtn, product.stock === 0 && { backgroundColor: '#CCC' }]} 
          disabled={product.stock === 0}
          // onPress={() => addToCart(product)}
          onPress={handleAddToCart}
        >
          <MaterialCommunityIcons name="shopping-outline" size={20} color="white" />
          <Text style={productStyle.cartBtnText}>{product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}