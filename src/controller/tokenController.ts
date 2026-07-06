import * as SecureStore from "expo-secure-store";

// Token ko login/verify ke baad save karne ke liye
export const saveTokens = async (data: any) => {
  try {
    const now = Date.now();
    
    // PHP response variables alignment mapping
    const accessToken = data.token || data.accessToken;
    const refreshToken = data.refresh_token || data.refreshToken || "";

    await SecureStore.setItemAsync(
      "authTokens",
      JSON.stringify({
        accessToken,
        refreshToken,
        savedAt: now
      })
    );
    console.log("Token saved successfully.");
  } catch (error) {
    console.error("Error saving secure tokens:", error);
  }
};

// Request bhejde waqt token nikalne ke liye
export const getStoredToken = async (): Promise<string | null> => {
  try {
    const credentials = await SecureStore.getItemAsync("authTokens");
    if (credentials) {
      const parsed = JSON.parse(credentials);
      return parsed.accessToken || null;
    }
  } catch (error) {
    console.error("Error retrieving stored token:", error);
  }
  return null;
};