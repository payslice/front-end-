import React, { useEffect, useState } from "react";
import { businessRequestMoneyHistoryApi, payrollGetStatsApi } from "../../../utils/ApiRequests";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { TransactionStatusNeutral, TransactionStatusSuccess, TransactionStatusFail, TransactionStatusPending } from "../../../components/TransactionStatus";
import FullLoader from "../../../components/Loaders/FullLoader";



const RequestMoneyHistory = () => {
    const [submitting, setSubmitting] = useState(false);
  const [payrollState, setpayrollState] = useState()
  const [requestHistoryState, setrequestHistoryState] = useState([])
  const [requestHistoryLoading, setrequestHistoryLoading] = useState(false)

  const history = useHistory()
  


  const payrollGetStats = async () => {
        setSubmitting(true);
        try {
            const {data} = await payrollGetStatsApi();

            if (data.status) {
                // toast.success(data.message)
                setpayrollState(data.data)
                setSubmitting(false);
            }
            else {
                // toast.error(data.message)
                setSubmitting(false);
            }

        } catch (error) {
            // toast.error(error)
            setSubmitting(false);
        }
        finally {
            setSubmitting(false);
        } 
    }
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
        payrollGetStats()
        businessRequestMoneyHistory()
        
    }, [])


  return (
        <>
        <div
                className="w-full mt-0 flex flex-col justify-center font-bold withdraww"
                style={{ color: "rgba(17, 17, 17, 0.6)" }}>
                
                        <div className="flex w-full flex-col md:flex-row">
                        
                                <div className='w-full md:w-1/2  h-[142px] mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                                        <p className='text-lg font-bold text-gray-600'>
                                                Credit limit
                                        </p>
                                        <p className='flex mt-2 text-sm font-light'>This Month</p>
                                        <h4 className='text-[28px] font-bold mt-1.5'>NGN {payrollState?.payroll_size}</h4>
                                </div>
                                <div className='w-full md:w-1/2 h-[142px] mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                                        <p className='text-lg font-bold text-gray-600'>
                                                Upcoming Credit Payment
                                        </p>
                                        <p className='flex mt-2 text-sm font-light'>This Month</p>
                                        <h4 className='text-[28px] font-bold mt-1.5'>NGN {payrollState?.upcoming_payment}</h4>
                                </div>
                        </div>

                        <br />
                        <br />

                        <hr className="bg-black" />
                        
                        <div> 
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
                                                        <TransactionStatusFail message={e.title} date="wed,24 may" statusKind="neutral" balance="30,000" />
                                                        :
                                                        e.status === 'approved'
                                                        ?
                                                        <TransactionStatusSuccess message={e.title} date="wed,24 may" statusKind="neutral" balance="30,000" />
                                                        :
                                                        e.status === 'unattended'
                                                        ?
                                                        <TransactionStatusPending message={e.title} date="wed,24 may" statusKind="neutral" balance="30,000" />
                                                        :
                                                        <TransactionStatusNeutral message={e.title} date="wed,24 may" statusKind="neutral" balance="30,000" />
                                                }
                                        </div>
                                ))      
                        }
                                                
                        </div>

        </div>
        </>
  )
}

export default RequestMoneyHistory
