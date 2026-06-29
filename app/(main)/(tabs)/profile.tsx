import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BaseFonts } from '@/constants/BaseFonts';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* USER INFO BLOCK */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
          <View style={styles.userMeta}>
            <Text style={styles.userName}>Afraz Mirza</Text>
            <Text style={styles.userEmail}>afraz.dev@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Feather name="edit-2" size={16} color="#ff3f6c" />
          </TouchableOpacity>
        </View>

        {/* ACCOUNT DASHBOARD LIST OPTION OPTIONS */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionLabel}>YOUR ORDERS & ACTIVITY</Text>
          
          {[
            { id: 'orders', label: 'Your Orders', sub: 'Track, change or buy items again', icon: 'cube-outline' },
            { id: 'wishlist', label: 'Your Wishlist', sub: 'Saved items you love', icon: 'heart-outline' },
            { id: 'coupons', label: 'Coupons & Offers', sub: 'Manage active voucher codes', icon: 'pricetag-outline' },
          ].map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuRow} activeOpacity={0.7}>
              <View style={styles.rowLeft}>
                <Ionicons name={item.icon as any} size={20} color="#535766" style={styles.rowIcon} />
                <View>
                  <Text style={styles.rowTitle}>{item.label}</Text>
                  <Text style={styles.rowSub}>{item.sub}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={16} color="#9496a2" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>
          
          {[
            { id: 'profile', label: 'Edit Profile Credentials', icon: 'person-outline', route: '/edit-profile' },
            { id: 'address', label: 'Saved Delivery Addresses', icon: 'location-outline', route: '/addresses' },
            { id: 'payments', label: 'Saved Cards & UPI Wallet', icon: 'card-outline', route: '/payments' },
            { id: 'help', label: 'Customer Support & Help Center', icon: 'help-circle-outline', route: '/help-center' },
          ].map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuRow} activeOpacity={0.7} onPress={() => item.route && router.push(item.route as any)}>
              <View style={styles.rowLeft}>
                <Ionicons name={item.icon as any} size={20} color="#535766" style={styles.rowIcon} />
                <Text style={styles.rowSimpleTitle}>{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#9496a2" />
            </TouchableOpacity>
          ))}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color="#ff3f6c" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f7f7f8' },
  scrollContent: { paddingBottom: 120 },
  
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f2',
  },
  avatarBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff3f6c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 18, fontFamily: BaseFonts.bold },
  userMeta: { flex: 1, marginLeft: 16 },
  userName: { fontSize: 16, fontFamily: BaseFonts.bold, color: '#282c3f' },
  userEmail: { fontSize: 12, fontFamily: BaseFonts.regular, color: '#7e818c', marginTop: 2 },
  editBtn: { padding: 6 },

  menuSection: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 6, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f2' },
  sectionLabel: { fontSize: 10, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.8, marginVertical: 10 },
  menuRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: '#f4f4f5' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 0.9 },
  rowIcon: { marginRight: 14 },
  rowTitle: { fontSize: 13, fontFamily: BaseFonts.semiBold, color: '#282c3f' },
  rowSub: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#7e818c', marginTop: 2 },
  rowSimpleTitle: { fontSize: 13, fontFamily: BaseFonts.medium, color: '#282c3f' },
  
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffebef',
  },
  logoutText: { color: '#ff3f6c', fontSize: 13, fontFamily: BaseFonts.bold, letterSpacing: 0.4 },
});