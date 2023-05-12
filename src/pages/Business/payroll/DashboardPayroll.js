/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback,useContext } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { toast } from "react-toastify";
import {
    payrollGetStatsApi,
    payrollEmployeeListApi,
    payrollDeleteRow,
    businessPayrollMarkStatusApi
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
import { Styles } from "../../../components/Styles";
import EarnasPayroll from './EarnasPayroll'
import PayrollHistory from './PayrollHistory'


const DashboardPayroll2 = () => {
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
        const [tabState, setTabState] = useState('emp_pay')
        const history = useHistory();
        
    
        return (
                <div>
                    <div className='mt-10 lg:mt-0 cards'>
                        
                        <div>
                                <div className="block md:flex justify-between">
                                
                                        <h2 className="font-semibold text-[21px] tracking-wide pb-10 md:pb-0">Employees payroll Report</h2>
                                        <Button buttonText="schedule payout" onClick={history.push('/business/payroll')} />
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
                                            <p className='flex mt-2 text-sm font-light'>
                                            {/*
                                            {`${new Date(
                                                policyResponse?.updated_at
                                            ).toLocaleString("default", {
                                                month: "long",
                                            })} ${new Date(
                                                policyResponse?.updated_at
                                            ).getFullYear()} `}
                                            */}
                                            This Month
                                            </p>
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
                                            {/*
                                            {`${new Date(
                                                policyResponse?.updated_at
                                            ).toLocaleString("default", {
                                                month: "long",
                                            })} ${new Date(
                                                policyResponse?.updated_at
                                            ).getFullYear()} `}
                                          */}
                                            This Month
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
                                                onClick={() => {/*history.push("/employee")*/}}
                                                >
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
                                                    onClick={() => {/*history.push("/payments")*/}}>
                                                    Repay now
                                                </span>
                                            </h4>
                                        </>
                                    )
        
                                }
                            </div>
                        </div>
                        {/*
                        <div>
                                <div className="block md:flex justify-between pt-16">
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
        
                        {/*
                        <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pt-20">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                                        <li className={`mr-2`} onClick={() => setTabState('emp_pay')}>
                                                <button className={`${tabState === 'emp_pay' && 'bg-[#1c6af4] text-white'} inline-block p-4 border-b-2  border-transparent rounded-t-lg hover:bg-[#1c6af4] hover:text-white hover:border-gray-300 dark:hover:text-gray-300 `} type="button">Employee Payroll</button>
                                        </li>
                                        <li className="mr-2" onClick={() => setTabState('earn_as')}>
                                                <button className={`${tabState === 'earn_as' && 'bg-[#1c6af4] text-white'} inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#1c6af4] hover:text-white hover:border-gray-300 dark:hover:text-gray-300 `} type="button">Earn as you go</button>
                                        </li>
                                        <li className="mr-2" onClick={() => setTabState('pay_history')}>
                                                <button className={`${tabState === 'pay_history' && 'bg-[#1c6af4] text-white'} inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#1c6af4] hover:text-white hover:border-gray-300 dark:hover:text-gray-300 `} type="button">Payroll History</button>
                                        </li>
                                </ul>
                        </div>
                */}
                        {/*
                        <div>
                                {
                                        tabState === 'emp_pay'
                                        ?
                                        (
                                                <>
        
                                                <div className="pt-10">   
                                                <h2 className="font-bold text-[18px]">Employee's List</h2>
                                                        <div className="w-full">
                                                            <Styles>
                                                                {
                                                                    payrollEmployeeState2
                                                                    &&
                                                                    payrollEmployeeState2.length !== 0
                                                                    &&
                                                                    <Table columns={columns22} data={payrollEmployeeState2} />
                                                                }
                                                            </Styles>
                                                        </div>
                                                
                                                </div>
        
                                                </>
                                        )
                                        :
                                        tabState === 'earn_as'
                                        ?
                                        (
                                                <>
                                                        <EarnasPayroll />
                                                </>
                                        )
                                        :
                                        (
                                                <>
                                                        <PayrollHistory />
                                                
                                                </>
                                        )
        
                                }
                        </div>
                        */}
        
                    </div>
        
                </div>
        )
}

export default DashboardPayroll2