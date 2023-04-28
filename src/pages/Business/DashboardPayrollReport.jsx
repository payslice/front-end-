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

const DashboardPayrollReport = () => {
    const { user } = useSelector(persistSelector);
    const [activeIndex, setActiveIndex] = useState(0);
    const [policyResponse, setPolicyResponse] = useState();
    const [acceptedEmployees, setAcceptedEmployees] = useState();
    const [graphData, setGraphData] = useState(chart_one);
    const [allWithdrawals, setAllWithdrawals] = useState();
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [paymentLogs, setPaymentLogs] = useState();
    const [profile, setProfile] = useState(user);
    const [activeTab, setActiveTab] = useState(0);
    const [clockInData, setClockInData] = useState();
    const [clockOutData, setClockOutData] = useState();
    const [submitting, setSubmitting] = useState()
    const [payrollState, setpayrollState] = useState()

    console.log(user);

    const token = getTokenFromStorage();

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
                <div className="pt-10 font-medium">   
                        <h2 className="py-5 text-[20px]">Employees payroll Report</h2>
                        <div className="bg-[#F9F9F9] px-16 py-7 pt-10 rounded">
                                <p className=" pb-5 leading-7 text-[17px]">This feature allows your employee to take part of their salary before the end of the month. Payslice provides the float needed for each request with 0 charge and would receive reimbursement at the end of the month.</p>
                                <Button buttonText="Request Access" />
                        </div>
                        
                </div>
            </div>

        </div>
    );
};

export default DashboardPayrollReport;
