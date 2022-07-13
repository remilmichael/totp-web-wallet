import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_TOKEN_NAME,
  DECRYPT_KEY_ID,
  TEMP_DECRYPT_KEY,
  USERNAME,
} from "../constants";

const initialState = {
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

      localStorage.setItem(USERNAME, action.payload.email);
      localStorage.setItem(AUTH_TOKEN_NAME, action.payload.expiry);
      localStorage.setItem(TEMP_DECRYPT_KEY, action.payload.decKey);
      localStorage.setItem(DECRYPT_KEY_ID, action.payload.uuid);
    },
    updateCredential: (state, action) => {
      state.email = action.payload.email;
      state.encKey = action.payload.encKey;
    }
  },
});

export const { saveCredential, updateCredential } = credential.actions;
export default credential.reducer;
