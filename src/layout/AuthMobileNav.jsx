import React from 'react';
import { Link } from 'react-router-dom';

export const AuthMobileNav = () => {
	return (
		<div className="auth__mb-nav hidden mobiles:block pt-8 px-6 pb-5 w-full bg-white fixed">
			<Link to="/">
				<img
					src={require('../assets/svgs/payslice-brand-id.svg').default}
					width="142"
					height="72"
					alt="payslice-logo"
				/>
			</Link>
		</div>
	);
};
