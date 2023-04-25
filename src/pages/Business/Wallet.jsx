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
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BsArrowDownLeftCircle, BsArrowUpRightCircle } from "react-icons/bs";

const Wallet = () => {
    const { user } = useSelector(persistSelector);
    const [activeIndex, setActiveIndex] = useState(0);
    const [policyResponse, setPolicyResponse] = useState();
    const [acceptedEmployees, setAcceptedEmployees] = useState();
    const [graphData, setGraphData] = useState(chart_one);
    const [allWithdrawals, setAllWithdrawals] = useState();
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [paymentLogs, setPaymentLogs] = useState();
    const [profile, setProfile] = useState(user);

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

    return (
        <div>
            <div className='mt-10 lg:mt-0 cards'>
                <div className='flex mobiles:block'>
                    <div className="w-full md:w-5/12">
                        <div>
                            <div className="bg-[#E8E8E8]/[0.3] rounded px-10 py-5 mb-5">
                                <p>Payslice Wallet</p>
                                <h2 className="text-[#111111]/[0.9] font-bold py-3 text-[31px]">NGN 140,000</h2>
                                <p className="text-sm text-[#111111]/[0.6] font-semibold pb-1">Virtual Account</p>
                                <div className="font-semibold text-[#111111]/[0.6] text-[18px]">
                                    <p>Acc. No: 7505519950</p>
                                    <p>Acc. Name: Payslice</p>
                                    <p>Bank: Providus Bank</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <Button buttonText="Fund Wallet" fullwidth />
                            </div>
                            <div>
                                <Button buttonText="Transfer to Others " fullwidth inverted />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/12"></div>
                    <div className="w-full md:w-6/12 pt-8 md:pt-0">
                        <div>
                            <div className="w-full md:w-10/12 bg-[#F4F9FF] p-10 rounded-lg">
                                <h2 className="font-semibold pb-3 text-[20px]">Time Period</h2>
                                <div className="flex">
                                    <div className="w-1/2 border-r-2 border-black text-[#111111]/[0.7]">
                                        <span className="font-medium">From</span>
                                        <div className="flex pt-3 font-bold"><span className="text-[18px]">2021-08-09</span> <span className="pt-1 px-4"><AiTwotoneCalendar /></span></div>
                                    </div>
                                    <div className="w-1/2 text-[#111111]/[0.7] pl-5">
                                        <span className="font-medium">To</span>
                                        <div className="flex pt-3 font-bold"><span className="text-[18px]">2021-08-09</span> <span className="pt-1 px-4"><AiTwotoneCalendar /></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border-2 border-[#f3f3f3] mt-5">
                                <div className="py-4 px-10 font-bold border-b-2 border-[#f3f3f3] pt-8">
                                    <span className="bg-[#DBEAFE] text-[#1C6AF4] px-4 rounded-[100px] py-1">WALLET HISTORY</span>
                                </div>
                                <div className="flex">

                                    <div className="w-2/12">
                                        <div className="flex justify-center pt-5">
                                            <div className="w-[42px] h-[40px]">
                                                <div className="bg-[#FFEFF0] p-3 rounded-full">
                                                    <BsArrowDownLeftCircle color="#D0000C" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center pt-5">
                                            <hr className="bg-[#E5E5E5] w-[1px] h-[130px]" />
                                        </div>
                    
                                    </div>
                                    <div className="w-10/12">
                                        <div className="pb-10">
                                            <h2 className="font-semibold text-[20px] py-1 pt-4">₦30,000 has been withdrawn from wallet </h2>
                                            <p className="pb-2 font-medium text-[14px]">wed,24 may by you</p>
                                            <div className="border-2 border-[#f3f3f3] rounded-lg flex text-center mt-5 w-10/12">
                                                <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                                    <p>Amount</p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">₦30,000</h2>
                                                </div>
                                                <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                                    <p>Interest rate</p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">0.4%</h2>
                                                </div>
                                                <div className="w-1/3 p-4 py-3">
                                                    <p>Duration </p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">7 days</h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                
                                <div className="flex">

                                    <div className="w-2/12">
                                        <div className="flex justify-center pt-5">
                                            <div className="w-[42px] h-[40px]">
                                                <div className="bg-[#DCFFE6] p-3 rounded-full">
                                                    <BsArrowUpRightCircle color="#087A2A" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center pt-5">
                                            <hr className="bg-[#E5E5E5] w-[1px] h-[130px]" />
                                        </div>
                    
                                    </div>
                                    <div className="w-10/12">
                                        <div className="pb-10">
                                            <h2 className="font-semibold text-[20px] py-1 pt-4">₦12,000 has been Repaid from your debit card </h2>
                                            <p className="pb-2 font-medium text-[14px]">wed,24 may by <span className="text-[#1C6AF4]">Payslice</span></p>
                                            <div className="border-2 border-[#f3f3f3] rounded-lg flex text-center mt-5 w-10/12">
                                                <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                                    <p>Amount</p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">₦30,000</h2>
                                                </div>
                                                <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                                    <p>Interest rate</p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">0.4%</h2>
                                                </div>
                                                <div className="w-1/3 p-4 py-3">
                                                    <p>Duration </p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">7 days</h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex">

                                    <div className="w-2/12">
                                        <div className="flex justify-center pt-5">
                                            <div className="w-[42px] h-[40px]">
                                                <div className="bg-[#CEEDFF] p-3 rounded-full">
                                                    <BsArrowDownLeftCircle color="#2A69AC" size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center pt-5">
                                            <hr className="bg-[#E5E5E5] w-[1px] h-[130px]" />
                                        </div>
                    
                                    </div>
                                    <div className="w-10/12">
                                        <div className="pb-10">
                                            <h2 className="font-semibold text-[20px] py-1 pt-4">₦12,000 has been Repaid from your debit card </h2>
                                            <p className="pb-2 font-medium text-[14px]">wed,24 may by <span className="text-[#1C6AF4]">you</span></p>
                                            <div className="border-2 border-[#f3f3f3] rounded-lg flex text-center mt-5 w-10/12">
                                                <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                                    <p>Amount</p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">₦30,000</h2>
                                                </div>
                                                <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                                    <p>Interest rate</p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">0.4%</h2>
                                                </div>
                                                <div className="w-1/3 p-4 py-3">
                                                    <p>Duration </p>
                                                    <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">7 days</h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Wallet;
