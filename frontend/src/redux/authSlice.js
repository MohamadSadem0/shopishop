// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from "crypto-js";

const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

// Utility function to decrypt data
const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Initialize state from sessionStorage
const storedToken = sessionStorage.getItem("authToken");
const storedUserEmail = sessionStorage.getItem("userEmail");
const storedUserName = sessionStorage.getItem("userName");
const storedUserRole = sessionStorage.getItem("userRole");

const initialState = {
  user: storedUserEmail && storedUserName && storedUserRole ? {
    email: decryptData(storedUserEmail),
    name: decryptData(storedUserName),
    role: decryptData(storedUserRole),
  } : null,
  token: storedToken ? decryptData(storedToken) : null,
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.clear(); // Clear sessionStorage on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
