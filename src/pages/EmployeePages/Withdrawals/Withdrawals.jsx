/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
// import { Table } from 'antd';
import { CustomTag } from '../../../components/CustomTag';
import OptionsMenu from '../../../components/TableOptionMenu';
import { getTotalTransactions, getWithdrawalRequest } from '../../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { truncateString, toCurrency } from '../../../utils/helpers';
import { useHistory } from 'react-router-dom'

const Withdrawals = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [fetchingData, setFetchingData] = useState(true);
	const [transactionData, setTransactionData] = useState();
	const history = useHistory();

	const handleClick = (param) => {};

	useEffect(() => {
		// const getTransactions = async () => {
		// 	try {
		// 		const res = await getWithdrawalRequest();
		// 		const resetData = res.data.payload.data?.map((withdrawal, i) => {
		// 			return {
		// 				key: i,
		// 				transactionID: truncateString(withdrawal.request_code, 15),
		// 				amount: toCurrency(withdrawal.amount),
		// 				charges: withdrawal.service_charge,
		// 				date: new Date(withdrawal.updated_at).toDateString(),
		// 				status: withdrawal.status,
		// 			};
		// 		});
		// 		setTransactionData(resetData);
		// 		setFetchingData(false);
		// 	} catch (error) {
		// 		toast.error('An error occurred');
		// 		setFetchingData(false);
		// 	}
		// };
		// getTransactions();
	}, []);

	const tableOptions = [
		// {
		//   name: "Download Payslip",
		//   onClick: handleClick,
		// },
	];

	const columns = [
		{
			title: 'Transaction ID',
			dataIndex: 'transactionID',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
		},
		{
			title: 'Charges',
			dataIndex: 'charges',
		},
		{
			title: 'Date',
			dataIndex: 'date',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (status) => (
				<span>
					<CustomTag
						text={status}
						isDanger={status === 'declined'}
						isSuccess={status === 'approved'}
						isWarning={status === 'pending'}
					/>
				</span>
			),
		},
		{
			title: 'Action',
			dataIndex: 'action',
			render: (text, record) => {
				return <OptionsMenu options={tableOptions} param={record.key} />;
			},
		},
	];

	return (
		<div>
			<div className="block lg:flex justify-between">
				<h2 className="text-lg mt-5 md:text-xl font-semibold">Transactions History </h2>
				<div className="block lg:flex justify-between pt-10 lg:pt-0">
					{/* <div className="tab flex rounded bg-gray-100 mr-5">
						<div
							className={`px-5 rounded py-3 cursor-pointer ${activeIndex === 0 && '__tab-active'}`}
							onClick={() => setActiveIndex(0)}
						>
							Day
						</div>
						<div
							className={`px-5 rounded py-3 cursor-pointer ${activeIndex === 1 && '__tab-active'}`}
							onClick={() => setActiveIndex(1)}
						>
							Week
						</div>
						<div
							className={`px-5 rounded py-3 cursor-pointer ${activeIndex === 2 && '__tab-active'}`}
							onClick={() => setActiveIndex(2)}
						>
							Month
						</div>
					</div> */}
					{/* <div className="tab flex rounded bg-gray-100 px-5 py-2 mt-5 lg:mt-0 mr-5 lg:mr-0">
						<BiCalendarEvent size="20" className="my-auto" />
						<div className="px-3 my-auto">Jan, 2019 - Dec, 2019</div>
					</div> */}
				</div>
			</div>


			
			<div className=" ">
				<table style={{textAlign: 'left', width: '95%'}} >
					<tr className="font-semibold" style={{background: "#F9F9F9"}}>
						{/*{columns.map((data, i) => ( */}

							<th className='hidden lg:block py-5 px-5'>Transaction ID</th>
							<th className='py-5 px-5'>Amount</th>
							<th className='hidden lg:block py-5 px-5'>Charges</th>
							<th className='py-5 px-5'>Date</th>
							<th className='py-5 px-5'>Status</th>
							<th className='hidden lg:block py-5 px-5'>Action</th>

						{/* }))}*/}
					</tr>


					{transactionData?.slice(0, 4).map((data, index) => {
						return (
							<tr className='mt-10'>
								<td className='hidden lg:block px-5'>{data.transactionID}</td>
								<td className='px-5'>{data.amount}</td>
								<td className='hidden lg:block px-5'>{toCurrency(data.charges)}</td>
								<td className='px-5'>{data.date}</td>
								<td className='px-5'>
									<CustomTag
										text={data.status}
										isDanger={data.status === 'declined'}
										isSuccess={data.status === 'approved'}
										isWarning={data.status === 'pending'}
									/>
								</td>
								<td className='hidden lg:block px-5'>
									<div className="three_dot flex">
										<ul>
											<li></li>
											<li></li>
											<li></li>
										</ul>
										<span className="text-xs font-semibold"> Download Payslip</span>
									</div>
								</td>
							</tr>
						);
				})} 
				</table>

				<div className="transactionContainer">
				<div className="p-10 flex justify-center items-center capitalize">
					<p>No transaction available</p>
				</div>							
				<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="626.47693" height="457.63821" viewBox="0 0 380 457.63821" xmlnsXlink="http://www.w3.org/1999/xlink">
					<path d="M548.786,555.20605c20.66809-.58645,40.64336-8.51888,56.65-21.49681a90.95513,90.95513,0,0,0,32.00273-51.74665,97.24881,97.24881,0,0,0-7.703-61.51576,90.051,90.051,0,0,0-44.1148-42.78719,96.28983,96.28983,0,0,0-60.854-6.40643c-2.55469.59033-5.07733,1.30361-7.56834,2.12119-2.27612.74706-1.30155,4.35918.99406,3.60573,19.11574-6.274,40.03052-5.52437,58.91352,1.238a87.17555,87.17555,0,0,1,45.63872,37.11046,93.54677,93.54677,0,0,1,12.26169,58.51992,86.47957,86.47957,0,0,1-26.39119,52.09c-14.22912,13.589-32.928,22.81535-52.54505,25.02487-2.42024.2726-4.85.4343-7.28433.50337-2.40118.06814-2.41105,3.80771,0,3.7393Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
					<path d="M512.99652,338.37993,479.41626,366.9314c-2.19525,1.8665-4.79986,3.79293-5.3929,6.79753a7.55479,7.55479,0,0,0,2.62247,6.84572c2.18018,2.07325,4.95563,3.39114,7.56418,4.82544l9.75961,5.36628,21.688,11.92507c2.11,1.16016,3.9988-2.06777,1.88729-3.22878-11.75274-6.4622-23.6801-12.68421-35.28365-19.4098-1.75678-1.01825-4.51921-2.66353-4.6241-4.97689-.11236-2.47834,3.269-4.51915,4.89613-5.90262l15.60773-13.2704L515.6406,341.024c1.836-1.561-.81991-4.19508-2.64408-2.64409Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
					<path d="M382.69843,264.46c-25.15545,4.28174-48.19715,17.42084-65.51879,36.041-17.4575,18.76623-28.52929,43.104-30.18175,68.75516a120.01711,120.01711,0,0,0,20.0241,73.84419,111.13416,111.13416,0,0,0,61.28921,44.67691c24.60463,7.17929,51.4787,6.563,75.46927-2.66813,3.02-1.16206,5.97968-2.46883,8.88269-3.8976,2.65259-1.30552.83858-5.55146-1.8367-4.23477-22.27741,10.96426-47.9648,13.6558-72.20647,8.64933-24.32149-5.023-46.5763-18.07313-62.17225-37.477a115.44839,115.44839,0,0,1-25.07816-69.39689,106.72648,106.72648,0,0,1,23.26518-68.20682c15.04414-19.06025,36.30284-33.56042,59.894-39.64427,2.91054-.75059,5.85185-1.36731,8.81469-1.87162,2.92252-.49744,2.28953-5.06895-.645-4.56946Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
					<path d="M463.83436,523.25034l36.11052-40.68252c2.36066-2.65955,5.21123-5.46294,5.41766-9.23688.18038-3.29771-1.80124-6.06811-4.38552-7.91319-3.02183-2.15747-6.64079-3.2892-10.07586-4.592l-12.852-4.87419-28.56-10.83154c-2.77852-1.05377-4.5299,3.2166-1.74935,4.27114,15.47665,5.86961,31.12525,11.41559,46.465,17.63281,2.32244.94129,5.982,2.47534,6.50917,5.28419.56481,3.00918-3.2152,6.08632-4.965,8.05761l-16.78376,18.90878-18.81815,21.20075c-1.97433,2.2243,1.72556,4.985,3.68717,2.775Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
				</svg>
			</div>
			</div>
			{/* 

			<div className=" my-16">
				<Table columns={columns} dataSource={transactionData} loading={fetchingData} /> 
				
							<div className="mt-10 ">
								<div className="flex justify-between pt-4 pb-4 mb-5 px-8 font-semibold" style={{background: "#F9F9F9"}}>
									<div>
										<h4>Transaction ID</h4>
									</div>
									<div>
										<h4>Amount</h4>
									</div>
									<div>
										<h4>Charges</h4>
									</div>
									<div>
										<h4>Date</h4>
									</div>
									<div>
										<h4>Status</h4>
									</div>
									<div>
										<h4>Action</h4>
									</div>
								</div>
								{transactionData?.slice(0, 4).map((data, index) => {
									return (
										<div key={index} className="flex justify-between border-b pt-4 pb-10 px-8 text-sm lg:text-base font-medium lg:font-light">
											<div className="w-1/3 lg:w-1/5">
												<div className="font-medium">{data.transactionID}</div>
											</div>
											<div className="block lg:hidden">
												<div className="font-bold text-base text-normal">{data.amount}</div>
												<p>{toCurrency(data.charges)}</p>
											
											</div>

											<div className="font-bold text-normal hidden lg:block">{data.amount}</div>
											<div className="hidden lg:block">
												<p>{toCurrency(data.charges)}</p>
											</div>
											<div className="font-bold text-normal hidden lg:block">{data.date}</div>
											<div className="w-max">
												<CustomTag
													text={data.status}
													isDanger={data.status === 'declined'}
													isSuccess={data.status === 'approved'}
													isWarning={data.status === 'pending'}
												/>
											</div>
				
											<div className="hidden lg:block">
												<div className="three_dot flex">
													<ul>
														<li></li>
														<li></li>
														<li></li>
													</ul>
													<span className="text-xs font-semibold"> Download Payslip</span>
												</div>
											</div>
										</div>
									);
								})} 
							</div>
			</div>
			*/}
		</div>
	);
};

export default Withdrawals;