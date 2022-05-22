/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { FaUserAlt, FaFolder } from 'react-icons/fa';
import { HiBriefcase } from 'react-icons/hi';
import { RiBankFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const CompanyRegSidebar = () => {
	const [currentLocation, setCurrentLoacation] = useState('/');

	const history = useHistory();

	const { location } = history;

	useEffect(() => {
		setCurrentLoacation(location.pathname);
	}, []);

	return (
		<section className="min-h-screen relative onboarding_sidebar auth_sidebar_bg overflow-hidden overflow-x-hidden mobiles:hidden z-30">
			<div className="pt-[123px] px-16">
				<div className="mb-3 mobiles:px-1 mobiles:w-full ">
					<Link to="/">
						<img
							src={require('../assets/svgs/payslice-logo.svg').default}
							className="w-44 mobiles:w-full mt-7 ml-10"
							alt=""
						/>
					</Link>
				</div>
				<ul className="mt-24">
					<SidebarItem
						currentPath={currentLocation}
						Icon={FaUserAlt}
						path="/onboard/step1"
						caption="Company Information "
					/>
					<SidebarItem
						currentPath={currentLocation}
						Icon={FaFolder}
						path="/onboard/step2"
						caption="Company Representative"
					/>
					<SidebarItem
						currentPath={currentLocation}
						Icon={HiBriefcase}
						path="/onboard/step3"
						caption="Company policy"
					/>
					<SidebarItem currentPath={currentLocation} Icon={RiBankFill} path="/onboard/step4" caption="Agreement" />
				</ul>
			</div>

			<div
				className="absolute transform scale-125 object-bottom laptops:bottom-0 -z-20"
				style={{ left: '120px', bottom: '-25px' }}
			>
				<div className="relative left-20">
					<img
						src={require('../assets/svgs/payslice-bg.svg').default}
						className="w-64 transform scale-125 laptops:scale-110 mobiles:w-full relative -z-20"
						alt=""
					/>
				</div>
			</div>
		</section>
	);
};

export default CompanyRegSidebar;
