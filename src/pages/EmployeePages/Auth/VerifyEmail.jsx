import { ReactComponent as CheckIcon } from '../../../assets/svgs/check.svg';

export const VerifyEmail = () => {
	return (
		<>
			<div className="flex flex-col h-full justify-center mobiles:w-full mobiles:block mobiles:mt-20 mobiles:p-0 mobiles:h-0 text-center mx-auto">
				<h1 className="text-[38px] 2xl:text-[42px] text-primary font-bold uppercase">Please check your email</h1>
				<CheckIcon className="my-[66.6px] mx-auto" />
				<div className="text-gray-500 font-semibold text-lg capitalize">Please check your email for verification</div>
				<div className="text-gray-500 text-sm mt-1">
					<span className="font-semibold">You can shoot us an email</span>{' '}
					<a href="mailto:Admin@payslicehq.com" className="font-bold">
						Admin@payslicehq.com
					</a>
				</div>
			</div>
		</>
	);
};
