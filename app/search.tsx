// // import React, { useState, useEffect } from 'react';
// // import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useRouter } from 'expo-router';
// // import { searchProducts } from '../../../src/api/productService';
// // import { productStyle } from '../../../assets/styles/productStyle';
// // import { COLORS } from '../../../src/constants/colors';
// // import { BaseFonts } from '../../../src/constants/BaseFonts';

// // export default function SearchScreen() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [results, setResults] = useState([]);
// //   const router = useRouter();

// //   // Jab user type karega, tab products fetch honge
// //   useEffect(() => {
// //     if (!searchQuery.trim()) {
// //     setResults([]);
// //     return;
// //   }
// //     const delayDebounceFn = setTimeout(async () => {
// //       try {
// //       const data = await searchProducts(searchQuery.trim());
      
// //       // --- YE HAI ASLI LOGIC ---
// //       // Hum filter kar rahe hain taaki sirf wo products dikhein jo searchQuery se START hote hon
// //       const filteredData = data.filter(item => 
// //         item.title.toLowerCase().startsWith(searchQuery.toLowerCase().trim())
// //       );

// //       setResults(filteredData);
// //     } catch (error) {
// //       console.error("Search Error:", error);
// //     }
// //     }, 500); // 500ms debounce taaki har letter par API call na ho

// //     return () => clearTimeout(delayDebounceFn);
// //   }, [searchQuery]);

// //   return (
// //     <View style={styles.container}>
// //       {/* SEARCH HEADER */}
// //       <View style={styles.searchHeader}>
// //         <TouchableOpacity onPress={() => router.back()}>
// //           <Ionicons name="arrow-back" size={24} color={COLORS.text} />
// //         </TouchableOpacity>
        
// //         <View style={styles.inputWrapper}>
// //           <TextInput
// //             placeholder="Search for products..."
// //             style={styles.input}
// //             value={searchQuery}
// //             onChangeText={setSearchQuery}
// //             autoFocus={true} // Screen khulte hi keyboard open ho jaye
// //           />
// //           {searchQuery.length > 0 && (
// //             <TouchableOpacity onPress={() => setSearchQuery('')}>
// //               <Ionicons name="close-circle" size={18} color="#878787" />
// //             </TouchableOpacity>
// //           )}
// //         </View>
// //       </View>

// //       {/* SEARCH RESULTS */}
// //       <FlatList
// //         data={results}
// //         keyExtractor={(item) => item.id.toString()}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity 
// //             style={styles.resultItem}
// //             onPress={() => router.push(`/details/${item.id}`)}
// //           >
// //             <Ionicons name="search-outline" size={18} color="#878787" />
// //             <Text style={styles.resultText}>{item.title}</Text>
// //           </TouchableOpacity>
// //         )}
// //         ListEmptyComponent={
// //           searchQuery.length > 2 ? (
// //             // <Text style={styles.noResult}>No products found for "{searchQuery}"</Text>
// //                 <View style={productStyle.errorContainer}>
// //                   {/* Background Gradient Effect (Using simple backgroundColor as fallback) */}
// //                   <View style={productStyle.content}>
                    
// //                     {/* Myntra Logo Icon Placeholder */}
// //                     <View style={productStyle.logoBox}>
// //                       <Image 
// //                         source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }} // Replace with your local asset
// //                         style={productStyle.logoImage} 
// //                       />
// //                     </View>
            
// //                     <Text style={productStyle.sorryText}>Sorry, this product is temporarily unavailable.</Text>
                    
// //                     <Text style={productStyle.refreshText}>
// //                       Please refresh the page or try after some time.
// //                     </Text>
            
// //                     <TouchableOpacity 
// //                       style={productStyle.retryBtn} 
// //                       onPress={() => router.replace('/')}
// //                     >
// //                       <Text style={productStyle.retryText}>GO TO HOME</Text>
// //                     </TouchableOpacity>
// //                   </View>
// //                 </View>
            
// //           ) : null
// //         }
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#fff' },
// //   searchHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingTop: 50, // Screen ke upar se spacing
// //     paddingBottom: 10,
// //     paddingHorizontal: 15,
// //     backgroundColor: '#fff',
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: '#e0e0e0',
// //     // elevation: 2,
// //     // shadowColor: '#000',
// //     // shadowOffset: { width: 0, height: 2 },
// //     // shadowOpacity: 0.1,
// //     // shadowRadius: 2,
// //   },
// //   inputWrapper: {
// //     flex: 1,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#f0f2f5',
// //     marginLeft: 15,
// //     paddingHorizontal: 12,
// //     borderRadius: 10,
// //     height: 45,
// //     borderWidth: 1,
// //     borderColor: '#dcdcdc',
// //   },
// //   input: { flex: 1, fontSize: 14, color: '#1a1a1a', fontFamily: BaseFonts.medium,  },
// //   resultItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 20,
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: '#f0f0f0',
// //   },
// //   resultText: { marginLeft: 15, fontSize: 15, color: '#282c3f', fontFamily: BaseFonts.medium, },
// //   noResult: { textAlign: 'center', marginTop: 50, color: '#878787', fontSize: 14 }
// // });

// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { searchProducts } from '../src/api/productService';
// import { productStyle } from '../assets/styles/productStyle';
// import { COLORS } from '../src/constants/colors';
// import { BaseFonts } from '../src/constants/BaseFonts';

// // ── THE FIX: Destructured 'onClose' here from props ──
// export default function SearchScreen({ onClose }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setResults([]);
//       return;
//     }
//     const delayDebounceFn = setTimeout(async () => {
//       try {
//         const data = await searchProducts(searchQuery.trim());
        
//         const filteredData = data.filter(item => 
//           item.title.toLowerCase().startsWith(searchQuery.toLowerCase().trim())
//         );

//         setResults(filteredData);
//       } catch (error) {
//         console.error("Search Error:", error);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchQuery]);

//   // ── THE FIX: Custom handle closure function for overlay mechanics ──
//   const handleBackPress = () => {
//     if (typeof onClose === 'function') {
//       onClose(); // Overlays module layout close ho jayega
//     } else {
//       router.back(); // Safety fallback mapping route
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* SEARCH HEADER */}
//       <View style={styles.searchHeader}>
//         {/* ── THE FIX: Swapped router.back() with handleBackPress ── */}
//         <TouchableOpacity onPress={handleBackPress} style={{ padding: 4 }}>
//           <Ionicons name="arrow-back" size={24} color={COLORS.text} />
//         </TouchableOpacity>
        
//         <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Search for products..."
//             style={styles.input}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             autoFocus={true}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={18} color="#878787" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* SEARCH RESULTS */}
//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={styles.resultItem}
//             onPress={() => {
//               // Reset the search state before navigating so it looks crisp next time
//               if (typeof onClose === 'function') onClose();
//               router.push(`/details/${item.id}`);
//             }}
//           >
//             <Ionicons name="search-outline" size={18} color="#878787" />
//             <Text style={styles.resultText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={
//           searchQuery.length > 2 ? (
//             <View style={productStyle.errorContainer}>
//               <View style={productStyle.content}>
//                 <View style={productStyle.logoBox}>
//                   <Image 
//                     source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }}
//                     style={productStyle.logoImage} 
//                   />
//                 </View>
        
//                 <Text style={productStyle.sorryText}>Sorry, this product is temporarily unavailable.</Text>
                
//                 <Text style={productStyle.refreshText}>
//                   Please refresh the page or try after some time.
//                 </Text>
        
//                 <TouchableOpacity 
//                   style={productStyle.retryBtn} 
//                   onPress={() => {
//                     if (typeof onClose === 'function') onClose();
//                     router.replace('/');
//                   }}
//                 >
//                   <Text style={productStyle.retryText}>GO TO HOME</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null
//         }
//       />
//     </View>
//   );
// }

// // Keep your styles exactly the same below...
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   searchHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#e0e0e0',
//   },
//   inputWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f2f5',
//     marginLeft: 15,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#dcdcdc',
//   },
//   input: { flex: 1, fontSize: 14, color: '#1a1a1a', fontFamily: BaseFonts.medium  },
//   resultItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#f0f0f0',
//   },
//   resultText: { marginLeft: 15, fontSize: 15, color: '#282c3f', fontFamily: BaseFonts.medium },
//   noResult: { textAlign: 'center', marginTop: 50, color: '#878787', fontSize: 14 }
// });

import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { BaseFonts } from '@/constants/BaseFonts';
import { searchProducts } from '@/api/productService';
import { productStyle } from '../assets/styles/productStyle';
import { useNavigation } from 'expo-router'; // Ya 'amazon-like' dynamic navigators se

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await searchProducts(searchQuery.trim());
        
        // Exact prefix title filtering logic
        const filteredData = data.filter(item => 
          item.title.toLowerCase().startsWith(searchQuery.toLowerCase().trim())
        );
        setResults(filteredData);
      } catch (error) {
        console.error("Search Error:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // ── THE FIX: Safe Back Press Handling ──
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // Agar stack me piche koi screen hai toh back jao
    } else {
      router.replace('/'); // Agar stack khali hai toh safe landing homepage par karwa do
    }
  };

  return (
    <View style={styles.container}>
      
      {/* PREMIUM WHITE FLAT SEARCH HEADER */}
      <View style={styles.searchHeader}>
        <TouchableOpacity 
          onPress={handleBackPress}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#282c3f" />
        </TouchableOpacity>
        
        {/* Input area matching exact style definitions */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Search brands, products, categories..."
            placeholderTextColor="#9496a2"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={16} color="#9496a2" />
            </TouchableOpacity>
          ) : (
            <Feather name="camera" size={16} color="#282c3f" style={{ marginRight: 4 }} />
          )}
        </View>
      </View>

      {/* SEARCH STREAM RESULTS */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.resultItem}
            onPress={() => router.push(`/details/${item.id}`)}
          >
            <View style={styles.resultLeftGroup}>
              <Ionicons name="search-outline" size={16} color="#9496a2" style={styles.searchRowIcon} />
              <Text style={styles.resultText} numberOfLines={1}>{item.title}</Text>
            </View>
            <Feather name="arrow-up-left" size={16} color="#9496a2" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          searchQuery.length > 2 ? (
            <View style={productStyle.errorContainer}>
              <View style={productStyle.content}>
                <View style={productStyle.logoBox}>
                  <Image 
                    source={{ uri: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' }}
                    style={productStyle.logoImage} 
                  />
                </View>
                <Text style={productStyle.sorryText}>Sorry, this product is temporarily unavailable.</Text>
                <Text style={productStyle.refreshText}>Please refresh the page or try after some time.</Text>
                <TouchableOpacity 
                  style={productStyle.retryBtn} 
                  onPress={() => router.replace('/')}
                >
                  <Text style={productStyle.retryText}>GO TO HOME</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Clean Premium White Search TopBar 
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48, 
    paddingBottom: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
  },
  backBtn: {
    padding: 4,
    marginRight: 6,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f6',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 38,
  },
  input: { 
    flex: 1, 
    fontSize: 13, 
    color: '#282c3f', 
    fontFamily: BaseFonts.regular,
    paddingVertical: 0, 
  },
  clearBtn: {
    padding: 2,
  },
  
  // Premium Clean Row Listings Style
  listPadding: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f4f4f5',
  },
  resultLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.9,
  },
  searchRowIcon: {
    marginRight: 14,
  },
  resultText: { 
    fontSize: 13, 
    color: '#282c3f', 
    fontFamily: BaseFonts.medium,
  },
});