import { apiV1 } from "../api/axios";

export const authService = {
  // 🔹 Login
  login: async (data) => {
    try {
      const response = await apiV1.post("/auth/login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // // 🔹 Reset Password
  resetPassword: async (data) => {
    try {
      const response = await apiV1.post("/auth/reset-password", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyCode: async (data) => {
    try {
      const response = await apiV1.post("/auth/verify-code", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  setNewPassword: async (data) => {
    try {
      const response = await apiV1.post("/auth/set-new-password", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
