import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BaseFonts } from '@/constants/BaseFonts';

const { width } = Dimensions.get('window');

export default function EditProfileCredentials() {
  const router = useRouter();

  // ── USER PROFILE LOCAL STATES ──
  // Default values mapping current profile data
  const [profileData, setProfileData] = useState({
    name: 'Afraz Mirza',
    email: 'afraz.dev@gmail.com',
    mobile: '9174109720',
  });

  // ── SAVE & VALIDATION ENGINE ──
  const handleSaveProfile = () => {
    const { name, email, mobile } = profileData;

    // 1. Basic Empty Validation Check
    if (!name.trim() || !email.trim() || !mobile.trim()) {
      Alert.alert('Validation Error', 'All fields are mandatory. Please fill them up.');
      return;
    }

    // 2. Simple Email Pattern Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    // 3. Mobile Length Validation
    if (mobile.trim().length !== 10) {
      Alert.alert('Validation Error', 'Mobile number must be exactly 10 digits.');
      return;
    }

    // Success Sequence (Yahan future me aapka API call/Redux trigger aayega)
    Alert.alert('Success', 'Profile credentials updated successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      
      {/* HEADER BAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1e1e1e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDIT PROFILE</Text>
        <View style={{ width: 24 }} /> {/* Flex alignment balancer */}
      </View>

      {/* FORM FIELDS CONTAINER */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContainer}>
        <Text style={styles.sectionLabel}>UPDATE YOUR PERSONAL DETAILS</Text>

        {/* Name Input Block */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabelText}>Full Name *</Text>
          <TextInput
            style={styles.formInputField}
            value={profileData.name}
            placeholder="Enter your full name"
            placeholderTextColor="#a9a9a9"
            onChangeText={(txt) => setProfileData(p => ({ ...p, name: txt }))}
          />
        </View>

        {/* Email Input Block */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabelText}>Email Address *</Text>
          <TextInput
            style={styles.formInputField}
            value={profileData.email}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email address"
            placeholderTextColor="#a9a9a9"
            onChangeText={(txt) => setProfileData(p => ({ ...p, email: txt }))}
          />
        </View>

        {/* Mobile Input Block */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabelText}>Mobile Number *</Text>
          <TextInput
            style={styles.formInputField}
            value={profileData.mobile}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            placeholderTextColor="#a9a9a9"
            onChangeText={(txt) => setProfileData(p => ({ ...p, mobile: txt }))}
          />
        </View>
      </ScrollView>

      {/* FIXED BOTTOM ACTION BUTTON BUTTONS */}
      <View style={styles.formFooterActionsRow}>
        <TouchableOpacity style={styles.footerCancelBtn} onPress={() => router.back()}>
          <Text style={styles.footerCancelBtnText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerSaveBtn} onPress={handleSaveProfile}>
          <Text style={styles.footerSaveBtnText}>SAVE DETAILS</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// ─── PREMIUM PIXEL PERFECT STYLES ──────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
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
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 15, fontFamily: BaseFonts.bold, color: '#1e1e1e', letterSpacing: 0.3 },

  formContainer: { padding: 24, paddingBottom: 120 },
  sectionLabel: { fontSize: 11, fontFamily: BaseFonts.bold, color: '#9496a2', letterSpacing: 0.6, marginBottom: 20 },
  
  inputWrapper: { marginBottom: 24 },
  inputLabelText: { fontSize: 11, fontFamily: BaseFonts.regular, color: '#7e818c', marginBottom: 6 },
  formInputField: { 
    height: 42, 
    borderBottomWidth: 1, 
    borderBottomColor: '#dbdbdb', 
    fontSize: 14, 
    fontFamily: BaseFonts.medium, 
    color: '#282c3f', 
    paddingVertical: 6 
  },

  // Double Split Bottom Action Row Layout
  formFooterActionsRow: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 52, 
    flexDirection: 'row', 
    borderTopWidth: 1, 
    borderTopColor: '#f0f0f0', 
    backgroundColor: '#FFFFFF' 
  },
  footerCancelBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  footerCancelBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#282c3f', letterSpacing: 0.5 },
  footerSaveBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff3f6c' }, // Zwigato theme brand red/pink
  footerSaveBtnText: { fontSize: 13, fontFamily: BaseFonts.bold, color: '#FFFFFF', letterSpacing: 0.5 },
});