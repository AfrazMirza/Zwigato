import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, View, Text, TextInput, FlatList,
  TouchableOpacity, ActivityIndicator, Image, Dimensions, ScrollView,
  Modal, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getPaginatedProducts,
  getPaginatedCategoryProducts
} from '../api/productService';
import ProductCard from '../components/modules/product/ProductCard';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BaseFonts } from '../constants/BaseFonts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { COLORS } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import SearchScreen from '../../app/search'; // 👈 Sahi relative path check kar lena bhai

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 220;
const LIMIT = 10;

// ─── TAB TYPES ────────────────────────────────────────────────────────────────
const MAIN_TABS = ['ALL', 'MEN', 'WOMEN', 'KIDS'] as const;
type TabType = typeof MAIN_TABS[number];

// ─── GRADIENT COLORS PER TAB (Perfect Balanced Muted & Premium Look) ───
const TAB_THEME: Record<TabType, { grad: [string, string]; accent: string; light: string }> = {
  ALL: { 
    grad: ['#FFCCBC', '#FFE0B2'],   
    accent: '#ff3f6c',             
    light: '#FDF2E9' 
  },
  MEN: { 
    grad: ['#D1C4E9', '#E1BEE7'],   
    accent: '#ff3f6c',             
    light: '#F3E5F5'
  },
  WOMEN: { 
    grad: ['#F8BBD0', '#F48FB1'],   
    accent: '#E91E8C',           
    light: '#FCE4EC' 
  },
  KIDS: { 
    grad: ['#FFF9C4', '#FFE082'],   
    accent: '#F5A623',             
    light: '#FFF8E1'
  },
};

// ─── SUB-CATEGORIES (Fixed with valid dummyjson category endpoints) ──────────
const SUB_CATEGORIES_MAP: Record<TabType, { name: string; apiCat: string }[]> = {
  ALL: [
    { name: 'Fashion',     apiCat: 'mens-shirts'    },
    { name: 'Beauty',      apiCat: 'beauty'         },
    { name: 'Footwear',    apiCat: 'mens-shoes'     },
    { name: 'Home Living', apiCat: 'furniture'      },
    { name: 'Accessories', apiCat: 'watches'        },
    { name: 'Mobiles',     apiCat: 'smartphones'    },
  ],
  MEN: [
    { name: 'Casual',      apiCat: 'mens-shirts'    },
    { name: 'Ethnic',      apiCat: 'mens-shirts'    },
    { name: 'Footwear',    apiCat: 'mens-shoes'     },
    { name: 'Sports',      apiCat: 'mens-shoes'     },
    { name: 'Essentials',  apiCat: 'mens-shirts'    },
    { name: 'Watches',     apiCat: 'watches'        }, // 👈 THE FIX: 'mens-watches' was invalid, changed to 'watches'
  ],
  WOMEN: [
    { name: 'Western',     apiCat: 'womens-dresses' },
    { name: 'Ethnic',      apiCat: 'womens-dresses' },
    { name: 'Fusion',      apiCat: 'tops'           },
    { name: 'Footwear',    apiCat: 'womens-shoes'   },
    { name: 'Beauty',      apiCat: 'beauty'         },
    { name: 'Bags',        apiCat: 'womens-bags'    },
  ],
  KIDS: [
    { name: 'Girls',       apiCat: 'tops'           },
    { name: 'Boys',        apiCat: 'tops'           },
    { name: 'Infants',     apiCat: 'tops'           },
    { name: 'Teens',       apiCat: 'tops'           },
    { name: 'Add-ons',     apiCat: 'womens-bags'    },
    { name: 'Toys',        apiCat: 'furniture'      },
  ],
};

// ─── SECONDARY PILLS ────────────────────────────────────────────────────────
const SUB_PILLS: Record<TabType, string[]> = {
  ALL:   ['Trending', 'New Arrivals', 'Offers', 'Top Brands'],
  MEN:   ['Topwear', 'Bottomwear', 'Activewear', 'Suits', 'Formals'],
  WOMEN: ['Kurtas', 'Tops & Tees', 'Jeans', 'Sarees', 'Lehengas'],
  KIDS:  ['0–6 Months', '6–24 Months', '2–4 Years', '4–6 Years', '6+ Years'],
};

export default function ProductListing({ showBack = false, ShowWishlist = true, ShowCart = true  }) {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.shop.cart);
  const favorites = useSelector((state: RootState) => state.shop.favorites);
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  const [currentSubCat, setCurrentSubCat] = useState<string>('Fashion');
  const [selectedPill, setSelectedPill] = useState<string>('Trending');

  const [subCatImages, setSubCatImages] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<FlatList>(null);

  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Default');
  const [selectedSortIcon, setSelectedSortIcon] = useState('swap-vertical-outline');
  const [isSorting, setIsSorting] = useState(false);

  const theme = TAB_THEME[activeTab];
  const subCatList = SUB_CATEGORIES_MAP[activeTab];
  const pillList = SUB_PILLS[activeTab];

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ── Fetch sub-category preview images ─────────────────────────────────────
  const fetchSubCatImages = async (catList: { name: string; apiCat: string }[]) => {
    const imageMap: Record<string, string> = {};
    await Promise.all(
      catList.map(async (item) => {
        try {
          const data = await getPaginatedCategoryProducts(item.apiCat, 1, 0);
          if (data?.[0]?.thumbnail) {
            imageMap[item.name] = data[0].thumbnail;
          }
        } catch (_) {}
      })
    );
    setSubCatImages(imageMap);
  };

  // ── Initial load on tab change ─────────────────────────────────────────────
  useEffect(() => {
    const firstSub = subCatList[0];
    setCurrentSubCat(firstSub.name);
    setSelectedPill(pillList[0]);
    fetchSubCatImages(subCatList);
    fetchInitialProducts(firstSub.name, firstSub.apiCat);
  }, [activeTab]);

  // ── Auto-scroll carousel ──────────────────────────────────────────────────
  // useEffect(() => {
  //   if (carouselItems.length <= 1) return;
  //   const timer = setInterval(() => {
  //     const next = (carouselIdx + 1) % carouselItems.length;
  //     setCarouselIdx(next);
  //     carouselRef.current?.scrollToIndex({ index: next, animated: true });
  //   }, 3500);
  //   return () => clearInterval(timer);
  // }, [carouselIdx, carouselItems]);

  // ─── CAROUSEL AUTO SCROLL TIMEOUT TRACKER ───
  useEffect(() => {
    if (carouselItems.length === 0) return;

    const timer = setInterval(() => {
      setCarouselIdx((prevIdx) => {
        const nextIdx = prevIdx === carouselItems.length - 1 ? 0 : prevIdx + 1;
        
        // Strictly trigger only when user is NOT manually dragging/holding
        try {
          carouselRef.current?.scrollToIndex({
            index: nextIdx,
            animated: true,
          });
        } catch (_) {}
        
        return nextIdx;
      });
    }, 4000); // 4 Seconds rotation delay

    return () => clearInterval(timer);
  }, [carouselItems]); // Sirf carousel items ke size par depend karega, carouselIdx par nahi!

  // ── Fetch products (Robust Slicing with Fallback) ─────────────────────────
  const fetchInitialProducts = async (subName: string, apiCat: string) => {
    setLoading(true);
    setSkip(0);
    setHasMore(true);
    setCarouselIdx(0);
    
    try {
      carouselRef.current?.scrollToOffset({ offset: 0, animated: false });
    } catch (_) {}
    
    setSelectedSort('Default');
    setSelectedSortIcon('swap-vertical-outline');

    try {
      let raw: any[] = [];
      if (activeTab === 'ALL' && subName === 'Fashion') {
        raw = await getPaginatedProducts(20, 0);
      } else {
        raw = await getPaginatedCategoryProducts(apiCat, 20, 0);
      }

      if (raw && raw.length > 0) {
        if (raw.length >= 10) {
          const bannerItems = raw.slice(0, 5); 
          const gridItems = raw.slice(5, 15);  

          setCarouselItems(bannerItems);
          setProducts(gridItems);
          setSkip(15);
          setHasMore(raw.length > 15);
        } else {
          const splitIndex = Math.min(3, Math.floor(raw.length / 2));
          const bannerItems = raw.slice(0, splitIndex > 0 ? splitIndex : 2);
          const gridItems = raw.slice(bannerItems.length);

          setCarouselItems(bannerItems);
          setProducts(gridItems);
          setSkip(raw.length);
          setHasMore(false);
        }
      } else {
        setCarouselItems([]);
        setProducts([]);
        setHasMore(false);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      setCarouselItems([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    const subObj = subCatList.find(s => s.name === currentSubCat);
    if (subObj) {
      const more = await getPaginatedCategoryProducts(subObj.apiCat, LIMIT, skip);
      if (more.length > 0) {
        setProducts(prev => [...prev, ...more]);
        setSkip(prev => + LIMIT);
        setHasMore(more.length === LIMIT);
      } else {
        setHasMore(false);
      }
    }
    setIsFetchingMore(false);
  };

  const handleSubCatPress = (subName: string, apiCat: string) => {
    setCurrentSubCat(subName);
    setCarouselIdx(0);
    try {
      carouselRef.current?.scrollToOffset({ offset: 0, animated: false });
    } catch (_) {}
    fetchInitialProducts(subName, apiCat);
  };

  // ── THE FIX: Fully Synchronized Tab and Initial Category Switching ───────
  const handleMainTabPress = (tab: TabType) => {
    const nextSubCatList = SUB_CATEGORIES_MAP[tab];
    const firstSub = nextSubCatList[0];
    
    // Explicit state resets before executing state transitions
    setCurrentSubCat(firstSub.name);
    setActiveTab(tab);
  };

  const handleSort = (type: string, label: string, icon: string) => {
    setIsSorting(true);
    setIsSortVisible(false);
    setSelectedSort(label);
    setSelectedSortIcon(icon);
    setTimeout(() => {
      const sorted = [...products];
      if (type === 'low-to-high') sorted.sort((a, b) => a.price - b.price);
      else if (type === 'high-to-low') sorted.sort((a, b) => b.price - a.price);
      else if (type === 'rating') sorted.sort((a, b) => b.rating - a.rating);
      else if (type === 'discount') sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
      setProducts(sorted);
      setIsSorting(false);
    }, 400);
  };

  // ─── RENDER HEADER ─────────────────────────────────────────────────────────
  const renderHeader = () => (
    <View style={{ backgroundColor: '#fff' }}>
      {/* SUB-CATEGORIES WITH REAL PRODUCT IMAGES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subCatScroll}
      >
        {subCatList.map((sub, i) => {
          const isActive = currentSubCat === sub.name;
          const imgUri = subCatImages[sub.name];
          return (
            <TouchableOpacity
              key={i}
              style={styles.subCatItem}
              onPress={() => handleSubCatPress(sub.name, sub.apiCat)}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.subCatCircle,
                  isActive && { borderColor: theme.accent, borderWidth: 2.5, backgroundColor: theme.light },
                ]}
              >
                {imgUri ? (
                  <Image source={{ uri: imgUri }} style={styles.subCatImg} />
                ) : (
                  <ActivityIndicator size="small" color={theme.accent} />
                )}
              </View>
              <Text
                style={[
                  styles.subCatLabel,
                  isActive && { color: theme.accent, fontFamily: BaseFonts.bold },
                ]}
                numberOfLines={1}
              >
                {sub.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* SECONDARY PILLS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsScroll}
      >
        {pillList.map((pill, i) => {
          const isActive = selectedPill === pill;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.pill,
                isActive && { backgroundColor: theme.light, borderColor: theme.accent },
              ]}
              onPress={() => setSelectedPill(pill)}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive && { color: theme.accent, fontFamily: BaseFonts.semiBold },
                ]}
              >
                {pill}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* AUTO-SCROLL CAROUSEL */}
      {/* {carouselItems.length > 0 && (
        <View style={styles.carouselWrap}>
          <FlatList
            ref={carouselRef}
            data={carouselItems}
            extraData={carouselItems}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => 'carousel-item-' + item.id + '-' + idx}
            getItemLayout={(_, idx) => ({ length: width, offset: width * idx, index: idx })}
            onScrollToIndexFailed={({ index }) => {
              setTimeout(() => carouselRef.current?.scrollToIndex({ index, animated: false }), 150);
            }}
            onMomentumScrollEnd={(e) => {
              setCarouselIdx(Math.round(e.nativeEvent.contentOffset.x / width));
            }}
            renderItem={({ item }) => {
              const displayImage = (item.images && item.images.length > 0) 
                ? item.images[0] 
                : item.thumbnail;

              return (
                <View style={styles.bannerSlide}>
                  <Image source={{ uri: displayImage }} style={styles.bannerImg} />
                  <View style={styles.bannerGradientOverlay}>
                    <Text numberOfLines={1} style={styles.bannerTitle}>{item.title.toUpperCase()}</Text>
                    <View style={styles.bannerBadgeRow}>
                      <View style={[styles.discountBadge, { backgroundColor: theme.accent }]}>
                        <Text style={styles.discountBadgeText}>
                          {Math.round(item.discountPercentage || 30)}% OFF
                        </Text>
                      </View>
                      <Text style={styles.bannerSub}>LIMITED TIME DEAL</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.dotsRow}>
            {carouselItems.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  carouselIdx === i
                    ? { backgroundColor: theme.accent, width: 16 }
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
      )} */}

{/* AUTO-SCROLL CAROUSEL */}
      {carouselItems.length > 0 && (
        <View style={styles.carouselWrap}>
          <FlatList
            ref={carouselRef}
            data={carouselItems}
            // extraData={carouselItems}
            // extraData={carouselIdx}
            horizontal
            pagingEnabled
            snapToInterval={width}
            snapToAlignment="center" 
            decelerationRate="fast"
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => 'carousel-item-' + item.id + '-' + idx}
           getItemLayout={(_, idx) => ({ 
              // length: Math.round(width), 
              // offset: Math.round(width) * idx, 
              length: width, 
              offset: width * idx,
              index: idx 
            })}
            onScrollToIndexFailed={({ index }) => {
              setTimeout(() => carouselRef.current?.scrollToIndex({ index, animated: false }), 150);
            }}
            onMomentumScrollEnd={(e) => {
              setCarouselIdx(Math.round(e.nativeEvent.contentOffset.x / width));
            }}
            renderItem={({ item }) => {
              const displayImage = (item.images && item.images.length > 0) 
                ? item.images[0] 
                : item.thumbnail;

              return (
                // ── THE FIX: Added Explicit Width Matching Device Screen Matrix ──
                <View style={[styles.bannerSlide, { width: width }]}>
                  <Image source={{ uri: displayImage }} style={styles.bannerImg} />
                  <View style={styles.bannerGradientOverlay}>
                    <Text numberOfLines={1} style={styles.bannerTitle}>{item.title.toUpperCase()}</Text>
                    <View style={styles.bannerBadgeRow}>
                      <View style={[styles.discountBadge, { backgroundColor: theme.accent }]}>
                        <Text style={styles.discountBadgeText}>
                          {Math.round(item.discountPercentage || 30)}% OFF
                        </Text>
                      </View>
                      <Text style={styles.bannerSub}>LIMITED TIME DEAL</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.dotsRow}>
            {carouselItems.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  carouselIdx === i
                    ? { backgroundColor: theme.accent, width: 16 }
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
      )}

      {/* SORT & FILTER BAR */}
      <View style={styles.sortBar}>
        <Text style={styles.sortBarLabel}>EXPLORE COLLECTION</Text>
        <View style={styles.sortBarRight}>
          {isSorting && <ActivityIndicator size="small" color={theme.accent} style={{ marginRight: 8 }} />}
          <TouchableOpacity style={styles.sortBtn} onPress={() => setIsSortVisible(true)}>
            <Ionicons name={selectedSortIcon as any} size={13} color="#282c3f" />
            <Text style={styles.sortBtnText}>
              {selectedSort === 'Default' ? 'SORT' : selectedSort.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['right', 'left']}>
      {/* ── STATUS BAR GRADIENT MATCH FIX ── */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true} 
      />

      {/* ── TOP HEADER (LinearGradient stretches top edge behind the translucent statusbar) ── */}
      <LinearGradient colors={theme.grad} style={styles.header}>
        {/* Row 1: Menu + Brand + Icons */}
        <View style={styles.headerRow1}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.menuBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="menu" size={22} color="#282c3f" />
            </TouchableOpacity>
            <Text style={styles.brandName}>ZWIGATO</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={22} color="#282c3f" />
            </TouchableOpacity>
            {ShowWishlist === true ? (
           <TouchableOpacity style={styles.iconBtn} onPress={() => router.navigate('/wishlist')}>
  <Ionicons name="heart-outline" size={22} color="#282c3f" />
  
  {/* ✅ FIXED: Dashboard heart par bhi pink dot indicator lag gaya! */}
  {favorites && favorites.length > 0 && (
    <View style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 7,
      height: 7,
      backgroundColor: '#ff3f6c', // Premium Pink Color
      borderRadius: 4,
      borderWidth: .5,
      borderColor: '#FFFFFF'
    }} />
  )}
</TouchableOpacity>
             ) : null}
            {ShowCart === true ? (
              <TouchableOpacity style={styles.iconBtn} onPress={() => router.navigate('/cart')}>
                <Ionicons name="bag-handle-outline" size={22} color="#282c3f" />
                { cart && cart.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{ cart.length > 9 ? '9+' : cart.length }</Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : null }
            {/* <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="person-outline" size={22} color="#282c3f" />
            </TouchableOpacity> */}
          </View>
        </View>

 {/* Row 2: Search bar */}
<View style={styles.searchBar}>
  <Ionicons name="search" size={15} color="#9496a2" style={{ marginRight: 8 }} />
  <TextInput
    placeholder="Search brands, products, categories..."
    placeholderTextColor="#9496a2"
    style={styles.searchInput}
    showSoftInputOnFocus={false} // 👈 Base native keyboard ko pop hone se rokega
    onFocus={() => router.push('/search')}// 👈 Click karte hi search overlay mode open hoga
  />
  <TouchableOpacity>
    <Feather name="camera" size={15} color="#282c3f" />
  </TouchableOpacity>
</View>

        {/* Row 3: Tabs */}
        <View style={styles.tabsRow}>
          {MAIN_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => handleMainTabPress(tab)}
                style={[
                  styles.tab,
                  isActive && {
                    borderBottomWidth: 3,
                    borderBottomColor: '#282c3f',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: '#282c3f' },
                    isActive && { fontFamily: BaseFonts.bold },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      {/* ── PRODUCT GRID ── */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.accent} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item, idx) => item.id.toString() + idx}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <ProductCard product={item} onPress={() => router.push(`/details/${item.id}`)} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="search-outline" size={44} color="#ddd" />
              <Text style={styles.emptyText}>No Products Found</Text>
            </View>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingMore
              ? <View style={{ paddingVertical: 16 }}><ActivityIndicator size="small" color={theme.accent} /></View>
              : null
          }
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      )}

      {/* ── SORT BOTTOM SHEET ── */}
      <Modal
        visible={isSortVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsSortVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setIsSortVisible(false)} />
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeadRow}>
              <Text style={styles.sheetTitle}>SORT BY</Text>
              <TouchableOpacity onPress={() => setIsSortVisible(false)}>
                <Ionicons name="close" size={22} color="#282c3f" />
              </TouchableOpacity>
            </View>
            {[
              { label: 'Price: Low to High', type: 'low-to-high', icon: 'trending-up-outline' },
              { label: 'Price: High to Low', type: 'high-to-low', icon: 'trending-down-outline' },
              { label: 'Customer Rating',    type: 'rating',       icon: 'star-outline'         },
              { label: 'Best Discount',      type: 'discount',     icon: 'pricetag-outline'     },
            ].map((opt) => {
              const isSelected = selectedSort === opt.label;
              return (
                <TouchableOpacity
                  key={opt.type}
                  style={styles.sortOption}
                  onPress={() => handleSort(opt.type, opt.label, opt.icon)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                      name={opt.icon as any}
                      size={20}
                      color={isSelected ? theme.accent : '#282c3f'}
                      style={{ marginRight: 12 }}
                    />
                    <Text style={[styles.sortOptText, isSelected && { color: theme.accent, fontFamily: BaseFonts.semiBold }]}>
                      {opt.label}
                    </Text>
                  </View>
                  {isSelected && <Ionicons name="checkmark-circle" size={20} color={theme.accent} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  // Added dynamic padding compensation for translucent StatusBar layout overlay tracking
  header: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 38,
    paddingBottom: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerRow1: {
    flexDirection: 'row',
    // backgroundColor: '#FA4616',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 40,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuBtn: { marginRight: 14 },
  brandName: { fontSize: 16, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 16 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -5,
    backgroundColor: '#ff3f6c',
    borderRadius: 20,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontFamily: BaseFonts.semiBold },
 
  // ── Search ──
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 14,
    marginVertical: 5,
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 40,
  },
  searchInput: { flex: 1, fontSize: 12, color: '#282c3f', fontFamily: BaseFonts.regular },

  // ── Tabs ──
  tabsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 4 },
  tab: { paddingVertical: 10, paddingHorizontal: 14, alignItems: 'center' },
  tabText: { fontSize: 12, fontFamily: BaseFonts.bold, letterSpacing: 0.4 },

  // ── Sub-categories ──
  subCatScroll: { paddingVertical: 14, paddingHorizontal: 12 },
  subCatItem: { alignItems: 'center', marginRight: 14, width: 68 },
  subCatCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: '#e8e8ea',
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  subCatImg: { width: 62, height: 62, resizeMode: 'cover' },
  subCatLabel: {
    fontSize: 10.5,
    color: '#4a4d5c',
    fontFamily: BaseFonts.medium,
    textAlign: 'center',
  },

  // ── Pills ──
  pillsScroll: { paddingHorizontal: 12, paddingBottom: 10 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e2e4',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  pillText: { fontSize: 11, color: '#282c3f', fontFamily: BaseFonts.medium },

  // ── Carousel ──
  carouselWrap: { width, height: BANNER_HEIGHT + 18, marginBottom: 4 },
  bannerSlide: {
    height: 200, // Jo bhi height aapne fix rakhi ho
    overflow: 'hidden',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Taaki naye images product box me smoothly blend ho skein
  },
    bannerGradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: BaseFonts.bold,
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  bannerBadgeRow: { flexDirection: 'row', alignItems: 'center' },
  discountBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
  },
  discountBadgeText: { color: '#fff', fontSize: 11, fontFamily: BaseFonts.bold },
  bannerSub: { color: '#ffe082', fontSize: 11, fontFamily: BaseFonts.semiBold },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  dot: { height: 4, borderRadius: 2, marginHorizontal: 2.5 },
  dotInactive: { backgroundColor: 'rgba(0,0,0,0.2)', width: 6 },

  // ── Sort bar ──
  sortBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#f7f7f8',
  },
  sortBarLabel: { fontSize: 10, fontFamily: BaseFonts.bold, color: '#7e818c', letterSpacing: 0.6 },
  sortBarRight: { flexDirection: 'row', alignItems: 'center' },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e2e2e4',
  },
  sortBtnText: { fontSize: 10, fontFamily: BaseFonts.bold, color: '#282c3f', marginLeft: 4 },

  // ── Grid ──
  grid: { paddingBottom: 30 },
  gridRow: { justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 8 },
  cardWrap: { width: '48.8%', marginBottom: 8 },

  // ── Empty ──
  emptyWrap: { alignItems: 'center', marginTop: 60, paddingBottom: 40 },
  emptyText: { color: '#aaa', marginTop: 10, fontFamily: BaseFonts.medium, fontSize: 13 },

  // ── Modal ──
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sheetTitle: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#7e818c', letterSpacing: 0.6 },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f2f2f2',
  },
  sortOptText: { fontSize: 13, color: '#282c3f', fontFamily: BaseFonts.regular },
});