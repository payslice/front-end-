/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { InputField } from '../../../components/Input';
import avatar from '../../../assets/svgs/Teacher.svg';
import { Button } from '../../../components/Button/Button';
import {
	updateEmployee,
	uploadFile,
	changePassword,
	// userData,
} from '../../../utils/ApiRequests';
import { removeUserDataFromStorage, setuserDataToStorage, getUserDataFromStorage } from '../../../utils/ApiUtils';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { persistSelector } from '../../../slices/persist';
import { useForm } from 'react-hook-form';
import { PasswordChangeFormEmployee } from '../../../components/PasswordChangeFormEmployee';

const PersonalInfo = () => {

	const { user } = useSelector(persistSelector);

	const {register, handleSubmit}  = useForm({
		defaultValues: {
			first_name: '',
			last_name: '',
			phone_number: '',
			gender: ''
		}
	})

	const [imgFile, setImgFile] = useState();

	const { first_name, last_name, email, phone_number, bankDetails, id, workDetails } = user;

	const [formData, setFormData] = useState({
		...user,
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
		email: email,
		bankDetails: {
			...bankDetails,
			// bvn: bankDetails.bvn,
			bank_code: '058',
		},
		workDetails: {
			...workDetails,
			// location: workDetails.location,
		},
		company: {
			employee_id: id,
		},
		gender: 'male',
		employee_id: id,
	});

	const [uploading, setUploading] = useState(false);
	const [submittingLoader, setSubmittingLoader] = useState(false);

	const uploadProfileIcon = async () => {
		let bodyFormData = new FormData();
		bodyFormData.append('file', imgFile);
		bodyFormData.append('section', 'employee');
		bodyFormData.append('section_id', user?.id);
		setUploading(true);
		try {
			const res = await uploadFile(bodyFormData);

			setUploading(false);
		} catch (error) {
			toast.error('An error occurred, please try again');
			setUploading(false);
		}
	};

	const handleChange = (type, e) => {
		const { name, value } = e.target;
		const newFormData = { ...formData };
		type ? (newFormData[type][name] = value) : (newFormData[name] = value);
		setFormData(newFormData);
	};

	// const handlePasswordChange = (type, e) => {
	// 	const { name, value } = e.target;
	// 	const newFormData = { ...passwordForm };
	// 	type ? (newFormData[type][name] = value) : (newFormData[name] = value);
	// 	setPasswordForm(newFormData);
	// };

	const onSubmit = async (formData) => {
		setSubmittingLoader(true) 
		try {
			const {data} = await updateEmployee(formData);
			if(data.status === true) {
				removeUserDataFromStorage();
				setuserDataToStorage(data.data);
				setSubmittingLoader(false);
				window.location.reload();
			}
			console.log(data)
		} catch (error) {
			toast.error('An error occurred, please try again');
			setSubmittingLoader(false);
		}
	};

	return (
		<div className="px-8">
			<div className="text-2xl my-4">Personal Information</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full flex mobiles:block">
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
							required
							label="First name"
							{...register('first_name', {required: true})}
							type="text"
						/>
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
							required
							label="Last name"
							{...register('last_name', {required: true})}
							type="text"
						/>
					</div>
				</div>
				
				<div className="w-full flex mobiles:block">
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
					 		required
					 		label="Phone Number"
					 		type="tel"
							{...register('phone_number', {required: true})}
					 	/>
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
							required
							label="Gender"
							{...register('gender', {required: true})}
							type="text"
						/>
					</div>
				</div>
				<div className="w-full flex mobiles:block">
					<div className="w-full lg:w-1/3 mr-5 flex">
						{imgFile ? (
							<img
								src={URL.createObjectURL(imgFile)}
								className="rounded-full h-20 w-20 bg-gray-200 object-cover my-auto"
								alt="user avatar"
							/>
						) : (
							<img src={avatar} className="rounded-full h-20 w-20 bg-gray-200 my-auto" alt="user avatar" />
						)}

						<div className="my-auto">
							{imgFile ? (
								<label
									htmlFor=""
									className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
									onClick={uploadProfileIcon}
								>
									{uploading ? 'Uploading...' : 'Upload Image'}
								</label>
							) : (
								<label htmlFor="file-upload" className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 ">
									Select Image
								</label>
							)}

							<input
								id="file-upload"
								className="hidden"
								onChange={(e) => {
									const [file] = e.target.files;
									setImgFile(file);
								}}
								type="file"
								accept=".png, .jpeg, .jpg"
							/>
						</div>
					</div>
				</div>
				<div className="mt-5">
					<Button buttonText="Upload Details" loading={submittingLoader} />
				</div>
			</form>

			<div className="my-8">
				<div className="text-2xl my-4">Change Password</div>
				<PasswordChangeFormEmployee />
			</div>
		</div>
	);
};

export default PersonalInfo;
