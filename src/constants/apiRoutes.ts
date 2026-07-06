export default class Routes {
//   static baseUrl = "https://backend.rentee.sa";

// static baseUrl = "http://127.0.0.1:8001/api/v1";
// static baseUrl = "http://192.168.29.17:8001/api/v1";
static baseUrl = "https://inventory-management.codeunderscore.com/api/v1";

  // Authentication API Endpoints
  static register = `${Routes.baseUrl}/auth/register`;
  static login = `${Routes.baseUrl}/auth/login`;
  static requestOtp = `${Routes.baseUrl}/auth/request-otp`;
  static verifyOtp = `${Routes.baseUrl}/auth/verify-otp`;
  static user = `${Routes.baseUrl}/me`;

  // Customer Storefront Endpoints
  static categories = `${Routes.baseUrl}/categories`;
  static products = `${Routes.baseUrl}/products`;
  static addresses = `${Routes.baseUrl}/addresses`;
  static cart = `${Routes.baseUrl}/cart`;
  static wishlist = `${Routes.baseUrl}/wishlist`;
  static orders = `${Routes.baseUrl}/orders`;
}