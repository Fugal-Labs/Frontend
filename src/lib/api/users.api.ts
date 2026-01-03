import { createApiInstance } from "./api.config";
import * as UserTypes from "@/types/user";

export const userApi = createApiInstance("/users");

export const registerUser = async (
  data: UserTypes.RegisterData
): Promise<UserTypes.User> => {
  const response = await userApi.post("/register", data);
  return response.data?.data?.user;
};

export const loginUser = async (
  data: UserTypes.LoginData
): Promise<UserTypes.User> => {
  const response = await userApi.post("/login", data);
  return response.data?.data?.user;
};

export const logoutUser = async (): Promise<boolean> => {
  const response = await userApi.post("/logout");
  return response.status === 200;
};

export const getCurrentUser = async (): Promise<UserTypes.User> => {
  const response = await userApi.get("/me");
  return response.data?.data;
};

export const logoutAllSessions = async (): Promise<boolean> => {
  const response = await userApi.post("/logout-all");
  return response.status === 200;
};

export const refreshToken = async (): Promise<boolean> => {
  const response = await userApi.post("/refresh");
  return response.status === 200;
};
