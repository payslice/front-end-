import { constant } from "./ApiConstants";

export const parseErrorToArray = (error) => {
  const arr = [];
  Object.values(error).forEach((v) => {
    arr.push(...v);
  });
  return arr;
};

export const getApiErrorMessage = (err) => {
  const error = err?.data ?? err;
  const firstError = parseErrorToArray(error?.errors ?? {})?.[0];
  return firstError ?? error?.message ?? "An error occurred";
};

export const setTokenToStorage = (token) => {
  return localStorage.setItem(constant.tokenName, token);
};

export const setExpiryTimeToStorage = (date) => {
  return localStorage.setItem(constant.expiryName, date);
};

export const storageContainsToken = () => {
  return !!localStorage.getItem(constant.tokenName);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem(constant.tokenName);
};

export const getExpiryTimeFromStorage = () => {
  return localStorage.getItem(constant.expiryName);
};

export const tokenStillValid = () => {
  return new Date().getTime() < new Date(getExpiryTimeFromStorage()).getTime();
};

export const checkLogin = () => {
  if (getTokenFromStorage()) {
    return true;
  } else {
    return false;
  }
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem(constant.tokenName);
};

export const removeExpiryDateFromStorage = () => {
  localStorage.removeItem(constant.expiryName);
};

export const logout = () => {
  return removeExpiryDateFromStorage() && removeTokenFromStorage();
};

export const Today = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
};
