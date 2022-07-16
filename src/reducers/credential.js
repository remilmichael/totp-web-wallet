import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_TOKEN_NAME,
  DECRYPT_KEY_ID,
  TEMP_DECRYPT_KEY,
  USERNAME,
} from "../constants";

export const autologinFetchStatus = {
  FETCH_IDLE: "FETCH_IDLE",
  FETCH_RUNNING: "FETCH_RUNNING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_CLEAR: "FETCH_CLEAR",
};

const initialState = {
  fetch: autologinFetchStatus.FETCH_IDLE,
  email: null,
  encKey: null,
};

const credential = createSlice({
  name: "credential",
  initialState: initialState,
  reducers: {
    saveCredential: (state, action) => {
      state.email = action.payload.email;
      state.encKey = action.payload.encKey;
      state.fetch = autologinFetchStatus.FETCH_SUCCESS;
      localStorage.setItem(USERNAME, action.payload.email);
      localStorage.setItem(AUTH_TOKEN_NAME, action.payload.expiry);
      localStorage.setItem(TEMP_DECRYPT_KEY, action.payload.decKey);
      localStorage.setItem(DECRYPT_KEY_ID, action.payload.uuid);
    },
    updateFetchStatus: (state, action) => {
      state.fetch = action.payload.status;
    },
    updateCredential: (state, action) => {
      state.fetch = autologinFetchStatus.FETCH_SUCCESS;
      state.email = action.payload.email;
      state.encKey = action.payload.encKey;
    },
    clearCredential: (state, action) => {
      state.fetch = autologinFetchStatus.FETCH_CLEAR;
      state.email = null;
      state.encKey = null;
    },
  },
});

export const {
  saveCredential,
  updateCredential,
  updateFetchStatus,
  clearCredential,
} = credential.actions;
export default credential.reducer;
