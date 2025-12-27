import axios from "axios";

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
  return api;
};
