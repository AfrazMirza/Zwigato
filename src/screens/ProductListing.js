import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { getProducts } from '../api/productService';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2874F0" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Responsive grid layout
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => console.log("Selected:", item.id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f3f6' }
});

export default ProductListing;