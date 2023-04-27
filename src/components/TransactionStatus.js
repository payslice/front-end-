import { BsArrowDownLeftCircle, BsArrowUpRightCircle } from "react-icons/bs"


export const TransactionStatusFail = ({message, date, statusKind, rate, day,  balance}) => (
    
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
                    <h2 className="font-semibold text-[20px] py-1 pt-4">{message} </h2>
                        <p className="pb-2 font-medium text-[14px]">{date} by you</p>
                    <p className="pb-2 font-medium text-[14px]">{date} by you</p>
                    <div className="border-2 border-[#f3f3f3] rounded-lg flex text-center mt-5 w-10/12">
                            <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                <p>Amount</p>
                                <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">₦{balance}</h2>
                            </div>
                            <div className="w-1/3 p-4 py-3 border-r-2 border-[#f3f3f3]">
                                <p>Interest rate</p>
                                <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">{rate}%</h2>
                            </div>
                            <div className="w-1/3 p-4 py-3">
                                <p>Duration </p>
                                <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">{day} days</h2>
                            </div>
                                
                    </div>
                </div>
            </div>
        </div>
    )


    export const TransactionStatusSuccess = ({message, date, statusKind, rate, day,  balance}) => (
        
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
                    <h2 className="font-semibold text-[20px] py-1 pt-4">{message} </h2>
                        <p className="pb-2 font-medium text-[14px]">{date} by you</p>
                    <p className="pb-2 font-medium text-[14px]">{date} by you</p>
                    <div className="border-2 border-[#f3f3f3] rounded-lg flex text-center mt-5 w-10/12">
                            <div className="w-1/3 p-4 py-3 text-left">
                                <p>Balance </p>
                                <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">₦{balance}</h2>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
    
export const TransactionStatusNeutral = ({message, date, statusKind, rate, day,  balance}) => (
        
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
                    <h2 className="font-semibold text-[20px] py-1 pt-4">{message} </h2>
                        <p className="pb-2 font-medium text-[14px]">{date} by <span className="text-[#1C6AF4]">Payslice</span></p>
                    <p className="pb-2 font-medium text-[14px]">{date} by you</p>
                    <div className="border-2 border-[#f3f3f3] rounded-lg flex text-center mt-5 w-10/12">
                            <div className="w-1/3 p-4 py-3 text-left">
                                <p>Balance </p>
                                <h2 className="font-bold text-[#111111]/[0.7] text-[16px] md:text-[20px]">₦{balance}</h2>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
    