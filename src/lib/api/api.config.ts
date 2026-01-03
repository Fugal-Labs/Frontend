import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

export const createApiInstance = (suffix = "") => {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.warn(
      "Warning: NEXT_PUBLIC_API_BASE_URL is not set. Defaulting to http://localhost:4000"
    );
  }
  const api = axios.create({
    baseURL:
      (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000") +
      suffix,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Response interceptor for handling 401 errors
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Check if error is 401 and we haven't retried yet
      if (
        error.response?.status === 401 &&
        typeof error.response?.data === "object" &&
        error.response?.data !== null &&
        "message" in error.response.data &&
        (error.response.data as { message?: string }).message ===
          "Authentication token missing" &&
        !originalRequest._retry
      ) {
        // Prevent retry on refresh endpoint itself to avoid infinite loops
        if (originalRequest.url?.includes("/refresh")) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => api(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Attempt to refresh the token
          // Create a separate axios instance for refresh to avoid circular dependency
          const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
          await axios.post(`${baseURL}/users/refresh`, {}, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          processQueue(null);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as Error);
          // If refresh fails, update auth store to set user to null and initialized to true
          if (typeof window !== "undefined") {
            // Update auth store to mark as initialized with no user
            const authStore = localStorage.getItem("auth-store");
            if (authStore) {
              try {
                const parsed = JSON.parse(authStore);
                parsed.state.user = null;
                parsed.state.initialized = true;
                localStorage.setItem("auth-store", JSON.stringify(parsed));
              } catch (e) {
                console.error("[API] Failed to update auth store:", e);
              }
            }
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
