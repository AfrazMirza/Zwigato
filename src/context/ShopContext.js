import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [removedItem, setRemovedItem] = useState(null); // Last removed item ko save karne ke liye
  const [showSnackbar, setShowSnackbar] = useState(false); // Snackbar dikhane/chhupane ke liye
  const snackbarTimer = useRef(null); // Auto-hide timer

  useEffect(() => {
  setSelectedIds(cart.map(item => item.id));
}, [cart]);

const toggleSelection = (id) => {
  setSelectedIds(prev => 
    prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
  );
};

const toggleAll = () => {
  if (selectedIds.length === cart.length) setSelectedIds([]);
  else setSelectedIds(cart.map(item => item.id));
};

  // STEP 1: Load saved data when the app starts
  useEffect(() => {
    getDataFromPhone();
  }, []);

  const getDataFromPhone = async () => {
    const saved = await AsyncStorage.getItem('my_favs');
    if (saved != null) {
      setFavorites(JSON.parse(saved));
    }
  };

  // STEP 2: Logic for Favorites (Simple Add or Remove)
//   const toggleFavorite = (product) => {
//     const isAlreadyFav = favorites.find(item => item.id === product.id);

//     if (isAlreadyFav) {
//       // If it exists, filter it out (Remove)
//       const newList = favorites.filter(item => item.id !== product.id);
//       setFavorites(newList);
//       AsyncStorage.setItem('my_favs', JSON.stringify(newList));
//     } else {
//       // If it doesn't exist, add it to the list
//       const newList = [...favorites, product];
//       setFavorites(newList);
//       AsyncStorage.setItem('my_favs', JSON.stringify(newList));
//     }
//   };

const toggleFavorite = (product) => {
  setFavorites((prev) => {
    const isExist = prev.find((item) => item.id === product.id);
    if (isExist) {
      // Remove ho raha hai: Undo ke liye data save karein
      setRemovedItem(product);
      setShowSnackbar(true);
      
      // Clear existing timer and start a new one (5 seconds)
      if (snackbarTimer.current) clearTimeout(snackbarTimer.current);
      snackbarTimer.current = setTimeout(() => setShowSnackbar(false), 5000);
      
      return prev.filter((item) => item.id !== product.id);
    } else {
      // Add ho raha hai
      return [...prev, product];
    }
  });
};

const undoRemoveFromWishlist = () => {
  if (removedItem) {
    toggleFavorite(removedItem); // Phir se add kar dega
    setShowSnackbar(false);
    setRemovedItem(null);
  }
};

  // STEP 3: Logic for Cart (With Simple Stock/MOQ Checks)
//   const addToCart = (product) => {
//     // A. Check if product is already in cart
//     const itemInCart = cart.find(item => item.id === product.id);

//     // B. Check Stock
//     const currentAmount = itemInCart ? itemInCart.quantity : 0;
//     if (currentAmount + 1 > product.stock) {
//       alert("No more items left in stock!");
//       return;
//     }

//     // C. Update or Add
//     if (itemInCart) {
//       // Increase quantity by 1
//       setCart(cart.map(item => 
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       // Add new item using Minimum Order Quantity (MOQ)
//       const startQty = product.minimumOrderQuantity || 1;
//       setCart([...cart, { ...product, quantity: startQty }]);
//     }
//   };

const addToCart = (product) => {
  const itemInCart = cart.find(item => item.id === product.id);
  const moq = product.minimumOrderQuantity || 1;
  const stock = product.stock || 0;

  // STEP A: Naya item hai ya purana?
  if (itemInCart) {
    // Agar pehle se cart mein hai, toh +1 karne ki koshish karein
    if (itemInCart.quantity + 1 > stock) {
      alert(`Sorry! Only ${stock} items available in stock.`);
      return;
    }

    setCart(cart.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
    alert("Quantity increased in cart!");
  } else {
    // STEP B: Naya item hai, toh sidha MOQ add karein
    if (moq > stock) {
      alert("Insufficient stock to meet Minimum Order Quantity!");
      return;
    }

    setCart([...cart, { ...product, quantity: moq }]);
    alert(`Added Minimum Order Quantity: ${moq} units to cart.`);
  }
};

const removeFromCart = (productId) => {
  setCart(cart.filter(item => item.id !== productId));
};

  return (
    <ShopContext.Provider value={{ cart, favorites, toggleFavorite, addToCart, removeFromCart, toggleAll, toggleSelection, selectedIds, undoRemoveFromWishlist, removedItem, showSnackbar }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);