import React from 'react';
import MiniLoader from '../Loaders/MiniLoader';
import './styles.scss';

export const GreyButton = ({ buttonText, disabled, loading, onClick, type, fullwidth, inverted }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={`px-8 mt-5 py-3 rounded-md font-semibold bg-gray-200 text-sm md:text-base capitalize ${
				fullwidth && 'w-full'
			} ${inverted ? 'text-gray-800 border bg-gray-200 bg-transparent' : 'text-black'}`}
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
