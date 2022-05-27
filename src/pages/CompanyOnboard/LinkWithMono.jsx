/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import OnboardSuccess from './OnboardSuccess';

const LinkWithMono = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [linked, setLinked] = useState(false);
	const [loading, setLoading] = useState(false);

	async function onSubmit() {}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{!linked ? (
				<>
					<div className="text-xl font-bold md:font-medium max-w-[474px]">
						STRATEGIC PARTNERSHIP BETWEEN PAYSLICE AND YOUR COMPANY (ABOVE)
					</div>
					<p className="max-w-[712px] text-base font-medium mt-6 text-gray-500 leading-relaxed">
						THIS PAYROLL MANAGEMENT SERVICE AGREEMENT (“Agreement”) is made and entered <br /> into as of in (“Effective
						Date”), by and between <br /> PAYSLICE NIGERIA LIMITED, a company duly incorporated under the relevant laws
						of the Federal Republic of Nigeria, with its registered address at, [The Hampton Hills, T.Y. Danjuma,
						Dideolu Estate, off Ligali Ayorinde, Victoria Island, Lagos.] (“the Service Provider”) of the first part{' '}
						<br /> AND <br /> YOUR COMPANY, a Company/Business Name duly incorporated under the relevant laws of the
						Federal Republic of Nigeria, with its registered address at, [ADDRESS] [“The Company”] of <br /> <br /> Both
						the Service Provider and the Company shall collectively be referred to as “Parties”. <br /> <br /> WHEREAS,{' '}
						<br />
						1. The Service Provider has conceptualized Payslice Solutions (the “Solution”), which leverages on
						technology to provide payroll solutions in the Human Resources vertical in Nigeria and elsewhere. <br /> 2.
						The Service Provider’s Solution will provide working capital on demand to Companies signed on to the Service
						Provider’s platform and grants access to credit to such company to cover Payroll and other operational
						costs. <br /> 3. The Company has expressed willingness to subscribe to the Solution and has now agreed
						alongside the Service Provider to be bound by the letters and provision of this agreement.
					</p>

					<div className="flex w-full mobiles:block mt-8">
						<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
							<InputField
								label="ID Type"
								name="id_type"
								placeholder="ABC Company"
								type="file"
								errors={errors.id_type ?? false}
								{...register('id_type', { required: true })}
							/>
						</div>
						<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
							<InputField
								label="Input date of signature "
								name="date"
								placeholder="ABC Company"
								type="date"
								errors={errors.date ?? false}
								{...register('date', { required: true })}
							/>
						</div>
					</div>

					<div className="signUp__submit-btn flex justify-between mt-10">
						<Link to="/onboard/step3">
							<button className="bg-gray-100 px-7 py-3 rounded-md font-semibold text-sm md:text-base">Go back</button>
						</Link>
						<Button type="submit" buttonText="Save" loading={loading} />
					</div>
				</>
			) : (
				<OnboardSuccess />
			)}
		</form>
	);
};

export default LinkWithMono;
