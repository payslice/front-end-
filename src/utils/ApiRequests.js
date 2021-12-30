import axios from "axios";
import { constant } from "./ApiConstants";
import {
  storageContainsToken,
  getTokenFromStorage,
  getUserDataFromStorage,
} from "./ApiUtils";

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

const userData = getUserDataFromStorage();
const companyId = {
  company_id: userData.company_id,
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
  return ApiRequest().post("/employer_auth/login", formData);
};

export const employeeLogin = (formData) => {
  return ApiRequest().post("/employee_auth/login", formData);
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

export const saveEmployee = (formData) => {
  return ApiRequestWithToken().post("/employee/save", {
    ...formData,
    ...companyId,
  });
};

export const deleteEmployee = (employeeId) => {
  return ApiRequestWithToken().delete(`/employee/delete/${employeeId}`);
};

export const getAvailableWithdrawFunds = () => {
  return ApiRequestWithToken().get("/employee/amount_avaliable_for_withdrawal");
};
