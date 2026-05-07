import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, View, Text, TextInput, FlatList, 
  TouchableOpacity, ActivityIndicator, Image, Dimensions, ScrollView, 
  Modal
} from 'react-native';
import { getCategoryList, getProductsByCategory, getPaginatedProducts, getPaginatedCategoryProducts, getProducts } from '../src/api/productService';
import ProductCard from '../src/components/ProductCard';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import {  Ionicons } from '@expo/vector-icons';
import { BaseFonts } from '../src/constants/BaseFonts';

const { width } = Dimensions.get('window');

export default function Home() {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();
  const [categories, setCategories] = useState(['All']); // 'All' default rahega
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
const [isSorting, setIsSorting] = useState(false); // Feedback ke liye

  
  // const initHome = async () => {
    //   setLoading(true);
    //   const [catList, productList] = await Promise.all([
  //     getCategoryList(),
  //     getProducts() // By default saare products
  //   ]);
  //   setCategories(['All', ...catList]); // 'All' ko top par rakha
  //   setProducts(productList);
  //   setLoading(false);
  // };
  
  useEffect(() => {
    initHome();
    // loadData();
  }, []);

  // const initHome = async () => {
  //   setLoading(true);
  //   const catList = await getCategoryList();
  //   console.log("My Categories Data:", catList);
  //   setCategories(['All', ...catList]);
    
  //   // Sirf pehle 10 products load karein
  //   const data = await getPaginatedProducts(LIMIT, 0);
  //   setProducts(data);
  //   setSkip(LIMIT); // Agla batch 10 se shuru hoga
  //   setLoading(false);
  // };

  const initHome = async () => {
  try {
    setLoading(true);
    const catList = await getCategoryList();
    console.log("My Categories Data:", catList);

    // --- YE HAI ASLI FIX ---
    // Pehle check karo ki catList sahi mein ek Array (list) hai ya nahi
    if (catList && Array.isArray(catList)) {
      setCategories(['All', ...catList]);
    } else {
      // Agar API ne limit exceeded wala message bheja hai, toh sirf 'All' dikhao
      console.warn("Bhai, API limit exceed ho gayi hai, default use kar raha hoon.");
      setCategories(['All']); 
    }

    // Baaki ka code (Products load karne ke liye)
    const data = await getPaginatedProducts(LIMIT, 0);
    // ... rest of your code
    
  } catch (error) {
    console.error("Home Init Error:", error);
    setCategories(['All']); // Error aane par bhi app crash nahi hogi
  } finally {
    setLoading(false);
  }
};

  const handleCategoryPress = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setSelectedSort('Default');
    setSelectedIcon('swap-vertical-outline');
      // const data = await getProducts();
      // setProducts(data);
      setSkip(0); // Reset skip for All
    setHasMore(true);

    let data = [];

    if (category === 'All') {
     data = await getPaginatedProducts(LIMIT, 0);
   

    } else {
       data = await getPaginatedCategoryProducts(category, LIMIT, 0);
      console.log(`This Data is from ${category} : `, data)
    }
    setProducts(data);
    setSkip(LIMIT); 
    setLoading(false);
  };

  // const loadMoreProducts = async () => {
  //   // Agar category 'All' nahi hai, ya load ho raha hai, ya data khatam ho gaya toh ruk jao
  //   if (selectedCategory !== 'All' || isFetchingMore || !hasMore) return;

  //   setIsFetchingMore(true);
  //   const newData = await getPaginatedProducts(LIMIT, skip);

  //   if (newData.length > 0) {
  //     setProducts(prev => [...prev, ...newData]);
  //     setSkip(prev => prev + LIMIT);
  //   } else {
  //     setHasMore(false);
  //   }
  //   setIsFetchingMore(false);
  // };


  const loadMoreProducts = async () => {
  // 1. Check if we should fetch
  if (isFetchingMore || !hasMore) return;

  setIsFetchingMore(true);
  let newData = [];

  if (selectedCategory === 'All') {
    // Case: All Products
    newData = await getPaginatedProducts(LIMIT, skip);
  } else {
    // Case: Specific Category Products (New Logic)
    newData = await getPaginatedCategoryProducts(selectedCategory, LIMIT, skip);
  }

  if (newData.length > 0) {
    setProducts(prev => [...prev, ...newData]);
    setSkip(prev => prev + LIMIT);
  } else {
    setHasMore(false); // No more products in this category
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


//   useEffect(() => {

//     loadData();
// }, []);

  const loadData = async () => {
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
    setLoading(false);
  };

//   const renderHeader = () => (
//   <View style={{ backgroundColor: '#FFFFFF' }}>
//     {/* 1. Category Tabs (All, Beauty, etc.) */}
//     <ScrollView 
//       horizontal 
//       showsHorizontalScrollIndicator={false} 
//       style={styles.categoryTabScroll}
//     >
//       {categories.map((cat, index) => (
//         <TouchableOpacity 
//           key={index} 
//           style={[
//             styles.catTab, 
//             selectedCategory === cat && styles.activeCatTab
//           ]} 
//           onPress={() => handleCategoryPress(cat)}
//         >
//           <Text style={[
//             styles.catTabText, 
//             selectedCategory === cat && styles.activeCatTabText
//           ]}>
//             {cat.toUpperCase()}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>

//     {/* Yahan aap baad mein Carousel (Banner) add kar sakte hain */}
//     <Text style={styles.sectionTitle}>
//       Showing {selectedCategory} Products
//     </Text>
//   </View>
// );

const handleSort = (type, label, iconName) => {
  setIsSorting(true);
  setIsSortVisible(false);
  setSelectedSort(label);
  setSelectedIcon(iconName);
  // Sorting logic ko delay de rahe hain taaki "Feeling" aaye ki process ho raha hai
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
      default:
        // Default logic (e.g., reset to original fetch order)
        break;
    }

    setProducts(sortedData);
    setIsSorting(false);
  }, 500); // 0.5 sec ka fake loader
};
  // if (loading) return <ActivityIndicator size="large" color="#ff3f6c" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* Premium Sticky Header */}
      <Header title="ZWIGATO" showBack={false} />

       <View style={{ backgroundColor: '#FFFFFF' }}>
    {/* 1. Category Tabs (All, Beauty, etc.) */}
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.categoryTabScroll}
      contentContainerStyle={styles.catListContainer}
    >
      {categories.map((cat, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.catTab, 
            selectedCategory === cat && styles.activeCatTab
          ]} 
          onPress={() => handleCategoryPress(cat)}
        >
          <Text style={[
            styles.catTabText, 
            selectedCategory === cat && styles.activeCatTabText
          ]}>
            {cat.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

 <View style={styles.headerRow}>
    <Text style={styles.sectionTitle}>
      Showing {selectedCategory} Products
    </Text>
{isSorting && (
        <ActivityIndicator size="small" color="#ff3f6c" style={{ marginLeft: 5 }} />
      )}
    <View style={styles.rightHeaderAction}>
      <TouchableOpacity 
        style={styles.sortButtonSmall} 
        onPress={() => setIsSortVisible(true)}
      >
        <Ionicons 
      name={selectedIcon} 
      size={16} 
      color={selectedSort === 'Default' ? "#ff3f6c" : "#ff3f6c"} 
    />
        <Text style={styles.sortTextSmall}>
          {selectedSort === 'Default' ? 'SORT' : selectedSort}
        </Text>
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
        // ListHeaderComponent={renderHeader}
        // --- EMPTY STATE HANDLING ---
  ListEmptyComponent={
    !loading && (
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Ionicons name="search-outline" size={50} color="#ccc" />
        <Text style={{ color: '#878787', marginTop: 10 }}>No Products Found!</Text>
      </View>
    )
  }
        keyExtractor={(item, index) => item.id.toString() + index }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => router.push(`/details/${item.id}`)} 
          />
        )}
        onEndReached={loadMoreProducts} 
        onEndReachedThreshold={0.1} 
        ListFooterComponent={renderFooter}
        // Performance Props
  removeClippedSubviews={true} 
  initialNumToRender={10}
  maxToRenderPerBatch={10}
      />
    )}

    {/* Sort Bottom Sheet */}
<Modal
  visible={isSortVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsSortVisible(false)}
>
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
        <TouchableOpacity 
          key={item.type} 
          style={styles.sortOption} 
          onPress={() => handleSort(item.type, item.label, item.icon )}
        >
          {/* <Text style={[
            styles.optionText, 
            selectedSort === item.label && styles.selectedOptionText
          ]}>{item.label}</Text> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Dynamic Icon Based on Type */}
      <Ionicons 
        name={item.icon} 
        size={20} 
        color={selectedSort === item.label ? "#ff3f6c" : "#282c3f"} 
        style={{ marginRight: 12 }} 
      />
      <Text style={[
        styles.optionText, 
        selectedSort === item.label && styles.selectedOptionText
      ]}>
        {item.label}
      </Text>
    </View>
          {selectedSort === item.label && (
            <Ionicons name="checkmark-circle" size={20} color="#ff3f6c" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  </View>
</Modal>
      {/* <View style={styles.stickyHeader}>
        <Text style={styles.logo}>ZWIGATO</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#878787" />
          <TextInput placeholder="Search for anything..." style={styles.searchInput} />
        </View>
      </View> */}

      {/* <FlatList
      ref={flatListRef}
        data={filteredProducts}
        numColumns={2}
        // ListHeaderComponent={renderHeader} // Keeps everything scrollable together
        keyExtractor={(item) => item.id.toString()}
        onScrollToIndexFailed={() => {}}  
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => router.push(`/details/${item.id}`)} />
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 5, },

  categoryTabScroll: {
    marginTop: 8,
    marginHorizontal: 6,
    // paddingVertical: 5,
    // paddingHorizontal: 30,
    // borderBottomWidth: 1,
    borderRadius: 5,
    // borderBottomColor: '#f0f0f0',
    //  backgroundColor: '#fa4616',
    backgroundColor: '#F3F3F3',
     borderWidth: 1,
  borderColor: '#E5E5E5',
  },

  catListContainer: {
    paddingVertical: 6,
    paddingHorizontal: 3, 
    alignItems: 'center',
  },

  catTab: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginHorizontal: 3,
    // backgroundColor: 'red',
    // marginHorizontal: 5,
    borderRadius: 5,
    // backgroundColor: '#fa4616'
  },

  activeCatTab: {
    // borderBottomWidth: 2,
    backgroundColor: '#ff3f6c',
    // borderBottomColor: '#ff3f6c', // Myntra Pink
  },

  catTabText: {
    fontSize: 12,
    fontFamily: BaseFonts.medium,
    color: '#878787',
  },

  activeCatTabText: {
    color: '#fff',
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: BaseFonts.semiBold,
    margin: 15,
    color: '#282c3f',
    textTransform: 'capitalize'
  },
  listContent: {
  paddingBottom: 50, // Activity indicator dekhne ke liye space
},

sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaec',
  },
  sortText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#282c3f', marginLeft: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 16, fontFamily: BaseFonts.medium, color: '#878787' },
  sortOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  optionText: { fontSize: 14, color: '#282c3f' },
  selectedOptionText: { color: '#ff3f6c', fontFamily: BaseFonts.medium, },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: BaseFonts.semiBold,
    color: '#282c3f',
    textTransform: 'capitalize',
    flex: 1, // Isse text left mein rahega aur button ko push karega
  },
  rightHeaderAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sortTextSmall: {
    fontSize: 11,
    fontFamily: BaseFonts.semiBold,
    color: '#ff3f6c',
    marginLeft: 4,
  },
});