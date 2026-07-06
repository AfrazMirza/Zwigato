import { Platform } from "react-native";
import { getStoredToken } from "./tokenController";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  body?: any;
  metadata?: Record<string, unknown>;
  timeout?: number;
}

export async function request(
  url: string,
  method: RequestMethod,
  options: RequestOptions = {}
) {
  const token = await getStoredToken();

  // Header compilation map matching exactly screenshots
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": Platform.OS.toLowerCase(),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchConfig: RequestInit = {
    method,
    headers,
  };

  if (options.body && method !== "GET") {
    // If caller passed a FormData instance (for file uploads), let the
    // browser/set-native-fetch implementation set the Content-Type
    // (including boundary). Do not JSON.stringify FormData.
    if (typeof FormData !== "undefined" && options.body instanceof FormData) {
      // remove explicit Content-Type so boundary is set automatically
      delete headers["Content-Type"];
      fetchConfig.body = options.body;
    } else {
      fetchConfig.body = JSON.stringify(options.body);
    }
  }

  const res = await fetch(url, fetchConfig);

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch {
      try {
        errorData = { message: await res.text() };
      } catch {
        errorData = { message: "Unknown endpoint resolution error" };
      }
    }
    throw { status: res.status, errorData };
  }

  return await res.json();
}