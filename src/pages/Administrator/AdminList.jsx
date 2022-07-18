import React from 'react';
import { Button } from '../../components/Button/Button';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CustomTag } from '../../components/CustomTag';
import { useHistory } from 'react-router-dom';

const AdminList = () => {
	const history = useHistory();
	const columns = [
		{
			title: 'Full Name ',
			dataIndex: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phoneNumber',
		},
		{
			title: 'Job Title',
			dataIndex: 'jobTitle',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (status) => (
				<span>
					<CustomTag text={status} isDanger={status === 'Pending'} isSuccess={status === 'Active'} />
				</span>
			),
		},

		{
			title: 'Action',
			dataIndex: 'action',
			render: () => <BsThreeDotsVertical />,
		},
	];

	const data = [
		{
			key: '1',
			name: 'John Brown',
			phoneNumber: +2348012299289,
			email: 'jamesbrown@gmail.com',
			jobTitle: 'CEO',
			status: 'Pending',
		},
		{
			key: '2',
			name: 'John Brown',
			phoneNumber: +2348012299289,
			email: 'jamesbrown@gmail.com',
			jobTitle: 'CFO',
			status: 'Active',
		},
		{
			key: '3',
			name: 'John Brown',
			phoneNumber: +2348012299289,
			email: 'jamesbrown@gmail.com',
			jobTitle: 'CTO',
			status: 'Pending',
		},
	];
	return (
		<div className="__admin-listing">
			<div className="flex w-full justify-between">
				<h3 className="text-2xl">Adminstrators List</h3>
				<Button buttonText="Add new adminstrator" onClick={() => history.push('/settings/admin/add')} />
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
										<label hmtlFor="checkbox-all" className="sr-only">
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
							{data?.map(({ id, name, salary, balance }) => {
								return (
									<tr key={id} className="bg-white border-b last:border-none hover:bg-gray-50">
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
	);
};

export default AdminList;
