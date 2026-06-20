// import React, { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
// import { getProducts } from '../api/productService';
// import ProductCard from '../components/ProductCard';

// const ProductListing = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const router = useRouter();
//   const [categories, setCategories] = useState(['All']);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const data = await getProducts();
//     setProducts(data);
//     setFilteredProducts(data);
//     setLoading(false);
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#2874F0" style={{ flex: 1 }} />;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2} // Responsive grid layout
//         renderItem={({ item }) => (
//           <ProductCard product={item} onPress={() => console.log("Selected:", item.id)} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f1f3f6' }
// });

// export default ProductListing;

import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, View, Text, TextInput, FlatList, 
  TouchableOpacity, ActivityIndicator, Image, Dimensions, ScrollView, 
  Modal
} from 'react-native';
import { getCategoryList, getProductsByCategory, getPaginatedProducts, getPaginatedCategoryProducts, getProducts } from '../api/productService';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { BaseFonts } from '../constants/BaseFonts';

const { width } = Dimensions.get('window');

// Iska naam hamne ProductListing rakh diya hai
export default function ProductListing() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();
  const [categories, setCategories] = useState(['All']); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0); 
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Default');
  const [selectedIcon, setSelectedIcon] = useState('swap-vertical-outline');
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    initHome();
  }, []);

  const initHome = async () => {
    try {
      setLoading(true);
      const catList = await getCategoryList();
      if (catList && Array.isArray(catList)) {
        setCategories(['All', ...catList]);
      } else {
        setCategories(['All']); 
      }
      const data = await getPaginatedProducts(LIMIT, 0);
      if (data && Array.isArray(data)) {
        setProducts(data);
        setSkip(LIMIT);
        setHasMore(data.length === LIMIT);
      }
    } catch (error) {
      console.error("Home Init Error:", error);
      setCategories(['All']);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setSelectedSort('Default');
    setSelectedIcon('swap-vertical-outline');
    setSkip(0);
    setHasMore(true);

    let data = [];
    if (category === 'All') {
      data = await getPaginatedProducts(LIMIT, 0);
    } else {
      data = await getPaginatedCategoryProducts(category, LIMIT, 0);
    }
    setProducts(data);
    setSkip(LIMIT); 
    setLoading(false);
  };

  const loadMoreProducts = async () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    let newData = [];

    if (selectedCategory === 'All') {
      newData = await getPaginatedProducts(LIMIT, skip);
    } else {
      newData = await getPaginatedCategoryProducts(selectedCategory, LIMIT, skip);
    }

    if (newData.length > 0) {
      setProducts(prev => [...prev, ...newData]);
      setSkip(prev => prev + LIMIT);
    } else {
      setHasMore(false);
    }
    setIsFetchingMore(false);
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color="#ff3f6c" />
      </View>
    );
  };

  const handleSort = (type, label, iconName) => {
    setIsSorting(true);
    setIsSortVisible(false);
    setSelectedSort(label);
    setSelectedIcon(iconName);
    setTimeout(() => {
      let sortedData = [...products];
      switch (type) {
        case 'low-to-high':
          sortedData.sort((a, b) => a.price - b.price);
          break;
        case 'high-to-low':
          sortedData.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sortedData.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          sortedData.sort((a, b) => b.discountPercentage - a.discountPercentage);
          break;
      }
      setProducts(sortedData);
      setIsSorting(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Header title="ZWIGATO" showBack={false} />
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabScroll} contentContainerStyle={styles.catListContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.catTab, selectedCategory === cat && styles.activeCatTab]} onPress={() => handleCategoryPress(cat)}>
              <Text style={[styles.catTabText, selectedCategory === cat && styles.activeCatTabText]}>
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Showing {selectedCategory} Products</Text>
          {isSorting && <ActivityIndicator size="small" color="#ff3f6c" style={{ marginLeft: 5 }} />}
          <View style={styles.rightHeaderAction}>
            <TouchableOpacity style={styles.sortButtonSmall} onPress={() => setIsSortVisible(true)}>
              <Ionicons name={selectedIcon} size={16} color="#ff3f6c" />
              <Text style={styles.sortTextSmall}>{selectedSort === 'Default' ? 'SORT' : selectedSort}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff3f6c" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={!loading && (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Ionicons name="search-outline" size={50} color="#ccc" />
              <Text style={{ color: '#878787', marginTop: 10 }}>No Products Found!</Text>
            </View>
          )}
          keyExtractor={(item, index) => item.id.toString() + index}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => router.push(`/details/${item.id}`)} />
          )}
          onEndReached={loadMoreProducts} 
          onEndReachedThreshold={0.1} 
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true} 
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      )}

      <Modal visible={isSortVisible} animationType="slide" transparent={true} onRequestClose={() => setIsSortVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{flex: 1}} onPress={() => setIsSortVisible(false)} />
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>SORT BY</Text>
              <TouchableOpacity onPress={() => setIsSortVisible(false)}>
                <Ionicons name="close" size={24} color="#282c3f" />
              </TouchableOpacity>
            </View>
            {[
              { label: 'Price: Low to High', type: 'low-to-high', icon: 'trending-up-outline' },
              { label: 'Price: High to Low', type: 'high-to-low', icon: 'trending-down-outline' },
              { label: 'Customer Rating', type: 'rating', icon: 'star-outline' },
              { label: 'Discount', type: 'discount', icon: 'pricetag-outline' },
            ].map((item) => (
              <TouchableOpacity key={item.type} style={styles.sortOption} onPress={() => handleSort(item.type, item.label, item.icon)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={item.icon} size={20} color={selectedSort === item.label ? "#ff3f6c" : "#282c3f"} style={{ marginRight: 12 }} />
                  <Text style={[styles.optionText, selectedSort === item.label && styles.selectedOptionText]}>{item.label}</Text>
                </View>
                {selectedSort === item.label && <Ionicons name="checkmark-circle" size={20} color="#ff3f6c" />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 5 },
  categoryTabScroll: { marginTop: 8, marginHorizontal: 6, borderRadius: 5, backgroundColor: '#F3F3F3', borderWidth: 1, borderColor: '#E5E5E5' },
  catListContainer: { paddingVertical: 6, paddingHorizontal: 3, alignItems: 'center' },
  catTab: { paddingHorizontal: 6, paddingVertical: 6, marginHorizontal: 3, borderRadius: 5 },
  activeCatTab: { backgroundColor: '#ff3f6c' },
  catTabText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#878787' },
  activeCatTabText: { color: '#fff' },
  sectionTitle: { fontSize: 14, fontFamily: BaseFonts.semiBold, color: '#282c3f', textTransform: 'capitalize', flex: 1 },
  listContent: { paddingBottom: 50 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 16, fontFamily: BaseFonts.medium, color: '#878787' },
  sortOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  optionText: { fontSize: 14, color: '#282c3f' },
  selectedOptionText: { color: '#ff3f6c', fontFamily: BaseFonts.medium },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  sortButtonSmall: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', paddingHorizontal: 6, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#E5E5E5' },
  sortTextSmall: { fontSize: 11, fontFamily: BaseFonts.semiBold, color: '#ff3f6c', marginLeft: 4 }
});