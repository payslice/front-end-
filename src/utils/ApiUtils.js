import { constant } from './ApiConstants';
import Cookies from 'js-cookie';

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
	return firstError ?? error?.message ?? 'An error occurred';
};

export const setTokenToStorage = (token) => {
	return localStorage.setItem(constant.tokenName, token);
};

// export const setEmployerTokenToStorage = (token) => {
//   return localStorage.setItem(constant.employerTokenName, token);
// };
// export const setEmployeeTokenToStorage = (token) => {
//   return localStorage.setItem(constant.employeeTokenName, token);
// };

export const setuserDataToStorage = (userData) => {
	return localStorage.setItem(constant.userDatakey, JSON.stringify(userData));
};

export const setExpiryTimeToStorage = (date) => {
	return localStorage.setItem(constant.expiryName, date);
};

export const setClockInTimeToStorage = () => {
	return localStorage.setItem(constant.clockInKeyName, 'CLOCK_IN_VALID');
};

export const storageContainsToken = () => {
	return !!Cookies.get(constant.tokenName);
};

export const getTokenFromStorage = () => {
	return Cookies.get(constant.tokenName);
};

export const getUserDataFromStorage = () => {
	return JSON.parse(localStorage.getItem(constant.userDatakey));
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

export const checkTokenValidity = () => {
	const diffTime = Math.abs(new Date() - new Date(getExpiryTimeFromStorage()));
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if (diffDays <= 1) {
		return true;
	} else {
		return false;
	}
};

export const removeTokenFromStorage = () => {
	localStorage.removeItem(constant.tokenName);
};

export const removeUserDataFromStorage = () => {
	localStorage.removeItem(constant.userDatakey);
};

export const removeExpiryDateFromStorage = () => {
	localStorage.removeItem(constant.expiryName);
};

export const logout = () => {
	return removeExpiryDateFromStorage() && removeTokenFromStorage();
};

export const removeClockInFromStorage = () => {
	localStorage.removeItem(constant.clockInKeyName);
};

export const Today = () => {
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	const yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}
	return yyyy + '-' + mm + '-' + dd;
};
