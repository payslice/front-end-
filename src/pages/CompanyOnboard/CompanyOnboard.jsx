import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import { companyInfoOnboarding } from '../../utils/ApiRequests';
import { toast } from 'react-toastify';
import MiniLoader from '../../components/Loaders/MiniLoader';

const CompanyOnboard = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		industry: '',
		tax_identification_number: '',
		rc_number: '',
		address: '',
		phone_number: '',
		registered_business_name: '',
	});
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const handleChange = (e) => {
		const { name, value } = e.target;
		const formEntry = { [name]: value };
		setFormData({ ...formData, ...formEntry });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await companyInfoOnboarding(formData);
			setLoading(false);
			sessionStorage.setItem('P_Slice_CID', res.data.payload.data.id);
			history.push('/onboard/step2');
		} catch (error) {
			toast.error(error?.response?.data?.payload?.data?.errors?.name[0] || 'An error occured');
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="text-xl md:text-2xl font-semibold">Company onboarding process</div>
			<p className="max-w-md mt-2 text-gray-400 text-sm md:text-base">
				Kindly complete the steps below to activate your account, once you have complete all the required section,
				clicks on Request Activation
			</p>

			<form onSubmit={handleSubmit} className="mt-5">
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Registered Business Name"
							name="registered_business_name"
							placeholder="ABC Company"
							type="text"
							required
							onChange={(e) => {
								const { value } = e.target;
								setFormData({
									...formData,
									name: value,
									registered_business_name: value,
								});
							}}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Tax Identification Number"
							name="tax_identification_number"
							placeholder="Enter Tax ID Number"
							type="number"
							required
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="RC Number"
							name="rc_number"
							placeholder="Enter RC Number"
							type="text"
							onChange={handleChange}
							required
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Business Address"
							name="address"
							placeholder="Enter Business Address"
							type="text"
							minLength="6"
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Industry"
							name="industry"
							placeholder="Enter Industry"
							type="text"
							onChange={handleChange}
							required
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Business Phone Number"
							name="phone_number"
							placeholder="+2349012345678"
							onChange={handleChange}
							type="tel"
							required
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Payment Email"
							name="email"
							placeholder="abc@xyz.com"
							onChange={handleChange}
							type="email"
							required
						/>
					</div>
				</div>
				<div className="signUp__submit-btn flex justify-end">
					{loading ? <MiniLoader /> : <Button type="submit" buttonText="Save" />}
				</div>
			</form>
		</div>
	);
};

export default CompanyOnboard;
