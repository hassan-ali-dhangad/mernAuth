import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

 signup: async (userData) => {
  const response = await api.post("/auth/signup", userData);

  set({
    pendingVerificationEmail: userData.email,
  });

  return response.data;
},

 verifyEmail: async ({ email, otp }) => {
  const response = await api.post("/auth/verify-email", {
    email,
    otp,
  });

  set({
    user: response.data.user,
    isAuthenticated: true,
  });

  return response.data;
},

  resendOTP: async ({ email }) => {
    const response = await api.post("/auth/resend-otp", {
      email,
    });

    return response.data;
  },

  login: async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    set({
      user: response.data.user,
      isAuthenticated: true,
    });

    return response.data;
  },

  getMe: async () => {
    try {
      const response = await api.get("/auth/me");

      set({
        user: response.data.user,
        isAuthenticated: true,
      });

      return response.data;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });

      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },

  forgotPassword: async ({ email }) => {
    const response = await api.post("/auth/forgot-password", {
      email,
    });

    return response.data;
  },

  resetPassword: async ({ token, password, confirmPassword }) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });

    return response.data;
  },

  changePassword: async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    return response.data;
  },

  deleteAccount: async () => {
  const response = await api.delete("/auth/delete-account");
  set({
    user: null,
    isAuthenticated: false,
  });
  return response.data;
  },
  
}));

export default useAuthStore;
