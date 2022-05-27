/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { InputField, PasswordInput } from '../../../components/Input';
import successIcon from '../../../assets/svgs/success.svg';
import { resetPassword } from '../../../utils/ApiRequests';
import { ErrorMessage } from '../../../components/Message/Message';

export const ResetPassword = () => {
	const history = useHistory();
	const [resetSuccess, setResetSuccess] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		phone_number: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newFormData = { [name]: value };
		setFormData({ ...formData, ...newFormData });
	};

	const submitForm = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await resetPassword(formData);
			if (res) {
				history.push('/password');
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			setError('An error occurred');
		}
	};
	return (
		<>
			{!resetSuccess ? (
				<div className="flex flex-col h-full justify-center auth_container mx-auto">
					<h1 className="text-[21px] md:text-3xl font-bold uppercase">reset password</h1>

					{error && <ErrorMessage title="Error" message={error} />}
					<form onSubmit={submitForm}>
						<div className={`${!error && 'mt-[46px]'}`}>
							<InputField
								label="Enter email"
								required
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="e.g Kelly@farfill.com"
							/>
						</div>
						<div>
							<InputField
								label="Your Phone Number"
								required
								name="phone_number"
								value={formData.phone_number}
								onChange={handleChange}
								type="number"
								placeholder="+2348012345678"
							/>
						</div>
						<div className="signUp__submit-btn flex justify-end">
							<Button type="submit" buttonText="Next" loading={loading} />
						</div>
					</form>
				</div>
			) : (
				<div className="my-20 text-center">
					<div className="text-gray-500 uppercase text-2xl">your password has been changed</div>
					<img src={successIcon} alt="" className="mx-auto my-16" />

					<a href="/user/login" className="text-gray-500 hover:text-gray-500">
						Click here login
					</a>
				</div>
			)}
		</>
	);
};
