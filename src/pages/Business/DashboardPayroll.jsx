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

const DashboardPayroll = () => {
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

    console.log(user);

    const token = getTokenFromStorage();

    const history = useHistory();

    useEffect(() => {
        // date is currently hard coded. To be modified later.
        const employeesDate = new Date();

        const fetchAcceptedEmployees = async filterParams => {
            try {
                const res = await getTotalNoOfEmployees(
                    employeesDate.getDay(),
                    employeesDate.getMonth() + 1,
                    employeesDate.getUTCFullYear()
                );
                setAcceptedEmployees(res.data.payload.data?.numberOfEmployees);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchAcceptedEmployees();
    }, []);

    useEffect(() => {
        setNotificationLoading(true);
        function handleChangeStorage() {
            setProfile(user);
        }
        const fetchPolicy = async () => {
            try {
                const res = await getAllCompanyPolicy();
                res.data.payload.data.length > 0 &&
                    setPolicyResponse(res?.data?.payload?.data[0]);
            } catch (error) {
                // console.log("error", error);
                toast.error("An error occurred");
            }
        };

        const getApprovedTransaction = async () => {
            try {
                const response = await getDashboardWithdrawalWithParams(
                    profile?.company_id,
                    "approved"
                );
                const dataRes = response?.data?.payload?.data
                    ?.slice(0, 7)
                    ?.map((data, index) => {
                        return {
                            name: new Date(
                                data.created_at
                            ).toLocaleDateString(),
                            uv: 40000,
                            pv: parseInt(data.amount),
                            amt: parseInt(data.amount),
                        };
                    });

                // setGraphData(dataRes);
            } catch (error) {
                // console.log("approved error", error);
                toast.error("An error occurred");
            }
        };

        const getWithdrawals = async () => {
            try {
                const res = await getDashboardWithdrawalWithParams(
                    profile.company_id,
                    "approved"
                );
                setAllWithdrawals(res.data.payload.data.slice(0, 4));
                setNotificationLoading(false);
            } catch (error) {
                toast.error("Can't get employee withdrawals");
                setNotificationLoading(false);
            }
        };

        const fetchPaymentLogs = async () => {
            try {
                const response = await getPaymentLogs();
                const resetData = response.data.payload.paymentLogs?.map(
                    (resData, i) => {
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
                                    : toCurrency(
                                          parseInt(resData.amount) -
                                              parseInt(resData.amount_remaining)
                                      ),
                            month: date.toLocaleString("default", {
                                month: "long",
                            }),
                            status:
                                resData.completed === "no" ? "Unpaid" : "Paid",
                            dateYear: `${date.toLocaleString("default", {
                                month: "long",
                            })} ${date.getFullYear()}`,
                            amount_remaining: resData.amount_remaining,
                        };
                    }
                );
                setPaymentLogs(resetData);
                // setFetchingData(false);
            } catch (error) {
                toast.error("Something went wrong");
            }
        };
        if (profile) {
            fetchPolicy();
            getApprovedTransaction();
            getWithdrawals();
            fetchPaymentLogs();
        }
        window.addEventListener("storage", handleChangeStorage);
        return () => window.removeEventListener("storage", handleChangeStorage);
    }, [profile, user]);

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
                        <p className='flex mt-2 text-sm font-light'>{`${new Date(
                            policyResponse?.updated_at
                        ).toLocaleString("default", {
                            month: "long",
                        })} ${new Date(
                            policyResponse?.updated_at
                        ).getFullYear()} `}</p>
                        <h4 className='text-[28px] font-bold mt-1.5'>0</h4>
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                                Active Payroll size 
                        </p>
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
                            {acceptedEmployees || "N/A"}
                            <span
                                className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                onClick={() => history.push("/employee")}>
                                Manage{" "}
                            </span>
                        </h4>
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Upcoming payments
                        </p>
                        <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                            January 2021{" "}
                            <span
                                className='flex ml-2 font-bold'
                                style={{ color: "#D0000C" }}>
                                -3% <BsArrowDown className='my-auto font-bold' />
                            </span>
                        </p>
                        <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                            {toCurrency(totalDue)}
                            <span
                                className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                onClick={() => history.push("/payments")}>
                                Repay now
                            </span>
                        </h4>
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