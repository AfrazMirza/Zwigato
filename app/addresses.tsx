// import React, { useState } from 'react';
// import { 
//   StyleSheet, 
//   View, 
//   Text, 
//   ScrollView, 
//   TouchableOpacity, 
//   TextInput, 
//   Dimensions, 
//   Alert 
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { BaseFonts } from '@/constants/BaseFonts';

// const { width } = Dimensions.get('window');

// // ── TYPES DEFINITIONS FOR ENTERPRISE DATA ARCHITECTURE ──
// interface AddressItem {
//   id: string;
//   name: string;
//   mobile: string;
//   pincode: string;
//   state: string;
//   houseDetails: string;
//   areaDetails: string;
//   locality: string;
//   city: string;
//   type: 'Home' | 'Office';
//   openOnSaturday?: boolean;
//   openOnSunday?: boolean;
//   isDefault: boolean;
// }

// export default function AddressManagementSystem() {
//   const router = useRouter();

//   // ── CORE ENGINE STATES ──
//   // Current screen display control states: 'LIST' | 'FORM'
//   const [currentView, setCurrentView] = useState<'LIST' | 'FORM'>('LIST');
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Initial Seed Data mirroring image references (1000146596.jpg)
//   const [addresses, setAddresses] = useState<AddressItem[]>([
//     {
//       id: 'addr_1',
//       name: 'afraz',
//       mobile: '7410972065',
//       pincode: '324005',
//       state: 'RAJASTHAN',
//       houseDetails: 'Malwa Heights, Near Noori jama masjid road',
//       areaDetails: 'Aman Colony',
//       locality: 'Aman Colony',
//       city: 'KOTA',
//       type: 'Office',
//       isDefault: true,
//     },
//     {
//       id: 'addr_2',
//       name: 'afraz',
//       mobile: '7410972065',
//       pincode: '324009',
//       state: 'RAJASTHAN',
//       houseDetails: '8-D-8, Talwandi',
//       areaDetails: 'DAV public school',
//       locality: 'Talwandi',
//       city: 'KOTA',
//       type: 'Home',
//       isDefault: false,
//     }
//   ]);

//   // ── FORM COMPONENT INPUT CONTROL STATES ──
//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     pincode: '',
//     state: 'RAJASTHAN',
//     houseDetails: '',
//     areaDetails: '',
//     locality: '',
//     city: '',
//     type: 'Home' as 'Home' | 'Office',
//     openOnSaturday: false,
//     openOnSunday: false,
//     isDefault: false,
//   });

//   // ── FORM STATE MANAGEMENT METHOD CONTROLS ──
//   const resetFormState = () => {
//     setFormData({
//       name: '',
//       mobile: '',
//       pincode: '',
//       state: 'RAJASTHAN',
//       houseDetails: '',
//       areaDetails: '',
//       locality: '',
//       city: '',
//       type: 'Home',
//       openOnSaturday: false,
//       openOnSunday: false,
//       isDefault: false,
//     });
//     setEditingId(null);
//   };

//   const handleEditTrigger = (item: AddressItem) => {
//     setEditingId(item.id);
//     setFormData({ ...item });
//     setCurrentView('FORM');
//   };

//   const handleDeleteTrigger = (id: string) => {
//     Alert.alert('Delete Address', 'Are you sure you want to remove this delivery location?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => {
//           const filtered = addresses.filter(item => item.id !== id);
//           // Auto adjustment: If deleted item was default, pick next fallback if available
//           if (filtered.length > 0 && !filtered.some(i => i.isDefault)) {
//             filtered[0].isDefault = true;
//           }
//           setAddresses(filtered);
//         }
//       }
//     ]);
//   };

//   const handleMarkDefault = (id: string) => {
//     setAddresses(prev => prev.map(item => ({
//       ...item,
//       isDefault: item.id === id
//     })));
//   };

//   const handleSaveFormSubmission = () => {
//     // Strict Validation Rule Checks (All mandatory fields mapped via Image references)
//     if (!formData.name.trim() || !formData.mobile.trim() || !formData.pincode.trim() || 
//         !formData.houseDetails.trim() || !formData.areaDetails.trim() || 
//         !formData.locality.trim() || !formData.city.trim()) {
//       Alert.alert('Validation Error', 'Please enter all necessary starred mandatory fields.');
//       return;
//     }

//     let updatedAddresses = [...addresses];

//     if (formData.isDefault) {
//       updatedAddresses = updatedAddresses.map(item => ({ ...item, isDefault: false }));
//     }

//     if (editingId) {
//       // Editing Mode Array Map Pipeline
//       updatedAddresses = updatedAddresses.map(item => 
//         item.id === editingId ? { ...formData, id: editingId } : item
//       );
//     } else {
//       // Insertion Mode Push Pipeline
//       const newAddress: AddressItem = {
//         ...formData,
//         id: 'addr_' + Date.now(),
//         isDefault: addresses.length === 0 ? true : formData.isDefault
//       };
//       updatedAddresses.push(newAddress);
//     }

//     setAddresses(updatedAddresses);
//     resetFormState();
//     setCurrentView('LIST');
//   };

//   return (
//     <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      
//       {/* HEADER segment matching e-commerce routing rules */}
//       <View style={styles.header}>
//         <View style={styles.headerLeftContainer}>
//           <TouchableOpacity onPress={() => currentView === 'FORM' ? setCurrentView('LIST') : router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#1e1e1e" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>
//             {currentView === 'FORM' ? 'ADDRESS' : 'ADDRESSES'}
//           </Text>
//         </View>
//         {currentView === 'LIST' && addresses.length > 0 && (
//           <TouchableOpacity onPress={() => { resetFormState(); setCurrentView('FORM'); }}>
//             <Text style={styles.headerActionBtn}>+ Add Address</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* ── STATE VALUE CONDITIONS MATRIX ENGINE RENDERERS ── */}
//       {currentView === 'LIST' ? (
//         addresses.length === 0 ? (
//           /* SECTION 1: EMPTY CONTAINER STATE (1000146586.jpg REFERENCE MAPPED) */
//           <View style={styles.emptyContainer}>
//             <View style={styles.emptyBookCard}>
//               <Ionicons name="book-outline" size={80} color="#a0b8d0" />
//               <View style={styles.bookIndexLineWrap}>
//                 <View style={[styles.indexTab, { top: 12 }]} />
//                 <View style={[styles.indexTab, { top: 26 }]} />
//                 <View style={[styles.indexTab, { top: 40 }]} />
//               </View>
//             </View>
//             <Text style={styles.emptyTitle}>You have no addresses</Text>
//             <Text style={styles.emptySub}>Add an address for a faster checkout experience</Text>
//             <TouchableOpacity 
//               style={styles.emptyAddBtn}
//               activeOpacity={0.9}
//               onPress={() => { resetFormState(); setCurrentView('FORM'); }}
//             >
//               <Text style={styles.emptyAddBtnText}>+ Add Address</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           /* SECTION 2: DATAGRID LIST VIEW STATE (1000146596.jpg REFERENCE MAPPED) */
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListPadding}>
            
//             {/* Filtering extraction for DEFAULT block targets */}
//             {addresses.filter(item => item.isDefault).map((item) => (
//               <View key={item.id} style={{ marginBottom: 20 }}>
//                 <Text style={styles.listSectionLabel}>Default Address</Text>
//                 <View style={styles.addressCard}>
//                   <View style={styles.badgeContainer}>
//                     <Text style={styles.defaultBadge}>DEFAULT</Text>
//                   </View>
//                   <Text style={styles.cardNameLabel}>{item.name}</Text>
//                   <Text style={styles.cardAddressBody}>
//                     {item.houseDetails}, {item.areaDetails}, {item.locality}, {item.city}, {item.state} - {item.pincode}
//                   </Text>
//                   <Text style={styles.cardPhoneBody}>Phone : {item.mobile}</Text>
                  
//                   <View style={styles.cardActionsRow}>
//                     <TouchableOpacity onPress={() => handleDeleteTrigger(item.id)}>
//                       <Text style={[styles.actionLinkText, { color: '#d9383a' }]}>Delete</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleEditTrigger(item)}>
//                       <Text style={[styles.actionLinkText, { color: '#0288d1', marginLeft: 24 }]}>Edit</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             ))}

//             {/* Filtering extraction for ALL OTHER non-default lists */}
//             <Text style={styles.listSectionLabel}>All Address</Text>
//             {addresses.filter(item => !item.isDefault).map((item) => (
//               <View key={item.id} style={styles.addressCard}>
//                 <Text style={styles.cardNameLabel}>{item.name}</Text>
//                 <Text style={styles.cardAddressBody}>
//                   {item.houseDetails}, {item.areaDetails}, {item.locality}, {item.city}, {item.state} - {item.pincode}
//                 </Text>
//                 <Text style={styles.cardPhoneBody}>Phone : {item.mobile}</Text>
                
//                 <View style={styles.cardActionsRow}>
//                   <TouchableOpacity onPress={() => handleDeleteTrigger(item.id)}>
//                     <Text style={[styles.actionLinkText, { color: '#d9383a' }]}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => handleEditTrigger(item)}>
//                     <Text style={[styles.actionLinkText, { color: '#0288d1', marginLeft: 24 }]}>Edit</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => handleMarkDefault(item.id)}>
//                     <Text style={[styles.actionLinkText, { color: '#00875a', marginLeft: 24 }]}>Mark default</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         )
//       ) : (
//         /* SECTION 3: FORM FACTOR INPUT MATRIX STATE (1000146594.jpg REFERENCE MAPPED) */
//         <View style={{ flex: 1 }}>
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainerScroll}>
//             <Text style={styles.formSectionLabel}>ADD NEW ADDRESS</Text>
            
//             {/* Input Fields Stack Elements Grid layout */}
//             <Text style={styles.inputTitleText}>Name *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               value={formData.name} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, name: txt }))}
//             />

//             <Text style={styles.inputTitleText}>Mobile *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               keyboardType="phone-pad"
//               maxLength={10}
//               value={formData.mobile} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, mobile: txt }))}
//             />

//             {/* Side-by-Side Horizontal Parallel Flex Blocks */}
//             <View style={styles.horizontalGridRow}>
//               <View style={{ width: '47%' }}>
//                 <Text style={styles.inputTitleText}>Pincode *</Text>
//                 <TextInput 
//                   style={styles.formInputField} 
//                   keyboardType="number-pad"
//                   maxLength={6}
//                   value={formData.pincode} 
//                   onChangeText={(txt) => setFormData(p => ({ ...p, pincode: txt }))}
//                 />
//               </View>
//               <View style={{ width: '47%' }}>
//                 <Text style={styles.inputTitleText}>State *</Text>
//                 <TextInput 
//                   style={[styles.formInputField, styles.disabledInputField]} 
//                   editable={false}
//                   value={formData.state}
//                 />
//               </View>
//             </View>

//             <Text style={styles.inputTitleText}>House Number/Tower/Block *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               value={formData.houseDetails} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, houseDetails: txt }))}
//             />

//             <Text style={styles.inputTitleText}>Address (Building, Street, Area) *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               value={formData.areaDetails} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, areaDetails: txt }))}
//             />

//             <Text style={styles.inputTitleText}>Locality/ Town *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               value={formData.locality} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, locality: txt }))}
//             />

//             <Text style={styles.inputTitleText}>City/ District *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               value={formData.city} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, city: txt }))}
//             />

//             {/* RADIO ELEMENT TOGGLE SYSTEM BOUNDS */}
//             <Text style={[styles.inputTitleText, { marginTop: 18 }]}>Type of Address *</Text>
//             <View style={styles.radioGroupRow}>
//               <TouchableOpacity 
//                 style={styles.radioSelectorRow} 
//                 activeOpacity={0.8}
//                 onPress={() => setFormData(p => ({ ...p, type: 'Home' }))}
//               >
//                 <View style={styles.radioOuterRing}>
//                   {formData.type === 'Home' && <View style={styles.radioInnerDot} />}
//                 </View>
//                 <Text style={styles.radioLabelText}>Home</Text>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.radioSelectorRow, { marginLeft: 30 }]} 
//                 activeOpacity={0.8}
//                 onPress={() => setFormData(p => ({ ...p, type: 'Office' }))}
//               >
//                 <View style={styles.radioOuterRing}>
//                   {formData.type === 'Office' && <View style={styles.radioInnerDot} />}
//                 </View>
//                 <Text style={styles.radioLabelText}>Office</Text>
//               </TouchableOpacity>
//             </View>

//             {/* ── CONDITIONAL SUB-FORM BLOCK (OFFICE VERIFICATION MATRIX) ── */}
//             {formData.type === 'Office' && (
//               <View style={styles.officeConditionalBox}>
//                 <Text style={styles.conditionalHeading}>Is your office open on weekends?</Text>
                
//                 <TouchableOpacity 
//                   style={styles.checkboxWrapperRow}
//                   activeOpacity={0.8}
//                   onPress={() => setFormData(p => ({ ...p, openOnSaturday: !p.openOnSaturday }))}
//                 >
//                   <View style={[styles.checkboxSquare, formData.openOnSaturday && styles.checkboxSquareChecked]}>
//                     {formData.openOnSaturday && <Ionicons name="checkmark" size={14} color="#FFF" />}
//                   </View>
//                   <Text style={styles.checkboxLabelText}>Open on Saturday</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity 
//                   style={styles.checkboxWrapperRow}
//                   activeOpacity={0.8}
//                   onPress={() => setFormData(p => ({ ...p, openOnSunday: !p.openOnSunday }))}
//                 >
//                   <View style={[styles.checkboxSquare, formData.openOnSunday && styles.checkboxSquareChecked]}>
//                     {formData.openOnSunday && <Ionicons name="checkmark" size={14} color="#FFF" />}
//                   </View>
//                   <Text style={styles.checkboxLabelText}>Open on Sunday</Text>
//                 </TouchableOpacity>
//               </View>
//             )}

//             {/* DEFAULT SWITCH CHECKBOX COMPONENT RENDERING POINTERS */}
//             <TouchableOpacity 
//               style={[styles.checkboxWrapperRow, { marginTop: 24, paddingLeft: 2 }]}
//               activeOpacity={0.8}
//               onPress={() => setFormData(p => ({ ...p, isDefault: !p.isDefault }))}
//             >
//               <View style={[styles.checkboxSquare, formData.isDefault && styles.checkboxSquareChecked]}>
//                 {formData.isDefault && <Ionicons name="checkmark" size={14} color="#FFF" />}
//               </View>
//               <Text style={[styles.checkboxLabelText, { fontFamily: BaseFonts.medium, color: '#282c3f' }]}>
//                 Make this as my default address
//               </Text>
//             </TouchableOpacity>

//           </ScrollView>

//           {/* BOTTOM DOUBLE BAR CONTROL REGION FOOTER SPLITS (1000146594.jpg SPLIT ACCURACY) */}
//           <View style={styles.formFooterActionsRow}>
//             <TouchableOpacity style={styles.footerCancelBtn} onPress={() => setCurrentView('LIST')}>
//               <Text style={styles.footerCancelBtnText}>CANCEL</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.footerSaveBtn} onPress={handleSaveFormSubmission}>
//               <Text style={styles.footerSaveBtnText}>SAVE</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// // ─── HIGH RESPONSIVE PIXEL PERFECT ARCHITECTURE STYLES ────────────────────────────
// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: '#fdfdfd' },
//   header: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     backgroundColor: '#FFFFFF',
//   },
//   headerLeftContainer: { flexDirection: 'row', alignItems: 'center' },
//   headerTitle: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#1e1e1e', marginLeft: 14, letterSpacing: 0.3 },
//   headerActionBtn: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#0288d1' },

//   // 1. Empty States Design Config Components
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, backgroundColor: '#F9FAFB' },
//   emptyBookCard: {
//     width: 110,
//     height: 120,
//     borderRadius: 12,
//     borderWidth: 3,
//     borderColor: '#1e1e1e',
//     backgroundColor: '#dce8f4',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     marginBottom: 24,
//   },
//   bookIndexLineWrap: { position: 'absolute', right: -3, top: 0, bottom: 0, width: 12, justifyContent: 'center' },
//   indexTab: { position: 'absolute', right: 0, width: 8, height: 10, borderWidth: 2, borderColor: '#1e1e1e', borderLeftWidth: 0, backgroundColor: '#dce8f4', borderTopRightRadius: 4, borderBottomRightRadius: 4 },
//   emptyTitle: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#111827', marginBottom: 6, textAlign: 'center' },
//   emptySub: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#6b7280', textAlign: 'center', marginBottom: 28, lineHeight: 18 },
//   emptyAddBtn: { width: width - 62, height: 48, backgroundColor: '#000000', borderRadius: 8, justifyContent: 'center', alignItems: 'center', elevation: 2 },
//   emptyAddBtnText: { color: '#FFFFFF', fontSize: 13, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },

//   // 2. Data Lists Scroll Layout Configurations 
//   scrollListPadding: { padding: 16, paddingBottom: 60 },
//   listSectionLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', marginBottom: 12, marginTop: 4, letterSpacing: 0.2 },
//   addressCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: '#ececec', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
//   badgeContainer: { flexDirection: 'row', marginBottom: 8 },
//   defaultBadge: { backgroundColor: '#00875a', color: '#FFFFFF', fontSize: 9, fontFamily: BaseFonts.bold, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
//   cardNameLabel: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f', marginBottom: 6 },
//   cardAddressBody: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 18, marginBottom: 6 },
//   cardPhoneBody: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#282c3f', marginBottom: 14 },
//   cardActionsRow: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#f0f0f0', paddingTop: 12 },
//   actionLinkText: { fontSize: 12, fontFamily: BaseFonts.bold, letterSpacing: 0.3 },

//   // 3. Complete Form Structure Layout Configuration Bounds
//   formContainerScroll: { padding: 20, paddingBottom: 120, backgroundColor: '#FFFFFF' },
//   formSectionLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.6, marginBottom: 16 },
//   inputTitleText: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#7e818c', marginTop: 14, marginBottom: 4 },
//   formInputField: { height: 40, borderBottomWidth: 1, borderBottomColor: '#dbdbdb', fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f', paddingVertical: 4 },
//   disabledInputField: { color: '#9496a2', borderBottomColor: '#eeeeee' },
//   horizontalGridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  
//   // Radio Elements Components Blueprint Styling
//   radioGroupRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
//   radioSelectorRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
//   radioOuterRing: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center' },
//   radioInnerDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff3f6c' },
//   radioLabelText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#282c3f', marginLeft: 8 },

//   // Conditional Office Framework Styling View Bounds
//   officeConditionalBox: { marginTop: 14, backgroundColor: '#f9f9f9', padding: 14, borderRadius: 8, borderWidth: 0.5, borderColor: '#eaeaea' },
//   conditionalHeading: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#535766', marginBottom: 10 },
//   checkboxWrapperRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
//   checkboxSquare: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
//   checkboxSquareChecked: { backgroundColor: '#ff3f6c' },
//   checkboxLabelText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', marginLeft: 10 },

//   // Double Button Split Fixed Sticky Footer Panel View Matrix
//   formFooterActionsRow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#FFFFFF' },
//   footerCancelBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
//   footerCancelBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
//   footerSaveBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff3f6c' },
//   footerSaveBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#FFFFFF', letterSpacing: 0.5 },
// });

import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Dimensions, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BaseFonts } from '@/constants/BaseFonts';

const { width } = Dimensions.get('window');

interface AddressItem {
  id: string;
  name: string;
  mobile: string;
  pincode: string;
  state: string;
  houseDetails: string;
  areaDetails: string;
  locality: string;
  city: string;
  type: 'Home' | 'Office';
  openOnSaturday?: boolean;
  openOnSunday?: boolean;
  isDefault: boolean;
}

export default function AddressManagementSystem() {
  const router = useRouter();

  // ── CORE ENGINE STATES ──
  const [currentView, setCurrentView] = useState<'LIST' | 'FORM'>('LIST');
  const [editingId, setEditingId] = useState<string | null>(null);

  // POINT 1: Starts completely empty. Dynamic empty modal logic hooks until items are present
  const [addresses, setAddresses] = useState<AddressItem[]>([]);

  // ── FORM COMPONENT INPUT CONTROL STATES ──
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    state: '', 
    houseDetails: '',
    areaDetails: '',
    locality: '',
    city: '',
    type: 'Home' as 'Home' | 'Office',
    openOnSaturday: false,
    openOnSunday: false,
    isDefault: false,
  });

  // Check variables for layout extraction
  const hasDefaultAddress = addresses.some(item => item.isDefault);
  const defaultAddressesList = addresses.filter(item => item.isDefault);
  const regularAddressesList = addresses.filter(item => !item.isDefault);

  const resetFormState = () => {
    setFormData({
      name: '',
      mobile: '',
      pincode: '',
      state: '', 
      houseDetails: '',
      areaDetails: '',
      locality: '',
      city: '',
      type: 'Home',
      openOnSaturday: false,
      openOnSunday: false,
      isDefault: false,
    });
    setEditingId(null);
  };

  const handleEditTrigger = (item: AddressItem) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setCurrentView('FORM');
  };

  const handleDeleteTrigger = (id: string) => {
    Alert.alert('Delete Address', 'Are you sure you want to remove this delivery location?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const filtered = addresses.filter(item => item.id !== id);
          setAddresses(filtered);
        }
      }
    ]);
  };

  const handleMarkDefault = (id: string) => {
    setAddresses(prev => prev.map(item => ({
      ...item,
      isDefault: item.id === id
    })));
  };

  const handleSaveFormSubmission = () => {
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.pincode.trim() || 
        !formData.state.trim() || !formData.houseDetails.trim() || !formData.areaDetails.trim() || 
        !formData.locality.trim() || !formData.city.trim()) {
      Alert.alert('Validation Error', 'Please enter all necessary starred mandatory fields.');
      return;
    }

    let updatedAddresses = [...addresses];

    // If current being saved is marked default, unset previously set defaults
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map(item => ({ ...item, isDefault: false }));
    }

    if (editingId) {
      updatedAddresses = updatedAddresses.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      );
    } else {
      const newAddress: AddressItem = {
        ...formData,
        id: 'addr_' + Date.now(),
        // If it's the first address ever, make it default automatically if not selected
        isDefault: addresses.length === 0 ? true : formData.isDefault
      };
      updatedAddresses.push(newAddress);
    }

    setAddresses(updatedAddresses);
    resetFormState();
    setCurrentView('LIST');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      
      {/* HEADER: POINT 3 FIX - Back button returns to list view from form view locally */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={() => currentView === 'FORM' ? setCurrentView('LIST') : router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1e1e1e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentView === 'FORM' ? 'ADDRESS' : 'ADDRESSES'}
          </Text>
        </View>
        {currentView === 'LIST' && addresses.length > 0 && (
          <TouchableOpacity onPress={() => { resetFormState(); setCurrentView('FORM'); }}>
            <Text style={styles.headerActionBtn}>+ Add Address</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── SPLIT VIEW CONDITIONAL FRAMEWORK ── */}
      {currentView === 'LIST' ? (
        addresses.length === 0 ? (
          /* SECTION 1: EMPTY MODAL STATE - Show until items are saved or if all deleted */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyBookCard}>
              <Ionicons name="book-outline" size={80} color="#a0b8d0" />
              <View style={styles.bookIndexLineWrap}>
                <View style={[styles.indexTab, { top: 12 }]} />
                <View style={[styles.indexTab, { top: 26 }]} />
                <View style={[styles.indexTab, { top: 40 }]} />
              </View>
            </View>
            <Text style={styles.emptyTitle}>You have no addresses</Text>
            <Text style={styles.emptySub}>Add an address for a faster checkout experience</Text>
            <TouchableOpacity 
              style={styles.emptyAddBtn}
              activeOpacity={0.9}
              onPress={() => { resetFormState(); setCurrentView('FORM'); }}
            >
              <Text style={styles.emptyAddBtnText}>+ Add Address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* SECTION 2: DATAGRID LIST VIEW STATE */
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListPadding}>
            
            {/* POINT 2 FIX: Hide default address section entirely if no default selected */}
            {hasDefaultAddress && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.listSectionLabel}>Default Address</Text>
                {defaultAddressesList.map((item) => (
                  <View key={item.id} style={styles.addressCard}>
                    <View style={styles.badgeContainer}>
                      <Text style={styles.defaultBadge}>DEFAULT</Text>
                    </View>
                    <Text style={styles.cardNameLabel}>{item.name}</Text>
                    <Text style={styles.cardAddressBody}>
                      {item.houseDetails}, {item.areaDetails}, {item.locality}, {item.city}, {item.state} - {item.pincode}
                    </Text>
                    <Text style={styles.cardPhoneBody}>Phone : {item.mobile}</Text>
                    
                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity onPress={() => handleDeleteTrigger(item.id)}>
                        <Text style={[styles.actionLinkText, { color: '#d9383a' }]}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleEditTrigger(item)}>
                        <Text style={[styles.actionLinkText, { color: '#0288d1', marginLeft: 24 }]}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* ALL OTHER ADDRESSES LIST BLOCK */}
            {regularAddressesList.length > 0 && (
              <View style={{ marginTop: 6 }}>
                <Text style={styles.listSectionLabel}>All Address</Text>
                {regularAddressesList.map((item) => (
                  <View key={item.id} style={styles.addressCard}>
                    <Text style={styles.cardNameLabel}>{item.name}</Text>
                    <Text style={styles.cardAddressBody}>
                      {item.houseDetails}, {item.areaDetails}, {item.locality}, {item.city}, {item.state} - {item.pincode}
                    </Text>
                    <Text style={styles.cardPhoneBody}>Phone : {item.mobile}</Text>
                    
                    <View style={styles.cardActionsRow}>
                      <TouchableOpacity onPress={() => handleDeleteTrigger(item.id)}>
                        <Text style={[styles.actionLinkText, { color: '#d9383a' }]}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleEditTrigger(item)}>
                        <Text style={[styles.actionLinkText, { color: '#0288d1', marginLeft: 24 }]}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleMarkDefault(item.id)}>
                        <Text style={[styles.actionLinkText, { color: '#00875a', marginLeft: 24 }]}>Mark default</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        )
      ) : (
        /* SECTION 3: FORM FACTOR INPUT MATRIX STATE */
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainerScroll}>
            <Text style={styles.formSectionLabel}>ADD NEW ADDRESS</Text>
            
            <Text style={styles.inputTitleText}>Name *</Text>
            <TextInput 
              style={styles.formInputField} 
              value={formData.name} 
              onChangeText={(txt) => setFormData(p => ({ ...p, name: txt }))}
            />

            <Text style={styles.inputTitleText}>Mobile *</Text>
            <TextInput 
              style={styles.formInputField} 
              keyboardType="phone-pad"
              maxLength={10}
              value={formData.mobile} 
              onChangeText={(txt) => setFormData(p => ({ ...p, mobile: txt }))}
            />

            <View style={styles.horizontalGridRow}>
              <View style={{ width: '47%' }}>
                <Text style={styles.inputTitleText}>Pincode *</Text>
                <TextInput 
                  style={styles.formInputField} 
                  keyboardType="number-pad"
                  maxLength={6}
                  value={formData.pincode} 
                  onChangeText={(txt) => setFormData(p => ({ ...p, pincode: txt }))}
                />
              </View>
              <View style={{ width: '47%' }}>
                <Text style={styles.inputTitleText}>State *</Text>
                <TextInput 
                  style={styles.formInputField} 
                  value={formData.state}
                  placeholder="e.g. RAJASTHAN"
                  placeholderTextColor="#a9a9a9"
                  onChangeText={(txt) => setFormData(p => ({ ...p, state: txt }))}
                />
              </View>
            </View>

            <Text style={styles.inputTitleText}>House Number/Tower/Block *</Text>
            <TextInput 
              style={styles.formInputField} 
              value={formData.houseDetails} 
              onChangeText={(txt) => setFormData(p => ({ ...p, houseDetails: txt }))}
            />

            <Text style={styles.inputTitleText}>Address (Building, Street, Area) *</Text>
            <TextInput 
              style={styles.formInputField} 
              value={formData.areaDetails} 
              onChangeText={(txt) => setFormData(p => ({ ...p, areaDetails: txt }))}
            />

            <Text style={styles.inputTitleText}>Locality/ Town *</Text>
            <TextInput 
              style={styles.formInputField} 
              value={formData.locality} 
              onChangeText={(txt) => setFormData(p => ({ ...p, locality: txt }))}
            />

            <Text style={styles.inputTitleText}>City/ District *</Text>
            <TextInput 
              style={styles.formInputField} 
              value={formData.city} 
              onChangeText={(txt) => setFormData(p => ({ ...p, city: txt }))}
            />

            <Text style={[styles.inputTitleText, { marginTop: 18 }]}>Type of Address *</Text>
            <View style={styles.radioGroupRow}>
              <TouchableOpacity 
                style={styles.radioSelectorRow} 
                activeOpacity={0.8}
                onPress={() => setFormData(p => ({ ...p, type: 'Home' }))}
              >
                <View style={styles.radioOuterRing}>
                  {formData.type === 'Home' && <View style={styles.radioInnerDot} />}
                </View>
                <Text style={styles.radioLabelText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioSelectorRow, { marginLeft: 30 }]} 
                activeOpacity={0.8}
                onPress={() => setFormData(p => ({ ...p, type: 'Office' }))}
              >
                <View style={styles.radioOuterRing}>
                  {formData.type === 'Office' && <View style={styles.radioInnerDot} />}
                </View>
                <Text style={styles.radioLabelText}>Office</Text>
              </TouchableOpacity>
            </View>

            {formData.type === 'Office' && (
              <View style={styles.officeConditionalBox}>
                <Text style={styles.conditionalHeading}>Is your office open on weekends?</Text>
                
                <TouchableOpacity 
                  style={styles.checkboxWrapperRow}
                  activeOpacity={0.8}
                  onPress={() => setFormData(p => ({ ...p, openOnSaturday: !p.openOnSaturday }))}
                >
                  <View style={[styles.checkboxSquare, formData.openOnSaturday && styles.checkboxSquareChecked]}>
                    {formData.openOnSaturday && <Ionicons name="checkmark" size={14} color="#FFF" />}
                  </View>
                  <Text style={styles.checkboxLabelText}>Open on Saturday</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.checkboxWrapperRow}
                  activeOpacity={0.8}
                  onPress={() => setFormData(p => ({ ...p, openOnSunday: !p.openOnSunday }))}
                >
                  <View style={[styles.checkboxSquare, formData.openOnSunday && styles.checkboxSquareChecked]}>
                    {formData.openOnSunday && <Ionicons name="checkmark" size={14} color="#FFF" />}
                  </View>
                  <Text style={styles.checkboxLabelText}>Open on Sunday</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.checkboxWrapperRow, { marginTop: 24, paddingLeft: 2 }]}
              activeOpacity={0.8}
              onPress={() => setFormData(p => ({ ...p, isDefault: !p.isDefault }))}
            >
              <View style={[styles.checkboxSquare, formData.isDefault && styles.checkboxSquareChecked]}>
                {formData.isDefault && <Ionicons name="checkmark" size={14} color="#FFF" />}
              </View>
              <Text style={[styles.checkboxLabelText, { fontFamily: BaseFonts.medium, color: '#282c3f' }]}>
                Make this as my default address
              </Text>
            </TouchableOpacity>

          </ScrollView>

          <View style={styles.formFooterActionsRow}>
            <TouchableOpacity style={styles.footerCancelBtn} onPress={() => setCurrentView('LIST')}>
              <Text style={styles.footerCancelBtnText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerSaveBtn} onPress={handleSaveFormSubmission}>
              <Text style={styles.footerSaveBtnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fdfdfd' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
  },
  headerLeftContainer: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#1e1e1e', marginLeft: 14, letterSpacing: 0.3 },
  headerActionBtn: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#0288d1' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, backgroundColor: '#F9FAFB' },
  emptyBookCard: {
    width: 110,
    height: 120,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#1e1e1e',
    backgroundColor: '#dce8f4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  bookIndexLineWrap: { position: 'absolute', right: -3, top: 0, bottom: 0, width: 12, justifyContent: 'center' },
  indexTab: { position: 'absolute', right: 0, width: 8, height: 10, borderWidth: 2, borderColor: '#1e1e1e', borderLeftWidth: 0, backgroundColor: '#dce8f4', borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  emptyTitle: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#111827', marginBottom: 6, textAlign: 'center' },
  emptySub: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#6b7280', textAlign: 'center', marginBottom: 28, lineHeight: 18 },
  emptyAddBtn: { width: width - 62, height: 48, backgroundColor: '#000000', borderRadius: 8, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  emptyAddBtnText: { color: '#FFFFFF', fontSize: 13, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },

  scrollListPadding: { padding: 16, paddingBottom: 60 },
  listSectionLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', marginBottom: 12, marginTop: 4, letterSpacing: 0.2 },
  addressCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: '#ececec', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  badgeContainer: { flexDirection: 'row', marginBottom: 8 },
  defaultBadge: { backgroundColor: '#00875a', color: '#FFFFFF', fontSize: 9, fontFamily: BaseFonts.bold, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  cardNameLabel: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f', marginBottom: 6 },
  cardAddressBody: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 18, marginBottom: 6 },
  cardPhoneBody: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#282c3f', marginBottom: 14 },
  cardActionsRow: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#f0f0f0', paddingTop: 12 },
  actionLinkText: { fontSize: 12, fontFamily: BaseFonts.bold, letterSpacing: 0.3 },

  formContainerScroll: { padding: 20, paddingBottom: 120, backgroundColor: '#FFFFFF' },
  formSectionLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.6, marginBottom: 16 },
  inputTitleText: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#7e818c', marginTop: 14, marginBottom: 4 },
  formInputField: { height: 40, borderBottomWidth: 1, borderBottomColor: '#dbdbdb', fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f', paddingVertical: 4 },
  horizontalGridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  
  radioGroupRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  radioSelectorRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  radioOuterRing: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center' },
  radioInnerDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff3f6c' },
  radioLabelText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#282c3f', marginLeft: 8 },

  officeConditionalBox: { marginTop: 14, backgroundColor: '#f9f9f9', padding: 14, borderRadius: 8, borderWidth: 0.5, borderColor: '#eaeaea' },
  conditionalHeading: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#535766', marginBottom: 10 },
  checkboxWrapperRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  checkboxSquare: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  checkboxSquareChecked: { backgroundColor: '#ff3f6c' },
  checkboxLabelText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', marginLeft: 10 },

  formFooterActionsRow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#FFFFFF' },
  footerCancelBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  footerCancelBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
  footerSaveBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff3f6c' },
  footerSaveBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#FFFFFF', letterSpacing: 0.5 },
});