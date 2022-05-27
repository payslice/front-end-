/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
	getAllCompanyPolicy,
	getDashboardWithdrawalRequests,
	getPaymentLogs,
	getDashboardWithdrawalWithParams,
	getTotalNoOfAcceptedEmployees,
	getTotalNoOfEmployees,
} from '../../utils/ApiRequests';
import { getTokenFromStorage, getuserFromStorage } from '../../utils/ApiUtils';
import { toCurrency, truncateString } from '../../utils/helpers';
import { useHistory } from 'react-router-dom';
// import Navbar from "../../components/Navbar";

import { chart_one } from '../../utils/data';
import { useSelector } from 'react-redux';
import { persistSelector } from '../../slices/persist';

const DashboardHome = () => {
	const { user } = useSelector(persistSelector);
	const [activeIndex, setActiveIndex] = useState(0);
	const [policyResponse, setPolicyResponse] = useState();
	const [acceptedEmployees, setAcceptedEmployees] = useState();
	const [graphData, setGraphData] = useState(chart_one);
	const [allWithdrawals, setAllWithdrawals] = useState();
	const [notificationLoading, setNotificationLoading] = useState(false);
	const [paymentLogs, setPaymentLogs] = useState();
	const [profile, setProfile] = useState(user);

	const token = getTokenFromStorage();

	const history = useHistory();

	useEffect(() => {
		const fetchAcceptedEmployees = async (filterParams) => {
			try {
				const res = await getTotalNoOfEmployees();
				setAcceptedEmployees(res.data.payload.data?.numberOfEmployees);
			} catch (error) {
				console.log('error', error);
			}
		};
		fetchAcceptedEmployees();
	}, []);

	useEffect(() => {
		setNotificationLoading(true);
		function handleChangeStorage() {
			setProfile(user);
		}
		const fetchPolicy = async () => {
			try {
				const res = await getAllCompanyPolicy();
				res.data.payload.data.length > 0 && setPolicyResponse(res?.data?.payload?.data[0]);
			} catch (error) {
				// console.log("error", error);
				toast.error('An error occurred');
			}
		};

		const getApprovedTransaction = async () => {
			try {
				const response = await getDashboardWithdrawalWithParams(profile?.company_id, 'approved');
				const dataRes = response?.data?.payload?.data?.slice(0, 7)?.map((data, index) => {
					return {
						name: new Date(data.created_at).toLocaleDateString(),
						uv: 40000,
						pv: parseInt(data.amount),
						amt: parseInt(data.amount),
					};
				});

				// setGraphData(dataRes);
			} catch (error) {
				// console.log("approved error", error);
				toast.error('An error occurred');
			}
		};

		const getWithdrawals = async () => {
			try {
				const res = await getDashboardWithdrawalWithParams(profile.company_id, 'approved');
				setAllWithdrawals(res.data.payload.data.slice(0, 4));
				setNotificationLoading(false);
			} catch (error) {
				toast.error("Can't get employee withdrawals");
				setNotificationLoading(false);
			}
		};

		const fetchPaymentLogs = async () => {
			try {
				const response = await getPaymentLogs();
				const resetData = response.data.payload.paymentLogs?.map((resData, i) => {
					const date = new Date(resData.created_at);
					return {
						key: i,
						id: resData.id,
						paymemtID: truncateString(resData.id, 8),
						amount: parseInt(resData.amount),
						totalPayable: toCurrency(resData.amount),
						totalPay:
							resData.amount_remaining === null
								? toCurrency(resData.amount)
								: toCurrency(parseInt(resData.amount) - parseInt(resData.amount_remaining)),
						month: date.toLocaleString('default', { month: 'long' }),
						status: resData.completed === 'no' ? 'Unpaid' : 'Paid',
						dateYear: `${date.toLocaleString('default', {
							month: 'long',
						})} ${date.getFullYear()}`,
						amount_remaining: resData.amount_remaining,
					};
				});
				setPaymentLogs(resetData);
				// setFetchingData(false);
			} catch (error) {
				toast.error('Something went wrong');
			}
		};
		if (profile) {
			fetchPolicy();
			getApprovedTransaction();
			getWithdrawals();
			fetchPaymentLogs();
		}
		window.addEventListener('storage', handleChangeStorage);
		return () => window.removeEventListener('storage', handleChangeStorage);
	}, [profile, user]);

	const totalDue = paymentLogs
		?.filter((data) => typeof data.amount_remaining == 'string')
		.reduce((acc, num) => parseInt(acc) + parseInt(num.amount_remaining), 0);

	return (
		<div>
			<div className="flex justify-between items-center mobiles:block ">
				<h2 className="text-xl font-semibold mobiles:mb-6 mobiles:mt-3 capitalize">
					Welcome to Payslice, {`${user?.first_name} ${user?.last_name}`}
				</h2>
				<div className="flex justify-between">
					<div className="tab flex rounded-[5px] bg-gray-100 mr-5 mobiles:mr-0 h-[42px]">
						<div
							className={`px-5 rounded flex items-center text-sm cursor-pointer mobiles:w-1/2 mobiles:px-3 mobiles:text-xs ${
								activeIndex === 0 && '__tab-active'
							}`}
							onClick={() => setActiveIndex(0)}
						>
							Day
						</div>
						<div
							className={`px-5 rounded flex items-center text-sm cursor-pointer mobiles:px-3 mobiles:text-xs ${
								activeIndex === 1 && '__tab-active'
							}`}
							onClick={() => setActiveIndex(1)}
						>
							Week
						</div>
						<div
							className={`px-5 rounded flex items-center text-sm cursor-pointer mobiles:px-3 mobiles:text-xs ${
								activeIndex === 2 && '__tab-active'
							}`}
							onClick={() => setActiveIndex(2)}
						>
							Month
						</div>
					</div>
					{/* <div className="tab flex rounded bg-gray-100 px-5 py-2 mobiles:w-1/2 mobiles:text-xs mobiles:px-2">
            <BiCalendarEvent size="20" className="my-auto" />
            <div className="px-3 my-auto mobiles:px-2">
              Jan, 2019 - Dec, 2019
            </div>
          </div> */}
				</div>
			</div>

			<div className="cards mt-10">
				<div className="flex mobiles:block">
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Payroll Size</p>
						<p className="font-normal flex mobiles:flex mobiles:justify-between text-sm mt-2">
							{`${new Date(policyResponse?.updated_at).toLocaleString('default', {
								month: 'long',
							})} ${new Date(policyResponse?.updated_at).getFullYear()} `}
							<span className="flex ml-2 font-bold" style={{ color: '#0B9B36' }}>
								0% <BsArrowUp className="my-auto" />
							</span>
						</p>
						<h4 className="text-[28px] font-bold flex justify-between items-center mt-1.5">
							{policyResponse?.payroll_size || 'N/A'}
							<span className="ml-2 text-gray-500 text-sm font-bold">View more </span>
						</h4>
					</div>
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Credit limit</p>
						<p className="font-light flex mt-2 text-sm">{`${new Date(policyResponse?.updated_at).toLocaleString(
							'default',
							{
								month: 'long',
							}
						)} ${new Date(policyResponse?.updated_at).getFullYear()} `}</p>
						<h4 className="text-[28px] font-bold mt-1.5">0</h4>
					</div>
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Wallet Balance</p>
						<p className="font-normal flex mobiles:flex mobiles:justify-between text-sm mt-2">
							{`${new Date(policyResponse?.updated_at).toLocaleString('default', {
								month: 'long',
							})} ${new Date(policyResponse?.updated_at).getFullYear()} `}
							<span className="flex ml-2 font-bold" style={{ color: '#0B9B36' }}>
								0% <BsArrowUp className="my-auto" />
							</span>
						</p>
						<h4 className="text-[28px] font-bold flex justify-between items-center mt-1.5">
							{acceptedEmployees || 'N/A'}
							<span
								className="ml-2 text-gray-500 text-sm font-bold cursor-pointer"
								onClick={() => history.push('/employee')}
							>
								Manage{' '}
							</span>
						</h4>
					</div>
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Upcoming payments</p>
						<p className="font-normal flex mobiles:flex mobiles:justify-between text-sm mt-2">
							January 2021{' '}
							<span className="flex ml-2 font-bold" style={{ color: '#D0000C' }}>
								0% <BsArrowDown className="my-auto font-bold" />
							</span>
						</p>
						<h4 className="text-[28px] font-bold flex justify-between items-center mt-1.5">
							{toCurrency(totalDue)}
							<span
								className="ml-2 text-gray-500 text-sm font-bold cursor-pointer"
								onClick={() => history.push('/payments')}
							>
								Repay now
							</span>
						</h4>
					</div>
				</div>
			</div>

			<div className="my-16">
				<div className="w-full flex mobiles:block">
					<div className="p-6 mobiles:p-0 mr-8 w-2/3 mobiles:w-full mobiles:my-4 border border-gray-200 rounded-[10px] h-[527px]">
						<h3 className="text-xl font-semibold text-[#111111b3] pt-5 mb-6 px-2">Active Withdrawal</h3>
						<ResponsiveContainer width="100%" height="85%">
							<AreaChart
								data={graphData}
								fontSize={14}
								fontWeight={'semibold'}
								margin={{
									top: 10,
									right: 10,
									left: -12,
									bottom: 0,
								}}
							>
								<defs>
									<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="50%" stopColor="#1C64F2" stopOpacity={0.6} />
										<stop offset="100%" stopColor="#1C64F2" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="100%" stopColor="#82ca9d" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis dataKey="name" tick={{ fill: '#989898' }} />
								<YAxis tick={{ fill: '#989898' }} orientation="left" />
								<CartesianGrid x="0" vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
								<Tooltip
									wrapperStyle={{
										color: 'red',
										backgroundColor: '#000 !important',
									}}
									labelStyle={{ color: 'green' }}
									itemStyle={{ color: '#000' }}
									formatter={(value) => {
										return [`${value}`, `Kwh`];
									}}
									labelFormatter={(value) => {
										return `'Unit Purchased', ${value}`;
									}}
								/>
								<Area
									dataKey="pv"
									type="monotone"
									stroke="#1C64F2"
									fillOpacity={0.5}
									strokeWidth={3}
									dot={{
										r: 6,
										stroke: '#1C64F2',
										strokeWidth: 1,
										fill: '#fff',
										fillOpacity: 2,
									}}
									activeDot={{
										r: 5,
										stroke: '#1C64F2',
										strokeWidth: 4,
										fill: '#fff',
									}}
									fill="url(#colorUv)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div className="w-1/3 mobiles:w-full rounded-[10px] border border-gray h-[527px]">
						<div className="text-base text-[#111111b3] font-semibold border-b border-gray-300 py-[18px] px-5">
							Recent transactions
						</div>
						<div className="transaction-timeline overflow-y-scroll h-full max-h-[440px]">
							{notificationLoading && (
								<div className="flex justify-center items-center h-full">
									<svg
										role="status"
										className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
								</div>
							)}

							<div className="flex items-center justify-center h-full">No transactions available</div>

							<div className="mt-[30px]">
								{allWithdrawals?.map((withdrawal) => {
									return (
										<div className="transaction flex w-full pl-[30px] pr-[28px]">
											<div className="node-wrapper relative z-20">
												<div className="node --green-node">
													<svg
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8ZM16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10.096 5.146C10.1899 5.05225 10.3172 4.99963 10.4499 4.99972C10.5825 4.99982 10.7097 5.05261 10.8035 5.1465C10.8973 5.24039 10.9499 5.36767 10.9498 5.50035C10.9497 5.63304 10.8969 5.76025 10.803 5.854L6.707 9.95H9.475C9.60761 9.95 9.73479 10.0027 9.82855 10.0964C9.92232 10.1902 9.975 10.3174 9.975 10.45C9.975 10.5826 9.92232 10.7098 9.82855 10.8036C9.73479 10.8973 9.60761 10.95 9.475 10.95H5.5C5.36739 10.95 5.24021 10.8973 5.14645 10.8036C5.05268 10.7098 5 10.5826 5 10.45V6.475C5 6.34239 5.05268 6.21521 5.14645 6.12145C5.24021 6.02768 5.36739 5.975 5.5 5.975C5.63261 5.975 5.75979 6.02768 5.85355 6.12145C5.94732 6.21521 6 6.34239 6 6.475V9.243L10.096 5.146Z"
															fill="#D0000C"
														/>
													</svg>
												</div>
												<div className="w-0.5 h-full absolute border -z-10 left-3"></div>
											</div>
											<div className="px-3 pb-10 w-full">
												<div className="text-xs font-semibold mb-[9px]">
													{`${toCurrency(parseInt(withdrawal?.amount) + parseInt(withdrawal?.service_charge))}`} has
													been withdrawn
												</div>
												<p className="text-gray-500 text-normal text-[10px]">
													<span>{new Date(withdrawal?.created_at).toLocaleDateString()}</span>
													<span className="text-primary">{withdrawal?.employee?.first_name}</span>
												</p>
												<div className="border rounded-[5px] border-gray-200 flex w-full mt-3">
													<div className="px-4 py-2.5 border-r w-1/2">
														<div className="text-normal text-gray-500 text-[9px]">Amount sent</div>
														<div className="text-gray-600 font-bold text-[10px] mt-1">
															{toCurrency(withdrawal?.amount)}
														</div>
													</div>

													<div className="px-3 py-2.5 w-1/2">
														<div className="text-normal text-gray-500 text-[9px]">Service Charge</div>
														<div className="text-gray-600 font-bold text-[10px] mt-1">
															{toCurrency(withdrawal?.service_charge)}
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
