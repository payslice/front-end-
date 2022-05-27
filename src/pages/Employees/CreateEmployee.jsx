/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { InputField, SelectInput } from '../../components/Input';
import MiniLoader from '../../components/Loaders/MiniLoader';
import { ErrorMessage, SuccessMessage } from '../../components/Message/Message';
import { saveEmployee } from '../../utils/ApiRequests';
import axios from 'axios';
import Select from 'react-select';
import { CustomSelect } from '../../components/Select';
import { getUserDataFromStorage } from '../../utils/ApiUtils';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { persistSelector } from '../../slices/persist';
import isEmail from 'is-email';
import { BackButton } from '../../components/BackButton';

const CreateEmployee = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { user } = useSelector(persistSelector);

	const genderTypes = [
		{ name: 'Male', value: 'male' },
		{ name: 'Female', value: 'female' },
	];

	const employmentTypes = [
		{ name: 'Full time', value: 'full time' },
		{ name: 'Contract', value: 'contract' },
		{ name: 'Part time', value: 'part time' },
		{ name: 'Intern', value: 'intern' },
	];

	const currencyTypes = [
		{ name: 'NGN', value: 'NGN' },
		{ name: 'USD', value: 'USD' },
		{ name: 'GBP', value: 'GBP' },
		{ name: 'EUR', value: 'EUR' },
	];

	const [fetchingBanks, setFetchingBanks] = useState(true);
	const [bankList, setBankList] = useState();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [gender, setGender] = useState(genderTypes[0]);
	const [employmentType, setEmploymentType] = useState(employmentTypes[0]);
	const [currency, setCurrency] = useState(currencyTypes[0]);
	const [bank, setBank] = useState(bankList ? bankList[0] : null);
	const [errMessage, setErrMessage] = useState();

	useEffect(() => {
		const fetchBanks = async () => {
			const res = await axios.get('https://api.paystack.co/bank');

			const listBanks = res?.data.data?.map((bank) => {
				return {
					value: bank.code,
					label: bank.name,
				};
			});
			setBankList(listBanks);
			setFetchingBanks(false);
		};
		fetchBanks();
	}, []);

	const onSubmit = async (formData) => {
		if (formData) {
			setLoading(true);
			try {
				const res = await saveEmployee({
					...formData,
					gender: gender.value,
					currency: currency.value,
					bank_name: bank?.label,
					bank_code: bank?.value,
					employment_type: employmentType?.value,
					company_id: user?.company?.id,
				});
				setLoading(false);
				reset();
			} catch (error) {
				setLoading(false);
				setError(true);
				setErrMessage('An error occurred, please try again later.');
			}
		}
	};

	return (
		<div className="-mt-2 pb-16">
			<BackButton url="/employee" />
			<div className="header mt-10">
				<h3 className="text-xl text-black font-semibold">Create New Staff</h3>
				<p className="text-sm mt-1">We need some information about your staff to process your request.</p>
			</div>

			{success && (
				<SuccessMessage
					title="Registration Complete"
					message="Employee account has been created successfully and an invite has been sent to their email."
				/>
			)}
			{error && <ErrorMessage title="Error" message={errMessage} />}

			<div className="mt-5">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex w-full mobiles:block">
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Staff first name"
								name="first_name"
								placeholder="Staff first name "
								type="text"
								errors={errors?.first_name ?? false}
								{...register('first_name', { required: true, minLength: 3 })}
							/>
						</div>
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Staff last name"
								name="last_name"
								placeholder="Staff last name "
								type="text"
								errors={errors?.last_name ?? false}
								{...register('last_name', { required: true, minLength: 3 })}
							/>
						</div>
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Email Address"
								placeholder="Enter email address"
								type="email"
								name="email"
								errors={errors?.email ?? false}
								{...register('email', { required: true, validate: (value) => isEmail(value) })}
							/>
						</div>
					</div>
					<div className="flex w-full mobiles:block">
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Phone Number"
								placeholder="Staff full name "
								type="tel"
								name="phone_number"
								errors={errors?.phone_number ?? false}
								{...register('phone_number', { required: true })}
							/>
						</div>
						<div className="w-1/3 mr-5 mobiles:w-full">
							<SelectInput
								name="gender"
								label="Gender"
								selectedValue={gender}
								setSelectedValue={setGender}
								options={genderTypes}
							/>
						</div>

						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Company Location"
								placeholder="Company location"
								type="text"
								name="location"
								errors={errors?.location ?? false}
								{...register('location', { required: true })}
							/>
						</div>
					</div>
					<div className="flex w-full mobiles:block">
						<div className="w-1/3 mr-5 mobiles:w-full">
							<SelectInput
								name="bank_name"
								label="Select bank"
								options={bankList}
								selectedValue={bank}
								setSelectedValue={setBank}
							/>
						</div>

						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Account Number"
								placeholder="Enter account number"
								type="number"
								name="account_number"
								errors={errors?.account_number ?? false}
								{...register('account_number', { required: true })}
							/>
						</div>

						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Staff Account Name  "
								placeholder="Staff full name"
								type="text"
								name="account_name"
								errors={errors?.account_name ?? false}
								{...register('account_name', { required: true })}
							/>
						</div>
					</div>
					<div className="flex w-full mobiles:block">
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								label="Salary (amount)"
								placeholder="Staff salary "
								type="number"
								name="staff_salary"
								errors={errors?.staff_salary ?? false}
								{...register('staff_salary', { required: true })}
							/>
						</div>
						<div className="w-1/3 mr-5 mobiles:w-full">
							<SelectInput
								label="Currency"
								options={currencyTypes}
								selectedValue={currency}
								setSelectedValue={setCurrency}
							/>
						</div>

						<div className="w-1/3 mr-5 mobiles:w-full">
							<SelectInput
								options={employmentTypes}
								label="Select type"
								selectedValue={employmentType}
								setSelectedValue={setEmploymentType}
							/>
						</div>
					</div>
					{employmentType?.value === 'contract' && (
						<div className="flex w-full mobiles:block">
							<div className="w-1/3 mr-5 mobiles:w-full">
								<InputField
									label="Contract length (in months)"
									placeholder="Enter contract length"
									type="number"
									name="contract_length"
									errors={errors?.contract_length ?? false}
									{...register('contract_length', { required: true })}
								/>
							</div>
						</div>
					)}

					<div className="mt-5">
						<Button type="submit" className="mobiles:w-full" buttonText="Send invitation" loading={loading} base />
					</div>
				</form>
			</div>
		</div>
	);
};
export default CreateEmployee;
