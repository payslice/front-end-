/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { toast } from "react-toastify";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    getAllCompanyPolicy,
    getDashboardWithdrawalRequests,
    getPaymentLogs,
    getDashboardWithdrawalWithParams,
    getTotalNoOfAcceptedEmployees,
    getTotalNoOfEmployees,
    payrollGetStatsApi,
} from "../../utils/ApiRequests";
import { getTokenFromStorage, getuserFromStorage } from "../../utils/ApiUtils";
import { toCurrency, truncateString } from "../../utils/helpers";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";

import { chart_one } from "../../utils/data";
import { useSelector } from "react-redux";
import { persistSelector } from "../../slices/persist";
import { Button } from "../../components/Button/Button";
import { CustomTag } from "../../components/CustomTag";
import { AiOutlineSearch, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { DotLoader } from "../../components/Loaders/DotLoader";

const DashboardPayroll = () => {
    const { user } = useSelector(persistSelector);
    const [policyResponse, setPolicyResponse] = useState();
    const [acceptedEmployees, setAcceptedEmployees] = useState();
    const [paymentLogs, setPaymentLogs] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [clockInData, setClockInData] = useState();
    const [clockOutData, setClockOutData] = useState();
    const [submitting, setSubmitting] = useState()
    const [payrollState, setpayrollState] = useState()

    const history = useHistory();
    
    const payrollGetStats = async () => {
        setSubmitting(true);
        try {
            const {data} = await payrollGetStatsApi();

            console.log(data)
            
            if (data.status) {
                toast.success(data.message)
                setpayrollState(data.data)
                setSubmitting(false);
            }
            else {
                toast.error(data.message)
                setSubmitting(false);
            }

        } catch (error) {
            toast.error(error)
            setSubmitting(false);
        }
        finally {
            setSubmitting(false);
        } 
    }

    useEffect(() => {
        payrollGetStats()
    }, []);


    const totalDue = paymentLogs
        ?.filter(data => typeof data.amount_remaining == "string")
        .reduce(
            (acc, num) => parseInt(acc) + parseInt(num.amount_remaining),
            0
        );

        const columns = [
		{
			title: 'Full Name',
			dataIndex: 'key',
		},
		{
			title: 'Phone & email',
			dataIndex: 'date',
		},
		{
			title: 'Bank Details',
			dataIndex: 'timeIn',
		},
		{
			title: 'Salary',
			dataIndex: 'timeIn',
		},
		{
			title: 'Salary balance',
			dataIndex: 'timeIn',
		},
		// {
		// 	title: 'Checkin status',
		// 	dataIndex: 'checkInStatus',
		// 	render: (status) => (
		// 		<span>
		// 			<CustomTag text={status} isDanger={status === 'Pending'} isSuccess={status === 'Committed'} />
		// 		</span>
		// 	),
		// },
		{
			title: 'Action',
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
        <div>
            <div className='mt-10 lg:mt-0 cards'>
                
                <div>
                        <div className="block md:flex justify-between">
                        
                                <h2 className="font-semibold text-[21px] tracking-wide pb-10 md:pb-0">Employees payroll Report</h2>
                                <Button buttonText="pay full  payroll" />
                        </div>
                        
                        <br />

                </div>

                <div className='flex mobiles:block'>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                                Active Company size
                        </p>
                        {
                            submitting
                            ?
                            <DotLoader/>
                            :
                            (
                                <>
                                    <p className='flex mt-2 text-sm font-light'>{`${new Date(
                                        policyResponse?.updated_at
                                    ).toLocaleString("default", {
                                        month: "long",
                                    })} ${new Date(
                                        policyResponse?.updated_at
                                    ).getFullYear()} `}</p>
                                    <h4 className='text-[28px] font-bold mt-1.5'>{payrollState?.company_size}</h4>
                                </>
                            )

                        }
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                                Active Payroll size 
                        </p>
                        
                        {
                            submitting
                            ?
                            <DotLoader />
                            :
                            (
                                <>
                                <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                                    {`${new Date(
                                        policyResponse?.updated_at
                                    ).toLocaleString("default", {
                                        month: "long",
                                    })} ${new Date(
                                        policyResponse?.updated_at
                                    ).getFullYear()} `}
                                    <span
                                        className='flex ml-2 font-bold'
                                        style={{ color: "#0B9B36" }}>
                                        0% <BsArrowUp className='my-auto' />
                                    </span>
                                </p>
                                <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                                {payrollState?.payroll_size}
                                    <span
                                        className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                        onClick={() => history.push("/employee")}>
                                        Manage{" "}
                                    </span>
                                </h4>
                                </>
                            )

                        }
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Upcoming payments
                        </p>
                        {
                            submitting
                            ?
                            <DotLoader />
                            :
                            (
                                <>
                                    <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                                        January 2021{" "}
                                        <span
                                            className='flex ml-2 font-bold'
                                            style={{ color: "#D0000C" }}>
                                            -3% <BsArrowDown className='my-auto font-bold' />
                                        </span>
                                    </p>
                                    <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                                    
                                        {payrollState?.upcoming_payment}
                                        <span
                                            className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                            onClick={() => history.push("/payments")}>
                                            Repay now
                                        </span>
                                    </h4>
                                </>
                            )

                        }
                    </div>
                </div>
                <div>
                        <div className="block md:flex justify-between pt-10">
                                <div>
                                        <div className="inline">
                                                <button className="bg-[#F3F4F6] px-6 py-2 m-2 rounded ">create single staff <span className="px-2">+</span> </button>
                                        </div>
                                        <div className="inline">
                                                <button className="bg-[#F3F4F6] px-6 py-2 m-2 rounded">Upload in bulk</button>
                                        </div>
                                </div>
                                <div className="pt-3 flex">
                                        <div className="border-b-2 border-black m-2 inline flex">
                                                <AiOutlineSearch /><input type="text" placeholder="Type in to search" className="px-2" />
                                        </div>

                                        <div className="m-2 inline flex">
                                                <span className="pr-2">  Filter</span><AiOutlineDown />
                                        </div>
                                </div>
                        </div>
                </div>
                <div className="pt-10">   
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
                                                                <label htmlFor="checkbox-all" className="sr-only">
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
                                                                                        <label htmlFor="checkbox-table-1" className="sr-only">
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
                                                                                        <label htmlFor="checkbox-table-1" className="sr-only">
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
    );
};

export default DashboardPayroll;
