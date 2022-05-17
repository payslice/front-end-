import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { InputField, PasswordInput } from '../../../components/Input';

export const UserSignUp = () => {
	const history = useHistory();
	const submitForm = (e) => {
		e.preventDefault();
		history.push('/user/login');
	};
	return (
		<>
			<div className="p-10 w-3/4 mobiles:w-full mobiles:block mobiles:mt-20 mobiles:p-0 ">
				<h1 className="text-3xl uppercase">sign up</h1>

				<form onSubmit={submitForm}>
					<div className="mt_10">
						<PasswordInput required label="Set password" placeholder="Enter password" />
						<PasswordInput required label="Confirm password" placeholder="Enter password" />
						<InputField label="Enter BVN" required type="text" placeholder="e.g Kelly@farfill.com" />
						<InputField label="Set security question" required type="text" placeholder="What is your pet's name" />
						<InputField label="Answer" required type="text" placeholder="Uche Kanu" />
					</div>
					<div className="signUp__submit-btn flex justify-end">
						<Button type="submit" buttonText="Next" onClick={() => history.push('/user/login')} />
					</div>
				</form>
				<div className="mt-5 pb-10 text-sm md:text-base">
					Already have an account?{' '}
					<Link to="/user/login" className="text-primary font-medium ml-1">
						Login
					</Link>
				</div>
			</div>
		</>
	);
};
