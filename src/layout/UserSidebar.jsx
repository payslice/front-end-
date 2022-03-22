import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SidebarItem from './SidebarItem.js';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { MdAnalytics } from 'react-icons/md';
import { HiBriefcase } from 'react-icons/hi';

const UserSidebar = () => {
	const [currentLocation, setCurrentLoacation] = useState('/');

	const history = useHistory();

	const { location } = history;

	useEffect(() => {
		setCurrentLoacation(location.pathname);
	}, [location.pathname]);

	return (
		<section className="h-screen max-h-screen sidebar sidebar_bg pt-8 overflow-y-auto overflow-x-hidden mobiles:hidden">
			<h1 className="mb-3 mobiles:px-1 mobiles:w-full pl-8">
				<img src={require('../assets/svgs/payslice-logo.svg').default} className="w-44 mobiles:w-full" alt="" />
			</h1>
			<div className="mt-16">
				<ul className="pl-8 mt-10">
					<SidebarItem currentPath={currentLocation} Icon={AiFillHome} path="/user/dashboard" caption="Dashboard" />

					<SidebarItem
						currentPath={currentLocation}
						Icon={MdAnalytics}
						path="/user/withdrawals"
						caption="Withdrawals"
					/>

					<SidebarItem
						currentPath={currentLocation}
						Icon={HiBriefcase}
						path="/user/attendance"
						caption="Time attendance"
					/>

					<SidebarItem currentPath={currentLocation} Icon={AiFillSetting} path="/user/settings" caption="Settings" />
				</ul>
			</div>
		</section>
	);
};

export default UserSidebar;
