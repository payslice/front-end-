import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ currentPath, Icon, path, caption }) => {
	const active = currentPath === path;
	const fillValue = '#FFFFFF';

	return (
		<div>
			<li className={`mobiles:pl-0 mobiles:mb-2 mobiles:flex mobiles:justify-center items-center mb-2`}>
				<NavLink
					to={path}
					className="flex mobiles:justify-center items-center py-3 px-6"
					activeClassName={`sidebar_active rounded`}
				>
					<div>
						<Icon fill={fillValue} className="w-5 h-5" />
					</div>
					<span className={`pl-3 transition-colors ${active ? '' : ''} t_white `}>{caption}</span>
				</NavLink>
			</li>
		</div>
	);
};

export default SidebarItem;
