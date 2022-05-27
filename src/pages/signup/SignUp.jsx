/* eslint-disable no-unused-vars */
import isEmail from 'is-email';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField, PasswordInput } from '../../components/Input';
import { ErrorMessage } from '../../components/Message/Message';
import { employerRegister } from '../../utils/ApiRequests';

export const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [errMessage, setErrMessage] = useState();

	const history = useHistory();

	const onSubmit = async (formData) => {
		if (formData) {
			setLoading(true);
			try {
				const res = await employerRegister(formData);

				if (res?.status === 200) {
					setError(false);
					setLoading(false);
					history.push('/verify-email');
				}
			} catch (error) {
				setLoading(false);
				setError(true);
				setErrMessage('An error occurred, please try again later.');
			}
		}
	};

	return (
		<div className="pt-10 laptops:pt-3">
			<div className="flex flex-col h-full justify-center mobiles:w-full mobiles:block mobiles:mt-20 mobiles:p-0 mobiles:h-0 auth_container mx-auto">
				<h1 className="text-[21px] md:text-3xl font-bold uppercase">sign up</h1>
				{error && <ErrorMessage title="Error" message={errMessage} />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={`${!error && 'mt-[46px]'}`}>
						<InputField
							label="First name"
							name="first_name"
							type="text"
							placeholder="e.g Kelly Now"
							errors={errors?.first_name ?? false}
							{...register('first_name', { required: true, minLengthL: 3 })}
						/>
						{/* Todo add select dropdown here */}
						<InputField
							label="Gender"
							name="gender"
							type="text"
							placeholder="Male or Female"
							errors={errors?.last_name ?? false}
							{...register('gender', { required: true })}
						/>

						<InputField
							label="Last name"
							name="last_name"
							type="text"
							placeholder="e.g Kelly Now"
							errors={errors?.last_name ?? false}
							{...register('last_name', { required: true, minLength: 3 })}
						/>
						<InputField
							label="Business Email Address"
							name="email"
							type="email"
							placeholder="e.g Kelly@farfill.com"
							errors={errors?.email ?? false}
							{...register('email', {
								required: true,
								validate: (value) => isEmail(value) || 'Please enter a valid email address',
							})}
						/>
						<InputField
							label="Phone Number"
							name="phone_number"
							type="phone"
							placeholder="+2348012345678"
							errors={errors?.phone_number ?? false}
							{...register('phone_number', { required: true })}
						/>
						<PasswordInput
							name="password"
							label="Enter password"
							placeholder="Enter password"
							errors={errors?.password ?? false}
							{...register('password', { required: true })}
						/>
					</div>
					<div className="signUp__submit-btn flex justify-end">
						<Button type="submit" buttonText="Next" loading={loading} />
					</div>
				</form>
				<div className="mt-5 pb-10 text-sm md:text-base">
					Already have an account?{' '}
					<Link to="/login" className="text-primary font-medium ml-1">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};
