import React, { useRef, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { useClickOutside } from '../hooks/useClickOutside';
import { FaFolder } from 'react-icons/fa';
import { HiBriefcase } from 'react-icons/hi';
import { NavLink, useLocation } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { MdAnalytics } from 'react-icons/md';
import { FaCommentDots } from 'react-icons/fa';
import { persistSelector } from '../slices/persist';
import { useSelector } from 'react-redux/es/exports';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { removeTokenFromStorage, removeUserDataFromStorage } from '../utils/ApiUtils'

export const DahboardMobileNav = () => {
	const tdc = useRef();
	const [showMenu, setShowMenu] = useState(false);
	const [show, setShow] = useState(false);

	const { user } = useSelector(persistSelector)

	useClickOutside(tdc, () => {
		setShowMenu(false);
	});

	const location = useLocation();
	const isEmployee = location?.pathname?.includes('user');

	const history = useHistory()

	const menuItems = [
		{
			path: '/dashboard',
			Icon: AiFillHome,
			name: 'Dashboard',
		},
		{
			path: '/employee',
			Icon: FaFolder,
			name: 'Employees',
		},
		{
			path: '/withdrawals',
			Icon: MdAnalytics,
			name: 'Withdrawals',
		},
		{
			path: '/payments',
			Icon: HiBriefcase,
			name: 'Payments',
		},
		{
			path: '/legal-info',
			Icon: FaCommentDots,
			name: 'Support',
		},
		{
			path: '/settings',
			Icon: AiFillSetting,
			name: 'Settings',
		},
	];

	const userMenuList = [
		{
			path: '/user/dashboard',
			Icon: AiFillHome,
			name: 'Dashboard',
		},
		{
			path: '/user/withdrawals',
			Icon: MdAnalytics,
			name: 'Withdrawals',
		},
		{
			path: '/user/Wallets',
			Icon: HiBriefcase,
			name: 'wallets',
		},
		{
			path: '/user/settings',
			Icon: AiFillSetting,
			name: 'Settings',
		},
	];

	const activeMenuList = isEmployee ? userMenuList : menuItems;

	const handleLogout = () => {
		history.push('/user/login')
		removeTokenFromStorage()
		removeUserDataFromStorage()
	}

	return (
		<div
			ref={tdc}
			//   style={{ position: "relative", left: "" }}
			className={` usernavbar_responsiveness w-3/5 relative z-10 my-auto hidden mobiles:block pt-8  pb-5  bg-white mobiles:fixed `}
			id="usernavbar_responsiveness"
			// style={{npm 
			// 	display: "flex",
			// 	width: "100%",
			// 	justifyContent: "space-between"
			// }}
		>
			<div className='w-full flex justify-between px-5'>
				<RiMenuLine
					style={{ fontSize: '28px' }}
					// className={!showMenu ? 'block' : 'hidden'}
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				/>

				{
					/*
					
						<div>
							<button className="text-white font-bold py-1 px-3 rounded" style={{background: "#D0000C"}}>
								0
							</button>
						</div>
					*/
				}
				<div
					onClick={() => setShow(!show)}
					className="flex items-center bg-gray-100 rounded w-[196px] h-[61px] pl-4 cursor-pointer"
				>
					<img
						src={require('../assets/imgs/user-payslice.jpg')}
						alt="notification"
						width="38"
						height="41"
						className="object-cover"
					/>
					<div className="text-gray-400 my-auto ml-2">
						<h3 className="text-base font-semibold text-gray-400 mb-0 truncate w-20">{`${user?.first_name} ${user?.last_name}`}</h3>
						<p className="font-light text-[10px] mb-0 capitalize">{user?.section} account</p>
					</div>
					<MdKeyboardArrowDown className="my-auto w-5 h-5 ml-3 text-[#737A91]" />
				</div>


				
				{show && (
					<div className="bg-white z-10 w-24 mr-6 border-gray-200 text-left rounded text-xs absolute right-14 top-20 shadow-xl font-semibold">
						<div className="hover:bg-gray-100  py-3 px-4 border-gray-200 cursor-pointer text-base" onClick={handleLogout}>
							Logout
						</div>
					</div>
				)}


			
			</div>
			<div className=''>
			
				{
					showMenu 
					&&
					(
					<div className={`absolute h-full px-4 ${
					!showMenu ? 'w-full px-6' : 'h-full sidebar_bg'
				}`}
					style={{
						top: 0,
						height: '100vh'
					}}
				>
						<div className="mt-10">
							<img src={require('../assets/svgs/payslice-logo.svg').default} className="w-3/4 pb-12 " alt="" />
						</div>
						{activeMenuList?.map((item) => {
							return (
								<div className="mb__menu-item my-2 ">
									<NavLink
										to={item.path}
										activeClassName="sidebar_active rounded"
										className="flex p-2"
										onClick={() => setShowMenu(false)}
									>
										<item.Icon fill="#FFFFFF" className="my-auto" />{' '}
										<div className="text-white font-normal my-auto ml-3">{item.name}</div>
									</NavLink>
								</div>
							);
						})}
						<div
							className="absolute object-bottom flex"
							style={{ bottom: '100px', left: '12px' }}
							onClick={() => setShowMenu(false)}
						>
							<MdArrowBackIosNew fill="#FFFFFF" className="my-auto" />{' '}
							<div className="text-white my-auto ml-2">Collapse Panel</div>
						</div>
					</div>
					)
				}
			</div>
		</div>
	);
};
