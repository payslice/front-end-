import React, { useState } from 'react';
import employerImg from '../../assets/svgs/employer.svg';
import employeesImg from '../../assets/svgs/employee.svg';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Button } from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

export const ChooseUser = () => {
	const [selectedIndex, setSelectedIndex] = useState(1);
	const history = useHistory();

	const handleUserRoute = () => {
		switch (selectedIndex) {
			case 1:
				history.push('/login');
				break;
			case 2:
				history.push('/invite');
				break;
			default:
				history.push('/login');
				break;
		}
	};

	return (
		<div className="flex flex-col h-full md:justify-center mobiles:w-full mobiles:mt-20 auth_container mx-auto">
			<div className="text-[21px] md:text-3xl font-bold uppercase mb-6">choose user</div>
			<p className="text-sm md:text-base">
				Creating a more productive workforce is just few steps away <br className="hidden md:block" /> Enter email
				address to continue
			</p>
			<div className="choose-user-wrapper mt-[49px]">
				<div
					className={`rounded-md mb-6 flex w-full px-4 py-3.5 md:p-6 justify-between cursor-pointer ${
						selectedIndex === 1 ? 'bg-white border border-blue-600' : 'bg-gray-100 border border-transparent'
					}`}
					onClick={() => setSelectedIndex(1)}
				>
					<div>
						<div className="rounded border border-blue-700">
							<img src={employerImg} alt="" className="m-auto p-3" />
						</div>
					</div>
					<div className="user-type mr-5 my-auto">
						<div className={`${selectedIndex === 1 && 'text-blue-700'} font-bold text-sm md:text-base`}>Employers</div>
						<p className="mb-0 text-gray-400 text-xs md:text-base">Access to your dashboard</p>
					</div>
					<MdOutlineKeyboardArrowRight
						className={`my-auto mr-0 md:mr-5 text-blue-700 text-2xl ${selectedIndex === 1 ? 'visible' : 'invisible'}`}
					/>
				</div>
				<div
					className={`rounded-md flex w-full px-4 py-3.5 md:p-6 justify-between cursor-pointer ${
						selectedIndex === 2 ? 'bg-white border-blue-600 border' : 'bg-gray-100 border border-transparent'
					}`}
					onClick={() => setSelectedIndex(2)}
				>
					<div>
						<div className="rounded border border-blue-700">
							<img src={employeesImg} alt="" className="m-auto p-3" />
						</div>
					</div>

					<div className="user-type mr-5 my-auto">
						<div className={`${selectedIndex === 2 && 'text-blue-700'} font-bold text-sm md:text-base`}>Employees</div>
						<p className="mb-0 text-gray-400 text-xs md:text-base">Access to your dashboard</p>
					</div>

					<MdOutlineKeyboardArrowRight
						className={`my-auto mr-0 md:mr-5 text-blue-700 text-2xl ${selectedIndex === 2 ? 'visible' : 'invisible'}`}
					/>
				</div>
			</div>
			<div className="btn flex mt-10 flex-end justify-end">
				<Button buttonText="Next" onClick={handleUserRoute} />
			</div>
		</div>
	);
};
