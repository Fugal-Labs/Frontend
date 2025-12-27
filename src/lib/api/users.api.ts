import { createApiInstance } from "./api.config";
import * as UserTypes from "@/types/user";

const api = createApiInstance("/users");

export const registerUser = async (
  data: UserTypes.RegisterData
): Promise<UserTypes.User> => {
  const response = await api.post("/register", data);
  return response.data?.user;
};

export const loginUser = async (
  data: UserTypes.LoginData
): Promise<UserTypes.User> => {
  const response = await api.post("/login", data);
  return response.data?.user;
};

export const logoutUser = async (): Promise<boolean> => {
  const response = await api.post("/logout");
  return response.status === 200;
};

export const getCurrentUser = async (): Promise<UserTypes.User> => {
  const response = await api.get("/me");
  return response.data?.user;
};

export const logoutAllSessions = async (): Promise<boolean> => {
  const response = await api.post("/logout-all");
  return response.status === 200;
};

export const refreshToken = async (): Promise<boolean> => {
  const response = await api.post("/refresh");
  return response.status === 200;
};
