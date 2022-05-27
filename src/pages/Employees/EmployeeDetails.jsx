/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from '../../components/Button/Button';
import { CustomTag } from '../../components/CustomTag';
import { EmployeeInfo } from '../../components/EmployeeInfo';
import { EmployeeTab } from '../../components/EmployeeTab';
import { BackButton } from '../../components/BackButton';
import { getClockInTime, getClockOut, getEmployeeClockOut, getOneEmployee } from '../../utils/ApiRequests';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const getLocation = async (lat, long) => {
	var url =
		'https://www.mapquestapi.com/geocoding/v1/reverse?key=API-Key&location=' +
		lat +
		'%2C' +
		long +
		'&outFormat=json&thumbMaps=false';
	try {
		const res = await axios.get(url);
		// console.log("res", res);
	} catch (error) {}
};

const EmployeeDetails = () => {
	const { id } = useParams();
	const [employeeData, setEmployeeData] = useState();
	const [fetchingEmpData, setFetchingEmpData] = useState();
	const [clockInData, setClockInData] = useState();
	const [clockOutData, setClockOutData] = useState();
	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		setFetchingEmpData(true);
		const getEmployeeInfo = async () => {
			try {
				const res = await getOneEmployee(id);

				setEmployeeData(res.data.payload.data);
				setFetchingEmpData(false);
			} catch (error) {
				toast.error('An error occurred');
				setFetchingEmpData(false);
			}
		};

		getEmployeeInfo();
	}, [id]);

	useEffect(() => {
		const getCheckInTime = async (userId) => {
			try {
				const res = await getClockInTime(userId);
				const resetData = res.data.payload.data?.map((resData, index) => {
					return {
						key: index,
						date: new Date(resData.clock_in_time).toLocaleDateString(),
						timeIn: new Date(resData.clock_in_time).toLocaleTimeString(),
						location: `Lat: ${resData.location.lat} Long: ${resData.location.long}`,
						checkInStatus: '-----',
					};
				});
				setClockInData(resetData);
			} catch (error) {
				toast.error('an error occurred');
			}
		};

		const getCheckOutTime = async (userId) => {
			try {
				const res = await getEmployeeClockOut(userId);
				const resetData = res.data.payload.data?.map((resData, index) => {
					return {
						key: index,
						date: new Date(resData.clock_out_time).toLocaleDateString(),
						timeOut: new Date(resData.clock_out_time).toLocaleTimeString(),
						location: `Lat: ${resData.location.lat} Long: ${resData.location.long}`,
						checkInStatus: '-----',
					};
				});
				setClockOutData(resetData);
			} catch (error) {
				toast.error('an error occurred');
			}
		};
		if (id) {
			getCheckInTime(id);
			getCheckOutTime(id);
		}
	}, [id]);

	const columns = [
		{
			title: 'S/N',
			dataIndex: 'key',
		},
		{
			title: 'Dates',
			dataIndex: 'date',
		},
		{
			title: 'Time in',
			dataIndex: 'timeIn',
		},
		{
			title: 'Checkin status',
			dataIndex: 'checkInStatus',
			render: (status) => (
				<span>
					<CustomTag text={status} isDanger={status === 'Pending'} isSuccess={status === 'Committed'} />
				</span>
			),
		},
		{
			title: 'Location',
			dataIndex: 'location',
		},
	];

	const columns2 = [
		{
			title: 'S/N',
			dataIndex: 'key',
		},
		{
			title: 'Dates',
			dataIndex: 'date',
		},
		{
			title: 'Time out',
			dataIndex: 'timeOut',
		},
		{
			title: 'Checkin status',
			dataIndex: 'checkInStatus',
			render: (status) => (
				<span>
					<CustomTag text={status} isDanger={status === 'Pending'} isSuccess={status === 'Committed'} />
				</span>
			),
		},
		{
			title: 'Location',
			dataIndex: 'location',
		},
	];

	return (
		<div className="-mt-2 pb-16">
			<EmployeeTab />
			<BackButton url="/employee" />
			<div className="text-xl text-black font-semibold mt-10">Employee Details </div>
			<div className="bg-[#F9F9F9] flex flex-wrap items-center mobiles:w-full px-[34px] py-3 mt-8 max-w-[807px] rounded-[5px] h-[50px]">
				<div className="mobiles:w-1/2 text-sm font-semibold mobiles:px-1">
					Date Joined : {new Date(employeeData?.workDetails.created_at).toLocaleDateString() || '...'}
				</div>
				<div className="mobiles:w-1/2 mx-11 text-sm font-semibold mobiles:px-1">
					Location: {employeeData?.workDetails?.location || '...'}
				</div>
				<div className="mobiles:w-full text-sm font-semibold mobiles:px-1">
					Employee ID: {employeeData?.employee_id || '...'}
				</div>
			</div>
			<div className="mt-12">
				<div className="border border-gray-200 rounded-md">
					<div className="flex py-6 px-[37px] justify-between border-b-2">
						<div className="col-1 text-xl font-semibold">Employee Details</div>
						<div className="actn-col my-auto">
							<BsThreeDotsVertical className="my-auto" />
						</div>
					</div>

					{fetchingEmpData ? (
						<div className="flex justify-center items-center p-10" style={{ height: 'inherit' }}>
							{/* <Spin /> */}
						</div>
					) : (
						<div className="content w-full flex mobiles:block">
							<div className="w-1/3 px-[60px] py-7 mobiles:w-full">
								<EmployeeInfo title="First Name" value={employeeData?.first_name} />
								<EmployeeInfo title="Last Name" value={employeeData?.last_name} />
								<EmployeeInfo title="Gender" value={employeeData?.gender} />
								<EmployeeInfo title="Email Address" value={employeeData?.email} />
								<EmployeeInfo title="Phone Number" value={employeeData?.phone_number} />
							</div>
							<div className="w-1/3 py-7 mobiles:w-full">
								<EmployeeInfo title="Bank Name" value={employeeData?.bankDetails.bank_name} />
								<EmployeeInfo title="Account Name" value={employeeData?.bankDetails.account_name} />
								<EmployeeInfo title="Account Number" value={employeeData?.bankDetails.account_number} />
							</div>
							<div className="w-1/3 py-7 mobiles:w-full">
								<EmployeeInfo
									title="Salary Breakdown:"
									value={`Basic salary - NGN ${parseInt(employeeData?.workDetails.staff_salary).toLocaleString()}`}
								/>
								<EmployeeInfo title="Employement Type:" value={employeeData?.workDetails.employment_type} />
								<EmployeeInfo title="Employers ID:" value="----" />
							</div>
						</div>
					)}
					<div className="my-5 px-[60px]">
						<div className="flex w-[209px] bg-gray-100 rounded-[5px] overflow-hidden">
							<div
								className={`px-6 py-3 ${
									activeTab === 0 ? ' bg-blue-600 rounded-[5px] text-white' : 'bg-gray-100'
								} cursor-pointer font-semibold text-sm`}
								onClick={() => setActiveTab(0)}
							>
								Time-in
							</div>
							<div
								className={`px-6 py-3 ${
									activeTab === 1 ? 'bg-blue-600 rounded-[5px] text-white' : ' bg-gray-100'
								} cursor-pointer  font-semibold text-sm`}
								onClick={() => setActiveTab(1)}
							>
								Time-out
							</div>
						</div>
					</div>
					<div className="employee-table mb-16 mt-16 px-[60px]">
						<div className="relative">
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
										{activeTab === 0 &&
											columns.map(({ title }, i) => (
												<th key={i} scope="col" className="px-6 py-3">
													{title}
												</th>
											))}
										{activeTab === 1 &&
											columns2.map(({ title }, i) => (
												<th key={i} scope="col" className="px-6 py-3">
													{title}
												</th>
											))}
									</tr>
								</thead>
								<tbody>
									{activeTab === 0 &&
										clockInData?.map(({ id, name, salary, balance }) => {
											return (
												<tr className="bg-white border-b last:border-none hover:bg-gray-50">
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
													{/* <td className="px-6 py-4">{name}</td>
												<td className="px-6 py-4">{salary}</td>
												<td className="px-6 py-4">{balance}</td> */}
													<td className="px-6 py-4">
														<div className="flex items-center">
															{/* <OptionsMenu options={tableOptions} param={id} /> */}
														</div>
													</td>
												</tr>
											);
										})}
									{activeTab === 1 &&
										clockOutData?.map(({ id, name, salary, balance }) => {
											return (
												<tr className="bg-white border-b last:border-none hover:bg-gray-50">
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
													{/* <td className="px-6 py-4">{name}</td>
												<td className="px-6 py-4">{salary}</td>
												<td className="px-6 py-4">{balance}</td> */}
													<td className="px-6 py-4">
														<div className="flex items-center">
															{/* <OptionsMenu options={tableOptions} param={id} /> */}
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
			</div>
		</div>
	);
};

export default EmployeeDetails;
