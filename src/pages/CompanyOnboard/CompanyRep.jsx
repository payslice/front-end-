import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import MiniLoader from '../../components/Loaders/MiniLoader';
import { toast } from 'react-toastify';

const CompanyRepresentative = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		company_id: '',
		user_id: '',
		title: '',
		address: '',
		legal_name: '',
		date_of_birth: '',
		ownership_percentage: '',
		id_type: [],
		id_number: 0,
	});
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
			// const res = await companyInfoOnboarding(formData);
			setLoading(false);
			// sessionStorage.setItem('P_Slice_CID', res.data.payload.data.id);
			history.push('/onboard/step2');
		} catch (error) {
			toast.error(error?.response?.data?.payload?.data?.errors?.name[0] || 'An error occured');
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="text-xl md:text-2xl font-semibold">Company Representative</div>
			<p className="max-w-md mt-2 text-gray-400 text-sm md:text-base">
				Kindly complete the steps below to activate your account, once you have complete all the required section,
				clicks on Request Activation
			</p>

			<form onSubmit={handleSubmit} className="mt-5">
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Legal name"
							name="legal_name"
							placeholder="ABC Company"
							type="text"
							required
							onChange={handleChange}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Address"
							name="address"
							placeholder="ABC Company"
							type="text"
							required
							onChange={handleChange}
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
							required
							onChange={handleChange}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField label="ID Type" name="ID Type" placeholder="ABC Company" type="text" required />
					</div>
				</div>
				<div className="flex w-full mobiles:block">
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="ID number"
							name="id_number"
							placeholder="ABC Company"
							type="number"
							required
							onChange={handleChange}
						/>
					</div>
					<div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
						<InputField
							label="Ownership percentage"
							name="ownership_percentage"
							placeholder="10"
							type="tel"
							required
							onChange={handleChange}
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
							required
							onChange={handleChange}
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

export default CompanyRepresentative;
