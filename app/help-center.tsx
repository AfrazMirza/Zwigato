import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Alert,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BaseFonts } from '@/constants/BaseFonts';
import Text from "@/skeleton/Text";

const { width } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RealEcommerceHelpCenter() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ISSUES' | 'ORDERS'>('ISSUES');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* ── 1. AMAZON/FLIPKART STYLE FLAT TOP HEADER ── */}
      <View style={styles.topNavbar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navBackIcon}>
          <Ionicons name="arrow-back" size={24} color="#282c3f" />
        </TouchableOpacity>
        <View>
          <Text style={styles.navMainTitle}>Customer Support</Text>
          <Text style={styles.navSubTitle}>24x7 Instant Resolution Desk</Text>
        </View>
        <TouchableOpacity 
          style={styles.headerLiveChatBadge} 
          onPress={() => Alert.alert('Zwigato Support', 'Connecting to secure chat terminals...')}
        >
          <Text style={styles.liveChatBadgeText}>LIVE CHAT</Text>
        </TouchableOpacity>
      </View>

      {/* ── 2. DYNAMIC TABS TOGGLE MATRIX (Flipkart/Myntra Pattern) ── */}
      <View style={styles.tabToggleRow}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'ISSUES' && styles.activeTabButton]}
          onPress={() => setActiveTab('ISSUES')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'ISSUES' && styles.activeTabButtonText]}>
            Browse Issues
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'ORDERS' && styles.activeTabButton]}
          onPress={() => setActiveTab('ORDERS')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'ORDERS' && styles.activeTabButtonText]}>
            Order Related
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        {activeTab === 'ISSUES' ? (
          <View>
            {/* ── 3. VISUAL TILES GRID SYSTEM (Flipkart Style Quick Shortcuts) ── */}
            <Text style={styles.blockSectionHeading}>WHAT ISSUES ARE YOU FACING?</Text>
            <View style={styles.iconicGridContainer}>
              
              <View style={styles.gridRowSplit}>
                <TouchableOpacity style={styles.gridCardTile} activeOpacity={0.8}>
                  <View style={[styles.tileIconCircle, { backgroundColor: '#E3F2FD' }]}>
                    <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#0d47a1" />
                  </View>
                  <Text style={styles.tileMainLabel}>Delivery & Tracking</Text>
                  <Text style={styles.tileSubLabel}>Delayed orders or agent tracking</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridCardTile} activeOpacity={0.8}>
                  <View style={[styles.tileIconCircle, { backgroundColor: '#E8F5E9' }]}>
                    <MaterialCommunityIcons name="cash-refund" size={24} color="#1b5e20" />
                  </View>
                  <Text style={styles.tileMainLabel}>Refunds & Wallet</Text>
                  <Text style={styles.tileSubLabel}>Instant transaction status check</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.gridRowSplit}>
                <TouchableOpacity style={styles.gridCardTile} activeOpacity={0.8}>
                  <View style={[styles.tileIconCircle, { backgroundColor: '#FFF3E0' }]}>
                    <MaterialCommunityIcons name="brightness-percent" size={24} color="#e65100" />
                  </View>
                  <Text style={styles.tileMainLabel}>Offers & Coupons</Text>
                  <Text style={styles.tileSubLabel}>Voucher codes not working</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gridCardTile} activeOpacity={0.8}>
                  <View style={[styles.tileIconCircle, { backgroundColor: '#F3E5F5' }]}>
                    <MaterialCommunityIcons name="account-cog-outline" size={24} color="#4a148c" />
                  </View>
                  <Text style={styles.tileMainLabel}>Account Security</Text>
                  <Text style={styles.tileSubLabel}>Manage credentials & deletion</Text>
                </TouchableOpacity>
              </View>

            </View>

            {/* ── 4. PREMIUM ACCORDION COLLAPSIBLES (Amazon FAQ Pattern) ── */}
            <Text style={styles.blockSectionHeading}>FREQUENTLY ASKED QUESTIONS</Text>
            
            <View style={styles.faqCardContainerShadow}>
              {[
                { id: 'q1', q: 'My order is marked delivered but I havent received it.', a: 'Sometimes delivery partners update statuses pre-arrival. If not received within 5 minutes, tap Live Chat above for secure trunk communication lines.' },
                { id: 'q2', q: 'How long does an instant refund take?', a: 'UPI transactions credit back via PhonePe/Paytm servers within 5 to 10 minutes. Bank cards might scale up to 2 business cycles.' },
                { id: 'q3', q: 'Can I cancel an order post preparation stage?', a: 'Once food preparation locks in, merchant inventory gets utilized. Cancellations at this threshold require special supervisor overrides via live tracking pipelines.' }
              ].map((item) => {
                const isOpened = openFaq === item.id;
                return (
                  <View key={item.id} style={styles.accordionStackUnit}>
                    <TouchableOpacity 
                      style={styles.accordionHeaderClickBar} 
                      onPress={() => toggleAccordion(item.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.accordionQuestionText, isOpened && { color: '#ff3f6c' }]}>{item.q}</Text>
                      <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} size={16} color={isOpened ? "#ff3f6c" : "#7e818c"} />
                    </TouchableOpacity>
                    {isOpened && (
                      <View style={styles.accordionAnswerBlock}>
                        <Text style={styles.accordionAnswerContent}>{item.a}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          /* ── 5. ACTIVE/RECENT ORDERS RESOLUTION FLOW ── */
          <View>
            <Text style={styles.blockSectionHeading}>SELECT ORDER TO REPORT ISSUE</Text>
            
            <View style={styles.orderResolutionCardElement}>
              <View style={styles.orderCardHeaderRow}>
                <View>
                  <Text style={styles.orderIdBoldLabel}>Order ID: #ZW-754129</Text>
                  <Text style={styles.orderMetaSubtitle}>Delivered Yesterday • 2 Items</Text>
                </View>
                <Text style={styles.orderPriceTag}>₹450.00</Text>
              </View>

              <Text style={styles.orderDetailedSummaryText}>1x Premium Veg Cheese Burger, 1x Large Peri Peri Fries</Text>
              
              <View style={styles.horizontalActionFlexButtons}>
                <TouchableOpacity 
                  style={[styles.modalActionRowButton, { borderColor: '#d9383a' }]}
                  onPress={() => Alert.alert('Ticket Generated', 'Cancellation analysis initiated.')}
                >
                  <Text style={[styles.modalActionRowText, { color: '#d9383a' }]}>Report Discrepancy</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.modalActionRowButton, { backgroundColor: '#000000', borderColor: '#000000' }]}
                  onPress={() => Alert.alert('Refund Dashboard', 'Checking banking clearance corridors...')}
                >
                  <Text style={[styles.modalActionRowText, { color: '#FFFFFF' }]}>Track Refund</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── HIGH RESOLUTION PREMIUM STYLING MAPS ──────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F3' },
  scrollPadding: { paddingBottom: 40 },
  
  // Header Navbar Styles
  topNavbar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
  },
  navBackIcon: { padding: 4 },
  navMainTitle: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.3 },
  navSubTitle: { fontSize: 9, fontFamily: BaseFonts.bold, color: '#9496a2', marginTop: 1 },
  headerLiveChatBadge: { backgroundColor: '#FFF0F3', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#ff3f6c' },
  liveChatBadgeText: { color: '#ff3f6c', fontSize: 10, fontFamily: BaseFonts.bold, letterSpacing: 0.5 },

  // Tabs layout toggles styling
  tabToggleRow: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EBEBEB', height: 48 },
  tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTabButton: { borderBottomColor: '#ff3f6c' },
  tabButtonText: { fontSize: 13, fontFamily: BaseFonts.medium, color: '#7e818c' },
  activeTabButtonText: { color: '#ff3f6c', fontFamily: BaseFonts.bold },

  // Sections and grids architectures styles
  blockSectionHeading: { fontSize: 10, fontFamily: BaseFonts.bold, color: '#9496a2', marginHorizontal: 20, marginTop: 24, marginBottom: 12, letterSpacing: 0.8 },
  iconicGridContainer: { paddingHorizontal: 16, gap: 12 },
  gridRowSplit: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 12 },
  gridCardTile: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#EBEBEB', padding: 16, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.02 },
  tileIconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  tileMainLabel: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', textAlign: 'center' },
  tileSubLabel: { fontSize: 10, fontFamily: BaseFonts.regular, color: '#9496a2', textAlign: 'center', marginTop: 4, lineHeight: 14 },

  // Amazon-Inspired Faq Cards containers shadow styling
  faqCardContainerShadow: { backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 24, borderWidth: 1, borderColor: '#EBEBEB', paddingHorizontal: 16, paddingVertical: 4 },
  accordionStackUnit: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  accordionHeaderClickBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  accordionQuestionText: { fontSize: 12.5, fontFamily: BaseFonts.medium, color: '#282c3f', flex: 0.9 },
  accordionAnswerBlock: { paddingBottom: 16, paddingHorizontal: 2 },
  accordionAnswerContent: { fontSize: 11.5, fontFamily: BaseFonts.regular, color: '#7e818c', lineHeight: 16.5 },

  // Orders Resolution Elements Styling
  orderResolutionCardElement: { backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 24, borderWidth: 1, borderColor: '#EBEBEB', padding: 18, elevation: 2 },
  orderCardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  orderIdBoldLabel: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f' },
  orderMetaSubtitle: { fontSize: 11, fontFamily: BaseFonts.medium, color: '#9496a2', marginTop: 2 },
  orderPriceTag: { fontSize: 14, fontFamily: BaseFonts.bold, color: '#282c3f' },
  orderDetailedSummaryText: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#535766', lineHeight: 16, marginBottom: 18 },
  horizontalActionFlexButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  modalActionRowButton: { flex: 1, height: 42, borderRadius: 14, borderWidth: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  modalActionRowText: { fontSize: 12, fontFamily: BaseFonts.bold }
});