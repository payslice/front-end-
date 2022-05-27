/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getEmployeeWithdrawalRequests, getEmployeeWithdrawalWithParams } from '../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { toCurrency } from '../../utils/helpers';
import { CustomTag } from '../../components/CustomTag';
import { DotLoader } from '../../components/Loaders/DotLoader';
import { useSelector } from 'react-redux';
import { persistSelector } from '../../slices/persist';
import { SelectInput } from '../../components/Input';

const TotalTransactions = () => {
	const filterTypes = [
		{ name: 'All', value: 'all' },
		{ name: 'Pending', value: 'Pending' },
		{ name: 'Approved', value: 'approved' },
		{ name: 'Declined', value: 'declined' },
	];

	const { user } = useSelector(persistSelector);
	const [activeIndex, setActiveIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [totalTransactions, setTotalTransactions] = useState();
	const [permData, setPermData] = useState();
	const [filter, setFilter] = useState(filterTypes[0]);

	useEffect(() => {
		const getAllTransaction = async () => {
			try {
				const res = await getEmployeeWithdrawalRequests(user?.company_id);

				const resData = res.data.payload.data?.map((data, i) => {
					const date = new Date(data.created_at);
					return {
						key: i,
						name: `${data?.employee?.first_name} ${data?.employee?.last_name}`,
						phoneEmail: `${data?.employee?.email}`,
						totalWithdrawn: toCurrency(data?.amount),
						amount: parseInt(data?.amount),
						timeOfLastWithdrawal: new Date(data?.created_at).toDateString(),
						status: data?.status,
						dateYear: `${date?.toLocaleString('default', {
							month: 'long',
						})} ${date?.getFullYear()}`,
					};
				});
				setTotalTransactions(resData);
				setPermData(resData);
				setLoading(false);
			} catch (error) {
				toast.error('An error occurred');
				setLoading(false);
			}
		};
		const getApprovedTransaction = async () => {
			try {
				const response = await getEmployeeWithdrawalWithParams(user?.company_id, 'approved');
			} catch (error) {
				toast.error('An error occurred, please try again');
			}
		};
		getAllTransaction();
		// getApprovedTransaction();
		// Promise.all([getAllTransaction(), getApprovedTransaction()]).then(
		//       (values) => {
		//         console.log("promise all", values);
		//       }
		//     );
	}, []);

	const totalSalaryWithdrawn = permData?.reduce((acc, data) => acc + data.amount, 0);

	const totalApprovedWithdrawals = permData
		?.filter((data) => data.status === 'approved')
		?.reduce((acc, data) => acc + data.amount, 0);

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
			title: 'Total withdrawn',
			dataIndex: 'totalWithdrawn',
		},

		{
			title: 'Time of last withdrawal',
			dataIndex: 'timeOfLastWithdrawal',
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
	];
	function handleChange(selectedOption) {
		const filteredData = permData?.filter((data) => {
			if (selectedOption.value === 'all') {
				return totalTransactions;
			} else {
				return data.status === selectedOption.value;
			}
		});

		setTotalTransactions(filteredData);
	}
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			// console.log(
			//   `selectedRowKeys: ${selectedRowKeys}`,
			//   "selectedRows: ",
			//   selectedRows
			// );
		},
	};

	return (
		<div>
			<div className="flex justify-between items-center mobiles:block">
				<h2 className="text-xl font-semibold mobiles:mb-6 mobiles:mt-3 capitalize">Total Transactions</h2>
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
				<div className="flex mobiles:hidden">
					<div className="w-1/4 mr-5 flex justify-center items-center h-[142px] bg-gray-50 rounded-[10px] mobiles:hidden font-semibold">
						Summary
					</div>
					<div className="w-1/4  mr-5 h-[142px] bg-white border border-gray-200 rounded-[10px] p-6 mobiles:px-4 mobiles:w-40">
						<p className="font-bold text-lg text-gray-600">Total salary withdrawn</p>
						<p className="text-sm my-1.5">
							For{' '}
							<span className="text-[#1C6AF4] ml-1 font-medium">
								{permData?.length ? permData[0]?.dateYear : 'N/a'}{' '}
							</span>{' '}
						</p>
						<h4 className="text-[28px] font-bold flex justify-between items-center">
							{loading ? <DotLoader /> : <>{toCurrency(totalSalaryWithdrawn)}</>}
						</h4>
					</div>
					<div className="w-1/4  mr-5 h-[142px] bg-white border border-gray-200 rounded-[10px] p-6 mobiles:px-4 mobiles:w-40">
						<p className="font-bold text-lg text-gray-600">Number of withdrawal</p>
						<p className="text-sm my-1.5">
							For{' '}
							<span className="text-[#1C6AF4] ml-1 font-medium">
								{permData?.length ? permData[0]?.dateYear : 'N/a'}{' '}
							</span>{' '}
						</p>
						<h4 className="text-[28px] font-bold flex justify-between items-center">
							{loading ? <DotLoader /> : <>{`${totalTransactions?.length}`}</>}
						</h4>
					</div>
					<div className="w-1/4  mr-0 h-[142px] bg-white border border-gray-200 rounded-[10px] p-6 mobiles:px-4 mobiles:w-40">
						<p className="font-bold text-lg text-gray-600">Approved Withdrawals</p>
						<p className="text-sm my-1.5">
							For{' '}
							<span className="text-[#1C6AF4] ml-1 font-medium">
								{permData?.length ? permData[0]?.dateYear : 'N/a'}{' '}
							</span>{' '}
						</p>
						<h4 className="text-[28px] font-bold flex justify-between items-center">
							{loading ? <DotLoader /> : <>{toCurrency(totalApprovedWithdrawals)} </>}
						</h4>
					</div>
				</div>

				<div className="mobiles:block hidden">
					<div className="outer w-full">
						<div className="mr-3 bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
							<div className="flex flex-col justify-center">
								<p className="font-bold text-lg text-gray-600">Total salary withdrawn</p>
								<p className="mb-0">
									For <span className="text-[#1C6AF4]">October</span>{' '}
								</p>
								<h4 className="text-[28px] font-bold flex justify-between items-center mt-1.5">
									{' '}
									{toCurrency(totalSalaryWithdrawn)}{' '}
								</h4>
							</div>
						</div>
						<div className=" mr-3 card bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
							<div className="flex flex-col justify-center">
								<p className="font-bold text-lg text-gray-600">Number of withdrawal</p>
								<p className="mb-0">
									For <span className="text-[#1C6AF4]">October</span>{' '}
								</p>
								<h4 className="text-[28px] font-bold flex justify-between items-center mt-1.5">
									{' '}
									{`${permData?.length}`}
								</h4>
							</div>
						</div>
						<div className="mr-0 card bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
							<div className="flex flex-col justify-center">
								<p className="font-bold text-lg text-gray-600">Approved Withdrawals</p>
								<p className="mb-0">
									For <span className="text-[#1C6AF4]">October</span>{' '}
								</p>
								<h4 className="text-[28px] font-bold flex justify-between items-center mt-1.5">NGN 420,000</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" my-16">
				<div className="my-3 flex justify-end">
					<div className="w-44">
						<SelectInput label="Filter By:" options={filterTypes} selectedValue={filter} setSelectedValue={setFilter} />
					</div>
				</div>
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
							{totalTransactions?.map(({ id, name, salary, balance }) => {
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
												<OptionsMenu
												 options={tableOptions} param={id} />
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

export default TotalTransactions;
