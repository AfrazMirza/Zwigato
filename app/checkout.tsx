import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Dimensions, 
  LayoutAnimation, 
  Platform, 
  UIManager,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BaseFonts } from '@/constants/BaseFonts';
import Text from "@/skeleton/Text";

const { width } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Mock Address Data
const initialAddresses = [
  { id: '1', name: 'Afraz Mirza', type: 'HOME', raw: '8-e-4 vigyan Nagar Kota, Vigyan Nagar Kota', cityStateZip: 'Kota, Rajasthan 324005', mobile: '7410972065' },
  { id: '2', name: 'Afraz Mirza', type: 'OFFICE', raw: '8-e-4 vigyan nagar Kota, Dadabari Kota', cityStateZip: 'Kota - 324009', mobile: '7410972065' }
];

export default function CompleteCheckoutEngine() {
  const router = useRouter();
  
  // Checkout Steps Lifecycle: 'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'
  const [currentStep, setCurrentStep] = useState<'CHOOSE_ADDRESS' | 'SUMMARY_ADDRESS' | 'PAYMENT'>('CHOOSE_ADDRESS');
  
  // Address selection states
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [confirmedAddressId, setConfirmedAddressId] = useState<string | null>(null);

  // Payment Accordions states
  const [selectedMethod, setSelectedMethod] = useState<string>('COD'); // Default COD is clicked/selected
  const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState<boolean>(false);

  const selectedAddressData = initialAddresses.find(a => a.id === selectedAddressId);
  const confirmedAddressData = initialAddresses.find(a => a.id === confirmedAddressId);

  // Smooth accordion animation controller
  const toggleAccordion = (methodKey: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedMethod === methodKey) {
      setSelectedMethod(''); // Toggle collapse
    } else {
      setSelectedMethod(methodKey);
    }
  };

  const togglePriceDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPriceDetailsVisible(!isPriceDetailsVisible);
  };

  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      
      {/* ── 1. MYNTRA-STYLE PROGRESS HEAD NAVIGATION ── */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => {
          if (currentStep === 'SUMMARY_ADDRESS') setCurrentStep('CHOOSE_ADDRESS');
          else if (currentStep === 'PAYMENT') setCurrentStep('SUMMARY_ADDRESS');
          else router.back();
        }} style={styles.navBackIcon}>
          <Ionicons name="arrow-back" size={24} color="#282c3f" />
        </TouchableOpacity>
        
        <Text style={styles.headerMainTitle}>
          {currentStep === 'PAYMENT' ? 'PAYMENT' : 'SELECT ADDRESS'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Modern Visual Progress Tracker Line Segment */}
      <View style={styles.progressBarWrapper}>

        <View style={styles.progressStepNode}>

          <Ionicons name="checkmark-circle" size={16} color="#00875a" />

          <Text style={[styles.progressStepLabel, { color: '#00875a', fontFamily: BaseFonts.bold }]}>Bag</Text>

        </View>

        <View style={[styles.progressLineSegment, currentStep !== 'CHOOSE_ADDRESS' && { backgroundColor: '#00875a' }]} />

        

        <View style={styles.progressStepNode}>

          <View style={[styles.progressOuterIndicator, currentStep !== 'CHOOSE_ADDRESS' && { borderColor: '#00875a' }]}>

            <View style={[styles.progressInnerIndicator, currentStep !== 'CHOOSE_ADDRESS' && { backgroundColor: '#00875a' }]} />

          </View>

          <Text style={[styles.progressStepLabel, currentStep !== 'CHOOSE_ADDRESS' && { color: '#00875a', fontFamily: BaseFonts.bold }]}>Address</Text>

        </View>

        <View style={[styles.progressLineSegment, currentStep === 'PAYMENT' && { backgroundColor: '#00875a' }]} />

        

        <View style={styles.progressStepNode}>

          <View style={[styles.progressOuterIndicator, currentStep === 'PAYMENT' && { borderColor: '#00875a' }]}>

            <View style={[styles.progressInnerIndicator, currentStep === 'PAYMENT' && { backgroundColor: '#00875a' }]} />

          </View>

          <Text style={[styles.progressStepLabel, currentStep === 'PAYMENT' && { color: '#00875a', fontFamily: BaseFonts.bold }]}>Payment</Text>

        </View>

      </View>

      {/* ── MAIN CONTENT LAYER VIEW ROUTING SPLIT ── */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentLayout}>
        
        {/* 🟩 VIEW 1: CHOOSE ADDRESS COMPONENT (SS 1 & 2 Sync) */}
        {currentStep === 'CHOOSE_ADDRESS' && (
          <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
            <TouchableOpacity style={styles.addNewAddressBtnOutline} activeOpacity={0.8}>
              <Text style={styles.addNewAddressText}>ADD NEW ADDRESS</Text>
            </TouchableOpacity>

            <Text style={styles.listBlockLabelHeader}>DEFAULT ADDRESS</Text>
            {initialAddresses.filter(a => a.type === 'HOME').map((addr) => {
              const isCurrentSelected = selectedAddressId === addr.id;
              return (
                <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
                  <TouchableOpacity 
                    style={styles.addressSelectTouchLayout} 
                    activeOpacity={0.9}
                    onPress={() => setSelectedAddressId(addr.id)}
                  >
                    <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#ff3f6c' }]}>
                      {isCurrentSelected && <View style={styles.customRadioInnerCircleFilled} />}
                    </View>
                    
                    <View style={styles.addressTextMetaBody}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
                        <View style={styles.typeCapsuleBadge}>
                          <Text style={styles.typeCapsuleTextLabel}>{addr.type}</Text>
                        </View>
                      </View>
                      <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
                      <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
                      {isCurrentSelected && (
                        <Text style={[styles.addressRawParagraphText, { marginTop: 6, color: '#111827', fontFamily: BaseFonts.semiBold }]}>
                          Mobile: <Text style={{ fontFamily: BaseFonts.bold }}>{addr.mobile}</Text>
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Dynamic Action Buttons Appear only if Checkbox/Radio is Selected (Matches SS 2) */}
                  {isCurrentSelected && (
                    <View style={styles.addressActionRowActionTriggers}>
                      <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
                        <Text style={styles.addressMetaActionText}>REMOVE</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
                        <Text style={styles.addressMetaActionText}>EDIT</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}

            <Text style={[styles.listBlockLabelHeader, { marginTop: 20 }]}>OTHER ADDRESS</Text>
            {initialAddresses.filter(a => a.type === 'OFFICE').map((addr) => {
              const isCurrentSelected = selectedAddressId === addr.id;
              return (
                <View key={addr.id} style={[styles.addressItemWrapperBlock, isCurrentSelected && styles.selectedAddressBorder]}>
                  <TouchableOpacity 
                    style={styles.addressSelectTouchLayout} 
                    activeOpacity={0.9}
                    onPress={() => setSelectedAddressId(addr.id)}
                  >
                    <View style={[styles.customRadioOuterBorder, isCurrentSelected && { borderColor: '#ff3f6c' }]}>
                      {isCurrentSelected && <View style={styles.customRadioInnerCircleFilled} />}
                    </View>
                    
                    <View style={styles.addressTextMetaBody}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.addressUserBoldTitle}>{addr.name}</Text>
                        <View style={[styles.typeCapsuleBadge, { backgroundColor: '#E0F2FE' }]}>
                          <Text style={[styles.typeCapsuleTextLabel, { color: '#0369a1' }]}>{addr.type}</Text>
                        </View>
                      </View>
                      <Text style={styles.addressRawParagraphText}>{addr.raw}</Text>
                      <Text style={styles.addressRawParagraphText}>{addr.cityStateZip}</Text>
                    </View>
                  </TouchableOpacity>

                  {isCurrentSelected && (
                    <View style={styles.addressActionRowActionTriggers}>
                      <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
                        <Text style={styles.addressMetaActionText}>REMOVE</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.addressMetaActionButton} activeOpacity={0.7}>
                        <Text style={styles.addressMetaActionText}>EDIT</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* 🟩 VIEW 2: CONFIRMED SUMMARY ADDRESS ESTIMATES (SS 3 Sync) */}
        {currentStep === 'SUMMARY_ADDRESS' && confirmedAddressData && (
          <View style={{ marginTop: 12 }}>
            <View style={styles.summaryAddressWhiteCard}>
              <View style={styles.summaryHeaderRowJustified}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.addressUserBoldTitle}>{confirmedAddressData.name}</Text>
                  <Text style={styles.defaultGrayLabel}>(Default)</Text>
                  <View style={styles.typeCapsuleBadge}>
                    <Text style={styles.typeCapsuleTextLabel}>{confirmedAddressData.type}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setCurrentStep('CHOOSE_ADDRESS')} activeOpacity={0.7}>
                  <Text style={styles.changeAddressPinkLink}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.addressRawParagraphText, { marginTop: 4, width: '90%' }]}>
                {confirmedAddressData.raw}
              </Text>
              <Text style={styles.addressRawParagraphText}>{confirmedAddressData.cityStateZip}</Text>
              <Text style={[styles.addressRawParagraphText, { marginTop: 8, color: '#111827' }]}>
                Mobile: <Text style={{ fontFamily: BaseFonts.bold }}>{confirmedAddressData.mobile}</Text>
              </Text>
            </View>

            <Text style={styles.listBlockLabelHeader}>DELIVERY ESTIMATES</Text>
            <View style={styles.deliveryEstimateWhiteCard}>
              <View style={styles.productAvatarPlaceholderBox}>
                <Ionicons name="shirt-outline" size={24} color="#9496a2" />
              </View>
              <Text style={styles.estimateArrivalTextBody}>
                Estimated delivery by <Text style={{ fontFamily: BaseFonts.bold, color: '#111827' }}>30 Jun 2026</Text>
              </Text>
            </View>
          </View>
        )}

        {/* 🟩 VIEW 3: PAYMENT SCREEN SYSTEM ACCORDIONS (SS 4, 5, 6, 7 Sync) */}
        {currentStep === 'PAYMENT' && (
          <View style={{ marginTop: 12 }}>
            
            {/* Bank Offers Trigger Banner */}
            <TouchableOpacity style={styles.bankOffersWhiteRowContainer} activeOpacity={0.7}>
              <Text style={styles.offersRowLeftLabel}>Coupons & Bank Offers</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Text style={styles.offersActionPinkLink}>All offers</Text>
                <Feather name="chevron-right" size={16} color="#ff3f6c" />
              </View>
            </TouchableOpacity>

            <Text style={styles.listBlockLabelHeader}>RECOMMENDED PAYMENT OPTIONS</Text>
            
            {/* ── CARD CHANNEL 1: CASH ON DELIVERY (COD - Default Selected) ── */}
            <View style={styles.paymentMethodAccordionUnit}>
              <TouchableOpacity 
                style={styles.accordionHeaderTouchBarElement}
                activeOpacity={0.8}
                onPress={() => toggleAccordion('COD')}
              >
                <View style={styles.accordionHeaderLeftLayout}>
                  <View style={[styles.customRadioOuterBorder, selectedMethod === 'COD' && { borderColor: '#ff3f6c' }]}>
                    {selectedMethod === 'COD' && <View style={styles.customRadioInnerCircleFilled} />}
                  </View>
                  <Text style={styles.paymentMethodMainName}>Cash on Delivery (Cash/UPI)</Text>
                </View>
                <MaterialCommunityIcons name="cash-register" size={20} color="#535766" />
              </TouchableOpacity>

              {selectedMethod === 'COD' && (
                <View style={styles.accordionExpandableInnerContentBody}>
                  <Text style={styles.paymentMethodDescriptorText}>
                    For this option, there is a fee of ₹ 10. You can Pay online to avoid this.
                  </Text>
                  <TouchableOpacity style={styles.placeOrderPinkActionBtn} activeOpacity={0.85}>
                    <Text style={styles.placeOrderPinkActionBtnText}>Place Order</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <Text style={styles.listBlockLabelHeader}>ONLINE PAYMENT OPTIONS</Text>

            {/* ── CARD CHANNEL 2: UPI PAYMENTS (SS 6 Sync) ── */}
            <View style={styles.paymentMethodAccordionUnit}>
              <TouchableOpacity 
                style={styles.accordionHeaderTouchBarElement}
                activeOpacity={0.8}
                onPress={() => toggleAccordion('UPI')}
              >
                <View style={styles.accordionHeaderLeftLayout}>
                  <View style={[styles.customRadioOuterBorder, selectedMethod === 'UPI' && { borderColor: '#ff3f6c' }]}>
                    {selectedMethod === 'UPI' && <View style={styles.customRadioInnerCircleFilled} />}
                  </View>
                  <Text style={styles.paymentMethodMainName}>UPI (Pay via any App)</Text>
                </View>
                <Feather name={selectedMethod === 'UPI' ? "chevron-up" : "chevron-down"} size={18} color="#282c3f" />
              </TouchableOpacity>

              {selectedMethod === 'UPI' && (
                <View style={[styles.accordionExpandableInnerContentBody, { gap: 16, paddingTop: 6 }]}>
                  {/* PhonePe Option Link Sub Row */}
                  <TouchableOpacity style={styles.upiAppInnerRowSelection} activeOpacity={0.7}>
                    <View style={styles.customRadioOuterBorder}>
                      <View style={styles.customRadioInnerCircleFilled} />
                    </View>
                    <View style={styles.upiAppLogoLabelAlignment}>
                      <MaterialCommunityIcons name="purple" size={18} color="#5f259f" />
                      <Text style={styles.upiAppNameLabel}>PhonePe</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.placeOrderPinkActionBtn} activeOpacity={0.85}>
                    <Text style={styles.placeOrderPinkActionBtnText}>Pay Now</Text>
                  </TouchableOpacity>

                  {/* Google Pay Option Link Sub Row */}
                  <TouchableOpacity style={styles.upiAppInnerRowSelection} activeOpacity={0.7}>
                    <View style={styles.customRadioOuterBorder} />
                    <View style={styles.upiAppLogoLabelAlignment}>
                      <Ionicons name="logo-google" size={16} color="#4285F4" />
                      <Text style={styles.upiAppNameLabel}>Google Pay</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* ── CARD CHANNEL 3: CREDIT/DEBIT CARDS (SS 7 Sync) ── */}
            <View style={styles.paymentMethodAccordionUnit}>
              <TouchableOpacity 
                style={styles.accordionHeaderTouchBarElement}
                activeOpacity={0.8}
                onPress={() => toggleAccordion('CARD')}
              >
                <View style={styles.accordionHeaderLeftLayout}>
                  <View style={[styles.customRadioOuterBorder, selectedMethod === 'CARD' && { borderColor: '#ff3f6c' }]}>
                    {selectedMethod === 'CARD' && <View style={styles.customRadioInnerCircleFilled} />}
                  </View>
                  <Text style={styles.paymentMethodMainName}>Credit/Debit Card</Text>
                  <View style={styles.offersGreenBadgeCapsule}>
                    <Text style={styles.offersGreenBadgeText}>11 Offers</Text>
                  </View>
                </View>
                <Feather name={selectedMethod === 'CARD' ? "chevron-up" : "chevron-down"} size={18} color="#282c3f" />
              </TouchableOpacity>

              {selectedMethod === 'CARD' && (
                <View style={[styles.accordionExpandableInnerContentBody, { gap: 14 }]}>
                  {/* Offer inline notification frame strip */}
                  <View style={styles.inlineCardPromoBannerStrip}>
                    <MaterialCommunityIcons name="ticket-percent" size={22} color="#d9383a" />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.promoBannerBoldHeadlineText}>10% Instant Discount</Text>
                      <Text style={styles.promoBannerDescriptionContent}>On IDFC FIRST SWYP Credit Card on min spend loop details...</Text>
                      <Text style={styles.promoBannerActionPinkLink}>View Eligible Styles &gt;</Text>
                    </View>
                  </View>

                  <Text style={styles.paymentCardAlertTextNotice}>
                    Please Ensure your card can be used for online transactions. <Text style={{ color: '#ff3f6c', fontFamily: BaseFonts.bold }}>Know More</Text>
                  </Text>

                  <TextInput style={styles.cardInputTextLineEngine} placeholder="Card Number" placeholderTextColor="#a0a2ab" keyboardType="numeric" maxLength={16} />
                  
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TextInput style={[styles.cardInputTextLineEngine, { flex: 1 }]} placeholder="Valid Thru (MM/YY)" placeholderTextColor="#a0a2ab" keyboardType="numeric" maxLength={5} />
                    <TextInput style={[styles.cardInputTextLineEngine, { flex: 1 }]} placeholder="CVV" placeholderTextColor="#a0a2ab" keyboardType="numeric" secureTextEntry maxLength={3} />
                  </View>

                  <TouchableOpacity style={styles.placeOrderPinkActionBtn} activeOpacity={0.85}>
                    <Text style={styles.placeOrderPinkActionBtnText}>Pay Now</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

          </View>
        )}

      </ScrollView>

      {/* ── 5. FLOATING COMPLIANCE BOTTOM ACTION HOOK BAR (SS 4 & 5 Sync) ── */}
      <View style={styles.stickyFooterPanelSystemWrapper}>
        
        {/* Expanded Price Details Dropup Sheet Mechanics inside Checkout Interface */}
        {isPriceDetailsVisible && (
          <View style={styles.priceDropupExpandedContentCard}>
            <View style={styles.priceDetailsHeaderLineJustified}>
              <Text style={styles.priceDetailsSectionBoldTitle}>Price Details (1 item)</Text>
              <TouchableOpacity onPress={togglePriceDetails} activeOpacity={0.7}>
                <Feather name="chevron-down" size={20} color="#282c3f" />
              </TouchableOpacity>
            </View>

            <View style={styles.priceCalculationRowSplit}>
              <Text style={styles.calcLabelGreyText}>Total MRP</Text>
              <Text style={styles.calcValueDarkText}>₹10,599</Text>
            </View>
            
            <View style={styles.priceCalculationRowSplit}>
              <Text style={styles.calcLabelGreyText}>Discount on MRP</Text>
              <Text style={[styles.calcValueDarkText, { color: '#00875a' }]}>- ₹8,092</Text>
            </View>

            <View style={styles.priceCalculationRowSplit}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={styles.calcLabelGreyText}>Platform Fee</Text>
                <Text style={styles.knowMoreBlueTextLink}>Know More</Text>
              </View>
              <Text style={styles.calcValueDarkText}>₹23</Text>
            </View>

            <View style={styles.priceCalculationRowSplit}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={styles.calcLabelGreyText}>Cash/Pay on Delivery Fee</Text>
                <Text style={styles.knowMoreBlueTextLink}>Know More</Text>
              </View>
              <Text style={styles.calcValueDarkText}>₹10</Text>
            </View>
            
            <View style={styles.bottomSheetHorizontalDividerLine} />
          </View>
        )}

        {/* Solid Always Visible Bottom Matrix Action Interface Control */}
        <View style={styles.footerMainActionInteractiveBar}>
          {currentStep === 'CHOOSE_ADDRESS' ? (
            <TouchableOpacity 
              style={[styles.primaryActionNavigationBtnBlock, !selectedAddressId && { backgroundColor: '#dbdbdb' }]}
              disabled={!selectedAddressId}
              onPress={() => {
                setConfirmedAddressId(selectedAddressId);
                setCurrentStep('SUMMARY_ADDRESS');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryActionNavigationBtnText}>
                {selectedAddressId ? 'CONFIRM' : 'PLEASE CHOOSE ADDRESS'}
              </Text>
            </TouchableOpacity>
          ) : currentStep === 'SUMMARY_ADDRESS' ? (
            <TouchableOpacity 
              style={styles.primaryActionNavigationBtnBlock}
              onPress={() => setCurrentStep('PAYMENT')}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryActionNavigationBtnText}>CONTINUE</Text>
            </TouchableOpacity>
          ) : (
            /* Payment Screen Interactive Toggle Strip Frame with Dropup Toggle */
            <View style={styles.paymentFooterSplitLayoutRow}>
              <TouchableOpacity style={styles.footerPriceSummaryTapBlock} activeOpacity={0.7} onPress={togglePriceDetails}>
                <View>
                  <Text style={styles.footerCalculatedPriceTotalValText}>₹2,540</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Text style={styles.viewPriceDetailsSmallLabel}>View Details</Text>
                    <Feather name={isPriceDetailsVisible ? "chevron-down" : "chevron-up"} size={12} color="#ff3f6c" />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.primaryActionNavigationBtnBlock, { flex: 1.2, marginTop: 0, borderRadius: 12 }]}
                activeOpacity={0.85}
                onPress={() => Alert.alert('Order Authenticated', 'Redirecting order request execution corridors successfully.')}
              >
                <Text style={styles.primaryActionNavigationBtnText}>PLACE ORDER</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </View>

    </SafeAreaView>
  );
}

// ─── PIXEL-PERFECT COMMERCIALLY DESIGNED CSS STYLE SHEETS ────────────────────────────
const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: '#F5F5F7' },
  scrollContentLayout: { paddingBottom: 160 },
  
  // 1. Navigation Header
  headerRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  navBackIcon: { padding: 4 },
  headerMainTitle: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.4 },

  // 2. Step Progress Wireframe Segment Bar Matrix Link Styles
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB'
  },
  progressStepNode: { alignItems: 'center', gap: 4 },
  progressStepLabel: { fontSize: 10, fontFamily: BaseFonts.medium, color: '#a0a2ab' },
  progressLineSegment: { flex: 1, height: 2, backgroundColor: '#EBEBEB', mx: 8, marginTop: -14, marginHorizontal: 8 },
  progressOuterIndicator: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
  progressInnerIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },

  // 3. Addresses Elements Style Arrays (SS 1 & 2 Sync layout parameters)
  addNewAddressBtnOutline: {
    borderWidth: 1,
    borderColor: '#282c3f',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 14,
    marginBottom: 8
  },
  addNewAddressText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
  listBlockLabelHeader: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#7e818c', marginHorizontal: 16, marginTop: 18, marginBottom: 10, letterSpacing: 0.6 },
  
  addressItemWrapperBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB'
  },
  selectedAddressBorder: { borderColor: '#ff3f6c' },
  addressSelectTouchLayout: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  
  customRadioOuterBorder: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  customRadioInnerCircleFilled: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff3f6c' },
  
  addressTextMetaBody: { flex: 1, gap: 4 },
  addressUserBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  typeCapsuleBadge: { backgroundColor: '#E6F4EA', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  typeCapsuleTextLabel: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#00875a' },
  addressRawParagraphText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 18 },
  
  addressActionRowActionTriggers: { flexDirection: 'row', gap: 12, marginTop: 14, borderTopWidth: 0.5, borderTopColor: '#EBEBEB', paddingTop: 12, paddingLeft: 32 },
  addressMetaActionButton: { borderWidth: 1, borderColor: '#282c3f', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6, backgroundColor: '#FFFFFF' },
  addressMetaActionText: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#282c3f' },

  // 4. Summaries and delivery estimate boxes (SS 3 Sync layout parameters)
  summaryAddressWhiteCard: { backgroundColor: '#FFFFFF', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
  summaryHeaderRowJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  defaultGrayLabel: { fontSize: 11, fontFamily: BaseFonts.medium, color: '#9496a2' },
  changeAddressPinkLink: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#ff3f6c' },
  deliveryEstimateWhiteCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, alignItems: 'center', gap: 14, borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
  productAvatarPlaceholderBox: { width: 44, height: 50, backgroundColor: '#EFF1F3', borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#dbdbdb' },
  estimateArrivalTextBody: { fontSize: 12, fontFamily: BaseFonts.medium, color: '#535766' },

  // 5. Accordion Methods for Payments (SS 4, 5, 6, 7 layout setups)
  bankOffersWhiteRowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
  offersRowLeftLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  offersActionPinkLink: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#ff3f6c' },
  
  paymentMethodAccordionUnit: { backgroundColor: '#FFFFFF', borderBottomWidth: 0.5, borderBottomColor: '#EBEBEB', overflow: 'hidden' },
  accordionHeaderTouchBarElement: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 },
  accordionHeaderLeftLayout: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  paymentMethodMainName: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  offersGreenBadgeCapsule: { backgroundColor: '#E6F4EA', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginLeft: 2 },
  offersGreenBadgeText: { color: '#00875a', fontSize: 10, fontFamily: BaseFonts.bold },
  
  accordionExpandableInnerContentBody: { paddingHorizontal: 18, paddingBottom: 18, paddingTop: 2 },
  paymentMethodDescriptorText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 18, marginBottom: 14, paddingLeft: 32 },
  placeOrderPinkActionBtn: { backgroundColor: '#ff3f6c', paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: '100%', elevation: 1 },
  placeOrderPinkActionBtnText: { color: '#FFFFFF', fontSize: 14, fontFamily: BaseFonts.bold, letterSpacing: 0.4 },
  
  upiAppInnerRowSelection: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10, paddingLeft: 6 },
  upiAppLogoLabelAlignment: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  upiAppNameLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },

  inlineCardPromoBannerStrip: { flexDirection: 'row', backgroundColor: '#FFF0F2', borderRadius: 12, padding: 14, gap: 12, borderWidth: 0.5, borderColor: '#FFE4E8', marginBottom: 12 },
  promoBannerBoldHeadlineText: { fontSize: 12, fontFamily: BaseFonts.bold, color: '#111827' },
  promoBannerDescriptionContent: { fontSize: 10.5, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 14, marginTop: 2 },
  promoBannerActionPinkLink: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#ff3f6c', marginTop: 4 },
  paymentCardAlertTextNotice: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#535766', marginBottom: 12 },
  cardInputTextLineEngine: { borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 8, height: 44, paddingHorizontal: 14, fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f', backgroundColor: '#FFFFFF', marginBottom: 12 },

  // 6. Sticky Footers Matrix Layout Map Framework
  stickyFooterPanelSystemWrapper: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    zIndex: 100,
    // Native ambient dynamic shadows mapping
    ...Platform.select({
      ios: { shadowColor: '#000000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: -3 } },
      android: { elevation: 12 }
    })
  },
  footerMainActionInteractiveBar: { padding: 14, backgroundColor: '#FFFFFF' },
  primaryActionNavigationBtnBlock: { backgroundColor: '#ff3f6c', height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  primaryActionNavigationBtnText: { color: '#FFFFFF', fontSize: 14, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },
  
  paymentFooterSplitLayoutRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  footerPriceSummaryTapBlock: { flex: 0.7, paddingLeft: 4 },
  footerCalculatedPriceTotalValText: { fontSize: 18, fontFamily: BaseFonts.bold, color: '#111827' },
  viewPriceDetailsSmallLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#ff3f6c' },

  // 7. Dynamic Dropup Details Panels Configs (SS 5 Sync parameters mapping)
  priceDropupExpandedContentCard: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 6, backgroundColor: '#FFFFFF' },
  priceDetailsHeaderLineJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottomWidth: 0.5, borderBottomColor: '#F3F4F6', paddingBottom: 10 },
  priceDetailsSectionBoldTitle: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f' },
  priceCalculationRowSplit: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calcLabelGreyText: { fontSize: 12.5, fontFamily: BaseFonts.regular, color: '#7e818c' },
  calcValueDarkText: { fontSize: 12.5, fontFamily: BaseFonts.medium, color: '#282c3f' },
  knowMoreBlueTextLink: { fontSize: 10, fontFamily: BaseFonts.bold, color: '#ff3f6c' },
  bottomSheetHorizontalDividerLine: { height: 1, backgroundColor: '#EBEBEB', marginTop: 6 }
});