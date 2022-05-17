import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField, PasswordInput } from '../../components/Input';

export const ReferEmployer = () => {
	const history = useHistory();
	const [error, setError] = useState(null);

	const submitForm = (e) => {
		e.preventDefault();
		history.push('/verify-email');
	};

	return (
		<div className="mt-10 laptops:mt-3">
			<div className="mobiles:w-full mobiles:p-0 mobiles:mt-20 auth_container mx-auto">
				<h1 className="text-[21px] md:text-3xl font-bold uppercase">refer your employer</h1>
				<p className="mt-2">You can choose to remain anonymous</p>

				<form onSubmit={submitForm}>
					<div className={`${!error && 'mt-[46px]'}`}>
						<InputField label="Your Companies Name" required type="text" placeholder="e.g Kelly Now " />
						<InputField label="Contact person Email" required type="email" placeholder="e.g Kelly@farfill.com" />
						<InputField label="Your Email" required type="email" placeholder="e.g Kelly@farfill.com" />
						<InputField label="Your Phone Number" required type="number" placeholder="+2348012345678" />
						<PasswordInput required label="Enter password" placeholder="Enter password" />
					</div>
					<div className="signUp__submit-btn flex justify-end">
						<Button type="submit" buttonText="Next" />
					</div>
				</form>
				<div className="mt-5 pb-10 ">
					Already have an account?{' '}
					<Link to="/user/login" className="text-primary font-medium ml-1">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};
