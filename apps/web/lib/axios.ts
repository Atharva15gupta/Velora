import axios, { AxiosError } from "axios";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach Clerk session token to every request
axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    try {
      let retries = 0;
      // @ts-ignore - Clerk exposes this on window after initialization
      while (!window.Clerk && retries < 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        retries++;
      }
      
      // @ts-ignore - Clerk exposes this on window after initialization
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Token fetch failed, proceed without auth header
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error) {
      return Promise.reject(
        new Error(response.data.error.message || "An API error occurred.")
      );
    }
    return response;
  },
  (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "An unknown network error occurred.";
    return Promise.reject(new Error(errorMessage));
  }
);
