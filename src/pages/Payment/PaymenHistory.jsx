/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { companyPaymentHistories } from '../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { toCurrency, truncateString } from '../../utils/helpers';
import { BackButton } from '../../components/BackButton';
import OptionsMenu from '../../components/TableOptionMenu';

const PaymentHistory = () => {
	const [paymentData, setPaymentData] = useState();
	const [fetchingData, setFetchingData] = useState(true);

	useEffect(() => {
		const getPaymentHistory = async () => {
			try {
				const res = await companyPaymentHistories();
				// const resData = res.data.payload.data;
				const resetData = res.data.payload.data?.map((data, i) => {
					return {
						key: i,
						amount: toCurrency(data.amount),
						paymentID: truncateString(data.payment_id, 8),
						date: new Date(data.created_at).toDateString(),
						paymentType: data.mode_of_payment,
					};
				});

				setPaymentData(resetData);
				setFetchingData(false);
			} catch (error) {
				toast.error('an error occurred');

				setFetchingData(false);
			}
		};
		getPaymentHistory();
	}, []);

	const columns = [
		{
			title: 'Payment ID',
			dataIndex: 'paymentID',
		},
		{
			title: 'Amount ',
			dataIndex: 'amount',
			// render: (amount) => (
			//   <div>
			//     <span className="font-bold">NGN</span>
			//     {amount.toLocaleString("en-NG")}
			//   </div>
			// ),
		},
		{
			title: 'Date',
			dataIndex: 'date',
		},
		{
			title: 'Payment Type',
			dataIndex: 'paymentType',
			render: (paymentType) => <div style={{ textTransform: 'capitalize' }}>{paymentType}</div>,
		},

		{
			title: 'Action',
			dataIndex: 'action',
		},
	];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			// console.log(
			//   `selectedRowKeys: ${selectedRowKeys}`,
			//   "selectedRows: ",
			//   selectedRows
			// );
		},
	};

	const data = [
		{
			key: '1',
			paymentID: 'SOP4854885859',
			name: 'John Brown',
			amount: 19000,
			date: '21st July 2021',
			paymentType: 'Transfer',
			status: 'Pending',
		},
		{
			key: '2',
			name: 'John Brown',
			paymentID: 'SOP4854885859',
			amount: 19000,
			date: '21st July 2021',
			paymentType: 'Transfer',
			status: 'Active',
		},
		{
			key: '3',
			paymentID: 'SOP4854885859',
			name: 'John Brown',
			amount: 19000,
			date: '21st July 2021',
			paymentType: 'Transfer',
			status: 'Pending',
		},
	];
	return (
		<div className="__admin-listing -mt-2">
			<div className="w-full ">
				<BackButton url="/payments" />
				<div className="text-xl text-black font-semibold mt-10">Payment History</div>
				<p className="text-normal text-sm mt-1">List of all payments made to payslice </p>
			</div>
			<div className="my-16">
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
							{paymentData?.map(({ id, name, salary, balance }) => {
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
											<div className="flex items-center">
												<OptionsMenu />
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PaymentHistory;
