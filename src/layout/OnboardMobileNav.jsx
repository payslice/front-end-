import React, { useRef, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { FaUserAlt, FaFolder } from 'react-icons/fa';
import { HiBriefcase } from 'react-icons/hi';
import { RiBankFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const OnboardMobileNav = () => {
	const tdc = useRef();
	const [showMenu, setShowMenu] = useState(false);

	const menuItems = [
		{
			path: '/onboard/step1',
			Icon: FaUserAlt,
			name: 'Onboarding',
		},
		{
			path: '/onboard/step2',
			Icon: FaFolder,
			name: 'Representative',
		},
		{
			path: '/onboard/step3',
			Icon: HiBriefcase,
			name: 'Company policy',
		},
		{
			path: '/onboard/step4',
			Icon: RiBankFill,
			name: 'Agreement',
		},
	];
	return (
		<div
			ref={tdc}
			//   style={{ position: "relative", left: "" }}
			className={`relative my-auto hidden mobiles:block pt-5  bg-white mobiles:fixed ${
				!showMenu ? 'px-6 w-full' : 'h-full sidebar_bg'
			}`}
		>
			{!showMenu && (
				<RiMenuLine
					className="text-3xl"
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				/>
			)}

			{showMenu && (
				<div className="relative h-full w-full px-4">
					<div className="mt-20">
						<Link to="/dashboard">
							<img
								src={require('../assets/svgs/payslice-logo.svg').default}
								width="136"
								height="25.72"
								alt="Payslice logo"
								className="mx-auto"
							/>
						</Link>
					</div>
					<div className="px-4 mt-16">
						{menuItems?.map((item) => {
							return (
								<div className="mb__menu-item my-2">
									<NavLink
										to={item.path}
										activeClassName="sidebar_active rounded"
										className="flex px-5 h-[43px]"
										onClick={() => setShowMenu(false)}
									>
										<item.Icon fill="#FFFFFF" className="my-auto" />{' '}
										<div className="text-white text-sm font-normal my-auto text-[15px] pl-4">{item.name}</div>
									</NavLink>
								</div>
							);
						})}
					</div>
					<div className="absolute object-bottom flex items-center bottom-28 ml-8" onClick={() => setShowMenu(false)}>
						<MdArrowBackIosNew fill="#FFFFFF" className="my-auto" />{' '}
						<div className="text-white text-sm my-auto ml-2">Collapse Panel</div>
					</div>
				</div>
			)}
		</div>
	);
};
