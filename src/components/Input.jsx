import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const InputField = ({
	type,
	placeholder,
	name,
	id,
	onChange,
	value,
	required,
	label,
	minLength,
	maxLength,
	disabled,
	readOnly,
}) => {
	return (
		<div className="w-full md:mt-5 mr-5">
			<label htmlFor="" className="text-normal text-sm md:text-base font-medium relative">
				{label}{' '}
				{required && (
					<span
						style={{ color: 'red', width: '40px', marginLeft: '20px', marginTop: '-2px' }}
						className="absolute text-3xl md:text-5xl w-10 md:ml-5 -mt-0.5 text-rose-600"
					>
						*
					</span>
				)}
			</label>
			<input
				className="border-transparent bg-gray-100 mb-5 mt-2 w-full border-gray-400 py-3 h-[61px] px-7 rounded outline-none input text-sm md:text-base"
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				name={name}
				id={id}
				readOnly={readOnly}
				min={minLength}
				max={maxLength}
				minLength={minLength}
				maxLength={maxLength}
				onChange={onChange}
				value={value}
				required={required}
				autoComplete="off"
			/>
		</div>
	);
};

export const PasswordInput = ({ placeholder, name, id, onChange, value, required, label }) => {
	const [type, setType] = useState('password');
	return (
		<div className="md:mt-5">
			<label htmlFor="" className="font-medium text-normal relative text-sm md:text-base">
				{label} {required && <span className="absolute text-3xl md:text-5xl w-10 ml-5 -mt-0.5 text-rose-600">*</span>}
			</label>

			<div className="mb-5 mt-2 w-full rounded bg-gray-100 overflow-hidden flex justify-between input text-sm md:text-base">
				<input
					className="py-5 pl-8 h-full bg-gray-100 w-full outline-none"
					type={type}
					placeholder={placeholder}
					name={name}
					id={id}
					onChange={onChange}
					value={value}
					required={required}
					autoComplete="off"
				/>
				<span className="cursor-pointer bg-gray-100 py-5 pl-5 pr-10">
					{type === 'password' ? (
						<AiOutlineEye onClick={() => setType('text')} className="w-6 h-6" />
					) : (
						<AiOutlineEyeInvisible onClick={() => setType('password')} className="w-6 h-6" />
					)}
				</span>
			</div>
		</div>
	);
};
