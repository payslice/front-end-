import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import { companyInfoOnboarding } from '../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import isEmail from 'is-email';

const CompanyOnboard = () => {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (formData) => {
		if (formData) {
			setLoading(true);
			try {
				const res = await companyInfoOnboarding(formData);
				setLoading(false);
				sessionStorage.setItem('P_Slice_CID', res.data.payload.data.id);
				history.push('/onboard/step2');
			} catch (error) {
				toast.error(error?.response?.data?.payload?.data?.errors?.name[0] || 'An error occurred');
				setLoading(false);
			}
		}
	};

	return (
		<div>
			<div className="text-xl md:text-2xl font-semibold">Company onboarding process</div>
			<p className="max-w-md mt-2 text-gray-400 text-sm md:text-base">
				Kindly complete the steps below to activate your account, once you have complete all the required section,
				clicks on Request Activation
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Full Name"
							name="name"
							placeholder="John Doe"
							type="text"
							errors={errors.name ?? false}
							{...register('name', { required: true, minLength: 4 })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Registered Business Name"
							name="registered_business_name"
							placeholder="ABC Company"
							type="text"
							errors={errors.registered_business_name ?? false}
							{...register('registered_business_name', { required: true, minLength: 4 })}
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Business Phone Number"
							name="phone_number"
							placeholder="+2349012345678"
							type="tel"
							errors={errors.phone_number ?? false}
							{...register('phone_number', { required: true, minLength: 9 })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Business Address"
							name="address"
							placeholder="Enter Business Address"
							type="text"
							errors={errors.address ?? false}
							{...register('address', { required: true, minLength: 6 })}
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
							errors={errors.rc_number ?? false}
							{...register('rc_number', { required: true, minLength: 4 })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Tax Identification Number"
							name="tax_identification_number"
							placeholder="Enter Tax ID Number"
							type="number"
							errors={errors.tax_identification_number ?? false}
							{...register('tax_identification_number', { required: true, minLength: 4 })}
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
							errors={errors.industry ?? false}
							{...register('industry', { required: true, minLength: 2 })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Payment Email"
							name="email"
							placeholder="abc@xyz.com"
							errors={errors.email ?? false}
							{...register('email', {
								required: true,
								validate: (value) => isEmail(value) || 'Please provide a valid email',
							})}
						/>
					</div>
				</div>
				<div className="signUp__submit-btn flex justify-end mt-10">
					<Button type="submit" buttonText="Save" loading={loading} />
				</div>
			</form>
		</div>
	);
};

export default CompanyOnboard;
