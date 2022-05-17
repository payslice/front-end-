import React from 'react';

export const SuccessMessage = ({ title, message }) => {
	return (
		<div className="success_notification px-8 py-4 my-4 rounded">
			<div className="title font-bold">{title}</div>
			<div className="message">{message}</div>
		</div>
	);
};

export const ErrorMessage = ({ title, message }) => {
	return (
		<div className="error_notification px-5 md:px-8 py-3.5 md:py-4 my-4 rounded">
			<div className="title text-sm md:text-base font-bold">{title}</div>
			<div className="message text-xs md:text-sm">{message}</div>
		</div>
	);
};
