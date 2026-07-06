import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar, } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BaseFonts } from '../../../src/constants/BaseFonts';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  useAnimatedScrollHandler,
  FadeInDown // 👈 Yeh add kar diya bhai
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.24;
const CONTENT_WIDTH = width * 0.76;
const ITEM_HEIGHT = 80; 

// ── 12 MAJOR CATEGORIES FOR INFINITE SIDEBAR SCROLL ──
const CATEGORIES_DATA = [
  { id: 'all', name: 'For You', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' },
  { id: 'fashion', name: 'Fashion', icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050239.png' },
  { id: 'mobiles', name: 'Mobiles', icon: 'https://cdn-icons-png.flaticon.com/512/2956/2956965.png' },
  { id: 'electronics', name: 'Electronics', icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png' },
  { id: 'appliances', name: 'Appliances', icon: 'https://cdn-icons-png.flaticon.com/512/3651/3651761.png' },
  { id: 'smart_gadgets', name: 'Smart Gadgets', icon: 'https://cdn-icons-png.flaticon.com/512/5525/5525287.png' },
  { id: 'home', name: 'Home Items', icon: 'https://cdn-icons-png.flaticon.com/512/2626/2626284.png' },
  { id: 'furniture', name: 'Furniture', icon: 'https://cdn-icons-png.flaticon.com/512/2603/2603723.png' },
  { id: 'beauty', name: 'Beauty & Care', icon: 'https://cdn-icons-png.flaticon.com/512/2753/2753335.png' },
  { id: 'toys', name: 'Toys & Baby', icon: 'https://cdn-icons-png.flaticon.com/512/3082/3082046.png' },
  { id: 'food', name: 'Food & Health', icon: 'https://cdn-icons-png.flaticon.com/512/2738/2738658.png' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' },
];


const UPCOMING_LAUNCHES = [
  { title: 'NIKE Air Max', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', badge: 'SHOP NOW', color: '#ff3f6c' },
  { title: 'Nova 2 Pro 5G', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', badge: 'NOTIFY ME', color: '#00875a' },
  { title: 'Moto Pad Pro', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', badge: 'NOTIFY ME', color: '#00875a' },
  { title: 'Noise Buds X', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', badge: 'COMING SOON', color: '#f59e0b' },
  { title: 'Smart Watch 4', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', badge: 'PRE-ORDER', color: '#2563eb' },
  { title: 'Logitech G-Pro', img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', badge: 'NEW', color: '#7c3aed' },
  { title: 'iPad Air Sleeves', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', badge: 'MINI PRICE', color: '#ff3f6c' },
  { title: 'Sony WH-1000XM5', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', badge: 'FLAT 10% OFF', color: '#00875a' },
  { title: 'Fujifilm Instax', img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', badge: 'LIVE NOW', color: '#ff3f6c' },
];

const SPOTLIGHT_ITEMS = [
  { name: 'Showpieces', uri: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300', category: 'decor' },
  { name: 'Wall Paintings', uri: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300', category: 'art' },
  { name: 'Bed Linens', uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'home' },
  { name: 'Smart Audio', uri: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300', category: 'audio' },
  { name: 'Trimmers Pro', uri: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300', category: 'grooming' },
  { name: 'Sneakers Pack', uri: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300', category: 'footwear' },
  { name: 'Gym Dumbbells', uri: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=300', category: 'sports' },
  { name: 'Leather Wallets', uri: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300', category: 'accessories' },
  { name: 'Gaming Keyboards', uri: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300', category: 'electronics' },
  { name: 'Trimmers Pro', uri: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300', category: 'grooming' },
  { name: 'Sneakers Pack', uri: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300', category: 'footwear' },
  { name: 'Gym Dumbbells', uri: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=300', category: 'sports' },
  { name: 'Leather Wallets', uri: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300', category: 'accessories' },
  { name: 'Gaming Keyboards', uri: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300', category: 'electronics' },
  { name: 'Trimmers Pro', uri: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300', category: 'grooming' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState('all');
  
  const leftScrollRef = useRef<ScrollView>(null);
  const rightScrollRef = useRef<ScrollView>(null);
  // ✅ FIX 1: Hook ko condition se nikal kar top level par rakh diya
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    men_clothing: false,
    men_footwear: false,
    men_essentials: false,
    women_clothing: false,
    women_essentials: false,
    kids_fashion: false,
  });

  const [expandedFurniture, setExpandedFurniture] = useState<{ [key: string]: boolean }>({
  bedroom: false,
  living_room: false,
  study_office: false,
  dining_kitchen: false,
  kids_room: false,
  outdoor: false,
  storage: false,
});

const [expandedElectronics, setExpandedElectronics] = useState<{ [key: string]: boolean }>({
  laptops: false,
  tablets: false,
  peripherals: false,
  accessories: false,
  storage: false,
  camera: false,
});

// ✅ Top of the file - Component hooks ke sabse upar add karo:
const [expandedSectionsMaster, setExpandedSectionsMaster] = useState<{ [key: string]: boolean }>({
  // Appliances Sub-Keys
  tv_appliances: false, wash_machines: false, air_conditioners: false,
  // Smart Gadgets Sub-Keys
  smart_watches: false, audio_gear: false, smart_home: false,
  // Home Items Sub-Keys
  kitchen_tools: false, home_decor: false, bed_linens: false,
  // Beauty & Care Sub-Keys
  makeup_essentials: false, skin_care: false, fragrances: false,
  // Toys & Baby Sub-Keys
  baby_care: false, infant_toys: false, kids_vehicles: false,
  // Food & Health Sub-Keys
  healthy_snacks: false, daily_dairy: false, dry_fruits: false,
  // Sports & Fitness Sub-Keys
  fitness_gear: false, sports_equip: false, gym_wear: false,
});
  // ✅ AUTO-CENTER LOGIC: Clicking smoothly centers item in sidebar viewports
  const handleCategorySelect = (id: string, index: number) => {
    setSelectedCat(id);
    
    const targetY = (index * ITEM_HEIGHT) - (height * 0.3) + (ITEM_HEIGHT / 2);
    leftScrollRef.current?.scrollTo({
      y: Math.max(0, targetY),
      animated: true,
    });

    rightScrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const renderRightPanelContent = () => {
    // ── ALL / FOR YOU VIEW PANEL ──
  if (selectedCat === 'all') {
    return (
      <>
        {/* Popular Store Segment */}
        {/* <Text style={styles.sectionHeading}>Popular Store</Text>
        <View style={styles.rowGrid3Column}>
          <View style={styles.circleStoreCard}>
            <Image source={{ uri: 'https://rukminim2.flixcart.com/flap/128/128/image/f1c7d2.png?q=80' }} style={styles.storeCircleImg} />
            <Text style={styles.storeCardText}>Starts 4th July</Text>
          </View>
          <View style={styles.circleStoreCard}>
            <Image source={{ uri: 'https://rukminim2.flixcart.com/flap/128/128/image/22f2d5.png?q=80' }} style={styles.storeCircleImg} />
            <Text style={styles.storeCardText}>Live Now</Text>
          </View>
          <View style={styles.circleStoreCard}>
            <Image source={{ uri: 'https://rukminim2.flixcart.com/flap/128/128/image/685712.png?q=80' }} style={styles.storeCircleImg} />
            <Text style={styles.storeCardText}>Grocery Store</Text>
          </View>
        </View> */}

        {/* New & Upcoming Launches - Highly Scrollable Horizontal Strip */}
        <Text style={styles.sectionHeading}>New & Upcoming Launches</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalCarouselRow}
          contentContainerStyle={{ paddingRight: 10 }}
        >
          {UPCOMING_LAUNCHES.map((item, index) => (
            <View key={index} style={styles.launchCard}>
              <Image source={{ uri: item.img }} style={styles.launchImg} />
              <View style={[styles.notifyBadge, { backgroundColor: item.color }]}>
                <Text style={styles.notifyText}>{item.badge}</Text>
              </View>
              <Text style={styles.launchCardTitle} numberOfLines={1}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* In The Spotlight - Clean Responsive 3-Column Multi-Row Grid */}
        <Text style={styles.sectionHeading}>In The Spotlight</Text>
        <View style={styles.spotlightGrid}>
          {SPOTLIGHT_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.spotlightCard} 
              onPress={() => router.push('/')}
              activeOpacity={0.8}
            >
              <View style={styles.spotlightImgWrapper}>
                <Image source={{ uri: item.uri }} style={styles.spotlightImg} />
              </View>
              <Text numberOfLines={1} style={styles.spotlightText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }

    if (selectedCat === 'fashion') {

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // ── DYNAMIC SUB-SEGMENT RENDER FUNCTION ──
  const renderFashionSubSection = (title: string, sectionKey: string, itemsList: { name: string; img: string }[]) => {
    const isExpanded = expandedSections[sectionKey];
    // Agar expanded nahi hai toh sirf 5 items dikhao, kyunki 6th slot "View All" button lega
    const visibleItems = isExpanded ? itemsList : itemsList.slice(0, 5);

    return (
      <View style={styles.fashionSubContainer}>
        <Text style={styles.fashionSubHeading}>{title}</Text>
        <View style={styles.fashionGrid}>
          
          {/* Render Active Items Map Loop */}
          {visibleItems.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.fashionCard} onPress={() => router.push('/')} activeOpacity={0.8}>
              <View style={styles.fashionImgWrap}>
                <Image source={{ uri: item.img }} style={styles.fashionImg} />
              </View>
              <Text numberOfLines={1} style={styles.fashionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 🔄 DYNAMIC 6TH SLOT: View All / View Less Controller Trigger */}
          {itemsList.length > 5 && (
            <TouchableOpacity 
              style={[styles.fashionCard, styles.fashionActionCard]} 
              onPress={() => toggleSection(sectionKey)}
              activeOpacity={0.8}
            >
              <View style={styles.fashionActionCircle}>
                <Ionicons 
                  name={isExpanded ? "chevron-up-circle-outline" : "chevron-forward-circle-outline"} 
                  size={26} 
                  color="#ff3f6c" 
                />
              </View>
              <Text style={styles.fashionActionText}>{isExpanded ? "View Less" : "View All"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ── MASTER DATA MATRIX ACCORDING TO USER FLOW ──
  const FASHION_SECTIONS = {
    men_clothing: [
      { name: 'Topwear', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200' },
      { name: 'Bottomwear', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200' },
      { name: 'Ethnic Wear', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
      { name: 'Casual Wear', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=200' },
      { name: 'Party Wear', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200' },
      { name: 'Formal Wear', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200' },
      { name: 'Sports Wear', img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=200' }
    ],
    men_footwear: [
      { name: 'Sports Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
      { name: 'Casual Shoes', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200' },
      { name: 'Sneakers', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200' },
      { name: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
      { name: 'Wallets', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200' },
      { name: 'Sunglasses', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200' }
    ],
    men_essentials: [
      { name: 'Briefs', img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200' },
      { name: 'Vests', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200' },
      { name: 'Socks', img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=200' },
      { name: 'Boxers', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200' },
      { name: 'Trunks', img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=200' },
      { name: 'Tracksuits', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200' },
      { name: 'Shorts', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200' },
      { name: 'Thermals', img: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ef65?w=200' }
    ],
    women_clothing: [
      { name: 'Kurtas & Sets', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
      { name: 'Western Tops', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200' },
      { name: 'Jeans & Jeggings', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200' },
      { name: 'Sarees', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
      { name: 'Ethnic Skirts', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200' },
      { name: 'Handbags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200' }
    ],
    women_essentials: [
      { name: 'Innerwear', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200' },
      { name: 'Nightwear', img: 'https://images.unsplash.com/photo-1562572159-4ebcd318f4dd?w=200' },
      { name: 'Socks Pack', img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=200' },
      { name: 'Loungewear', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200' }
    ],
    kids_fashion: [
      { name: 'Kids Clothing', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200' },
      { name: 'Innerwear', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200' },
      { name: 'Kids Shoes', img: 'https://images.unsplash.com/photo-1514989940723-e8e5163ccbe8?w=200' },
      { name: 'Kids Bottoms', img: 'https://images.unsplash.com/photo-1519234221762-3ba1a1c97a82?w=200' },
      { name: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' }
    ]
  };

  return (
    <>
      {renderFashionSubSection("Men's Clothing", "men_clothing", FASHION_SECTIONS.men_clothing)}
      {renderFashionSubSection("Men's Footwear & Accessories", "men_footwear", FASHION_SECTIONS.men_footwear)}
      {renderFashionSubSection("Men's Essentials", "men_essentials", FASHION_SECTIONS.men_essentials)}
      {renderFashionSubSection("Women's Clothing", "women_clothing", FASHION_SECTIONS.women_clothing)}
      {renderFashionSubSection("Women's Essentials", "women_essentials", FASHION_SECTIONS.women_essentials)}
      {renderFashionSubSection("Kid's Fashion Wear", "kids_fashion", FASHION_SECTIONS.kids_fashion)}
    </>
  );
}

if (selectedCat === 'furniture') {
  
  const toggleFurnitureSection = (sectionKey: string) => {
    setExpandedFurniture(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // ── REUSABLE FUNCTION MATCHING EXACT FASHION STYLING ──
  const renderFurnitureSubSection = (title: string, sectionKey: string, itemsList: { name: string; img: string }[]) => {
    const isExpanded = expandedFurniture[sectionKey];
    // Shuru me 5 items dikhao, 6th block dynamic action button banega
    const visibleItems = isExpanded ? itemsList : itemsList.slice(0, 5);

    return (
      <View style={styles.fashionSubContainer}>
        <Text style={styles.fashionSubHeading}>{title}</Text>
        <View style={styles.fashionGrid}>
          
          {/* Render Active Product Cards */}
          {visibleItems.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.fashionCard} onPress={() => router.push('/')} activeOpacity={0.8}>
              <View style={styles.fashionImgWrap}>
                <Image source={{ uri: item.img }} style={styles.fashionImg} />
              </View>
              <Text numberOfLines={1} style={styles.fashionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 🔄 DYNAMIC 6TH SLOT: View All / View Less Toggle Controller */}
          {itemsList.length > 5 && (
            <TouchableOpacity 
              style={[styles.fashionCard, styles.fashionActionCard]} 
              onPress={() => toggleFurnitureSection(sectionKey)}
              activeOpacity={0.8}
            >
              <View style={styles.fashionActionCircle}>
                <Ionicons 
                  name={isExpanded ? "chevron-up-circle-outline" : "chevron-forward-circle-outline"} 
                  size={26} 
                  color="#ff3f6c" 
                />
              </View>
              <Text style={styles.fashionActionText}>{isExpanded ? "View Less" : "View All"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ── DENSE ACCURATE FURNITURE DATA OBJECT MATRIX ──
  const FURNITURE_SECTIONS = {
    bedroom: [
      { name: 'Beds', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200' },
      { name: 'Mattresses', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200' },
      { name: 'Wardrobes', img: 'https://images.unsplash.com/photo-1558882224-cca166733360?w=200' },
      { name: 'Dressing Tables', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=200' },
      { name: 'Side Tables', img: 'https://images.unsplash.com/photo-1532372320978-9b4d7a92b24d?w=200' },
      { name: 'Collapsible Wardrobes', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200' }
    ],
    living_room: [
      { name: 'Sofas', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200' },
      { name: 'TV Units', img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=200' },
      { name: 'Home Temples', img: 'https://images.unsplash.com/photo-1609766418204-54a3c6258c69?w=200' },
      { name: 'Shoe Racks', img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=200' },
      { name: 'Coffee Tables', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=200' },
      { name: 'Recliners', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200' }
    ],
    study_office: [
      { name: 'Office & Study Chairs', img: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=200' },
      { name: 'Office & Study Tables', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200' },
      { name: 'Portable Laptop Tables', img: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=200' },
      { name: 'Bookshelves', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=200' },
      { name: 'Gaming Chairs', img: 'https://images.unsplash.com/photo-1598550476439-6847785fce6e?w=200' },
      { name: 'Cabinets & Drawers', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200' }
    ],
    dining_kitchen: [
      { name: 'Dining Sets', img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=200' },
      { name: 'Kitchen Cabinets', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200' },
      { name: 'Dining Tables', img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200' },
      { name: 'Bar Stools & Chairs', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200' },
      { name: 'Kitchen Trolleys', img: 'https://images.unsplash.com/photo-1539924465162-d488f244a403?w=200' },
      { name: 'Dining Chairs', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200' }
    ],
    kids_room: [
      { name: 'Kids Beds', img: 'https://images.unsplash.com/photo-1505693395321-883724634266?w=200' },
      { name: 'Kids Tables', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200' },
      { name: 'Kids Seating', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200' },
      { name: 'Bunk Beds', img: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?w=200' }
    ],
    outdoor: [
      { name: 'Outdoor Chairs', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200' },
      { name: 'Outdoor Sets', img: 'https://images.unsplash.com/photo-1560185127-6a2806647f81?w=200' },
      { name: 'Hammock Swings', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200' },
      { name: 'Bean Bags', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200' }
    ],
    storage: [
      { name: 'Bars', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' },
      { name: 'Cabinets', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200' },
      { name: 'Shoe Racks', img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=200' },
      { name: 'Kitchen Cabinets', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200' },
      { name: 'Drawers & Cabinets', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200' }
    ]
  };

  return (
    <>
      {renderFurnitureSubSection("Bedroom Furniture", "bedroom", FURNITURE_SECTIONS.bedroom)}
      {renderFurnitureSubSection("Living Room Furniture", "living_room", FURNITURE_SECTIONS.living_room)}
      {renderFurnitureSubSection("Study & Office Furniture", "study_office", FURNITURE_SECTIONS.study_office)}
      {renderFurnitureSubSection("Dining & Kitchen Furniture", "dining_kitchen", FURNITURE_SECTIONS.dining_kitchen)}
      {renderFurnitureSubSection("Kids Room Furniture", "kids_room", FURNITURE_SECTIONS.kids_room)}
      {renderFurnitureSubSection("Outdoor Furniture", "outdoor", FURNITURE_SECTIONS.outdoor)}
      {renderFurnitureSubSection("Storage Furniture", "storage", FURNITURE_SECTIONS.storage)}
    </>
  );
}

    // // ── KITCHEN / HOME ITEMS EXPANDED BLOCK ──
    // if (selectedCat === 'home') {
    //   return (
    //     <>
    //       <Text style={styles.sectionHeading}>Kitchen Items</Text>
    //       <View style={styles.rowGrid3Column}>
    //         {['Gas Stoves', 'Cookware Sets', 'Dining Server', 'Kitchen Storage', 'Kitchen Tools'].map((x, i) => (
    //           <TouchableOpacity key={i} style={styles.gridBoxCard} onPress={() => router.push('/')}>
    //             <Image source={{ uri: 'https://rukminim2.flixcart.com/image/128/128/knyx9280/gas-stove/d/g/u/original-imag2gzy7hftzqy7.jpeg?q=80' }} style={styles.gridBoxImg} />
    //             <Text style={styles.gridBoxText}>{x}</Text>
    //           </TouchableOpacity>
    //         ))}
    //       </View>
    //     </>
    //   );
    // }

if (selectedCat === 'electronics') {
  
  const toggleElectronicsSection = (sectionKey: string) => {
    setExpandedElectronics(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // ── REUSABLE FUNCTION MATCHING EXACT FASHION STYLING ──
  const renderElectronicsSubSection = (title: string, sectionKey: string, itemsList: { name: string; img: string }[]) => {
    const isExpanded = expandedElectronics[sectionKey];
    // Shuru me 5 items dikhao, 6th box dynamic view all trigger banega
    const visibleItems = isExpanded ? itemsList : itemsList.slice(0, 5);

    return (
      <View style={styles.fashionSubContainer}>
        <Text style={styles.fashionSubHeading}>{title}</Text>
        <View style={styles.fashionGrid}>
          
          {/* Render Active Cards List */}
          {visibleItems.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.fashionCard} onPress={() => router.push('/')} activeOpacity={0.8}>
              <View style={styles.fashionImgWrap}>
                <Image source={{ uri: item.img }} style={styles.fashionImg} />
              </View>
              <Text numberOfLines={1} style={styles.fashionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 🔄 DYNAMIC 6TH SLOT: View All / View Less Controller */}
          {itemsList.length > 5 && (
            <TouchableOpacity 
              style={[styles.fashionCard, styles.fashionActionCard]} 
              onPress={() => toggleElectronicsSection(sectionKey)}
              activeOpacity={0.8}
            >
              <View style={styles.fashionActionCircle}>
                <Ionicons 
                  name={isExpanded ? "chevron-up-circle-outline" : "chevron-forward-circle-outline"} 
                  size={26} 
                  color="#ff3f6c" 
                />
              </View>
              <Text style={styles.fashionActionText}>{isExpanded ? "View Less" : "View All"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ── DENSE ACCURATE ELECTRONICS DATA OBJECT MATRIX ──
  const ELECTRONICS_SECTIONS = {
    laptops: [
      { name: 'Gaming Laptops', img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200' },
      { name: 'ASUS ROG', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200' },
      { name: 'Intel Core', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200' },
      { name: 'Lenovo Legion', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200' },
      { name: 'Samsung Book', img: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=200' },
      { name: 'NVIDIA RTX Laptops', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200' }
    ],
    tablets: [
      { name: 'Apple iPad', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6d0?w=200' },
      { name: 'OnePlus Pad', img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=200' },
      { name: 'Realme Pad', img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=200' },
      { name: 'Redmi Pad', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200' },
      { name: 'Samsung Tab', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6d0?w=200' },
      { name: 'Redmi Pad', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200' },
      { name: 'Samsung Tab', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6d0?w=200' },
    ],
    peripherals: [
      { name: 'Monitors', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200' },
      { name: 'Printers', img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200' },
      { name: 'Projectors', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=200' },
      { name: 'Gaming Monitors', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200' },
      { name: 'Office Supplies', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200' },
      { name: 'Inks & Toners', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200' }
    ],
    accessories: [
      { name: 'Gaming Mouse', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200' },
      { name: 'Keyboards', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200' },
      { name: 'Routers', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200' },
      { name: 'Webcams', img: 'https://images.unsplash.com/photo-1601524909162-be87252be298?w=200' },
      { name: 'USB Gadgets', img: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=200' },
      { name: 'Cables', img: 'https://images.unsplash.com/photo-1557063673-0493e05d49ef?w=200' },
      { name: 'Processors', img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=200' }
    ],
    storage: [
      { name: 'External SSD', img: 'https://images.unsplash.com/photo-1609845768806-767fcfc317b6?w=200' },
      { name: 'External HDD', img: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=200' },
      { name: 'Pendrives', img: 'https://images.unsplash.com/photo-1599940778173-e276d4cdb2b3?w=200' },
      { name: 'Internal SSD', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200' },
      { name: 'Memory Cards', img: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=200' },
      { name: 'Internal SSD', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200' },
      { name: 'Memory Cards', img: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=200' },
    ],
    camera: [
      { name: 'DSLR Cameras', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200' },
      { name: 'Camera Lenses', img: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=200' },
      { name: 'Tripods & Monopods', img: 'https://images.unsplash.com/photo-1590255476100-348981f4f9f2?w=200' },
      { name: 'Gimbals & Stabilizers', img: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=200' },
      { name: 'Flash Lights', img: 'https://images.unsplash.com/photo-1560264357-8d9202250f21?w=200' },
      { name: 'Camera Bags', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200' }
    ]
  };

  return (
    <>
      {renderElectronicsSubSection("Laptops Store", "laptops", ELECTRONICS_SECTIONS.laptops)}
      {renderElectronicsSubSection("Tablets & iPads", "tablets", ELECTRONICS_SECTIONS.tablets)}
      {renderElectronicsSubSection("Computer Peripherals", "peripherals", ELECTRONICS_SECTIONS.peripherals)}
      {renderElectronicsSubSection("Computers Accessories", "accessories", ELECTRONICS_SECTIONS.accessories)}
      {renderElectronicsSubSection("Storage Devices", "storage", ELECTRONICS_SECTIONS.storage)}
      {renderElectronicsSubSection("Camera & Gears", "camera", ELECTRONICS_SECTIONS.camera)}
    </>
  );
}

const toggleMasterSection = (sectionKey: string) => {
    setExpandedSectionsMaster(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // ── REUSABLE RENDERING UTILITY INJECTION ──
  const renderMasterSubSection = (title: string, sectionKey: string, itemsList: { name: string; img: string }[]) => {
    const isExpanded = expandedSectionsMaster[sectionKey];
    const visibleItems = isExpanded ? itemsList : itemsList.slice(0, 5);

    return (
      <View style={styles.fashionSubContainer}>
        <Text style={styles.fashionSubHeading}>{title}</Text>
        <View style={styles.fashionGrid}>
          {visibleItems.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.fashionCard} onPress={() => router.push('/')} activeOpacity={0.8}>
              <View style={styles.fashionImgWrap}>
                <Image source={{ uri: item.img }} style={styles.fashionImg} />
              </View>
              <Text numberOfLines={1} style={styles.fashionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}

          {itemsList.length > 5 && (
            <TouchableOpacity 
              style={[styles.fashionCard, styles.fashionActionCard]} 
              onPress={() => toggleMasterSection(sectionKey)}
              activeOpacity={0.8}
            >
              <View style={styles.fashionActionCircle}>
                <Ionicons 
                  name={isExpanded ? "chevron-up-circle-outline" : "chevron-forward-circle-outline"} 
                  size={26} 
                  color="#ff3f6c" 
                />
              </View>
              <Text style={styles.fashionActionText}>{isExpanded ? "View Less" : "View All"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ── 1. APPLIANCES BLOCK ──
  if (selectedCat === 'appliances') {
    return (
      <>
        {renderMasterSubSection("Televisions & Displays", "tv_appliances", [
          { name: 'OLED Smart TVs', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200' },
          { name: '4K Ultra HD', img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=200' },
          { name: 'QLED Screens', img: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=200' },
          { name: 'Projector Setups', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=200' },
          { name: 'Home Theaters', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200' },
          { name: 'Android Sticks', img: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=200' }
        ])}
        {renderMasterSubSection("Washing Machines", "wash_machines", [
          { name: 'Front Load Fully', img: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200' },
          { name: 'Top Load Dynamic', img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=200' },
          { name: 'Semi-Automatic', img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200' },
          { name: 'Clothes Dryers', img: 'https://images.unsplash.com/photo-1545173168-9f1947e8017e?w=200' }
        ])}
        {renderMasterSubSection("Air Conditioners", "air_conditioners", [
          { name: 'Inverter Split ACs', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200' },
          { name: 'Window Cooling Units', img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=200' },
          { name: '5 Star Energy ACs', img: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=200' }
        ])}
      </>
    );
  }

  // ── 2. SMART GADGETS BLOCK ──
  if (selectedCat === 'smart_gadgets') {
    return (
      <>
        {renderMasterSubSection("Smart Watches", "smart_watches", [
          { name: 'AMOLED Displays', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200' },
          { name: 'Fitness Trackers', img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200' },
          { name: 'Premium Apple Watch', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200' },
          { name: 'Rugged Outdoors', img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=200' },
          { name: 'Kids GPS Tracker', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200' }
        ])}
        {renderMasterSubSection("Audio & Hearables", "audio_gear", [
          { name: 'True Wireless TWS', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200' },
          { name: 'Over-Ear Headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
          { name: 'Bluetooth Speakers', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200' },
          { name: 'Gaming Headsets', img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200' },
          { name: 'Neckbands Wireless', img: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=200' },
          { name: 'Soundbars Audio', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200' }
        ])}
      </>
    );
  }

  // ── 3. HOME ITEMS BLOCK ──
  if (selectedCat === 'home') {
    return (
      <>
        {renderMasterSubSection("Kitchen Utilities", "kitchen_tools", [
          { name: 'Gas Stoves & Hobs', img: 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=200' },
          { name: 'Cookware Sets', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=200' },
          { name: 'Mixer Grinders', img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200' },
          { name: 'Electric Kettles', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200' },
          { name: 'Containers & Jars', img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=200' }
        ])}
        {renderMasterSubSection("Home Decor Premium", "home_decor", [
          { name: 'Elegant Paintings', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200' },
          { name: 'Showpieces & Figurines', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200' },
          { name: 'Table Clocks', img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=200' },
          { name: 'Vases & Artificial Plants', img: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=200' }
        ])}
      </>
    );
  }

  // ── 4. BEAUTY & CARE BLOCK ──
  if (selectedCat === 'beauty') {
    return (
      <>
        {renderMasterSubSection("Makeup Essentials", "makeup_essentials", [
          { name: 'Lipsticks Luxury', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200' },
          { name: 'Foundations & Compact', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200' },
          { name: 'Eyeliners & Mascara', img: 'https://images.unsplash.com/photo-1631730359577-38e4755d772b?w=200' },
          { name: 'Nail Polishes Pack', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200' },
          { name: 'Makeup Brushes Set', img: 'https://images.unsplash.com/photo-1607602132700-068258431c6c?w=200' }
        ])}
        {renderMasterSubSection("Skin & Personal Care", "skin_care", [
          { name: 'Moisturizers Pro', img: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=200' },
          { name: 'Sunscreens Tinted', img: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=200' },
          { name: 'Face Washes Pure', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200' },
          { name: 'Premium Hair Serums', img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200' }
        ])}
      </>
    );
  }

  // ── 5. TOYS & BABY CARE BLOCK ──
  if (selectedCat === 'toys') {
    return (
      <>
        {renderMasterSubSection("Baby Care Essentials", "baby_care", [
          { name: 'Diapers Premium', img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200' },
          { name: 'Baby Wipes Pack', img: 'https://images.unsplash.com/photo-1603006905393-c340b0808cf7?w=200' },
          { name: 'Lotions & Powders', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200' },
          { name: 'Baby Bedding Sets', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200' }
        ])}
        {renderMasterSubSection("Infant & Soft Toys", "infant_toys", [
          { name: 'Soft Teddy Bears', img: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=200' },
          { name: 'Puzzle Cubes Blocks', img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200' },
          { name: 'Educational Tech', img: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=200' },
          { name: 'Board Games Pack', img: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=200' }
        ])}
      </>
    );
  }

  // ── 6. FOOD & HEALTH BLOCK ──
  if (selectedCat === 'food') {
    return (
      <>
        {renderMasterSubSection("Healthy Organic Snacks", "healthy_snacks", [
          { name: 'Protein Energy Bars', img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=200' },
          { name: 'Oats & Muesli Pack', img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=200' },
          { name: 'Herbal Green Teas', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=200' },
          { name: 'Organic Honey Pure', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200' }
        ])}
        {renderMasterSubSection("Premium Dry Fruits", "dry_fruits", [
          { name: 'California Almonds', img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200' },
          { name: 'Crunchy Cashews', img: 'https://images.unsplash.com/photo-1534119396591-59491d0dfc10?w=200' },
          { name: 'Organic Walnuts', img: 'https://images.unsplash.com/photo-1543325606-0bdf60ffc338?w=200' },
          { name: 'Pistachios Roasted', img: 'https://images.unsplash.com/photo-1600002415506-dd0609260c37?w=200' }
        ])}
      </>
    );
  }

  // ── 7. SPORTS & FITNESS BLOCK ──
  if (selectedCat === 'sports') {
    return (
      <>
        {renderMasterSubSection("Fitness Gym Gear", "fitness_gear", [
          { name: 'PVC Dumbbells Sets', img: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=200' },
          { name: 'Premium Yoga Mats', img: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=200' },
          { name: 'Resistance Bands', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200' },
          { name: 'Home Gym Kits Pack', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=200' },
          { name: 'Ab Rollers Wheel', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200' }
        ])}
        {renderMasterSubSection("Active Gym Wear", "gym_wear", [
          { name: 'Dry-Fit T-Shirts', img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=200' },
          { name: 'Gym Shorts Track', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200' },
          { name: 'Sports Tracksuits', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200' },
          { name: 'Athletic Socks Pack', img: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=200' }
        ])}
      </>
    );
  }

    // GENERAL FALLBACK MATRICES FOR EXTRA ITEMS
    return (
      <>
        <Text style={styles.sectionHeading}>Top Collections</Text>
        <View style={styles.rowGrid3Column}>
          {['Premium Offers', 'Best Deals', 'Budget Picks', 'Top Brands', 'New Arrivals', 'View All'].map((x, i) => (
            <TouchableOpacity key={i} style={styles.gridBoxCard} onPress={() => router.push('/')}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' }} style={styles.gridBoxImg} />
              <Text style={styles.gridBoxText}>{x}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

{/* ── HIGH-ENERGY VIBRANT NEON GRADIENT HEADER PANEL ── */}
<LinearGradient
  colors={['#F8B4D9', '#FAD0C4']} // Deep Vibrant Purple to Neon Pink (100% Wow Factor)
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.headerBar}
>
  <Text style={styles.headerTitle}>All Categories</Text>
  
  <View style={styles.headerIcons}>
    <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/search')}>
      <Feather name="search" size={20} color="#FFFFFF" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconBtn}>
      <Feather name="camera" size={20} color="#FFFFFF" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconBtn} onPress={() => router.navigate('/cart')}>
      <Ionicons name="cart-outline" size={22} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
</LinearGradient>

      <View style={styles.splitBody}>

  {/* ── 1. LEFT PANEL LAYOUT GRID (Ab Sub-Categories Content yahan chalega) ── */}
  <View style={styles.rightContentPanel}>
    <ScrollView ref={rightScrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.rightScrollBody}>
      {renderRightPanelContent()}
    </ScrollView>
  </View>

{/* ── 2. RIGHT PANEL NAVIGATION GRID (With Premium Pop Animations & Gradients) ── */}
<View style={styles.rightSidebarContainer}>
  <ScrollView ref={leftScrollRef} showsVerticalScrollIndicator={false}>
    {CATEGORIES_DATA.map((cat, i) => {
      const isActive = selectedCat === cat.id;
      
      return (
        <TouchableOpacity
          key={cat.id}
          style={[styles.rightSidebarTab]}
          onPress={() => handleCategorySelect(cat.id, i)}
          activeOpacity={0.85}
        >
          {/* ✅ GRADIENT WRAP: Soft gradient flow jab card active hoga */}
          {isActive ? (
            <LinearGradient
              colors={['#FFE4E6', '#FFF0F2']} // Premium subtle pink luxury gradient flows
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          ) : (
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'transparent' }]} />
          )}

          {/* Active indicator bar line attached on the rightmost edge boundary */}
          {isActive && <View style={styles.rightActiveIndicator} />}
          
          {/* ✅ POPUP INTERACTION: Smooth pop when activated layout engine */}
          <Animated.View 
            entering={isActive ? FadeInDown.duration(200) : undefined}
            style={[
              styles.rightImgBox, 
              isActive && styles.rightImgBoxActive,
              isActive && { transform: [{ scale: 1.12 }] } // Native micro popup simulation factor
            ]}
          >
            <Image source={{ uri: cat.icon }} style={styles.rightSidebarIcon} />
          </Animated.View>

          <Text style={[styles.rightSidebarText, isActive && styles.rightSidebarTextActive]} numberOfLines={2}>
            {cat.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
</View>

</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
headerBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingTop: 38, 
    paddingBottom: 8,
    // Solid neon drop shadow configuration
    elevation: 5,
    shadowColor: '#ec4899',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 }
  },
  headerTitle: { 
    fontSize: 19, 
    fontFamily: BaseFonts.bold, 
    color: '#FFFFFF', // Contrast white text
    letterSpacing: 0.4
  },
  headerIcons: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconBtn: { 
    marginLeft: 18, 
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  splitBody: { flex: 1, flexDirection: 'row' },
  
// Right Master Container Matrix Layout Configuration
  rightSidebarContainer: { 
    width: SIDEBAR_WIDTH, 
    backgroundColor: '#F8FAFC', // Slightly clean premium container color tint
    borderLeftWidth: 0.5, 
    borderColor: '#E2E8F0' 
  },
  rightSidebarTab: { 
    width: '100%', 
    height: ITEM_HEIGHT, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 4, 
    position: 'relative',
    overflow: 'hidden' // Overflows constraint matching gradient borders inside tab nodes
  },
  rightActiveIndicator: { 
    position: 'absolute', 
    left: 0, // Edge alignment on the right wall
    top: 0, 
    bottom: 0, 
    width: 1.5, 
    backgroundColor: '#ff3f6c', 
    // borderTopLeftRadius: 4, 
    // borderBottomLeftRadius: 4,
    zIndex: 10
  },
  rightImgBox: { 
    width: 44, height: 44, 
    borderRadius: 22, 
    backgroundColor: '#E2E8F0', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  rightImgBoxActive: { 
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(255, 63, 108, 0.15)', // Fine outline accent over active node
    elevation: 3,
    shadowColor: '#ff3f6c',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 }
  },
  rightSidebarIcon: { 
    width: 22, 
    height: 22, 
    resizeMode: 'contain' 
  },
  rightSidebarText: { 
    fontSize: 10, 
    fontFamily: BaseFonts.medium, 
    color: '#64748B', 
    textAlign: 'center', 
    lineHeight: 13,
    paddingHorizontal: 2
  },
  rightSidebarTextActive: { 
    fontFamily: BaseFonts.bold, 
    color: '#ff3f6c' 
  },

  // ✅ LEFT CONTENT SIDE: Width setup mapped smoothly
  rightContentPanel: { 
    width: CONTENT_WIDTH, 
    backgroundColor: '#FFF' 
  },
  rightScrollBody: { 
    paddingHorizontal: 12, 
    paddingTop: 6, 
    paddingBottom: 110 
  },

  // Standard Grid item squares
  gridBoxCard: { width: 76, alignItems: 'center', backgroundColor: '#F8FAFC', paddingVertical: 8, paddingHorizontal: 4, borderRadius: 8, borderWidth: 0.5, borderColor: '#E2E8F0' },
  gridBoxImg: { width: 44, height: 44, resizeMode: 'contain' },
  gridBoxText: { fontSize: 9, fontFamily: BaseFonts.medium, color: '#334155', marginTop: 6, textAlign: 'center', lineHeight: 11 },

  // Section Headings Styles (Amazon/Myntra Standard)
  sectionHeading: { 
    fontSize: 11, 
    fontFamily: BaseFonts.bold, 
    color: '#1E293B', 
    letterSpacing: 0.5, 
    textTransform: 'uppercase', 
    marginTop: 20, 
    marginBottom: 12,
    paddingLeft: 2
  },

  // Popular Stores Row Matrix
  rowGrid3Column: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 4 
  },
  circleStoreCard: { 
    width: '30%', 
    alignItems: 'center' 
  },
  storeCircleImg: { 
    width: 58, 
    height: 58, 
    borderRadius: 29, 
    resizeMode: 'cover', 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  storeCardText: { 
    fontSize: 9, 
    fontFamily: BaseFonts.medium, 
    color: '#475569', 
    textAlign: 'center', 
    marginTop: 6, 
    lineHeight: 11 
  },

  // Upcoming Launches Horizontal Slider
  horizontalCarouselRow: { 
    marginTop: 2, 
    flexDirection: 'row' 
  },
  launchCard: { 
    width: 105, 
    marginRight: 10, 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 6, 
    borderWidth: 1, 
    borderColor: '#F1F5F9', 
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 }
  },
  launchImg: { 
    width: '100%', 
    height: 72, 
    borderRadius: 8, 
    resizeMode: 'cover' 
  },
  notifyBadge: { 
    paddingVertical: 3, 
    paddingHorizontal: 6, 
    borderRadius: 4, 
    marginTop: -10, 
    zIndex: 10,
    elevation: 2 
  },
  notifyText: { 
    color: '#FFF', 
    fontSize: 7.5, 
    fontFamily: BaseFonts.bold 
  },
  launchCardTitle: { 
    fontSize: 9.5, 
    fontFamily: BaseFonts.semiBold, 
    color: '#334155', 
    marginTop: 6,
    textAlign: 'center' 
  },

  // Spotlight Micro CSS Grid Architecture
  spotlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    paddingHorizontal: 2,
    paddingBottom: 20
  },
  spotlightCard: {
    width: '31%', 
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  spotlightImgWrapper: {
    width: '100%',
    height: 68,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
    marginBottom: 5,
  },
  spotlightImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  spotlightText: {
    fontSize: 9.5,
    fontFamily: BaseFonts.bold,
    color: '#334155',
    textAlign: 'center',
    paddingHorizontal: 1,
    lineHeight: 12,
  },
  // ── FASHION SUB SECTION UNIQUE MODULE STYLES ──
  fashionSubContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  fashionSubHeading: {
    fontSize: 12,
    fontFamily: BaseFonts.bold,
    color: '#0F172A',
    letterSpacing: 0.3,
    marginBottom: 12,
    textTransform: 'uppercase',
    borderLeftWidth: 1.5,
    borderColor: '#ff3f6c',
    paddingLeft: 8,
  },
  fashionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 14,
    justifyContent: 'space-between',
  },
  fashionCard: {
    width: '31%', // Syncs 3 cards per line beautifully
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  fashionImgWrap: {
    width: '100%',
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    marginBottom: 6,
  },
  fashionImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fashionText: {
    fontSize: 9.5,
    fontFamily: BaseFonts.bold,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 12,
  },
  
  // View All / Action card dynamic components styling
  fashionActionCard: {
    backgroundColor: '#FFF0F2',
    borderColor: 'rgba(255, 63, 108, 0.15)',
    justifyContent: 'center',
    minHeight: 96,
  },
  fashionActionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    elevation: 1,
  },
  fashionActionText: {
    fontSize: 10,
    fontFamily: BaseFonts.bold,
    color: '#ff3f6c',
    textAlign: 'center',
  },
});