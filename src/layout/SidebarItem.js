import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ currentPath, Icon, path, caption, isDb }) => {
	const active = currentPath === path;
	const fillValue = '#FFFFFF';

	return (
		<div>
			<li
				className={`${
					!isDb ? 'h-[53px]' : 'h-[43px]'
				} mobiles:pl-0 mobiles:mb-2 mobiles:flex mobiles:justify-center items-center mb-2`}
			>
				<NavLink
					to={path}
					activeClassName={`sidebar_active rounded`}
					className={`${!isDb ? 'h-[53px] px-[26px]' : 'h-[43px] px-5'} flex mobiles:justify-center items-center`}
				>
					<Icon fill={fillValue} className="w-5 h-5" />
					<span
						className={`${!isDb ? 'text-lg pl-6' : 'text-[15px] pl-4'} transition-colors ${active ? '' : ''} t_white`}
					>
						{caption}
					</span>
				</NavLink>
			</li>
		</div>
	);
};

export default SidebarItem;
