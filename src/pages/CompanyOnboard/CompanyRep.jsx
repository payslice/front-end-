import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { companyInfoOnboarding } from '../../utils/ApiRequests';

const CompanyRepresentative = () => {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (formData) => {
		if (formData) {
			setLoading(true);
			try {
				const res = await companyInfoOnboarding(formData);

				if (res.status === 200 && res.data) {
					setLoading(false);
					reset();
					sessionStorage.setItem('P_Slice_CID', res.data.payload.data.id);
					history.push('/onboard/step2');
				}
			} catch (error) {
				toast.error(error?.response?.data?.payload?.data?.errors?.name[0] || 'An error occured');
				setLoading(false);
			}
		}
	};

	return (
		<div>
			<div className="text-xl md:text-2xl font-semibold">Company Representative</div>
			<p className="max-w-md mt-2 text-gray-400 text-sm md:text-base">
				Kindly complete the steps below to activate your account, once you have complete all the required section,
				clicks on Request Activation
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Legal name"
							name="legal_name"
							placeholder="ABC Company"
							type="text"
							errors={errors.legal_name ?? false}
							{...register('legal_name', { required: true })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Address"
							name="address"
							placeholder="ABC Company"
							type="text"
							errors={errors.address ?? false}
							{...register('address', { required: true })}
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Date of birth"
							name="date_of_birth"
							placeholder="ABC Company"
							type="date"
							errors={errors.date_of_birth ?? false}
							{...register('date_of_birth', { required: true })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="ID Type"
							name="id_type"
							placeholder="ABC Company"
							type="text"
							errors={errors.id_type ?? false}
							{...register('id_type', { required: true })}
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="ID number"
							name="id_number"
							placeholder="ABC Company"
							type="number"
							errors={errors.id_number ?? false}
							{...register('id_number', { required: true })}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Ownership percentage"
							name="ownership_percentage"
							placeholder="10"
							type="tel"
							errors={errors.ownership_percentage ?? false}
							{...register('ownership_percentage', { required: true })}
						/>
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Title (if a senior manager)"
							name="title"
							placeholder="ABC Company"
							type="text"
							errors={errors.title ?? false}
							{...register('title', { required: true })}
						/>
					</div>
				</div>
				<div className="signUp__submit-btn flex justify-end">
					<Button type="submit" buttonText="Save" loading={loading} />
				</div>
			</form>
		</div>
	);
};

export default CompanyRepresentative;
