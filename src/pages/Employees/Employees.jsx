/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { GreyButton } from '../../components/Button/GreyButton';
// import { Table } from 'antd';
import { useHistory } from 'react-router-dom';
import OptionsMenu from '../../components/TableOptionMenu';
import { deleteEmployee, getAllEmployees, getEmployeeInfoList } from '../../utils/ApiRequests';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { EmployeeTab } from '../../components/EmployeeTab';
import { EmployeeCard } from '../../components/EmployeeCard';
import { toast } from 'react-toastify';

export const Employees = () => {
	const [employees, setEmployees] = useState();
	const [fetchingData, setFetchingData] = useState(true);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const fetchAllEmployees = async () => {
			try {
				const res = await getEmployeeInfoList();

				const restructuredData = res.data.payload.data?.map((data, i) => {
					return {
						key: i,
						id: data.employee_id,
						name: `${data.fullname}`,
						// email: data.email,
						// phone: data.phone_number,
						// bankDetails: data.bankDetails.bank_name,
						salary: `NGN ${parseInt(data.salary).toLocaleString('en-NG')}`,
						balance: `NGN ${parseInt(data.salary_balance).toLocaleString('en-NG')}`,
					};
				});
				setEmployees(restructuredData);
				setFetchingData(false);
			} catch (error) {
				toast.error('An error occurred.');
				setFetchingData(false);
			}
		};
		fetchAllEmployees();
	}, []);

	const history = useHistory();
	const columns = [
		{
			title: 'Full Name ',
			dataIndex: 'name',
		},
		// {
		//   title: "Phone & email",
		//   dataIndex: "phoneEmail",
		//   render: (text, record) => {
		//     return (
		//       <div>
		//         <div className="text-normal">{record.phone}</div>
		//         <div className="text-normal">{record.email}</div>
		//       </div>
		//     );
		//   },
		// },
		// {
		//   title: "Bank Details",
		//   dataIndex: "bankDetails",
		// },
		{
			title: 'Salary ',
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

	const gotoDetailsPage = () => {
		history.push('/employee/1');
	};

	const handleClick = (param) => {
		console.log('param', param);
	};

	const handleDelete = async (id) => {
		setDeleting(true);
		try {
			const res = await deleteEmployee(id);
			setDeleting(false);
		} catch (error) {
			toast.error("can't delete, an error occurred");
			setDeleting(false);
		}
	};
	const handleViewDetails = (id) => {
		history.push(`/employee/${id}`);
	};

	const tableOptions = [
		{
			name: 'Activate',
			onClick: handleClick,
		},
		{
			name: 'Deactivate',
			onClick: handleDelete,
		},
		{
			name: 'View Details',
			onClick: handleViewDetails,
		},
	];

	return (
		<div>
			<div className="table-header flex w-full justify-between mobiles:block -mt-2">
				<EmployeeTab />
				<div className="flex items-center justify-between w-full">
					<div className="text-xl text-black font-semibold capitalize my-auto mobiles:mt-3 mobiles:hidden">
						Employees payroll Report
					</div>
					<Button buttonText="Pay Full Payroll" base />
				</div>
				<div className="mobiles:flex hidden justify-between mb-3 mt-5">
					<div className="text-normal my-auto ">Employees payroll Report</div>
					<div className="filter-search-wrapper flex">
						<BsFilter style={{ background: '#F9F9F9' }} className="p-1 mr-2 " size="32px" />
						<AiOutlineSearch style={{ background: '#F9F9F9' }} className="p-1 ml-2" size="32px" />
					</div>
				</div>
			</div>
			<div className="table-actions flex">
				<div className="mr-5">
					<GreyButton buttonText="Create single staff +" onClick={() => history.push('/employee/create')} />
				</div>
				{/* <div className="mr-5">
          <GreyButton
            buttonText="Create bulk staff "
            onClick={() => history.push("/employee/upload")}
          />
        </div> */}
			</div>
			​
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
						{employees?.map(({ id, name, salary, balance }) => {
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
											<OptionsMenu options={tableOptions} param={id} />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="mobiles:block hidden">
				<EmployeeCard gotoDetailsPage={gotoDetailsPage} />
				<EmployeeCard gotoDetailsPage={gotoDetailsPage} />
			</div>
		</div>
	);
};
