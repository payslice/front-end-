/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import Team from "../assets/svgs/Team";
// import Settings from "../assets/svgs/Settings";
// import Logout from "../assets/svgs/Logout";
// import Contact from "../assets/svgs/Contact";
import SidebarItem from './SidebarItem.js';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { FaCommentDots, FaFolder } from 'react-icons/fa';
import { MdAnalytics } from 'react-icons/md';
import { HiBriefcase } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// import { FaCommentDots } from 'react-icons/fa';

const Sidebar = () => {
	const [currentLocation, setCurrentLoacation] = useState('/');

	const history = useHistory();

	const { location } = history;

	useEffect(() => {
		setCurrentLoacation(location.pathname);
	}, []);

	return (
		<section className="h-screen max-h-screen w-[256px] sidebar_bg pt-[78px] overflow-y-auto overflow-x-hidden mobiles:hidden">
			<h1 className="mb-3 mobiles:px-1 mobiles:w-full">
				<Link to="/dashboard">
					<img
						src={require('../assets/svgs/payslice-logo.svg').default}
						width="136"
						height="25.72"
						alt="Payslice logo"
						className="mx-auto"
					/>
				</Link>
			</h1>
			<div className="mt-24">
				<ul className="px-8 mt-10">
					<SidebarItem currentPath={currentLocation} Icon={AiFillHome} path="/dashboard" caption="Dashboard" isDb />
					<SidebarItem currentPath={currentLocation} Icon={FaFolder} path="/employee" caption="Employees" isDb />
					<SidebarItem
						currentPath={currentLocation}
						Icon={MdAnalytics}
						path="/withdrawals"
						caption="Withdrawals"
						isDb
					/>

					<div className="border-white border-b-2 w-10 mb-3 mt-3 ml-[26px]"></div>
					<SidebarItem currentPath={currentLocation} Icon={HiBriefcase} path="/payments" caption="Payments" isDb />
					<div className="border-white border-b-2 w-10 mt-3 mb-4 ml-[26px]"></div>
					<SidebarItem currentPath={currentLocation} Icon={FaCommentDots} path="/support" caption="Support" isDb />
					<SidebarItem currentPath={currentLocation} Icon={AiFillSetting} path="/settings" caption="Settings" isDb />
				</ul>
			</div>
			{/* <div className="mt-8">
        <h6 className="mt-6 mobiles:px-2 mb-6 t_black font-bold small_mobile_text pl-8">
          General
        </h6>
        <ul className="pl-8">
          <SidebarItem
            currentPath={currentLocation}
            Icon={Settings}
            path="/settings"
            caption="Settings"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={Team}
            path="/team"
            caption="Team"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={Contact}
            path="/contact"
            caption="Contact"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={Logout}
            path="/logout"
            caption="Logout"
          />
        </ul>
      </div> */}
		</section>
	);
};

export default Sidebar;
