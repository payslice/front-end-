import React from 'react';
import successIcon from '../../assets/svgs/success.svg';

const OnboardSuccess = () => {
	return (
		<div className="my-20 text-center">
			<div className="text-blue-600 text-[42px] font-semibold">Congratulations, Yes you did it</div>
			<img src={successIcon} alt="" className="mx-auto my-16" />
			<p className="text-gray-400 text-lg font-medium mb-0 capitalize">
				A member of our team will reachout to you with 3 - 5 days{' '}
			</p>
			<small className="text-gray-400 text-sm font-medium capitalize">
				you can shoot us an email Info@payslicehq.com
			</small>
		</div>
	);
};

export default OnboardSuccess;
