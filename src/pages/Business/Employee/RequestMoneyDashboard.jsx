/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback,useContext } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import styled from 'styled-components'
import { toast } from "react-toastify";
import {
    payrollGetStatsApi,
    payrollEmployeeListApi,
    payrollDeleteRow,
    businessRequestMoneyHistoryApi,
    businessAccountDetails
} from "../../../utils/ApiRequests";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { persistSelector } from "../../../slices/persist";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import { AiOutlineSearch, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { DotLoader } from "../../../components/Loaders/DotLoader";
import MiniLoader from "../../../components/Loaders/MiniLoader";
import { useTable, usePagination, useRowSelect, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import {AiOutlineUpload}  from 'react-icons/ai'
import {BsPlusLg}  from 'react-icons/bs'
import {GiPencil}  from 'react-icons/gi'
import {RiDeleteBinLine}  from 'react-icons/ri'
import {UpdateEmployeeContext} from '../../../routes/BusinessRoutes'
import { InputField } from "../../../components/Input";
import { TransactionStatusNeutral, TransactionStatusSuccess, TransactionStatusFail, TransactionStatusPending } from "../../../components/TransactionStatus";
import FullLoader from "../../../components/Loaders/FullLoader";
// import matchSorter from 'match-sorter'




const RequestMoneyDashboard = () => {
    const { user } = useSelector(persistSelector);
    const [policyResponse, setPolicyResponse] = useState();
    const [acceptedEmployees, setAcceptedEmployees] = useState();
    const [paymentLogs, setPaymentLogs] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [clockInData, setClockInData] = useState();
    const [clockOutData, setClockOutData] = useState();
    const [submitting, setSubmitting] = useState()
    const [payrollState, setpayrollState] = useState()
    const [payrollEmployeeState, setpayrollEmployeeState] = useState({})
    const [payrollEmployeeState2, setpayrollEmployeeState2] = useState()
    const [requestHistoryState, setrequestHistoryState] = useState([])
    const [requestHistoryLoading, setrequestHistoryLoading] = useState(false)
    const [accountDetails, setaccountDetails] = useState();
    const [loading, setloading] = useState(false);
    const [totalTransaction, setTotalTransaction] = useState();   

    const history = useHistory();

    
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
                // toast.success(data.message)
                setaccountDetails(data.data)
                setloading(false);
            }
            else {
                // toast.error(data.message)
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


    const totalDue = paymentLogs
        ?.filter(data => typeof data.amount_remaining == "string")
        .reduce(
            (acc, num) => parseInt(acc) + parseInt(num.amount_remaining),
            0
        );
        
  const businessRequestMoneyHistory = async () => {
    setrequestHistoryLoading(true);
    try {
        const {data} = await businessRequestMoneyHistoryApi();

        console.log(data.data)
        
        if (data.status) {
            // toast.success(data.message)
            setrequestHistoryState(data.data)
            setrequestHistoryLoading(false);
        }
        else {
            // toast.error(data.message)
            setrequestHistoryLoading(false);
        }

    } catch (error) {
        // toast.error(error)
        setrequestHistoryLoading(false);
    }
    finally {
        setrequestHistoryLoading(false);
    } 
}

useEffect(() => {
    businessRequestMoneyHistory()
    businessAccount()
    
}, [])

    return (
        <div>
            <div className='mt-10 lg:mt-0 cards'>
                
                <div>
                        {/*
                
                        <div className="block md:flex justify-between">
                        
                                <h2 className="font-semibold text-[21px] tracking-wide pb-10 md:pb-0">Employees payroll Report</h2>
                                <Button buttonText="schedule payout" />
                        </div>
                        
                        */}

                </div>

                
                <div className="flex mobiles:block">
                        
                        <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Credit limit
                        </p>
                        <p className='flex mt-2 text-sm font-light'>This Month</p>
                        <h4 className='text-[28px] font-bold mt-1.5'>NGN {accountDetails?.credit_limit}</h4>
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Wallet Balance
                        </p>
                        <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                            Today
                        </p>
                        <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                            NGN {accountDetails?.main_account.balance}
                            <span
                                className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                onClick={() => history.push("#")}>
                                {/*Manage{" "}*/}
                                
                            </span>
                        </h4>
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Upcoming payments
                        </p>
                        <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                        NGN {accountDetails?.upcoming_payments.due_date}
                        </p>
                        <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                            {accountDetails?.upcoming_payments.amount}
                            <span
                                className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                onClick={() => history.push("/payments")}>
                                Repay now
                            </span>
                        </h4>
                    </div>
                </div>
                

                {/*
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
                */}
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
                                    <div className="w-full md:w-6/12">
                                            <div className="overflow-auto h-[400px]">


                                            {
                                                requestHistoryState.length === 0
                                                ?
                                                <FullLoader />
                                                :
                                                requestHistoryState.map((e) => (
                                                        <div key={e.created_at}>
                                                                {
                                                                        e.status === 'disapproved'
                                                                        ?
                                                                        <TransactionStatusFail message={e.title} date={e.created_at} statusKind="neutral" balance={e.amount} />
                                                                        :
                                                                        e.status === 'approved'
                                                                        ?
                                                                        <TransactionStatusSuccess message={e.title} date={e.created_at} statusKind="neutral" balance={e.amount} />
                                                                        :
                                                                        e.status === 'unattended'
                                                                        ?
                                                                        <TransactionStatusPending message={e.title} date={e.created_at} statusKind="neutral" balance={e.amount} />
                                                                        :
                                                                        <TransactionStatusNeutral message={e.title} date={e.created_at} statusKind="neutral" balance={e.amount} />
                                                                }
                                                        </div>
                                                ))      
                                        }

                                                {/*
                                                        <div>
                                                                <InputField
                                                                        required
                                                                        label="RC Number"
                                                                        placeholder="E.g RC 50505"
                                                                        value=""
                                                                        type="email"
                                                                        name="email"
                                                                //     onChange={(e) => handlePasswordChange(null, e)}
                                                                />
                                                                <InputField
                                                                        required
                                                                        label="Float  Amount (in naira)"
                                                                        placeholder="Amount "
                                                                        value=""
                                                                        type="email"
                                                                        name="email"
                                                                //     onChange={(e) => handlePasswordChange(null, e)}
                                                                />
                                                                <InputField
                                                                        required
                                                                        label="Float  Duration"
                                                                        value=""
                                                                        type="email"
                                                                        name="email"
                                                                //     onChange={(e) => handlePasswordChange(null, e)}
                                                                />
                                                        
                                                        </div>
                                                    */}
                                            </div>
                                    </div>
                                    <div className="w-full md:w-2/12">
                                    </div>
                                    <div className="w-full md:w-6/12">
                                            {/*
                                    
                                            <h2 className="text-[22px] py-7 font-semibold capitalize">Float Details </h2>
                                            <div>
                                            <InputField
                                                    required
                                                    label="Float  Repayment Type"
                                                    placeholder="E.g RC 50505"
                                                    value=""
                                                    type="email"
                                                    name="email"
                                            //     onChange={(e) => handlePasswordChange(null, e)}
                                            />
                                            <span>upload  statement </span>
                                            <button className="bg-[#F4F5F7] px-10 py-5 mt-7 text-[#111]/[0.6] font-semibold w-full text-left rounded"> <img src="../../../upload_statement.png" alt="s" className="inline leading-10 pr-5" /> Upload Statement</button>
                                            <InputField
                                                    label="PDF Password(if available)"
                                                    placeholder="Enter password optional "
                                                    value=""
                                                    type="email"
                                                    name="email"
                                            //     onChange={(e) => handlePasswordChange(null, e)}
                                            />

                                            </div>
                                        */}
                                    </div>
                            </div>
                    </div>
                    <div className="flex justify-end align-right">
                            {/*
                                <Button buttonText="Next" />
                            */}
                    </div>
            </div>

        </div>
    );
};

export default RequestMoneyDashboard;
