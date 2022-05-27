import React from 'react';

export const EmployeeInfo = ({ title, value }) => {
	return (
		<div className="content mb-3">
			<span className="font-bold text-sm text-[#111111CC]">{title}</span> : <span>{value}</span>
		</div>
	);
};
