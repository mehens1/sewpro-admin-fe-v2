import axios from "axios";
import { clearToken } from "../store/authSlice";
import { clearUser } from "../store/userSlice";
import { store } from "../store/store";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL_V1 = API_URL + "/v1";

const createApi = (baseURL) => {
  const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;

      // Only trigger session-expired redirect if NOT login
      if (
        error.response?.status === 401 &&
        !originalRequest?.url?.includes("/login")
      ) {
        store.dispatch(clearToken());
        store.dispatch(clearUser());
        const sessionExpiryMessage = "Your session has expired. Please log in again.";
        window.location.href = `/login?message=${encodeURIComponent(sessionExpiryMessage)}`;
      }

      // Pass error to caller (e.g. Login.js)
      return Promise.reject(error);
    }
  );

  return api;
};

export const baseUrl = createApi(API_URL);
export const apiV1 = createApi(API_URL_V1);
