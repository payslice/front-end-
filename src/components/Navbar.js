import React, { useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "../hooks/useClickOutside";
import {
    removeTokenFromStorage,
    removeUserDataFromStorage,
} from "../utils/ApiUtils";
import { useHistory } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { persistSelector } from "../slices/persist";

const Navbar = () => {
    const { user } = useSelector(persistSelector);
    const [show, setShow] = useState(false);

    const tdc = useRef();
    useClickOutside(tdc, () => {
        setShow(false);
    });

	const history = useHistory();

	const handleLogout = () => {
		
			history.push('/user/login')
			history.push('/login');
		removeTokenFromStorage();
		removeUserDataFromStorage();
	};
	return (
		<nav
			ref={tdc}
			className="flex justify-between px-10 2xl:px-[76px] bg-white p-6 items-center mobiles:hidden h-[92px] nav-shadow relative"
		>
			<div className="flex items-center">
				<IoIosSearch className="w-6 h-6 text-[#CECED0]" />
				<input type="text" placeholder="Type in to search" className="outline-none border-none ml-9" />
			</div>

            <div
                onClick={() => setShow(!show)}
                className='flex items-center bg-gray-100 rounded w-[196px] h-[61px] pl-4 cursor-pointer'>
                {
                    user?.picture
                    ?
                    <img
                        src={require('../assets/imgs/user-payslice.jpg')}
                        alt="notification"
                        width="38"
                        height="41"
                        className="object-cover"
                    />
                    :
                    (
                        <div className='bg-[#1F2148] text-white px-3 py-3'>
                        
                            <div className='text-[24px]'>{user?.first_name.charAt(0)}</div>
                        </div>
                    )
                }
                <div className='my-auto ml-2 text-gray-400'>
                    <h3 className='w-20 mb-0 text-base font-semibold text-gray-400 truncate'>{`${user?.first_name} ${user?.last_name}`}</h3>
                    <p className='font-light text-[10px] mb-0 capitalize'>
                        {user?.section} account
                    </p>
                </div>
                <MdKeyboardArrowDown className='my-auto w-5 h-5 ml-3 text-[#737A91]' />
            </div>

            {show && (
                <div className='absolute z-10 w-24 mr-6 text-xs font-semibold text-left bg-white border-gray-200 rounded shadow-xl right-14 top-20'>
                    <div
                        className='px-4 py-3 text-base border-gray-200 cursor-pointer hover:bg-gray-100'
                        onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
