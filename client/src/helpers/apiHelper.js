import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuthLogic } from "../api/authApi/checkAuth";

export const API_URL = ` https://control-collections.vercel.app/api`;

const axiosInstance = axios.create({ withCredentials: true, baseURL: API_URL });
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const getHelper = (query, params) => {
  return axiosInstance
    .get(`${query}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const postHelper = (query, params) => {
  return axiosInstance
    .post(`${query}`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const putHelper = (query, params) => {
  return axiosInstance
    .put(`${query}`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteHelper = (query, params) => {
  return axiosInstance
    .delete(`${query}`, { data: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
