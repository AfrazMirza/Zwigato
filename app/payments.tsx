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

// interface CardItem {
//   id: string;
//   cardHolder: string;
//   cardNumber: string;
//   expiryDate: string;
//   cardType: 'Visa' | 'Mastercard' | 'Rupay';
//   isDefault: boolean;
// }

// export default function PaymentMethodManagement() {
//   const router = useRouter();

//   // ── CORE ENGINE DISPLAY CONTROLS ──
//   const [currentView, setCurrentView] = useState<'LIST' | 'FORM'>('LIST');
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Initial state opens with empty array condition for modal view
//   const [cards, setCards] = useState<CardItem[]>([]);

//   // ── FORM DATA INPUT CONTROL STATES ──
//   const [formData, setFormData] = useState({
//     cardHolder: '',
//     cardNumber: '',
//     expiryDate: '',
//     cardType: 'Visa' as 'Visa' | 'Mastercard' | 'Rupay',
//     isDefault: false,
//   });

//   const hasDefaultCard = cards.some(item => item.isDefault);
//   const defaultCardsList = cards.filter(item => item.isDefault);
//   const regularCardsList = cards.filter(item => !item.isDefault);

//   const resetFormState = () => {
//     setFormData({
//       cardHolder: '',
//       cardNumber: '',
//       expiryDate: '',
//       cardType: 'Visa',
//       isDefault: false,
//     });
//     setEditingId(null);
//   };

//   // Helper utility to mask standard card numbers for privacy UI
//   const maskCardNumber = (num: string) => {
//     const cleaned = num.replace(/\s?/g, '');
//     if (cleaned.length < 4) return num;
//     const lastFour = cleaned.slice(-4);
//     return `XXXX XXXX XXXX ${lastFour}`;
//   };

//   const handleEditTrigger = (item: CardItem) => {
//     setEditingId(item.id);
//     setFormData({ ...item });
//     setCurrentView('FORM');
//   };

//   const handleDeleteTrigger = (id: string) => {
//     Alert.alert('Remove Card', 'Are you sure you want to delete this saved card profile?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => {
//           const filtered = cards.filter(item => item.id !== id);
//           setCards(filtered);
//         }
//       }
//     ]);
//   };

//   const handleMarkDefault = (id: string) => {
//     setCards(prev => prev.map(item => ({
//       ...item,
//       isDefault: item.id === id
//     })));
//   };

//   const handleSaveFormSubmission = () => {
//     const { cardHolder, cardNumber, expiryDate } = formData;
    
//     if (!cardHolder.trim() || !cardNumber.trim() || !expiryDate.trim()) {
//       Alert.alert('Validation Error', 'Please complete all card details before saving.');
//       return;
//     }

//     if (cardNumber.replace(/\s/g, '').length < 16) {
//       Alert.alert('Validation Error', 'Please enter a valid 16-digit card number.');
//       return;
//     }

//     let updatedCards = [...cards];

//     if (formData.isDefault) {
//       updatedCards = updatedCards.map(item => ({ ...item, isDefault: false }));
//     }

//     if (editingId) {
//       updatedCards = updatedCards.map(item => 
//         item.id === editingId ? { ...formData, id: editingId } : item
//       );
//     } else {
//       const newCard: CardItem = {
//         ...formData,
//         id: 'card_' + Date.now(),
//         isDefault: cards.length === 0 ? true : formData.isDefault
//       };
//       updatedCards.push(newCard);
//     }

//     setCards(updatedCards);
//     resetFormState();
//     setCurrentView('LIST');
//   };

//   return (
//     <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      
//       {/* HEADER SECTION */}
//       <View style={styles.header}>
//         <View style={styles.headerLeftContainer}>
//           <TouchableOpacity onPress={() => currentView === 'FORM' ? setCurrentView('LIST') : router.back()}>
//             <Ionicons name="arrow-back" size={24} color="#1e1e1e" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>
//             {currentView === 'FORM' ? 'ADD NEW CARD' : 'SAVED CARDS'}
//           </Text>
//         </View>
//         {currentView === 'LIST' && cards.length > 0 && (
//           <TouchableOpacity onPress={() => { resetFormState(); setCurrentView('FORM'); }}>
//             <Text style={styles.headerActionBtn}>+ Add Card</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* ── CONDITIONAL ROUTING MATRIX RENDERING ── */}
//       {currentView === 'LIST' ? (
//         cards.length === 0 ? (
//           /* SECTION 1: EMPTY MODAL STATE VISUAL SPLIT */
//           <View style={styles.emptyContainer}>
//             <View style={styles.emptyCardContainer}>
//               <Ionicons name="card-outline" size={70} color="#a0b8d0" />
//               <View style={styles.magneticStripe} />
//               <View style={styles.chipIdentityBox} />
//             </View>
//             <Text style={styles.emptyTitle}>You have no saved cards</Text>
//             <Text style={styles.emptySub}>Save your debit or credit cards for a faster checkout payment experience</Text>
//             <TouchableOpacity 
//               style={styles.emptyAddBtn}
//               activeOpacity={0.9}
//               onPress={() => { resetFormState(); setCurrentView('FORM'); }}
//             >
//               <Text style={styles.emptyAddBtnText}>+ Add New Card</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           /* SECTION 2: SAVED DATAGRID CARDS LIST VIEWER */
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollListPadding}>
            
//             {/* CONDITIONAL CONDISTION RENDER FOR DEFAULT CARD */}
//             {hasDefaultCard && (
//               <View style={{ marginBottom: 12 }}>
//                 <Text style={styles.listSectionLabel}>Default Payment Card</Text>
//                 {defaultCardsList.map((item) => (
//                   <View key={item.id} style={[styles.paymentCardWrapper, styles.premiumDefaultBorder]}>
//                     <View style={styles.cardHeaderRow}>
//                       <Text style={styles.cardBrandLabel}>{item.cardType.toUpperCase()}</Text>
//                       <Text style={styles.listDefaultBadgeText}>DEFAULT</Text>
//                     </View>
//                     <Text style={styles.cardNumberText}>{maskCardNumber(item.cardNumber)}</Text>
//                     <View style={styles.cardMetaFooterRow}>
//                       <View>
//                         <Text style={styles.metaLabelText}>CARD HOLDER</Text>
//                         <Text style={styles.metaValueText}>{item.cardHolder.toUpperCase()}</Text>
//                       </View>
//                       <View style={{ alignItems: 'flex-end' }}>
//                         <Text style={styles.metaLabelText}>EXPIRES</Text>
//                         <Text style={styles.metaValueText}>{item.expiryDate}</Text>
//                       </View>
//                     </View>
                    
//                     <View style={styles.actionsFooterLinkRow}>
//                       <TouchableOpacity onPress={() => handleDeleteTrigger(item.id)}>
//                         <Text style={[styles.actionLinkText, { color: '#d9383a' }]}>Remove</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleEditTrigger(item)}>
//                         <Text style={[styles.actionLinkText, { color: '#0288d1', marginLeft: 24 }]}>Edit</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             )}

//             {/* ALL OTHER REGULAR CARDS RENDER */}
//             {regularCardsList.length > 0 && (
//               <View style={{ marginTop: 8 }}>
//                 <Text style={styles.listSectionLabel}>All Saved Cards</Text>
//                 {regularCardsList.map((item) => (
//                   <View key={item.id} style={styles.paymentCardWrapper}>
//                     <View style={styles.cardHeaderRow}>
//                       <Text style={styles.cardBrandLabel}>{item.cardType.toUpperCase()}</Text>
//                     </View>
//                     <Text style={styles.cardNumberText}>{maskCardNumber(item.cardNumber)}</Text>
//                     <View style={styles.cardMetaFooterRow}>
//                       <View>
//                         <Text style={styles.metaLabelText}>CARD HOLDER</Text>
//                         <Text style={styles.metaValueText}>{item.cardHolder.toUpperCase()}</Text>
//                       </View>
//                       <View style={{ alignItems: 'flex-end' }}>
//                         <Text style={styles.metaLabelText}>EXPIRES</Text>
//                         <Text style={styles.metaValueText}>{item.expiryDate}</Text>
//                       </View>
//                     </View>
                    
//                     <View style={styles.actionsFooterLinkRow}>
//                       <TouchableOpacity onPress={() => handleDeleteTrigger(item.id)}>
//                         <Text style={[styles.actionLinkText, { color: '#d9383a' }]}>Remove</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleEditTrigger(item)}>
//                         <Text style={[styles.actionLinkText, { color: '#0288d1', marginLeft: 24 }]}>Edit</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleMarkDefault(item.id)}>
//                         <Text style={[styles.actionLinkText, { color: '#00875a', marginLeft: 24 }]}>Set Default</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </ScrollView>
//         )
//       ) : (
//         /* SECTION 3: CREDIT/DEBIT FORM FACTOR DATA MATRIX COMPONENT */
//         <View style={{ flex: 1 }}>
//           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainerScroll}>
//             <Text style={styles.formSectionLabel}>ENTER CARD DETAILS</Text>

//             <Text style={styles.inputTitleText}>Card Holder Name *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               placeholder="e.g. AFRAZ MIRZA"
//               placeholderTextColor="#a9a9a9"
//               value={formData.cardHolder} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, cardHolder: txt }))}
//             />

//             <Text style={styles.inputTitleText}>Card Number *</Text>
//             <TextInput 
//               style={styles.formInputField} 
//               keyboardType="number-pad"
//               maxLength={16}
//               placeholder="1234 5678 9876 5432"
//               placeholderTextColor="#a9a9a9"
//               value={formData.cardNumber} 
//               onChangeText={(txt) => setFormData(p => ({ ...p, cardNumber: txt.replace(/\s/g, '') }))}
//             />

//             <View style={styles.horizontalGridRow}>
//               <View style={{ width: '47%' }}>
//                 <Text style={styles.inputTitleText}>Expiry Date (MM/YY) *</Text>
//                 <TextInput 
//                   style={styles.formInputField} 
//                   maxLength={5}
//                   placeholder="12/29"
//                   placeholderTextColor="#a9a9a9"
//                   value={formData.expiryDate} 
//                   onChangeText={(txt) => setFormData(p => ({ ...p, expiryDate: txt }))}
//                 />
//               </View>
//               <View style={{ width: '47%' }}>
//                 <Text style={styles.inputTitleText}>Card Engine Network *</Text>
//                 <View style={styles.dropdownReplacementBox}>
//                   <Text style={{ fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f' }}>
//                     {formData.cardType}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* SELECTION FOR CARD ROUTING TYPES PARAMETERS */}
//             <Text style={[styles.inputTitleText, { marginTop: 18 }]}>Select Network Profile *</Text>
//             <View style={styles.radioGroupRow}>
//               {['Visa', 'Mastercard', 'Rupay'].map((typeNetwork) => (
//                 <TouchableOpacity 
//                   key={typeNetwork}
//                   style={[styles.radioSelectorRow, { marginRight: 24 }]} 
//                   activeOpacity={0.8}
//                   onPress={() => setFormData(p => ({ ...p, cardType: typeNetwork as any }))}
//                 >
//                   <View style={styles.radioOuterRing}>
//                     {formData.cardType === typeNetwork && <View style={styles.radioInnerDot} />}
//                   </View>
//                   <Text style={styles.radioLabelText}>{typeNetwork}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* DEFAULT TRIGGER CHECKBOX COMPONENT CONFIGS */}
//             <TouchableOpacity 
//               style={[styles.checkboxWrapperRow, { marginTop: 28 }]}
//               activeOpacity={0.8}
//               onPress={() => setFormData(p => ({ ...p, isDefault: !p.isDefault }))}
//             >
//               <View style={[styles.checkboxSquare, formData.isDefault && styles.checkboxSquareChecked]}>
//                 {formData.isDefault && <Ionicons name="checkmark" size={14} color="#FFF" />}
//               </View>
//               <Text style={[styles.checkboxLabelText, { fontFamily: BaseFonts.medium, color: '#282c3f' }]}>
//                 Make this my preferred default payment method
//               </Text>
//             </TouchableOpacity>

//           </ScrollView>

//           {/* BOTTOM SPLIT FOOTER ACTIONS ROWS PANEL */}
//           <View style={styles.formFooterActionsRow}>
//             <TouchableOpacity style={styles.footerCancelBtn} onPress={() => setCurrentView('LIST')}>
//               <Text style={styles.footerCancelBtnText}>CANCEL</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.footerSaveBtn} onPress={handleSaveFormSubmission}>
//               <Text style={styles.footerSaveBtnText}>SAVE CARD</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// // ─── PREMIUM SCANNABLE DESIGN SYSTEMS ARCHITECTURE STYLES ────────────────────────────
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

//   // Empty Visual Components
//   emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, backgroundColor: '#F9FAFB' },
//   emptyCardContainer: {
//     width: 140,
//     height: 90,
//     borderRadius: 8,
//     borderWidth: 2.5,
//     borderColor: '#1e1e1e',
//     backgroundColor: '#e1ecf7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     marginBottom: 24,
//     overflow: 'hidden',
//   },
//   magneticStripe: { position: 'absolute', top: 15, left: 0, right: 0, height: 16, backgroundColor: '#1e1e1e' },
//   chipIdentityBox: { position: 'absolute', bottom: 15, left: 15, width: 22, height: 16, borderRadius: 3, borderWidth: 1.5, borderColor: '#1e1e1e', backgroundColor: '#ffd700' },
//   emptyTitle: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#111827', marginBottom: 6, textAlign: 'center' },
//   emptySub: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#6b7280', textAlign: 'center', marginBottom: 28, lineHeight: 18 },
//   emptyAddBtn: { width: width - 62, height: 48, backgroundColor: '#000000', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
//   emptyAddBtnText: { color: '#FFFFFF', fontSize: 13, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },

//   // Saved Data Lists Render Styles
//   scrollListPadding: { padding: 16, paddingBottom: 60 },
//   listSectionLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', marginBottom: 12, marginTop: 4 },
//   paymentCardWrapper: { backgroundColor: '#282c3f', borderRadius: 12, padding: 20, marginBottom: 18, position: 'relative' },
//   premiumDefaultBorder: { borderWidth: 2, borderColor: '#ff3f6c' },
//   cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   cardBrandLabel: { color: '#FFFFFF', fontSize: 15, fontFamily: BaseFonts.bold, letterSpacing: 1 },
//   listDefaultBadgeText: { backgroundColor: '#ff3f6c', color: '#FFFFFF', fontSize: 8, fontFamily: BaseFonts.bold, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
//   cardNumberText: { color: '#FFFFFF', fontSize: 16, fontFamily: BaseFonts.medium, letterSpacing: 2, marginVertical: 12 },
//   cardMetaFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
//   metaLabelText: { color: '#9496a2', fontSize: 8, fontFamily: BaseFonts.regular, letterSpacing: 0.5, marginBottom: 2 },
//   metaValueText: { color: '#FFFFFF', fontSize: 12, fontFamily: BaseFonts.medium, letterSpacing: 0.5 },
//   actionsFooterLinkRow: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#44475a', paddingTop: 12, marginTop: 16 },
//   actionLinkText: { fontSize: 12, fontFamily: BaseFonts.bold },

//   // Forms System Inputs Layout Matrix
//   formContainerScroll: { padding: 20, paddingBottom: 120, backgroundColor: '#FFFFFF' },
//   formSectionLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.6, marginBottom: 16 },
//   inputTitleText: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#7e818c', marginTop: 14, marginBottom: 4 },
//   formInputField: { height: 40, borderBottomWidth: 1, borderBottomColor: '#dbdbdb', fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f', paddingVertical: 4 },
//   dropdownReplacementBox: { height: 40, borderBottomWidth: 1, borderBottomColor: '#eeeeee', justifyContent: 'center' },
//   horizontalGridRow: { flexDirection: 'row', justifyContent: 'space-between' },

//   // Radio Toggles Blueprint Design Elements
//   radioGroupRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
//   radioSelectorRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
//   radioOuterRing: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center' },
//   radioInnerDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff3f6c' },
//   radioLabelText: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#282c3f', marginLeft: 8 },

//   // Checkboxes Framework Selectors Elements
//   checkboxWrapperRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
//   checkboxSquare: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#ff3f6c', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
//   checkboxSquareChecked: { backgroundColor: '#ff3f6c' },
//   checkboxLabelText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', marginLeft: 10 },

//   // Double Split Footer Section Button Layout Sticky Configurations
//   formFooterActionsRow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#FFFFFF' },
//   footerCancelBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
//   footerCancelBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
//   footerSaveBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff3f6c' },
//   footerSaveBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#FFFFFF', letterSpacing: 0.5 },
// });

import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Dimensions, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ── CUSTOM APP CONTROLS IMPORTERS ──
import FormInput from "@/components/controls/DynamicInput"; 
import Button from "@/components/controls/Button";
import Text from "@/skeleton/Text";
import { BaseFonts } from '@/constants/BaseFonts';

const { width } = Dimensions.get('window');

// ── 🇮🇳 INDIAN PAYMENT ECOSYSTEM MATRIX CHANNELS ──
const paymentMethodsList = [
  { id: "1", name: "Credit / Debit Card (Visa)", type: "card", icon: "card-outline", brand: "Visa", color: "#1A1F71" },
  { id: "2", name: "Credit / Debit Card (Mastercard)", type: "card", icon: "card-bulleted-outline", brand: "Mastercard", color: "#EB001B" },
  { id: "3", name: "RuPay Domestic Card", type: "card", icon: "credit-card-chip-outline", brand: "RuPay", color: "#005A9C" },
  { id: "4", name: "PhonePe / UPI Wallet", type: "upi", icon: "flash-outline", brand: "PhonePe", color: "#5f259f" },
  { id: "5", name: "Indian National Netbanking", type: "netbanking", icon: "business-outline", brand: "Netbanking", color: "#00703c" },
];

// ── FORM COMPLIANCE SCHEMA ──
const cardFormSchema = z.object({
  cardHolder: z.string().min(3, "Card holder name must be at least 3 characters"),
  cardNumber: z.string().min(16, "Card number must be exactly 16 digits").max(16, "Card number cannot exceed 16 digits"),
  expDate: z.string().min(4, "Enter 4 digit expiry code (MMYY)").max(4, "Enter 4 digit expiry code (MMYY)"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(3, "CVV must be 3 digits"),
  useAsDefault: z.any().transform(val => {
    if (typeof val === 'boolean') return val;
    if (val && typeof val === 'object' && 'target' in val) {
      return !!val.target.checked; // HTML/Web event handler fallback
    }
    return !!val; // Baki sabhi cases ke liye boolean trigger value toggle
  }).default(false)
});

type CardFormData = z.infer<typeof cardFormSchema>;

interface SavedCardItem {
  id: string;
  cardHolder: string;
  cardNumber: string;
  expDate: string;
  networkId: string;
  networkName: string;
  networkBrand: string;
  networkIconName: string;
  isDefault: boolean;
  themeColor: string;
}

export default function IndianPaymentEcosystemEngine() {
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<'LIST' | 'FORM'>('LIST');
  const [selectedNetworkId, setSelectedNetworkId] = useState("1"); 
  const [savedCards, setSavedCards] = useState<SavedCardItem[]>([]);

  const { control, handleSubmit, reset } = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardHolder: '',   
    cardNumber: '',  
    expDate: '',      
    cvv: '',          
    useAsDefault: false
    }
  });

  const hasDefaultCard = savedCards.some(c => c.isDefault);
  const defaultCard = savedCards.find(c => c.isDefault);
  const nonDefaultCards = savedCards.filter(c => !c.isDefault);

  const resetFormState = () => {
    reset();
    setSelectedNetworkId("1");
  };

  const handleFormSubmission = (data: CardFormData) => {
    const selectedNetwork = paymentMethodsList.find(m => m.id === selectedNetworkId);
    let updatedCards = [...savedCards];
    
    if (data.useAsDefault) {
      updatedCards = updatedCards.map(c => ({ ...c, isDefault: false }));
    }

    const newCardEntry: SavedCardItem = {
      id: 'card_' + Date.now(),
      cardHolder: data.cardHolder,
      cardNumber: data.cardNumber,
      expDate: data.expDate,
      networkId: selectedNetworkId,
      networkName: selectedNetwork?.name || 'Card',
      networkBrand: selectedNetwork?.brand || 'Visa',
      networkIconName: selectedNetwork?.icon || 'card-outline',
      themeColor: selectedNetwork?.color || '#282c3f',
      isDefault: savedCards.length === 0 ? true : data.useAsDefault,
    };

    updatedCards.push(newCardEntry);
    setSavedCards(updatedCards);
    resetFormState();
    setCurrentView('LIST');
  };

  const handleDeleteCard = (id: string) => {
    Alert.alert('Remove Payment Method', 'Are you sure you want to drop this saved payment profile?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          const filtered = savedCards.filter(c => c.id !== id);
          if (filtered.length > 0 && !filtered.some(c => c.isDefault)) {
            filtered[0].isDefault = true;
          }
          setSavedCards(filtered);
        }
      }
    ]);
  };

  const renderNetworkItem = ({ item }: { item: typeof paymentMethodsList[0] }) => {
    const isSelected = selectedNetworkId === item.id;
    return (
      <TouchableOpacity
        onPress={() => setSelectedNetworkId(item.id)}
        activeOpacity={0.85}
        style={[styles.networkRow, isSelected && styles.networkRowSelected]}
      >
        <View style={styles.networkLeftContainer}>
          <View style={[styles.iconWrapperBox, isSelected && { borderColor: item.color }]}>
            {item.brand === 'Mastercard' || item.brand === 'RuPay' ? (
              <MaterialCommunityIcons name={item.icon as any} size={22} color={isSelected ? item.color : "#535766"} />
            ) : (
              <Ionicons name={item.icon as any} size={22} color={isSelected ? item.color : "#535766"} />
            )}
          </View>
          <View>
            <Text style={styles.networkNameText}>{item.name}</Text>
            <Text style={styles.networkSubText}>SECURE INDIAN GATEWAY</Text>
          </View>
        </View>
        <View style={[styles.radioOuterCircle, isSelected && { borderColor: '#000' }]}>
          {isSelected && <View style={styles.radioInnerCircle} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      
      {/* ── COHERENT HEADER NAVIGATION CONTROL ── */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={() => currentView === 'FORM' ? setCurrentView('LIST') : router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1e1e1e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentView === 'FORM' ? 'ADD PAYMENT METHOD' : 'SAVED PAYMENTS'}
          </Text>
        </View>
        {/* {currentView === 'LIST' && savedCards.length > 0 && (
          <TouchableOpacity onPress={() => { resetFormState(); setCurrentView('FORM'); }} style={styles.addBtnContainer}>
            <Text style={styles.headerActionBtn}>+ Add New</Text>
          </TouchableOpacity>
        )} */}
      </View>

      {/* ── ROUTING MATRIX VIEW RENDER SPLIT ── */}
      {currentView === 'LIST' ? (
        savedCards.length === 0 ? (
          /* SECTION 1: FIRST TIME LOCAL EMPTY MODAL CONTAINER */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyCardArt}>
              <View style={styles.emptyCardStripe} />
              <View style={styles.emptyCardChip} />
              <Ionicons name="shield-checkmark" size={22} color="#00875a" style={styles.shieldIconPosition} />
            </View>
            <Text style={styles.emptyTitleText}>No Saved Payment Methods</Text>
            <Text style={styles.emptySubText}>Save your preferred Indian Banking Cards, UPI Profiles or Netbanking channels for lightning-fast checkout processing loops.</Text>
            <TouchableOpacity 
              style={styles.primaryActionButton}
              activeOpacity={0.9}
              onPress={() => { resetFormState(); setCurrentView('FORM'); }}
            >
              <Text style={styles.primaryActionText}>+ Add Payment Method</Text>
            </TouchableOpacity>
          </View>
        ) : (
       /* SECTION 2: SAVED CHANNELS RECORD COMPONENT LIST (MATCHING EXACT COMPONENT CODE PATTERN) */
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listScrollContent}>
  
  {/* PRIMARY DEFAULT HOOK BLOCK */}
  {hasDefaultCard && defaultCard && (
    <View style={styles.cardContainerMainGroup}>
      <View style={styles.cardRowWrapper}>
        
        {/* Left Side: Consolidated Card Grid Details */}
        <View style={styles.cardMainBodyBox}>
          
          {/* Row 1: Brand & Number */}
          <View style={styles.cardInnerRowJustified}>
            <Text style={styles.cardTextPrimary}>{defaultCard.networkName}</Text>
            <Text style={styles.cardTextPrimary}>•••• {defaultCard.cardNumber.slice(-4)}</Text>
          </View>
          
          {/* Row 2: Holder & Network Details with Expiry */}
          <View style={styles.cardInnerRowJustified}>
            <Text style={styles.cardTextSecondary}>{defaultCard.cardHolder.toUpperCase()}</Text>
            <View style={styles.brandIconInlineAlignment}>
              <Text style={[styles.cardTextSecondary, { marginRight: 8 }]}>
                {defaultCard.expDate.slice(0, 2)}/{defaultCard.expDate.slice(2, 4)}
              </Text>
              <MaterialCommunityIcons name="shield-check" size={14} color="#00875a" />
            </View>
          </View>

        </View>

        {/* Right Side: Action Trigger with 3dots/Delete Layout Context */}
        <TouchableOpacity 
          style={styles.cardRowActionBtn}
          activeOpacity={0.7}
          onPress={() => handleDeleteCard(defaultCard.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#ff3f6c" />
        </TouchableOpacity>

      </View>
      
      {/* Sub-label for Default Notification Context */}
      <Text style={styles.cardBottomDefaultNotice}>
        Card using as default payment method
      </Text>
    </View>
  )}

  {/* SECONDARY RETAIL NETWORKS BLOCK LIST (MULTIPLE CARDS SCROLLABLE CONTAINER) */}
  {nonDefaultCards.length > 0 && (
    <View style={{ marginTop: 10 }}>
      {nonDefaultCards.map((cardItem) => (
        <View key={cardItem.id} style={styles.cardContainerMainGroup}>
          <View style={styles.cardRowWrapper}>
            
            {/* Left Side Details Structure */}
            <View style={styles.cardMainBodyBox}>
              <View style={styles.cardInnerRowJustified}>
                <Text style={styles.cardTextPrimary}>{cardItem.networkName}</Text>
                <Text style={styles.cardTextPrimary}>•••• {cardItem.cardNumber.slice(-4)}</Text>
              </View>
              
              <View style={styles.cardInnerRowJustified}>
                <Text style={styles.cardTextSecondary}>{cardItem.cardHolder.toUpperCase()}</Text>
                <View style={styles.brandIconInlineAlignment}>
                  <Text style={styles.cardTextSecondary}>
                    {cardItem.expDate.slice(0, 2)}/{cardItem.expDate.slice(2, 4)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Right Side Action Structure */}
            <TouchableOpacity 
              style={styles.cardRowActionBtn}
              activeOpacity={0.7}
              onPress={() => handleDeleteCard(cardItem.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#ff3f6c" />
            </TouchableOpacity>

          </View>
        </View>
      ))}
    </View>
  )}

  {/* DYNAMIC INSTANTIATION TRIGGER BUTTON */}
  <View style={{ marginTop: 12 }}>
    <TouchableOpacity
      style={styles.dashedAddButton}
      activeOpacity={0.8}
      onPress={() => { resetFormState(); setCurrentView('FORM'); }}
    >
      <Text style={styles.dashedButtonText}>Add New Card</Text>
    </TouchableOpacity>
  </View>

</ScrollView>
        )
      ) : (
        /* SECTION 3: FORM COMPONENT FIELD INJECTIONS WRAPPER */
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.formScrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formCardWhite}>
              <Text style={styles.formSectionTitleLabel}>SELECT BANKING CHANNEL NETWORK</Text>
              
              <FlatList
                data={paymentMethodsList}
                renderItem={renderNetworkItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false} 
              />

              {/* Input Fields Content stack wrappers */}
              <View style={styles.formInputsContainerStack}>
                <Text style={styles.formSubTitleSection}>ACCOUNT METADATA IDENTITY</Text>
                
                {/* ── THE FIX: Removed Manual Errors Text Tags under Inputs to Prevent Double Validation Glitch ── */}
                <FormInput
                  control={control}
                  placeholder="Card Holder Name / Account Name"
                  name="cardHolder"
                  type="text"
                />

                <FormInput
                  control={control}
                  placeholder="16-Digit Card Number / UPI VPA ID"
                  name="cardNumber"
                  type="phone"
                  maxLength={16}
                />

                <View style={styles.horizontalFlexInputsRow}>
                  <View style={{ width: '48%' }}>
                  <FormInput
    control={control}
    placeholder="Expiry (MMYY)"
    name="expDate"
    type="phone"
    maxLength={4} // 👈 CHANGED: Only 4 numbers allowed on layout
  />
                  </View>

                  <View style={{ width: '48%' }}>
                    <FormInput
                      control={control}
                      placeholder="CVV Security Pin"
                      name="cvv"
                      type="phone"
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>

              {/* Preferred Option Checkbox System Hooks */}
              <View style={styles.checkboxContainerWrapper}>
                <FormInput
                  control={control}
                  name="useAsDefault"
                  label="Set as default Indian payment method"
                  type="checkbox"
                />
              </View>

              {/* ── THE FIX: Replaced Prev/Next split buttons with a sleek single Myntra-style Submit Button ── */}
              <View style={styles.footerButtonsSplitRow}>
                <Button 
                  variant="primary" 
                  style={styles.nextBtnActionStyle}
                  onPress={handleSubmit(handleFormSubmission)}
                >
                  SAVE PAYMENT METHOD
                </Button>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

// ─── HIGH-END CSS ARCHITECTURE STYLES ──────────────────────────────────────────
const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: '#EFF1F3' },
  
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  headerLeftContainer: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#1e1e1e', marginLeft: 14, letterSpacing: 0.4 },
  addBtnContainer: { paddingVertical: 4, paddingHorizontal: 8 },
  headerActionBtn: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#0288d1' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  emptyCardArt: {
    width: 150,
    height: 95,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1e1e1e',
    backgroundColor: '#dbe6f2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 28,
    elevation: 3,
  },
  emptyCardStripe: { position: 'absolute', top: 16, left: 0, right: 0, height: 18, backgroundColor: '#1e1e1e' },
  emptyCardChip: { position: 'absolute', bottom: 16, left: 18, width: 26, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#1e1e1e', backgroundColor: '#ffd700' },
  shieldIconPosition: { position: 'absolute', top: -8, right: -8, backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden' },
  emptyTitleText: { fontSize: 19, fontFamily: BaseFonts.bold, color: '#111827', marginBottom: 8, textAlign: 'center' },
  emptySubText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#6b7280', textAlign: 'center', paddingHorizontal: 16, marginBottom: 32, lineHeight: 18 },
  primaryActionButton: { width: '100%', height: 50, backgroundColor: '#000000', borderRadius: 16, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  primaryActionText: { color: '#FFFFFF', fontSize: 14, fontFamily: BaseFonts.bold, letterSpacing: 0.3 },

  listScrollContent: { padding: 16, paddingBottom: 40 },
  // List Container Wrappers
  listScrollContent: { paddingHorizontal: 16, paddingVertical: 24, flexGrow: 1 },
  cardContainerMainGroup: { marginBottom: 20 },
  
  // Custom Card Row Wrapper (Exactly matches the border-EBEBEB container design)
  cardRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
  },
  cardMainBodyBox: {
    flex: 1,
    backgroundColor: '#EFF1F3',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 16,
    gap: 20, // Clean vertical gap spacing between Rows
    marginRight: 12,
  },
  cardInnerRowJustified: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  brandIconInlineAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Texts inside cards
  cardTextPrimary: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  cardTextSecondary: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#535766' },
  
  // Right action button context
  cardRowActionBtn: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Notice styles at the bottom
  cardBottomDefaultNotice: {
    marginLeft: 20,
    marginTop: 8,
    fontSize: 10,
    fontFamily: BaseFonts.medium,
    color: '#7e818c',
  },
  
  // Add new card button layout styles
  dashedAddButton: {
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedButtonText: { fontSize: 15, fontFamily: BaseFonts.medium, color: '#282c3f' },
  // sectionMarginBlock: { marginBottom: 24 },
  // sectionHeadingLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', trackingWider: 0.6, paddingLeft: 4, marginBottom: 10 },
  // glassCardContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 24, borderColor: '#ececec', elevation: 2, shadowColor: '#000', shadowOpacity: 0.02 },
  // premiumBankingCard: { width: '82%', borderRadius: 20, padding: 20, minHeight: 140, justifyContent: 'space-between', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1 },
  // cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  // cardBrandLabelText: { color: '#FFFFFF', fontSize: 16, fontFamily: BaseFonts.bold, letterSpacing: 1.2 },
  // badgeDefaultCapsule: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  // badgeDefaultText: { color: '#FFFFFF', fontSize: 8, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },
  // cardMaskedNumber: { color: '#FFFFFF', fontSize: 17, fontFamily: BaseFonts.medium, letterSpacing: 3, marginVertical: 14, textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  // cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  // cardHolderMetaLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 8, fontFamily: BaseFonts.regular, letterSpacing: 0.5, marginBottom: 2 },
  // cardHolderMetaValue: { color: '#FFFFFF', fontSize: 12, fontFamily: BaseFonts.medium, letterSpacing: 0.4 },
  // deleteCardButtonSide: { backgroundColor: '#FFF0F2', width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderColor: '#FFE4E8' },
  // bottomMetaNotice: { marginLeft: 12, marginTop: 8, fontSize: 10, fontFamily: BaseFonts.medium, color: '#9496a2' },
  // dashedAddButton: { height: 52, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#9496a2', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  // dashedButtonText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },

  formScrollContent: { flexGrow: 1, padding: 16, paddingBottom: 40 },
  formCardWhite: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: '#EBEBEB', elevation: 1 },
  formSectionTitleLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.5, marginBottom: 14, paddingLeft: 2 },
  
  networkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#EBEBEB', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 10, backgroundColor: '#FFFFFF' },
  networkRowSelected: { borderColor: '#000000', backgroundColor: '#F9FAFB' },
  networkLeftContainer: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconWrapperBox: { width: 44, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  networkNameText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  networkSubText: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#a0a2ab', letterSpacing: 0.4, marginTop: 1 },
  radioOuterCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
  radioInnerCircle: { width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#000000' },

  formInputsContainerStack: { marginTop: 18, borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 16 },
  formSubTitleSection: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.5, marginBottom: 12, paddingLeft: 2 },
  horizontalFlexInputsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  checkboxContainerWrapper: { paddingLeft: 4, marginTop: 12, marginBottom: 20 },

  footerButtonsSplitRow: { flexDirection: 'row', justifyContent: 'stretch', marginTop: 8 },
  nextBtnActionStyle: { flex: 1, height: 48, backgroundColor: '#000000', borderRadius: 14 }
});