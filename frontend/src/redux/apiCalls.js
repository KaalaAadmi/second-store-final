import {
  loginStart,
  loginFailure,
  loginSuccess,
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
} from "./userRedux";
import { toast } from "react-toastify";
// import { publicRequest } from "../requestMethods";
// import { publicRequest } from './../requestMethods';
import axios from "axios";

let emailId = "";
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      user
    );
    dispatch(registerSuccess(res.data));
    toast.success("Registered Account Successfully", {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    console.log(error.stack);
    dispatch(registerFailure());
    toast.error("Error Registering Account", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    toast.success("Login Successful", {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch(loginFailure());
    toast.error("Login Failure", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    const res = await axios.get(
      "http://localhost:5000/api/auth/logout"
    );
    dispatch(logoutSuccess(res.data));
    toast.success("Logout Successful", {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch(logoutFailure());
    toast.error("Logout Error", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};
// 1:32:14
export const newsletter = async (dispatch, user) => {
  dispatch(newsLetterStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/newsletter",
      user
    );
    dispatch(newsLetterSuccess(res.data));
    toast.success("Registered for News Letter", {
      position: "bottom-center",
      theme: "dark",
    });
  } catch (error) {
    dispatch(newsLetterFailure());
    toast.error("Not Registered for News Letter", {
      position: "bottom-center",
      theme: "dark",
    });
  }
};

export const sendEmail = async (dispatch, email) => {
  dispatch(sendEmailStart());
  // console.log(email);
  emailId = email.email;
  console.log(emailId);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/sendEmail",
      email
    );
    console.log(res.data);
    dispatch(sendEmailSuccess(res.data));
    toast.success("Password Reset Email Sent", {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch(clearBuffer());
  } catch (error) {
    dispatch(sendEmailFailure());
    toast.error("Could not send email. Try Again " + error, {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch(clearBuffer());
    // console.log(error.stack);
  }
};

export const checkOtp = async (dispatch, otp) => {
  dispatch(checkOtpStart());
  // console.log(email);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/checkOtp",
      otp
    );
    // console.log(res);
    dispatch(checkOtpSuccess(res.data));
    toast.success("Checked OTP", {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch(clearBuffer());
  } catch (error) {
    dispatch(checkOtpFailure());
    toast.error("Wrong OTP entered", {
      position: "bottom-center",
      theme: "dark",
    });
    // console.log(error.stack);
    dispatch(clearBuffer());
  }
};

export const updatePassword = async (dispatch, password) => {
  dispatch(updatePasswordStart());
  const user = { email: emailId, password: password.password };
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/changePassword",
      user
    );
    console.log(res);
    dispatch(updatePasswordSuccess(res.data));
    toast.success("Password Changed Successfully", {
      position: "bottom-center",
      theme: "dark",
    });
    dispatch(clearBuffer());
  } catch (error) {
    dispatch(updatePasswordFailure());
    toast.error("Error", {
      position: "bottom-center",
      theme: "dark",
    });
    // console.log(error.stack);
    dispatch(clearBuffer());
  }
};
