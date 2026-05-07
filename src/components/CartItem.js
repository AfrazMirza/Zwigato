import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { COLORS } from '../constants/colors';
import { BaseFonts } from '../../src/constants/BaseFonts';
import { useRouter } from 'expo-router';

const CartItem = ({ item, isSelected, onToggle, onRemove }) => {
    const router = useRouter();
  return (
    <View style={styles.card}>
      {/* Selection Checkbox */}
      <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.checkbox}>
        <Ionicons 
          name={isSelected ? "checkbox" : "square-outline"} 
          size={22} 
          color={isSelected ? COLORS.primary : COLORS.textLight} 
        />
      </TouchableOpacity>
      
    <TouchableOpacity onPress={() =>  {console.log("clicked", item.id); router.navigate(`/details/${item.id}`);}}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>{item.brand}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Ionicons name="trash-outline" size={16} color={COLORS.shadow} />
          </TouchableOpacity>
        </View>
        
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>

        <View style={styles.selectorRow}>
          <View style={styles.selector}><Text style={styles.selText}>Size: Unique</Text><Ionicons name="chevron-down" size={12}/></View>
          <View style={styles.selector}><Text style={styles.selText}>Qty: {item.quantity}</Text><Ionicons name="chevron-down" size={12}/></View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{Math.round(item.price * 80)}</Text>
          <Text style={styles.mrp}>₹{Math.round(item.price * 1.5 * 80)}</Text>
          <Text style={styles.off}>{item.discountPercentage} OFF</Text>
        </View>

        <View style={styles.policyRow}>
          <Octicons name="arrow-switch" size={12} color={COLORS.text} />
          <Text style={styles.policyText}> {item.returnPolicy || '14 days return'}</Text>
        </View>

         <View style={styles.policyRow}>
                    <MaterialCommunityIcons name="truck-delivery-outline" size={15} color="#000" />
                   <Text style={styles.policyText}>{item.shippingInformation}</Text>
                </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#ffffff', padding: 12, marginHorizontal: 15,   borderBottomWidth: 1, borderBottomColor: '#bdadad', borderStyle: 'dashed', },
  checkbox: { position: 'absolute', top: 15, left: 10, zIndex: 1 },
  image: { width: 100, height: 130, borderRadius: 10, backgroundColor: '#f9f9f9', marginLeft: 25 },
  details: { flex: 1, marginLeft: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  brand: { fontFamily: BaseFonts.semiBold, fontSize: 14, color: COLORS.text },
  title: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  selectorRow: { flexDirection: 'row', marginTop: 8 },
  selector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 8 },
  selText: { fontSize: 12, marginRight: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  price: { fontSize: 15, fontFamily: BaseFonts.semiBold,},
  mrp: { fontSize: 13, textDecorationLine: 'line-through', color: '#878787', marginLeft: 6 },
  off: { fontSize: 13, color: '#ff905a', marginLeft: 6 },
  policyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 5 },
  policyText: { fontSize: 12, color: '#282c3f' },
  deliveryText: { fontSize: 12, color: '#282c3f', marginTop: 4 }
});

export default CartItem;