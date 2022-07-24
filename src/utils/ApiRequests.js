/* eslint-disable no-unused-vars */
import axios from 'axios';
import { constant } from './ApiConstants';
import { storageContainsToken, getTokenFromStorage, getUserDataFromStorage } from './ApiUtils';

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

export const userData = getUserDataFromStorage();
const companyId = {
	company_id: userData?.company_id,
};

const ApiRequestMultiPart = () => {
	const config = { baseURL: constant.baseUrl };
	if (storageContainsToken()) {
		const token = getTokenFromStorage();
		config.headers = {
			Authorization: `Bearer ${token}`,
			'content-type': `multipart/form-data; `,
		};
	}
	const instance = axios.create(config);
	return instance;
};

// End of reusable template requests

export const adminLogin = (formData) => {
	return ApiRequest().post('/admin_auth/login', formData);
};

export const adminRegister = (formData) => {
	return ApiRequest().post('/admin_auth/register', formData);
};

export const employerRegister = (formData) => {
	return ApiRequest().post('/employer_auth/register', formData);
};

export const employerLogin = (formData) => {
	return ApiRequest().post('/employer_auth/login', formData);
};

export const employeeLogin = (formData) => {
	return ApiRequest().post('/employee_auth/login', formData);
};

export const companyInfoOnboarding = (formData) => {
	return ApiRequestWithToken().post('/company/save', formData);
};

export const companyRepOnboarding = (formData) => {
	return ApiRequestWithToken().post('/company_rep/save', formData);
};

export const companyPolicy = (formData) => {
	return ApiRequestWithToken().post('/company_policy/save', formData);
};

export const getAllEmployees = () => {
	return ApiRequestWithToken().get('/employee/all');
};

export const saveEmployee = (formData) => {
	return ApiRequestWithToken().post('/employee/save', formData);
};

export const getAvailableWithdrawFunds = () => {
	return ApiRequestWithToken().get('/employee/amount_avaliable_for_withdrawal');
};

export const getTotalNoAcceptedEmployees = () => {
	return ApiRequestWithToken().get('/employer/total_number_of_accepted_employees');
};

// ====== New endpoints to be consumed ======= //

/*
 * Description: Fetch employees clockins in the system
 */

export const getClockInTime = (employee_id) => {
	return ApiRequestWithToken().get(`/attendance/get_clock_in/${employee_id}`);
};

/*
 * Description: Fetch employees clockouts in the system
 */

export const getEmployeeClockOut = (employee_id) => {
	return ApiRequestWithToken().get(`/attendance/get_clock_out/${employee_id}`);
};

/* 
* Description: Store employee clockin in storage
*
*     {
      "user_id":"required|string|min:8"
      "location":{
          "long": "required|numeric",
          "lat": "required|numeric"
      }
      }
*/

export const clockIn = (formData) => {
	return ApiRequestWithToken().post(`/attendance/clock_in`, {
		...formData,
		user_id: userData.id,
	});
};

export const getClockOut = () => {
	return ApiRequestWithToken().get(`/attendance/get_clock_out/${userData.id}`);
};

/*
 * Description: Store employee clockout in storage
 */
export const clockOut = (formData) => {
	return ApiRequestWithToken().post(`/attendance/clock_out`, {
		...formData,
		user_id: userData.id,
	});
};

/*
 * Description: Endpoint to fetch all companies
 */
export const getAllCompanies = () => {
	return ApiRequestWithToken().get(`/company/all`);
};

/*
 * Description: Endpoint to fetch a company
 */

export const getOneCompany = (company_id) => {
	return ApiRequestWithToken().get(`/company/get/${company_id}`);
};

/*
 * Description: Endpoint to update a company record
 */
export const updateCompanyInfo = (formData) => {
	return ApiRequestWithToken().patch(`/company/update`, formData);
};

/*
 * Description: Endpoint to fetch all company policies
 */
export const getAllCompanyPolicy = () => {
	return ApiRequestWithToken().get(`/company_policy/all`);
};

/*
 * Description: Endpoint to fetch a company policy
 */
export const getCompanyPolicy = (policy_id) => {
	return ApiRequestWithToken().get(`/company_policy/get/${policy_id}`);
};

/*
 * Description: Endpoint to update a company policy
 */
export const updateCompanyPolicy = (policy_id, formData) => {
	return ApiRequestWithToken().patch(`/company_policy/update/${policy_id}`, {
		...formData,
		...userData?.company_id,
	});
};

/*
 * Description: Employee can request for withdrawal via this endpoint
 */
export const requestWithdrawal = (formData) => {
	return ApiRequestWithToken().post(`/employee/request_withdrawal`, formData);
};

/*
 * Description: Endpoint to import employees via csv file
 */
export const importEmployees = (payload) => {
	return ApiRequestWithToken().post(`/employee/import_users`, payload);
};

/*
 * Description: Endpoint to get an employee
 */
export const getOneEmployee = (employee_id) => {
	return ApiRequestWithToken().get(`/employee/get/${employee_id}`);
};

/*
 * Description: Endpoint to update employee record
 */
export const updateEmployee = (employee_id, formData) => {
	return ApiRequestWithToken().patch(`/employee/update/${employee_id}`, formData);
};

/*
 * Description: Endpoint to remove employee from the system
 */
export const deleteEmployee = (employeeId) => {
	return ApiRequestWithToken().delete(`/employee/delete/${employeeId}`);
};

/*
 * Description: Endpoint to fetch employee amount withdrawn
 */
export const getAmountWithdrawn = () => {
	return ApiRequestWithToken().get(`/employee/amount_withdrawn`);
};

/*
 * Description: Endpoint to fetch employee salary balance
 */
export const getSalaryBalance = () => {
	return ApiRequestWithToken().get(`/employee/employee_salary_balance`);
};

/*
 * Description: Endpoint to fetch employee total salary withdrawn
 */

export const getEmployeeTotalSalaryWithdrawn = (employee_id) => {
	return ApiRequestWithToken().get(`/employer/salary_withdrawn/${employee_id}`);
};

/*
 * Description: Endpoint to get total number of employees approved withdrawals
 */
export const getTotalApprovedWithdrawals = (employee_id) => {
	return ApiRequestWithToken().get(`/employer/number_of_approved_withdrawals/${employee_id}`);
};

/*
 * Description: Endpoint to get employees time of last withdrawals
 */
export const getTimeOflastWithdrawal = (employee_id) => {
	return ApiRequestWithToken().get(`/employer/time_of_last_withdrawals/${employee_id}`);
};

/*
 * Description: Endpoint to get total number of employees
 */
export const getTotalNoOfEmployees = (day, month, year) => {
	return ApiRequestWithToken().get(`/employer/total_number_of_employees?day=${day}&month=${month}&year=${year}`);
};

/*
 * Description: Endpoint to get total number of accepted employees
 */
export const getTotalNoOfAcceptedEmployees = () => {
	return ApiRequestWithToken().get(`/employer/total_number_of_accepted_employees?day=1&month=01&year=2022`);
};

/*
 * Description: Endpoint to get total number of transaction carried out
 */
export const getTotalTransactions = () => {
	return ApiRequestWithToken().get(`/employer/total_number_of_transaction_carried_out`);
};

/*
 * Description: Endpoint to upload company logo, employer,employee and admin profile pic. Form field name is 'file'
 */
export const uploadFile = (file) => {
	return ApiRequestWithToken().post(`/file/save`, file);
};

/*
 * Description: Endpoint to download employee template
 */
export const downloadEmployeeTemplate = () => {
	return ApiRequest().get(`/file/employeeTemplate`);
};

/*
 * Description: Endpoint to fetch company payment histories
 */
export const companyPaymentHistories = () => {
	return ApiRequestWithToken().get(`/payment/company/histories`);
};

/*
 * Description: Endpoint to fetch company transaction histories
 */
export const companyTransactionHistory = () => {
	return ApiRequestWithToken().get(`/transaction/histories`);
};

/*
 * Description: Endpoint to generate transaction code : employer
 */
export const generateTransactionCode = () => {
	return ApiRequestWithToken.get(`/transaction/generate_code`);
};

/*
 * Description: Endpoint to save transaction : employer
 */
export const saveTransaction = (formData) => {
	return ApiRequestWithToken().post(`/transaction/save`, {
		company_id: userData.company_id,
		employer_id: userData.id,
		...formData,
	});
};

/*
 * Description: Password reset endpoint
 */
export const resetPassword = (formData) => {
	return ApiRequest().post(`/reset_password`, formData);
};

/*
 * Description: Endpoint to change password
 */
export const changePassword = (formData) => {
	return ApiRequestWithToken().post(`/change_password`, formData);
};

/*
 * Description: Endpoint to validate OTP
 */
export const validateOTP = (otp) => {
	return ApiRequest().post(`/otp_validity/${otp}`);
};

export const getClockIn = (employee_id) => {
	return ApiRequestWithToken().get(`/attendance/get_clock_in/${employee_id}`);
};

export const generatePaymentCode = () => {
	return ApiRequestWithToken().get(`/transaction/generate_code`);
};

/*
 * Endpoint to fetch employee withdrawal request
 */

export const getWithdrawalRequest = () => {
	// console.log("ID")
	// console.log(userData)
	// console.log(JSON.parse(userData.persist))
	const data = JSON.parse(userData.persist)
	// console.log(data.user.id)
	// console.log("userData")
	return ApiRequestWithToken().get(`/employee/withdrawal_requests/${data.user.id}`);
};

export const getEmployeeInfoList = () => {
	return ApiRequestWithToken().get(`/employee/get_employees_salary_balance `);
};

/*
 * Endpoint to display employers payment histories for both completed and not completed.
 */
export const getPaymentLogs = () => {
	return ApiRequestWithToken().get(`/transaction/payment_log`);
};
export const getSinglePayment = (paymentId) => {
	return ApiRequestWithToken().get(`/transaction/payment_log/${paymentId}`);
};

export const getEmployeeWithdrawalRequests = (companyID) => {
	return ApiRequestWithToken().get(`/withdrawal_request/company/${companyID}`);
};
export const getDashboardWithdrawalRequests = (company_id) => {
	return ApiRequestWithToken().get(`/withdrawal_request/company/${company_id}`);
};
export const getDashboardWithdrawalWithParams = (company_id, status) => {
	return ApiRequestWithToken().get(`/withdrawal_request/company/${company_id}/${status}`);
};

export const getEmployeeWithdrawalWithParams = (companyID, status) => {
	return ApiRequestWithToken().get(`/withdrawal_request/company/${companyID}/${status}`);
};

export const withdrawalRequest = (status) => {
	return ApiRequestWithToken().get(`/withdrawal_request/get`);
};
