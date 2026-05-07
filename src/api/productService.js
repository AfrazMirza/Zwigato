const BASE_URL = 'https://dummyjson.com';

// 1. Get all category names
export const getCategoryList = async () => {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  return await res.json();
};

// 2. Get products by a specific category
export const getProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  const data = await res.json();
  return data.products;
};

// 3. Existing function for all products
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products?limit=100`);
  const data = await res.json();
  return data.products;
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
};

export const getPaginatedProducts = async ( limit = 10, skip = 0) => {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    console.log("Checking URL:", res);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    } 
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Pagination Fetch Error:", error);
    console.error("Fetch Error Details:", error.message);
    return [];
  }
};

export const getPaginatedCategoryProducts = async (category, limit = 10, skip = 0) => {
  try {
    const url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Category Pagination Error:", error);
    return [];
  }
};