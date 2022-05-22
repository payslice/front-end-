import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import { companyPolicy } from '../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { ErrorMessage } from '../../components/Message/Message';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const CompanyPolicy = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errMessage, setErrMessage] = useState('');
	const history = useHistory();

	const onSubmit = async (formData) => {
		if (formData) {
			const companyId = sessionStorage.getItem('P_Slice_CID');
			const payload = { ...formData, company_id: companyId };
			setLoading(true);
			try {
				await companyPolicy(payload);
				setLoading(false);
				history.push('/onboard/step4');
			} catch (error) {
				toast.error('An error occured');
				setError(true);
				// console.log(error.response.data.payload.data);
				setLoading(false);
				setErrMessage(error.response.data.payload.data);
			}
		}
	};

	return (
		<div>
			<div className="text-xl md:text-2xl font-semibold">Company Policy</div>
			<p className="max-w-md mt-2 text-gray-400 text-sm md:text-base">
				Kindly complete the steps below to activate your account, once you have complete all the required section,
				clicks on Request Activation
			</p>

			{error && <ErrorMessage title="Error" message={errMessage} />}
			<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Payroll size"
							name="payroll_size"
							placeholder="Enter payroll size"
							type="text"
							errors={errors.payroll_size ?? false}
							{...register('payroll_size', { required: true })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<div className="mt-5">
							<label>Salary date (every month)</label>
							<div className="select-pay mb-5 mt-2">
								<select name="salary_date" className="bg-gray-100 input px-5 py-3 w-full rounded ">
									<option value="">Select option</option>
									<option value="first_week">First Week</option>
									<option value="second_week">Second Week</option>
									<option value="last_week"> Last Week</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Withdrawn percentage %"
							name="salary_withdrawal_percentage"
							placeholder="20"
							type="number"
							value="50"
							errors={errors.salary_withdrawal_percentage ?? false}
							{...register('salary_withdrawal_percentage', { required: true })}
						/>
					</div>
				</div>
				<div className="signUp__submit-btn flex justify-between mt-10">
					<Link to="/onboard/step2">
						<button className="bg-gray-100 px-7 py-3 rounded-md font-semibold text-sm md:text-base">Go back</button>
					</Link>
					<Button type="submit" buttonText="Save" loading={loading} />
				</div>
			</form>
		</div>
	);
};

export default CompanyPolicy;
