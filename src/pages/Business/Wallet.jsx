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
    businessCheckStatements,
    businessAccountDetails,
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
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineElectricBolt } from "react-icons/md";
import { BsArrowDownLeftCircle, BsArrowUpRightCircle, BsPhoneVibrate } from "react-icons/bs";
import {TransactionStatusFail, TransactionStatusNeutral, TransactionStatusSuccess} from '../../components/TransactionStatus'
import { SiDataverse, SiDocsdotrs } from "react-icons/si";import { FcElectricity } from "react-icons/fc";
import { WalletIconText } from "../../components/WalletIconText";
import Calender from "../../components/Calender";



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
    const [loading, setloading] = useState(false);
    const [accountDetails, setaccountDetails] = useState();
    const [totalTransaction, setTotalTransaction] = useState(); 

    const [startDate, setstartDate] = useState();
    const [endDate, setEndDate] = useState(); 
    console.log(startDate)
    console.log(user);

    const token = getTokenFromStorage();

    const history = useHistory();
    
        // const options = {
        // method: "GET",
        // headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json", "Accept": "application/json"},
        // // body: JSON.stringify({...formData, employee_id: employeeIdState})
        // }

    // const options = {
    //     method: 'GET',
    //     headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json", "Accept": "application/json"},
    //     body: JSON.stringify({"account_number":'9978731747'})
    // }
    // const businessTransactionsApiFetch = () => {
    //     return fetch("https://dev.app.payslices.com/api/business/account/statements", options).then(res => res.json());
    // }
    // console.log(businessTransactionsApiFetch)

    const businessAccount = async () => {
        setloading(true)
        try {
            // const res2 = await axios.get("https://dev.app.payslices.com/api/business/account/statements", options).then(res => console.log(res))
            // const res = await fetch("https://dev.app.payslices.com/api/business/account/statements", options).then(res => res.json());
            // console.log("passed fetch business account")
            // console.log(res2)
            const {data} = await businessAccountDetails();
            setTotalTransaction(data.data.recent_transactions)
            // console.log(res2.data)
        
            if (data.status) {
                toast.success(data.message)
                setaccountDetails(data.data)
                setloading(false);
            }
            else {
                toast.error(data.message)
                setloading(false);
            }
        } catch (error) {
            toast.error(error)
            setloading(false);
        }
        finally {
            setloading(false);
        } 
    };
    const businesscheckstatements = async () => {
        try {
            const {data} = await businessCheckStatements(
                {account_number: accountDetails?.main_account.account_number, from: startDate, to: endDate}
            );
            console.log("business check statements")
            console.log(data)
            if(data.status) {
                console.log("business check statements")
                console.log(data)
            }
            else {

            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    useEffect(() => {
        
        businessAccount()
        businesscheckstatements()
    }, []);


    return (
        <div>
            <div className='mt-10 lg:mt-0 cards'>
                <div className='flex mobiles:block'>
                    <div className="w-full md:w-5/12">
                        <div>
                            <div className="bg-[#E8E8E8]/[0.3] rounded px-10 py-5 mb-5">
                                <p>Payslice Wallet</p>
                                <h2 className="text-[#111111]/[0.9] font-bold py-3 text-[31px]">NGN {accountDetails?.main_account.balance}</h2>
                                <p className="text-sm text-[#111111]/[0.6] font-semibold pb-1">Virtual Account</p>
                                <div className="font-semibold text-[#111111]/[0.6] text-[18px]">
                                    <p>Acc. No:  {accountDetails?.main_account.account_number}</p>
                                    <p>Acc. Name:  {accountDetails?.main_account.name}</p>
                                    <p>Bank: Payslice</p>
                                    {/*<p>Bank:  {accountDetails.main_account.bank ? accountDetails?.main_account.bank : 'Payslice'}</p>*/}
                                </div>
                            </div>
                            <div className="mb-4">
                                <Button buttonText="Send to beneficiary" fullwidth />
                            </div>
                            <div>
                                <Button buttonText="Transfer to Others " fullwidth inverted onClick={() => history.push('/business/wallets/transfer')} />
                            </div>
                            <br />
                            <div>
                                <div className="flex relative overflow-auto">
                                    <WalletIconText title="Airtime" onclick={() => history.push(`/business/wallets/airtime`)}>
                                        <BsPhoneVibrate size={25} color="#737A91" />
                                    </WalletIconText>
                                    <WalletIconText title="Data" onclick={() => history.push(`/business/wallets/data`)}>
                                        <TfiWorld size={25} color="#737A91" />
                                    </WalletIconText>
                                    <WalletIconText title="Electricity" onclick={() => history.push(`/business/wallets/electricity`)}>
                                        <MdOutlineElectricBolt size={25} color="#737A91" />
                                    </WalletIconText>
                                </div>
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
                                        {/*<div className="flex pt-3 font-bold"><span className="text-[18px]">2021-08-09</span> <span className="pt-1 px-4"><AiTwotoneCalendar /></span></div>*/}
                                        <input
                                            type="date"
                                            className="mb-5"
                                            onChange={(e) => setstartDate(e.target.value)}
                                            
                                        />
                                        <Button buttonText={"check"} disable={!startDate || !endDate} disabled={!startDate || !endDate} onClick={() => businesscheckstatements()} />
                                    </div>
                                    <div className="w-1/2 text-[#111111]/[0.7] pl-5">
                                        <span className="font-medium">To</span>
                                        {/*<div className="flex pt-3 font-bold"><span className="text-[18px]">2021-08-09</span> <span className="pt-1 px-4"><AiTwotoneCalendar /></span></div>*/}
                                        <input
                                            type="date"
                                            className="mb-5"
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                        <Button buttonText={"Download"} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border-2 border-[#f3f3f3] mt-5 ">
                                <br />
                                <div className="border-b-2 border-[#f3f3f3] pb-5">
                                    <span className="bg-[#DBEAFE] text-[#1C6AF4] px-4 rounded-[100px] py-1 ml-5">WALLET HISTORY</span>
                                </div>
                                <div className="py-4 px-10 font-bold border-b-2 border-[#f3f3f3] pt-8 overflow-auto h-[600px]">
                                    {
                                    loading
                                    ?
                                    <div className='flex items-center justify-center h-full'>
                                        <svg
                                            role='status'
                                            className='inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600'
                                            viewBox='0 0 100 101'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                                fill='currentColor'
                                            />
                                            <path
                                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                                fill='currentFill'
                                            />
                                        </svg>
                                    </div>
                                    :
                                    <>
                                        {
                                            totalTransaction?.length === 0
                                            ?
                                            "No recent Transaction"
                                            :
                                            <>
                                                {totalTransaction?.map(e => (
                                                    e.type === 'debit' 
                                                    ?
                                                    <TransactionStatusFail name={e.sourceAccountName} message={e.tranRemarks} date={e.tranDateTime} statusKind="negative"  balance={Math.trunc(e.transactionAmount)} />
                                                    :
                                                    e.type === 'credit'
                                                    ?
                                                    <TransactionStatusFail message={e.tranRemarks} date={e.tranDateTime} statusKind="positive" rate="0.4" day="7"  balance={Math.trunc(e.transactionAmount)} />
                                                    :
                                                    <TransactionStatusFail message={e.tranRemarks} date={e.tranDateTime} statusKind="negative" rate="0.4" day="7"  balance={Math.trunc(e.transactionAmount)} />
                                                ))}
                                                {/*
                                                <TransactionStatusSuccess message="₦30,000 has been withdrawn from wallet" date="wed,24 may" statusKind="neutral" balance="30,000" />
                                                <TransactionStatusSuccess message="₦30,000 has been withdrawn from wallet" date="wed,24 may" statusKind="positive"  balance="30,000" />
                                                <TransactionStatusNeutral message="₦30,000 has been withdrawn from wallet" date="wed,24 may" statusKind="negative" rate="0.4" day="7"  balance="30,000" />
                                                <TransactionStatusNeutral message="₦30,000 has been withdrawn from wallet" date="wed,24 may" statusKind="neutral" balance="30,000" />
                                                */}
                                            </>

                                        }
                                    </>
                                    
                                    }

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
