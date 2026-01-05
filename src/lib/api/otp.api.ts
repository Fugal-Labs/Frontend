import { createApiInstance } from "./api.config";

const api = createApiInstance("/otp");

export const sendOtp = async (email: string): Promise<boolean> => {
  const response = await api.post("/send", { email });
  return response.status === 200;
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  const response = await api.post("/verify", { email, otp });
  return response.status === 200;
};
