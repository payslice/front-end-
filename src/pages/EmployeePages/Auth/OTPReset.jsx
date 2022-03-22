/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { InputField, PasswordInput } from '../../../components/Input';
import successIcon from '../../../assets/svgs/success.svg';

export const OTPReset = () => {
	const [resetSuccess, setResetSuccess] = useState(false);
	// const history = useHistory();
	const submitForm = (e) => {
		e.preventDefault();
		// history.push("/onboard/step1");
	};
	return (
		<>
			{!resetSuccess ? (
				<div className="p-10 flex flex-col h-full justify-center w-3/4">
					<h1 className="text-3xl font-bold  uppercase">enter otp</h1>

					<form onSubmit={submitForm}>
						<div className="mt_10">
							<InputField label="Enter OTP" required type="text" placeholder="e.g Kelly@farfill.com" />
							<PasswordInput required label="Set password" placeholder="Enter password" />
							<PasswordInput required label="Confirm password" placeholder="Enter password" />
						</div>
						<div className="signUp__submit-btn flex justify-end">
							<Button type="submit" buttonText="Next" onClick={() => setResetSuccess(true)} />
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
