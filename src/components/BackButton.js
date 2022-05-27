import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const BackButton = ({ url = '/' }) => {
	return (
		<Link to={url}>
			<div className="flex my-4 cursor-pointer">
				<div className="flex items-center">
					<FaChevronLeft className="w-3 h-3" />
					<span className="ml-1 font-semibold text-xs">Go Back</span>
				</div>
			</div>
		</Link>
	);
};
