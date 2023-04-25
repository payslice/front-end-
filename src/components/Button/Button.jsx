import React from 'react';
import MiniLoader from '../Loaders/MiniLoader';
import './styles.scss';

export const Button = ({ base, buttonText, disabled, loading, onClick, type, fullwidth, inverted, className, invertedWhite }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={`${
				loading ? 'pointer-events-none opacity-60 pl-12 pr-7' : `${base ? 'px-8' : 'px-12'}`
			} py-3 rounded-md font-semibold relative outline-none focus:outline-none ${fullwidth && 'w-full'} 
				${inverted ? 'text-gray-800 bg-[#F4F9FF]' : 'text-white custom-btn'} 
				${className} text-sm md:text-base`}
		>
			{loading && (
				<span className="absolute top-1.5 left-5">
					<MiniLoader />
				</span>
			)}
			{loading ? 'Processing...' : buttonText}
		</button>
	);
};
