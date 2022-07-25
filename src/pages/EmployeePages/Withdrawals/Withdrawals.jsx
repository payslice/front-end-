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
		const getTransactions = async () => {
			try {
				const res = await getWithdrawalRequest();
				const resetData = res.data.payload.data?.map((withdrawal, i) => {
					return {
						key: i,
						transactionID: truncateString(withdrawal.request_code, 15),
						amount: toCurrency(withdrawal.amount),
						charges: withdrawal.service_charge,
						date: new Date(withdrawal.updated_at).toDateString(),
						status: withdrawal.status,
					};
				});
				setTransactionData(resetData);
				setFetchingData(false);
			} catch (error) {
				toast.error('An error occurred');
				setFetchingData(false);
			}
		};
		getTransactions();
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
			<div className="flex justify-between">
				<h2 className="text-xl font-semibold">Transactions History </h2>
				<div className="flex justify-between">
					<div className="tab flex rounded bg-gray-100 mr-5">
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
					</div>
					<div className="tab flex rounded bg-gray-100 px-5 py-2">
						<BiCalendarEvent size="20" className="my-auto" />
						<div className="px-3 my-auto">Jan, 2019 - Dec, 2019</div>
					</div>
				</div>
			</div>

			<div className=" my-16">
				{/* <Table columns={columns} dataSource={transactionData} loading={fetchingData} /> */}
				
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
		</div>
	);
};

export default Withdrawals;
