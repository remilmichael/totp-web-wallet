import { createSlice } from "@reduxjs/toolkit";
import { AUTH_TOKEN_NAME } from "../constants";

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
      localStorage.setItem(AUTH_TOKEN_NAME, action.payload.expiry)
    }
  },
});


export const { saveCredential } = credential.actions;
export default credential.reducer;