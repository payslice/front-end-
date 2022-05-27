/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import { Table } from 'antd';
import { CustomTag } from '../../components/CustomTag';
import { RiWalletFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { getAllCompanyPolicy, getPaymentLogs } from '../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { toCurrency, truncateString } from '../../utils/helpers';

const PaymentSummary = () => {
	const [paymentList, setPaymentList] = useState();
	const [fetchingData, setFetchingData] = useState(true);
	const [policyResponse, setPolicyResponse] = useState();
	useEffect(() => {
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
				setPaymentList(resetData);
				setFetchingData(false);
			} catch (error) {
				toast.error('Something went wrong');
			}
		};
		const fetchPolicy = async () => {
			try {
				const res = await getAllCompanyPolicy();
				res.data.payload.data.length > 0 && setPolicyResponse(res.data.payload.data[0]);
			} catch (error) {
				toast.error('An error occurred, please try again');
			}
		};
		fetchPaymentLogs();
		fetchPolicy();
	}, []);

	const salaryDate =
		policyResponse?.salary_date === 'last_week'
			? 'Last Week'
			: policyResponse?.salary_date === 'first_week'
			? 'First Week'
			: policyResponse?.salary_date;

	const totalWithdrawals = paymentList?.reduce((acc, num) => acc + num.amount, 0);

	const totalDue = paymentList
		?.filter((data) => typeof data.amount_remaining == 'string')
		.reduce((acc, num) => parseInt(acc) + parseInt(num.amount_remaining), 0);

	const history = useHistory();
	const columns = [
		{
			title: 'Payment Id',
			dataIndex: 'paymemtID',
		},
		{
			title: 'Total Payable ',
			dataIndex: 'totalPayable',
		},
		{
			title: 'Total Pay',
			dataIndex: 'totalPay',
		},
		{
			title: 'Month ',
			dataIndex: 'month',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (status) => (
				<span>
					<CustomTag text={status} isDanger={status === 'Unpaid'} isSuccess={status === 'Paid'} />
				</span>
			),
		},
		{
			title: 'Pay',
			dataIndex: 'pay',
			render: (text, record) => (
				<div
					className="flex rounded px-3 py-1 cursor-pointer"
					style={{
						color: 'white',
						background: '#1C6AF4',
						width: '100px',
					}}
					onClick={() => {
						history.push(`/payments/account-info/${record.id}`);
					}}
				>
					<RiWalletFill className="my-auto mr-1" /> Pay Now
				</div>
			),
		},
		// {
		//   title: "Action",
		//   dataIndex: "action",
		//   render: () => <BsThreeDotsVertical />,
		// },
	];

	return (
		<div className="__wrapper">
			<div className="header">
				<div className="text-xl text-black font-semibold capitalize my-auto mobiles:mt-3 mobiles:hidden">
					Payments summary{' '}
				</div>
			</div>
			<div className="cards mt-10">
				<div className="box__wrapper flex w-full mobiles:block">
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Total withdrawals </p>
						<p className="text-sm my-1.5">{paymentList?.length ? paymentList[0]?.dateYear : 'N/A'}</p>
						<h2 className="text-[28px] font-bold flex justify-between items-center">{toCurrency(totalWithdrawals)}</h2>
					</div>
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Payment Due </p>
						<p className="text-sm my-1.5">{paymentList?.length ? paymentList[0]?.dateYear : 'N/A'}</p>
						<h2 className="text-[28px] font-bold flex justify-between items-center">{toCurrency(totalDue)}</h2>
					</div>
					<div className="w-1/4 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6">
						<p className="font-bold text-lg text-gray-600">Due Date</p>
						<p className="text-[28px] font-bold flex justify-between items-center mt-8">{salaryDate || 'N/A'}</p>
					</div>
				</div>

				<div className="text-xl text-black font-semibold capitalize my-auto mt-16 mb-3 mobiles:hidden">
					Withdrawal Payments
				</div>
				<div className="employee-table my-8">
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
											<label for="checkbox-all" className="sr-only">
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
								{paymentList?.map(({ id, name, salary, balance }) => {
									return (
										<tr key={id} className="bg-white border-b last:border-none hover:bg-gray-50">
											<td className="w-4 p-6">
												<div className="flex items-center">
													<input
														id="checkbox-table-1"
														type="checkbox"
														className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
													/>
													<label for="checkbox-table-1" className="sr-only">
														checkbox
													</label>
												</div>
											</td>
											<td className="px-6 py-4">{name}</td>
											<td className="px-6 py-4">{salary}</td>
											<td className="px-6 py-4">{balance}</td>
											<td className="px-6 py-4">
												{/* <div className="flex items-center">
													<OptionsMenu options={tableOptions} param={id} />
												</div> */}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentSummary;
