// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import {toast }
const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  newUser: null,
  newsletter: false,
  mailSend: false,
  checkOtp: false,
  updatedPassword: false,
  email: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    logoutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.newUser = null;
    },
    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.newUser = action.payload;
      state.error = false;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    newsLetterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    newsLetterSuccess: (state, action) => {
      state.isFetching = false;
      state.newsletter = true;
      state.error = false;
    },
    newsLetterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    sendEmailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    sendEmailSuccess: (state, action) => {
      state.isFetching = false;
      state.mailSend = true;
      state.error = false;
      // state.email = action.payload.accepted[0];
    },
    sendEmailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    checkOtpStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    checkOtpSuccess: (state, action) => {
      state.isFetching = false;
      state.checkOtp = true;
      state.error = false;
    },
    checkOtpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updatePasswordStart: (state) => {
      state.mailSend = false;
      state.isFetching = true;
      state.error = false;
    },
    updatePasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.updatedPassword = true;
      state.error = false;
    },
    updatePasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearBuffer: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.newUser = null;
      state.newsletter = false;
      state.mailSend = false;
      state.checkOtp = false;
      state.updatedPassword = false;
      state.email = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  newsLetterStart,
  newsLetterSuccess,
  newsLetterFailure,
  sendEmailStart,
  sendEmailSuccess,
  sendEmailFailure,
  checkOtpStart,
  checkOtpSuccess,
  checkOtpFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  clearBuffer,
} = userSlice.actions;
export default userSlice.reducer;
