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
import { getTokenFromStorage, getUserDataFromStorage } from '../../utils/ApiUtils';
import { toCurrency, truncateString } from '../../utils/helpers';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
// import Navbar from "../../components/Navbar";

import { chart_one } from '../../utils/data';

const DashboardHome = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [policyResponse, setPolicyResponse] = useState();
	const [acceptedEmployees, setAcceptedEmployees] = useState();
	const [graphData, setGraphData] = useState(chart_one);
	const [allWithdrawals, setAllWithdrawals] = useState();
	const [notificationLoading, setNotificationLoading] = useState(false);
	const [paymentLogs, setPaymentLogs] = useState();
	const [profile, setProfile] = useState(getUserDataFromStorage());

	const userData = getUserDataFromStorage();
	const token = getTokenFromStorage();

	const history = useHistory();

	// useEffect(() => {
	//   const fetchAcceptedEmployees = async (filterParams) => {
	//     try {
	//       const res = await getTotalNoOfEmployees();
	//       setAcceptedEmployees(res.data.payload.data?.numberOfEmployees);
	//     } catch (error) {
	//       console.log("error", error);
	//     }
	//   };
	//   fetchAcceptedEmployees();
	// }, []);

	// useEffect(() => {
	// 	setNotificationLoading(true);
	// 	function handleChangeStorage() {
	// 		setProfile(getUserDataFromStorage());
	// 	}
	// 	const fetchPolicy = async () => {
	// 		try {
	// 			const res = await getAllCompanyPolicy();
	// 			res.data.payload.data.length > 0 && setPolicyResponse(res.data.payload.data[0]);
	// 		} catch (error) {
	// 			// console.log("error", error);
	// 			toast.error('An error occured');
	// 		}
	// 	};

	// 	const getApprovedTransaction = async () => {
	// 		try {
	// 			const response = await getDashboardWithdrawalWithParams(profile.company_id, 'approved');
	// 			const dataRes = response.data.payload.data.slice(0, 7).map((data, index) => {
	// 				return {
	// 					name: new Date(data.created_at).toLocaleDateString(),
	// 					uv: 40000,
	// 					pv: parseInt(data.amount),
	// 					amt: parseInt(data.amount),
	// 				};
	// 			});

	// 			setGraphData(dataRes);
	// 		} catch (error) {
	// 			// console.log("approved error", error);
	// 			toast.error('An error occured');
	// 		}
	// 	};

	// 	const getWithdrawals = async () => {
	// 		try {
	// 			const res = await getDashboardWithdrawalWithParams(profile.company_id, 'approved');
	// 			setAllWithdrawals(res.data.payload.data.slice(0, 4));
	// 			setNotificationLoading(false);
	// 		} catch (error) {
	// 			toast.error("Can't get employee withdrawals");
	// 			setNotificationLoading(false);
	// 		}
	// 	};

	// 	const fetchPaymentLogs = async () => {
	// 		try {
	// 			const response = await getPaymentLogs();
	// 			const resetData = response.data.payload.paymentLogs?.map((resData, i) => {
	// 				const date = new Date(resData.created_at);
	// 				return {
	// 					key: i,
	// 					id: resData.id,
	// 					paymemtID: truncateString(resData.id, 8),
	// 					amount: parseInt(resData.amount),
	// 					totalPayable: toCurrency(resData.amount),
	// 					totalPay:
	// 						resData.amount_remaining === null
	// 							? toCurrency(resData.amount)
	// 							: toCurrency(parseInt(resData.amount) - parseInt(resData.amount_remaining)),
	// 					month: date.toLocaleString('default', { month: 'long' }),
	// 					status: resData.completed === 'no' ? 'Unpaid' : 'Paid',
	// 					dateYear: `${date.toLocaleString('default', {
	// 						month: 'long',
	// 					})} ${date.getFullYear()}`,
	// 					amount_remaining: resData.amount_remaining,
	// 				};
	// 			});
	// 			setPaymentLogs(resetData);
	// 			// setFetchingData(false);
	// 		} catch (error) {
	// 			toast.error('Something went wrong');
	// 		}
	// 	};
	// 	if (profile) {
	// 		fetchPolicy();
	// 		getApprovedTransaction();
	// 		getWithdrawals();
	// 		fetchPaymentLogs();
	// 	}
	// 	window.addEventListener('storage', handleChangeStorage);
	// 	return () => window.removeEventListener('storage', handleChangeStorage);
	// }, [profile]);

	const totalDue = paymentLogs
		?.filter((data) => typeof data.amount_remaining == 'string')
		.reduce((acc, num) => parseInt(acc) + parseInt(num.amount_remaining), 0);

	return (
		<div>
			<div className="flex justify-between mobiles:block ">
				<h2 className="text-xl font-semibold mobiles:mb-6 mobiles:mt-3 capitalize">
					Welcome to Payslice, {`${userData.first_name} ${userData.last_name}`}
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
								+3% <BsArrowUp className="my-auto" />
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
								+3% <BsArrowUp className="my-auto" />
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
								+3% <BsArrowDown className="my-auto font-bold" />
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

			<div className=" my-16">
				<div className="w-full flex mobiles:block">
					<div className="graph-container p-6 mobiles:p-0 mr-8 w-2/3 mobiles:w-full mobiles:my-4 border border-gray-200 rounded-[10px]">
						<h3 className="text-xl font-semibold pt-5 mb-6 px-2">Active Withdrawal</h3>

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
										return 'Unit Purchased', value;
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
					<div className="w-1/3 mobiles:w-full rounded-[10px] border  border-gray">
						<div className="text-2xl border-b border-gray-300 py-4 px-4">Recent transactions</div>
						<div className="transaction-timeline p-4 overflow-scroll" style={{ height: '350px' }}>
							{notificationLoading && (
								<div className="flex justify-center items-center" style={{ height: 'inherit' }}>
									<Spin />
								</div>
							)}
							{allWithdrawals?.map((withdrawal) => {
								return (
									<div className="transaction flex w-full justify-between">
										<div className="node-wrapper">
											<div className="node --red-node">
												<img src={require('../../assets/svgs/withdraw-icon.svg').default} className=" " alt="" />
											</div>
											<div className="line"></div>
										</div>
										<div className="description px-3 pb-6">
											<div className="text-xl">
												{`${toCurrency(parseInt(withdrawal.amount) + parseInt(withdrawal.service_charge))}`} has been
												withdrawn
											</div>
											<p className="text-gray-400 text-normal">
												{new Date(withdrawal.created_at).toLocaleDateString()} by{' '}
												<span style={{ color: '#1c6af4' }}>{withdrawal.employee.first_name}</span>
											</p>
											<div className="border rounded-xl border-gray-200  flex ">
												<div className="px-6 py-4 border-r ">
													<div className="text-normal">Amount sent</div>
													<div className="font-bold">{toCurrency(withdrawal.amount)}</div>
												</div>

												<div className="px-6 py-4">
													<div className="text-normal">Service Charge</div>
													<div className="font-bold">{toCurrency(withdrawal.service_charge)}</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
							{/* <div className="transaction flex w-full justify-between">
                <div className="node-wrapper">
                  <div className="node --red-node">
                    <img
                      src={
                        require("../../assets/svgs/withdraw-icon.svg").default
                      }
                      className=" "
                      alt=""
                    />
                  </div>
                  <div className="line"></div>
                </div>
                <div className="description px-3 pb-6">
                  <div className="text-xl">₦30,000 has been withdrawn</div>
                  <p className="text-gray-400 text-normal">
                    wed,24 may by <span style={{ color: "#1c6af4" }}>Uche</span>
                  </p>
                  <div className="border rounded-xl border-gray-200  flex ">
                    <div className="px-6 py-4 border-r ">
                      <div className="text-normal">Amount</div>
                      <div className="font-bold">₦18,000</div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="text-normal">Service Charge</div>
                      <div className="font-bold">₦1,000</div>
                    </div>
                  </div>
                </div>
              </div> */}
							{/* <div className="transaction flex w-full justify-between">
                <div className="node-wrapper ">
                  <div className="node --green-node">
                    <img
                      src={
                        require("../../assets/svgs/credited.icon.svg").default
                      }
                      className=" "
                      alt=""
                    />
                  </div>
                  <div className="line"></div>
                </div>
                <div className="description px-3">
                  <div className="text-xl">
                    ₦12,000 has been Repaid from your debit card
                  </div>
                  <p className="text-gray-400 text-normal">
                    wed,24 may by <span style={{ color: "#1c6af4" }}>Uche</span>
                  </p>
                  <div className="border rounded-xl border-gray-200 p-3">
                    <div className="text-normal">Balance</div>
                    <div className="font-bold">₦18,000</div>
                  </div>
                </div>
              </div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHome;
