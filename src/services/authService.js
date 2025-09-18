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
  // resetPassword: async (data) => {
  //   try {
  //     const response = await apiV1.post("/auth/reset-passowrd", data);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};
