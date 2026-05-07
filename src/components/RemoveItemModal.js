// // src/components/RemoveItemModal.js
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const RemoveItemModal = ({ isVisible, onClose, item, onRemove, onMoveToWishlist }) => {
//   if (!item) return null; // Safety check

//   return (
//     <Modal
//       isVisible={isVisible}
//       onBackdropPress={onClose} // Modal ke bahar click kare toh band ho jaye
//       style={styles.modal}
//       swipeDirection={['down']} // Swipe down functionality
//       onSwipeComplete={onClose}
//       useNativeDriverForBackdrop
//     >
//       <View style={styles.modalContent}>
//         {/* Verification Section */}
//         <View style={styles.topInfo}>
//           <Text style={styles.headerTitle}>Move from Bag</Text>
//           <Text style={styles.subtitle}>Are you sure you want to move this item from bag?</Text>
//         </View>

//         {/* Selected Item Image */}
//         <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />

//         {/* Buttons Section (Referencing image_1.png) */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.btnRemove} onPress={onRemove}>
//             <Text style={styles.removeText}>REMOVE</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.btnWishlist} onPress={onMoveToWishlist}>
//             <Text style={styles.wishlistText}>MOVE TO WISHLIST</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modal: { justifyContent: 'flex-end', margin: 0 },
//   modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 8, borderTopRightRadius: 8, padding: 20 },
//   topInfo: { marginBottom: 20 },
//   headerTitle: { fontSize: 16, fontWeight: 'bold' },
//   subtitle: { fontSize: 13, color: '#878787', marginTop: 5 },
//   itemImage: { width: 100, height: 130, borderRadius: 4, alignSelf: 'center', marginBottom: 20 },
//   buttonRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f0f0f0', marginTop: 20 },
//   btnRemove: { flex: 1, paddingVertical: 15, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#f0f0f0' },
//   btnWishlist: { flex: 1, paddingVertical: 15, alignItems: 'center' },
//   removeText: { fontWeight: 'bold', fontSize: 14, color: '#282c3f' },
//   wishlistText: { fontWeight: 'bold', fontSize: 14, color: '#ff3f6c' },
// });

// export default RemoveItemModal;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { BaseFonts } from '../constants/BaseFonts';

const RemoveItemModal = ({ visible, onClose, item, onRemove, onMoveToWishlist }) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop: Bahar click karne par band hoga */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              
              {/* Image & Text Section (As per your reference image) */}
              <View style={styles.topSection}>
                <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
                <View style={styles.textContainer}>
                   <View style={styles.headerRow}>
                      <Text style={styles.headerTitle}>Move from Bag</Text>
                      <TouchableOpacity onPress={onClose}>
                         <Ionicons name="close" size={24} color="#282c3f" />
                      </TouchableOpacity>
                   </View>
                  <Text style={styles.subtitle}>Are you sure you want to move this item from bag?</Text>
                </View>
              </View>

              {/* Action Buttons Row */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.btn} onPress={onRemove}>
                  <Text style={styles.removeText}>REMOVE</Text>
                </TouchableOpacity>
                
                <View style={styles.divider} />

                <TouchableOpacity style={styles.btn} onPress={onMoveToWishlist}>
                  <Text style={styles.wishlistText}>MOVE TO WISHLIST</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  topSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 2,
    backgroundColor: '#f9f9f9'
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: BaseFonts.semiBold,
    color: '#282c3f'
  },
  subtitle: {
    fontSize: 14,
    color: '#696b79',
    marginTop: 4,
    lineHeight: 18
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eaeaec',
    height: 50,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#eaeaec',
    height: '100%',
  },
  removeText: {
    fontFamily: BaseFonts.semiBold,
    fontSize: 14,
    color: '#282c3f',
  },
  wishlistText: {
    fontFamily: BaseFonts.semiBold,
    fontSize: 14,
    color: '#ff3f6c',
  },
});

export default RemoveItemModal;