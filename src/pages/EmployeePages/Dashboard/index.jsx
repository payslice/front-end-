/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/Button/Button';
import { CustomTag } from '../../../components/CustomTag';
import {
	clockIn,
	getAvailableWithdrawFunds,
	getAmountWithdrawn,
	clockOut,
	getWithdrawalRequest,
} from '../../../utils/ApiRequests';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toCurrency, truncateString } from '../../../utils/helpers';
// import { Spin } from 'antd';
import { DotLoader } from '../../../components/Loaders/DotLoader';
import { getUserDataFromStorage, removeClockInFromStorage, setClockInTimeToStorage } from '../../../utils/ApiUtils';
import { constant } from '../../../utils/ApiConstants';
import { useSelector } from 'react-redux';
import { persistSelector } from '../../../slices/persist';
import MiniLoader from '../../../components/Loaders/MiniLoader';

const UserDashboard = () => {
	const { user } = useSelector(persistSelector);
	const [availableFunds, setAvailableFunds] = useState();
	const [latLng, setLatLng] = useState();
	const [checkInSuccess, setCheckInSuccess] = useState(false);
	const [, setCheckOutSuccess] = useState(false);
	const [checkLoading, setCheckLoading] = useState(false);
	const [totalWithdrawn, setTotalWithdrawn] = useState();
	const [transactionData, setTransactionData] = useState([]);
	const [loadingTransactionData, setLoadingTransactionData] = useState(true);
	const [fetchingData, setFetchingData] = useState(false);
	const [clockedIn, setClockedIn] = useState(false);
	const [fetchingWithdrawnAmount, setFetchingWithdrawnAmount] = useState(false);
	const history = useHistory();

	const columns = [
		{
			title: 'Monthly Pay',
			dataIndex: 'name',
		},
		{
			title: 'Salary',
			dataIndex: 'salary',
		},
		{
			title: 'Salary balance',
			dataIndex: 'balance',
		},
		{
			title: 'Action',
			dataIndex: 'action',
		},
	];

	useEffect(() => {
		setFetchingData(true);
		setFetchingWithdrawnAmount(true);

		if (localStorage.getItem(constant.clockInKeyName)) {
			setClockedIn(true);
		}

		const fetchWithdrawalAmount = async () => {
			try {
				const res = await getAvailableWithdrawFunds();
				setAvailableFunds(res.data.payload.data);
			} catch (error) {
				toast.error('An error occurred');
			}
		};

		const getTotalWithdrawn = async () => {
			try {
				const res = await getAmountWithdrawn();
				setTotalWithdrawn(res.data.payload.data);
				setFetchingWithdrawnAmount(false);
			} catch (error) {
				toast.error('An error occurred');
				setFetchingWithdrawnAmount(false);
			}
		};

		const getTransactions = async () => {
			try {
				const res = await getWithdrawalRequest();
				console.log(res.data.payload.data)
				setLoadingTransactionData(true)
				const resetData = res.data.payload.data?.map((withdrawal, i) => {
					return {
						key: i,
						transactionID: truncateString(withdrawal.request_code, 9),
						amount: toCurrency(withdrawal.amount),
						charges: withdrawal.service_charge,
						date: new Date(withdrawal.updated_at).toDateString(),
						status: withdrawal.status,
					};
				});
				
				setLoadingTransactionData(false)
				setTransactionData(resetData);
				setFetchingData(false);
			} catch (error) {
				toast.error('An error occurred');
				setFetchingData(false);
			}
		};

		// request to fetch all transactions
		// fetch('https://dev.api.payslices.com/transaction/payment_log')
		// .then(res => res.json())
		// .then(data => 
		// 	{ 
		// 		console.log(data)
		// 		console.log("this is the data coming")
		// 	}
		// )

		getTotalWithdrawn();
		fetchWithdrawalAmount();
		getTransactions();
	}, []);

	function handleError(error) {
		let errorStr;
		switch (error.code) {
			case error.PERMISSION_DENIED:
				errorStr = 'User denied the request for Geolocation.';
				break;
			case error.POSITION_UNAVAILABLE:
				errorStr = 'Location information is unavailable.';
				break;
			case error.TIMEOUT:
				errorStr = 'The request to get user location timed out.';
				break;
			case error.UNKNOWN_ERROR:
				errorStr = 'An unknown error occurred.';
				break;
			default:
				errorStr = 'An unknown error occurred.';
		}
		console.error('Error occurred: ' + errorStr);
	}

	function showPosition(position) {
		setLatLng({
			lat: position.coords.latitude,
			long: position.coords.longitude,
		});
	}

	if (window.navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, handleError);
	}

	const submitClockIn = async () => {
		setCheckLoading(true);
		setClockInTimeToStorage();
		try {
			await clockIn({ location: latLng });
			setCheckInSuccess(true);
			setCheckLoading(false);
		} catch (error) {
			toast.error(error.response.data.payload.data);
			setCheckLoading(false);
		}
	};

	const submitClockOut = async () => {
		setCheckLoading(true);
		try {
			await clockOut({ location: latLng });
			setCheckOutSuccess(true);

			setCheckLoading(false);
			removeClockInFromStorage();
		} catch (error) {
			toast.error(error.response.data.payload.data);
			setCheckLoading(false);
		}
	};

	console.log(transactionData)

	return (
		<div className="user-dashboard-wrapper">
			<div className="flex justify-between mb-8 handle_user_homepage_responsive">
			
				<div className="text-gray-400 capitalize font-semibold mt-3 handle_user_homepage_responsive_in" style={{color: "#111111"}}>Welcome to Payslice , {`${user?.first_name} ${user?.last_name}`}</div>
				

				{clockedIn || checkInSuccess ? (
					<Button buttonText="Employee CheckOut" loading={checkLoading} onClick={submitClockOut} base />
				) : (
					<Button buttonText="Employee CheckIn" loading={checkLoading} onClick={submitClockIn} base />
				)}
			</div>

			<div className="flex w-full justify-between handle_user_homepage_responsive">
				<div className="bg-blue-600 flex px-12 mr-5 py-6 justify-between rounded-xl text-white w-1/2 sm:w-full handle_user_homepage_responsive_in2">
					<div className="my-auto">
						<div className="text-normal">Total Earned</div>
						<h3 className="text-xl text-white mb-0 font-bold">
							NGN {parseInt(availableFunds?.amount_avaliable_to_withdraw).toLocaleString()}{' '}
						</h3>
					</div>
					<div className="border flex justify-center ml-10 items-center border-white rounded-full h-16 w-16">
						{' '}
						<button className="mb-0 cursor-pointer" onClick={() => history.push('/user/withdrawals/withdraw')}>
							Get <br />
							Paid
						</button>
					</div>
				</div>
				<div className="flex px-12 py-6 ml-5 justify-between rounded-xl  w-1/2 handle_user_homepage_responsive_in2" style={{ background: '#FBE5DC' }}>
					<div className="my-auto">
						<div className="text-normal">Total withdrawn </div>
						<h3 className="text-xl  mb-0 font-bold">
							{fetchingWithdrawnAmount ? (
								<>
									{' '}
									<DotLoader />{' '}
								</>
							) : (
								<> NGN {parseInt(totalWithdrawn).toLocaleString()} </>
							)}
						</h3>
					</div>

					<button
						style={{ background: '#CA7652' }}
						className="h-max py-2 my-auto px-4 rounded text-white"
						onClick={() => history.push('/user/withdrawals')}
					>
						History
					</button>
				</div>
			</div>


			{

				loadingTransactionData

				?
				(

					<div className="loading-spinner"></div>
				)
				:

				(
					transactionData === []   
						?
						(
							
						<>
							<div className="p-10 flex justify-center items-center ">
								<p>No available transaction</p>
							</div>
							<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="626.47693" height="457.63821" viewBox="0 0 626.47693 457.63821" xmlnsXlink="http://www.w3.org/1999/xlink">
								<circle cx="167.36133" cy="184.72675" r="161" fill="#f2f2f2"/>
								<path d="M548.786,555.20605c20.66809-.58645,40.64336-8.51888,56.65-21.49681a90.95513,90.95513,0,0,0,32.00273-51.74665,97.24881,97.24881,0,0,0-7.703-61.51576,90.051,90.051,0,0,0-44.1148-42.78719,96.28983,96.28983,0,0,0-60.854-6.40643c-2.55469.59033-5.07733,1.30361-7.56834,2.12119-2.27612.74706-1.30155,4.35918.99406,3.60573,19.11574-6.274,40.03052-5.52437,58.91352,1.238a87.17555,87.17555,0,0,1,45.63872,37.11046,93.54677,93.54677,0,0,1,12.26169,58.51992,86.47957,86.47957,0,0,1-26.39119,52.09c-14.22912,13.589-32.928,22.81535-52.54505,25.02487-2.42024.2726-4.85.4343-7.28433.50337-2.40118.06814-2.41105,3.80771,0,3.7393Z" transform="translate(-286.76153 -221.18089)" fill="#3f3d56"/>
								<path d="M512.99652,338.37993,479.41626,366.9314c-2.19525,1.8665-4.79986,3.79293-5.3929,6.79753a7.55479,7.55479,0,0,0,2.62247,6.84572c2.18018,2.07325,4.95563,3.39114,7.56418,4.82544l9.75961,5.36628,21.688,11.92507c2.11,1.16016,3.9988-2.06777,1.88729-3.22878-11.75274-6.4622-23.6801-12.68421-35.28365-19.4098-1.75678-1.01825-4.51921-2.66353-4.6241-4.97689-.11236-2.47834,3.269-4.51915,4.89613-5.90262l15.60773-13.2704L515.6406,341.024c1.836-1.561-.81991-4.19508-2.64408-2.64409Z" transform="translate(-286.76153 -221.18089)" fill="#3f3d56"/>
								<path d="M382.69843,264.46c-25.15545,4.28174-48.19715,17.42084-65.51879,36.041-17.4575,18.76623-28.52929,43.104-30.18175,68.75516a120.01711,120.01711,0,0,0,20.0241,73.84419,111.13416,111.13416,0,0,0,61.28921,44.67691c24.60463,7.17929,51.4787,6.563,75.46927-2.66813,3.02-1.16206,5.97968-2.46883,8.88269-3.8976,2.65259-1.30552.83858-5.55146-1.8367-4.23477-22.27741,10.96426-47.9648,13.6558-72.20647,8.64933-24.32149-5.023-46.5763-18.07313-62.17225-37.477a115.44839,115.44839,0,0,1-25.07816-69.39689,106.72648,106.72648,0,0,1,23.26518-68.20682c15.04414-19.06025,36.30284-33.56042,59.894-39.64427,2.91054-.75059,5.85185-1.36731,8.81469-1.87162,2.92252-.49744,2.28953-5.06895-.645-4.56946Z" transform="translate(-286.76153 -221.18089)" fill="#3f3d56"/>
								<path d="M463.83436,523.25034l36.11052-40.68252c2.36066-2.65955,5.21123-5.46294,5.41766-9.23688.18038-3.29771-1.80124-6.06811-4.38552-7.91319-3.02183-2.15747-6.64079-3.2892-10.07586-4.592l-12.852-4.87419-28.56-10.83154c-2.77852-1.05377-4.5299,3.2166-1.74935,4.27114,15.47665,5.86961,31.12525,11.41559,46.465,17.63281,2.32244.94129,5.982,2.47534,6.50917,5.28419.56481,3.00918-3.2152,6.08632-4.965,8.05761l-16.78376,18.90878-18.81815,21.20075c-1.97433,2.2243,1.72556,4.985,3.68717,2.775Z" transform="translate(-286.76153 -221.18089)" fill="#3f3d56"/>
							</svg>
							
						</>
						)
						:
						(
							<div className="mt-10 border border-gray-200 rounded ">
								<div className="flex justify-between border-b pt-4 pb-2 px-8">
									<h2 className="font-semibold text-base lg:text-xl">Recent Transaction</h2>
									<div className="text-blue-400 font-semibold capitalize text-sm lg:text-base" onClick={() => history.push('/user/withdrawals')} style={{color: "#1C6AF4"}} >
										Show more
									</div>
								</div>
								{transactionData?.slice(0, 4).map((data, index) => {
									return (
										<div key={index} className="flex justify-between border-b pt-4 pb-10 px-8 text-sm lg:text-base font-medium lg:font-light">
											<div className="w-1/3 lg:w-1/5">
												<p className="text-normal pb-2 font-medium">Direct Transfer</p>
												<div className="font-medium">Transation ID {data.transactionID}</div>
											</div>
											<div className="block lg:hidden">
												<div className="font-bold text-base text-normal">{data.amount}</div>

												<p className="pb-2 pt-1">Service charge:</p>
												<p>{toCurrency(data.charges)}</p>
											
											</div>

											<div className="font-bold text-normal hidden lg:block">{data.amount}</div>
											<div className="hidden lg:block">
												<p className="pb-2">Service charge</p>
												<p>{toCurrency(data.charges)}</p>
											</div>
											<div className="w-max">
												<CustomTag
													text={data.status}
													isDanger={data.status === 'declined'}
													isSuccess={data.status === 'approved'}
													isWarning={data.status === 'pending'}
												/>
											</div>
				
											<div className="hidden lg:block">
												<p className="font-medium">Time stamp</p>
												<p className="font-medium"> {data.date} </p>
											</div>
										</div>
									);
								})} 
								
								
								{/*
								<div className="relative mt-6">
									<table className="w-full text-sm text-left border text-gray-500">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50">
											<tr className="border-b">
												<th scope="col" className="p-6">
													<div className="flex items-center">
														<input
															id="checkbox-all"
															type="checkbox"
															className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
														/>
														<label htmlFor="checkbox-all" className="sr-only">
															checkbox
														</label>
													</div>
												</th>
												{columns.map(({ title }, i) => (
													<th key={i} scope="col" className="px-6 py-3">
														{title}
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{transactionData?.map(({ status }, index) => {
												return (
													<tr key={index} className="bg-white border-b last:border-none hover:bg-gray-50">
														<td className="w-4 p-6">
															<div className="flex items-center">
																<input
																	id="checkbox-table-1"
																	type="checkbox"
																	className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
																/>
																<label htmlFor="checkbox-table-1" className="sr-only">
																	checkbox
																</label>
															</div>
														</td>
														<td className="px-6 py-4"></td>
														<td className="px-6 py-4">
															<CustomTag
																text={status}
																isDanger={status === 'declined'}
																isSuccess={status === 'approved'}
																isWarning={status === 'pending'}
															/>
														</td>
														<td className="px-6 py-4">
															<div className="flex items-center">
																<OptionsMenu options={tableOptions} param={id} />
															</div>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								*/}
							</div>
						)

					
					
				)

			}
			
		</div>
	);
};

export default UserDashboard;
