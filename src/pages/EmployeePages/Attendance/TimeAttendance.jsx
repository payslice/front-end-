/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import { Button } from "../../../components/Button/Button";
import { CustomTag } from '../../../components/CustomTag';
// import { Table } from 'antd';
import { getClockIn, getClockOut } from '../../../utils/ApiRequests';
import { getUserDataFromStorage } from '../../../utils/ApiUtils';
import { toast } from 'react-toastify';

const TimeAttendance = () => {
	const [clockInData, setClockInData] = useState();
	const [clockOutData, setClockOutData] = useState();
	const [activeTab, setActiveTab] = useState(0);

	const userData = getUserDataFromStorage();

	useEffect(() => {
		const getClockInData = async () => {
			try {
				const res = await getClockIn(userData.id);
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

		const getClockOutData = async () => {
			try {
				const res = await getClockOut(userData.id);
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
		getClockInData();
		getClockOutData();
	}, [userData.id]);

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

	const data = [
		{
			key: '1',
			timeIn: new Date().toLocaleTimeString(),
			timeOut: new Date().toLocaleTimeString(),
			date: new Date().toDateString(),
			checkInStatus: 'Committed',
			user: 'Committed',
			location: 'Lagos',
		},
		{
			key: '2',
			timeIn: new Date().toLocaleTimeString(),
			timeOut: new Date().toLocaleTimeString(),
			date: new Date().toDateString(),
			checkInStatus: 'None',
			user: 'None',
			location: 'Lagos',
		},
	];

	return (
		<div>
			<div className="page-header capitalize">time attendence history</div>
			<div className="my-5 flex">
				<div
					className={`px-8 py-3 ${
						activeTab === 0 ? ' bg-blue-600 text-white' : 'bg-gray-100'
					} cursor-pointer mx-5 rounded`}
					onClick={() => setActiveTab(0)}
				>
					Time-in
				</div>
				<div
					className={`px-8 py-3 ${activeTab === 1 ? 'bg-blue-600 text-white' : ' bg-gray-100'} cursor-pointer rounded`}
					onClick={() => setActiveTab(1)}
				>
					Time-out
				</div>
			</div>
			<div className=" my-16">
				{/* <Table
					columns={activeTab === 0 ? columns : columns2}
					dataSource={activeTab === 0 ? clockInData : clockOutData}
				/> */}
			</div>
		</div>
	);
};

export default TimeAttendance;
