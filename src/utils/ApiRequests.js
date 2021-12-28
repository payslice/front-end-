import axios from "axios";
import { constant } from "./ApiConstants";
import { storageContainsToken, getTokenFromStorage } from "./ApiUtils";

// Resusable requests template
export const ApiRequest = () => {
  const config = { baseURL: constant.baseUrl };
  const instance = axios.create(config);
  return instance;
};

export const ApiRequestWithToken = () => {
  const config = { baseURL: constant.baseUrl };
  if (storageContainsToken()) {
    const token = getTokenFromStorage();
    config.headers = { Authorization: `Bearer ${token}` };
  }
  const instance = axios.create(config);
  return instance;
};

const ApiRequestMultiPart = () => {
  const config = { baseURL: constant.baseUrl };
  if (storageContainsToken()) {
    const token = getTokenFromStorage();
    config.headers = {
      Authorization: `Bearer ${token}`,
      "content-type": `multipart/form-data; `,
    };
  }
  const instance = axios.create(config);
  return instance;
};

// End of reusable template requests

export const adminLogin = (formData) => {
  return ApiRequest().post("/admin_auth/login", formData);
};

export const adminRegister = (formData) => {
  return ApiRequest().post("/admin_auth/register", formData);
};

export const employerRegister = (formData) => {
  return ApiRequest().post("/employer_auth/register", formData);
};

export const employerLogin = (formData) => {
  console.log("api url", constant.apiBaseUrl);
  return ApiRequest().post("/employer_auth/login", formData);
};

export const companyInfoOnboarding = (formData) => {
  return ApiRequestWithToken().post("/company/save", formData);
};

export const companyPolicy = (formData) => {
  return ApiRequestWithToken().post("/company_policy/save", formData);
};

export const getAllEmployees = () => {
  return ApiRequestWithToken().get("/employee/all");
};
