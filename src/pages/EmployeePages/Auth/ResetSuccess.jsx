import React from 'react';
import successIcon from '../../assets/svgs/success.svg';

const ResetSuccess = () => {
	return (
		<div className="my-20 text-center">
			<div className="text-blue-600 text-[42px] font-semibold">Congratulations, Yes you did it</div>
			<img src={successIcon} alt="" className="mx-auto my-16" />

			<a href="/user/login">Click here login</a>
		</div>
	);
};

export default ResetSuccess;
