/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { InputField, PasswordInput } from '../../../components/Input';
import MiniLoader from '../../../components/Loaders/MiniLoader';
import { employeeLogin } from '../../../utils/ApiRequests';
import { setExpiryTimeToStorage, setTokenToStorage, setuserDataToStorage } from '../../../utils/ApiUtils';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../../../components/Message/Message';
import isEmail from 'is-email';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/persist';
import Cookies from 'js-cookie';

export const UserLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const history = useHistory();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const onSubmit = async (formData) => {
		if (formData) {
			setLoading(true);
			try {
				const res = await employeeLogin(formData);
				dispatch(setUser(res.data.payload.data));
				Cookies.set('PAYSL-ADTK', res.data.payload.data.token);
				setExpiryTimeToStorage(new Date());
				setLoading(false);
				history.push('/user/dashboard');
			} catch (error) {
				toast.error('An error occurred, ensure details are correct');
				setLoading(false);
				// console.log("error", error.response.data.payload.data);
				setError(true);
			}
		}
	};
	return (
		<>
			<div className="flex flex-col h-full justify-center mobiles:w-full mobiles:block mobiles:mt-20 mobiles:p-0 mobiles:h-0 auth_container mx-auto">
				<h1 className="text-[21px] md:text-3xl font-bold uppercase">login</h1>
				{error && (
					<ErrorMessage title="Error" message="An error occurred. Please ensure your email and password is correct." />
				)}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={`${!error && 'mt-[46px]'}`}>
						<InputField
							label="Email Address or Employee ID"
							type="email"
							name="email"
							placeholder="e.g Kelly@farfill.com"
							errors={errors?.email ?? false}
							{...register('email', { required: true, validate: (value) => isEmail(value) })}
						/>
						<PasswordInput
							label="Enter password"
							placeholder="Enter password"
							name="password"
							errors={errors?.password ?? false}
							{...register('password', { required: true })}
						/>
					</div>
					<div className="signUp__submit-btn flex justify-end">
						<Button loading={loading} type="submit" buttonText="Next" />
					</div>
				</form>
				<div className="mt-16 text-sm md:text-base">
					Don't have an account?{' '}
					<Link to="/invite" className="font-medium text-primary ml-1">
						Refer your employer
					</Link>
				</div>
				<div className="mt-2 text-sm md:text-base">
					Forgot password?
					<Link to="/reset-password" className="font-medium text-primary ml-1">
						Click here
					</Link>
				</div>
			</div>
		</>
	);
};
