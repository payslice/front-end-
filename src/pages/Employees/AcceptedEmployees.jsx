/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { CustomTag } from '../../components/CustomTag';

import OptionsMenu from '../../components/TableOptionMenu';
import { EmployeeTab } from '../../components/EmployeeTab';
import { AcceptedEmployeeCard } from '../../components/EmployeeCard';
import { getTotalNoAcceptedEmployees } from '../../utils/ApiRequests';

export const AcceptedEmployees = () => {
	useEffect(() => {
		const fetAcceptedEmployees = async () => {
			try {
				const res = await getTotalNoAcceptedEmployees();
			} catch (error) {
				console.log('accepted err', error.response);
			}
		};
		fetAcceptedEmployees();
	}, []);

	const columns = [
		{
			title: 'Full Name ',
			dataIndex: 'name',
		},
		{
			title: 'Phone & email',
			dataIndex: 'phoneEmail',
		},
		{
			title: 'Employee ID',
			dataIndex: 'bankDetails',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (status) => (
				<span>
					<CustomTag text={status} isDanger={status === 'Pending'} isSuccess={status === 'On board'} />
				</span>
			),
		},
		{
			title: 'Date Joined',
			dataIndex: 'balance',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			render: (text, record) => {
				return <OptionsMenu options={tableOptions} param={record.key} />;
			},
		},
	];

	const data = [
		{
			key: '1',
			name: 'John Brown',
			phoneEmail: +2348012299289,
			bankDetails: 'GTBank',
			status: 'Pending',
			balance: '50,000',
		},
		{
			key: '2',
			name: 'John Brown',
			phoneEmail: +2348012299289,
			bankDetails: 'GTBank',
			salary: '80,000',
			balance: '50,000',
		},
		{
			key: '3',
			name: 'John Brown',
			phoneEmail: +2348012299289,
			bankDetails: 'GTBank',
			status: 'On board',
			balance: '50,000',
		},
		{
			key: '4',
			name: 'John Brown',
			phoneEmail: +2348012299289,
			bankDetails: 'GTBank',
			salary: '80,000',
			balance: '50,000',
		},
	];

	const handleClick = (param) => {
		console.log('param', param);
	};

	const tableOptions = [
		{
			name: 'Activate',
			onClick: handleClick,
		},
		{
			name: 'Stop Earning',
			onClick: handleClick,
		},
	];

	console.log(data);

	return (
		<div>
			<div className="table-header flex w-full justify-between mobiles:block">
				<EmployeeTab />
				<div className="text-xl my-auto mobiles:mt-10">Accepted Employees</div>
			</div>

			<div className="employee-table my-16 mobiles:hidden">
				{/* <Table
					rowSelection={{
						type: 'checkbox',
						...rowSelection,
					}}
					columns={columns}
					dataSource={data}
				/> */}
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
							{data?.map(({ id, key, name, phoneEmail, status, date }) => {
								return (
									<tr key={key} className="bg-white border-b last:border-none hover:bg-gray-50">
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
										<td className="px-6 py-4">{name ?? 'XXXX'}</td>
										<td className="px-6 py-4">{phoneEmail ?? 'XXXX'}</td>
										<td className="px-6 py-4">{key ?? 'XXXX'}</td>
										<td className="px-6 py-4">
											{status ? (
												status === 'Pending' ? (
													<div
														className="bg-green-200 py-1.5 text-center font-semibold rounded-md text-green-700 w-28 text-sm
												"
													>
														Pending
													</div>
												) : (
													<div
														className="bg-red-200 py-1.5 text-center font-semibold rounded-md text-red-700 w-28 text-sm
												"
													>
														{status}
													</div>
												)
											) : (
												'XXXX'
											)}
										</td>
										<td className="px-6 py-4">{date ?? 'XXXX'}</td>
										<td className="px-6 py-4">
											<div className="flex items-center">
												<OptionsMenu options={tableOptions} param={key} />
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<div className="mobiles:block hidden">
				<AcceptedEmployeeCard />

				<AcceptedEmployeeCard />
			</div>
		</div>
	);
};
