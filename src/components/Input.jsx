import React, { useState, forwardRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';

export const InputField = forwardRef(
	(
		{
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
			errors,
			props,
		},
		ref
	) => {
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
					className={`${
						errors ? 'border border-red-500' : 'border-gray-400 border-transparent'
					} bg-gray-100 mb-5 mt-2 w-full py-3.5 h-[61px] px-7 rounded outline-none input text-sm md:text-base`}
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
					{...props}
					ref={ref}
				/>
			</div>
		);
	}
);

export const PasswordInput = forwardRef(
	({ placeholder, name, id, onChange, value, required, label, errors, props }, ref) => {
		const [type, setType] = useState('password');
		return (
			<div className="md:mt-5">
				<label htmlFor="" className="font-medium text-normal relative text-sm md:text-base">
					{label} {required && <span className="absolute text-3xl md:text-5xl w-10 ml-5 -mt-0.5 text-rose-600">*</span>}
				</label>

				<div
					className={`${
						errors ? 'border border-red-500' : 'border-gray-400 border-transparent'
					} mb-5 mt-2 w-full rounded bg-gray-100 overflow-hidden flex justify-between input text-sm md:text-base`}
				>
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
						ref={ref}
						{...props}
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
	}
);

export const SelectInput = forwardRef(
	({ options, selectedValue, setSelectedValue, required, label, errors, props }, ref) => {
		const [showDropDown, setShowDropDown] = useState(false);

		return (
			<div className="md:mt-5">
				<label htmlFor="" className="font-medium text-normal relative text-sm md:text-base">
					{label} {required && <span className="absolute text-3xl md:text-5xl w-10 ml-5 -mt-0.5 text-rose-600">*</span>}
				</label>

				<div className="relative">
					<div
						onClick={() => setShowDropDown(!showDropDown)}
						className={`${
							errors ? 'border border-red-500' : 'border-gray-400 border-transparent'
						} mb-5 mt-2 w-full rounded bg-gray-100 overflow-hidden flex justify-between input text-sm md:text-base px-7 items-center cursor-pointer relative`}
					>
						<div className="flex justify-between w-full">
							<span className="">{selectedValue?.name || selectedValue?.label}</span>
							<FaChevronDown className="mt-1" />
						</div>
					</div>
					<div
						className={`${
							showDropDown ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
						} w-full absolute top-16 left-0 z-20 bg-white shadow-lg rounded-lg gap-y-4 py-1.5 duration-200 max-h-56 overflow-y-auto`}
					>
						{options?.length > 0 &&
							options.map((option) => (
								<div
									key={`${option?.name || option?.label}-22`}
									onClick={() => {
										setShowDropDown(false);
										setSelectedValue(option);
									}}
									className="text-gray-600 py-2.5 cursor-pointer w-full hover:bg-gray-50 active:bg-gray-100 px-7 font-medium"
								>
									{option?.name || option?.label}
								</div>
							))}
					</div>
				</div>
			</div>
		);
	}
);
