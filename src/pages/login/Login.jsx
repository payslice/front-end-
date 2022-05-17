import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField, PasswordInput } from '../../components/Input';
import { employerLogin } from '../../utils/ApiRequests';
import { setExpiryTimeToStorage, setTokenToStorage, setuserDataToStorage } from '../../utils/ApiUtils';
import { ErrorMessage } from '../../components/Message/Message';
import { Link } from 'react-router-dom';

export const Login = () => {
	const [loginForm, setLoginForm] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const newEntry = { [name]: value };
		setLoginForm({ ...loginForm, ...newEntry });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await employerLogin(loginForm);
			setuserDataToStorage(res.data.payload.data);
			setTokenToStorage(res.data.payload.data.token);
			setExpiryTimeToStorage(new Date());
			setLoading(false);
			res.data.payload.data.company ? history.push('/dashboard') : history.push('/onboard/step1');
		} catch (error) {
			setLoading(false);
			// console.log("error", error);
			setError(true);
		}
	};

	return (
		<>
			<div className="mobiles:p-0 flex flex-col mobiles:block mobiles:mt-20 mobiles:h-0 h-full justify-center mobiles:w-full auth_container mx-auto">
				<h1 className="text-[21px] md:text-3xl font-bold uppercase">login</h1>
				{error && (
					<ErrorMessage title="Error" message="An error occured. Please ensure your email and password is correct." />
				)}
				<form onSubmit={handleSubmit}>
					<div className={`${!error && 'mt-[46px]'}`}>
						<InputField
							label="Business Email Address"
							required
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="e.g Kelly@farfill.com"
						/>
						<PasswordInput
							label="Enter password"
							name="password"
							required
							onChange={handleChange}
							placeholder="Enter password"
						/>
					</div>
					<div className="flex justify-between items-center text-sm md:text-base">
						<Link to="/reset-password" className="text-red-500">
							Forgot password?
						</Link>
						<div className="signUp__submit-btn flex justify-end">
							<Button type="submit" buttonText="Next" loading={loading} />
						</div>
					</div>
				</form>

				<div className="mt-16 text-sm md:text-base">
					Don't have an account?{' '}
					<Link to="/register" className="font-medium text-primary ml-1">
						Sign Up now
					</Link>
				</div>
			</div>
		</>
	);
};
