import { Link } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../../assets/svgs/check.svg";

export const VerifyEmail = () => {
    return (
        <>
            <div className='flex flex-col justify-center h-full mx-auto text-center mobiles:w-full mobiles:block mobiles:mt-20 mobiles:p-0 mobiles:h-0'>
                <h1 className='text-[38px] 2xl:text-[42px] text-primary font-bold uppercase'>
                    Please check your email
                </h1>
                <CheckIcon className='my-[66.6px] mx-auto' />
                <div className='text-lg font-semibold text-gray-500 capitalize'>
                    Please check your email for verification
                </div>
                <div className='mt-1 text-sm text-gray-500'>
                    <span className='font-semibold'>
                        You can shoot us an email
                    </span>{" "}
                    <a href='mailto:Admin@payslicehq.com' className='font-bold'>
                        Admin@payslicehq.com
                    </a>
                </div>
                <Link to='/onboard/step1'>onboard step1</Link>
            </div>
        </>
    );
};
