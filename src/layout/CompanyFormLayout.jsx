import React from 'react';
import CompanyRegSidebar from './CompanyRegSidebar';
import { OnboardMobileNav } from './OnboardMobileNav';

const CompanyRegLayout = ({ children }) => {
	return (
		<div className="overflow-x-hidden w-screen flex mobiles:block">
			<CompanyRegSidebar />
			<OnboardMobileNav />
			<main className="min-h-screen mobiles:p-6 max-w-full w-full overscroll-x-hidden mt-7 max-h-screen px-32 py-16  flex-1 overflow-y-auto mobiles:mt-20">
				{children}
			</main>
		</div>
	);
};

export default CompanyRegLayout;
