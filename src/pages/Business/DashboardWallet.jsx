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

const DashboardWallet = () => {
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
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Credit limit
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
                            Wallet Balance
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
                        <div>
                                <br />
                                <br />
                                <h2 className="p-2 font-semibold text-[#111111]/[0.9] ">Request Money and History</h2>
                                <hr />
                        </div>
                        <div>
                                <div className="block md:flex">
                                        <div className="w-full md:w-5/12">
                                                <div>
                                                        <h2 className="text-[24px] py-7 font-semibold capitalize">Upload Bank statement </h2>
                                                        <button className="bg-[#F4F5F7] px-10 py-5 mt-7 text-[#111]/[0.6] font-semibold w-full text-left rounded"> <img src="../../../upload_statement.png" alt="s" className="inline leading-10 pr-5" /> Upload Statement</button>
                                                </div>
                                        </div>
                                        <div className="w-full md:w-2/12">
                                                <h2 className="font-semibold text-center text-[23px] pt-7">Or</h2>
                                        </div>
                                        <div className="w-full md:w-5/12">
                                                <div>
                                                        <h2 className="text-[22px] py-7 font-semibold">Link account Details with MONO  </h2>
                                                        <p className="font-semibold text-[#111]/[0.6] pr-3 mb-8 capitalize">please connect your account to Mono for account statemtent and direct debit </p>
                                                        <Button buttonText="Connect bank " />
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardWallet;
