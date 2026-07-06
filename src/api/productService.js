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

// import Routes from '../constants/apiRoutes';
// import { request } from '../controller/fetchApiController';

// // 1. Get Category Rail (List all active categories)
// export const getCategoryList = async () => {
//   try {
//     const result = await request(Routes.categories, "GET");
//     return result.data || []; 
//   } catch (error) {
//     console.error("API Error Categories:", error);
//     return [];
//   }
// };

// // 2. Get Products by a specific Category (Fallback structure)
// export const getProductsByCategory = async (category) => {
//   try {
//     const result = await request(`${Routes.products}?category=${category}`, "GET");
//     return result.data || [];
//   } catch (error) {
//     console.error(`API Error Category [${category}]:`, error);
//     return [];
//   }
// };

// // 3. Main function for all products (Initial Storefront fallback)
// export const getProducts = async () => {
//   try {
//     const result = await request(Routes.products, "GET");
//     return result.data || []; 
//   } catch (error) {
//     console.error("API Error Products storefront:", error);
//     return [];
//   }
// };

// // 4. Dynamic Search Products Engine
// export const searchProducts = async (query) => {
//   try {
//     const result = await request(`${Routes.products}?search=${query}`, "GET");
//     return result.data || [];
//   } catch (error) {
//     console.error("API Error Search Query:", error);
//     return [];
//   }
// };

// // 5. Paginated Products Engine for Feed Infinite Scroll
// export const getPaginatedProducts = async (limit = 10, skip = 0) => {
//   try {
//     const url = `${Routes.products}?limit=${limit}&skip=${skip}`;
//     const result = await request(url, "GET");
//     return result.data || []; // Real PHP wrapper returns data array
//   } catch (error) {
//     console.error("API Error Paginated Products:", error);
//     return [];
//   }
// };

// // 6. Paginated Products by Category for Filtered Feed Scroll
// export const getPaginatedCategoryProducts = async (category, limit = 10, skip = 0) => {
//   try {
//     const url = `${Routes.products}?category=${category}&limit=${limit}&skip=${skip}`;
//     const result = await request(url, "GET");
//     return result.data || [];
//   } catch (error) {
//     console.error("API Error Category Pagination:", error);
//     return [];
//   }
// };

// // 7. Individual Product Details Router Matrix Fetch
// export const getProductDetailsById = async (id) => {
//   try {
//     return await request(`${Routes.products}/${id}`, "GET");
//   } catch (error) {
//     console.error("API Error Single Product details ID:", error);
//     return null;
//   }
// };