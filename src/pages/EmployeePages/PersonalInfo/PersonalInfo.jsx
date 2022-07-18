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

const PersonalInfo = () => {
	const { user } = useSelector(persistSelector);
	const initPasswordForm = {
		email: '',
		new_password: '',
		confirm_password: '',
	};

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
			bvn: bankDetails.bvn,
			bank_code: '058',
		},
		workDetails: {
			...workDetails,
			location: workDetails.location,
		},
		company: {
			employee_id: id,
		},
		gender: 'male',
		employee_id: id,
	});

	const [passwordForm, setPasswordForm] = useState(initPasswordForm);
	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [changingPassword, setPasswordChanging] = useState(false);

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

	const handlePasswordChange = (type, e) => {
		const { name, value } = e.target;
		const newFormData = { ...passwordForm };
		type ? (newFormData[type][name] = value) : (newFormData[name] = value);
		setPasswordForm(newFormData);
	};

	const submitPasswordChange = async (e) => {
		e.preventDefault();
		setPasswordChanging(true);

		try {
			await changePassword(passwordForm);
			setPasswordChanging(false);
			toast.success('Password changed successfull');
			setPasswordForm(initPasswordForm);
		} catch (error) {
			toast.error('An error occurred');
		}
	};

	const updateUserInfo = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const res = await updateEmployee(id, formData);
			removeUserDataFromStorage();
			setuserDataToStorage(res.data.payload.data);
			setSubmitting(false);
			window.location.reload();
		} catch (error) {
			toast.error('An error occurred, please try again');
			setSubmitting(false);
		}
	};

	return (
		<div className="px-8">
			<div className="text-2xl my-4">Personal Information</div>

			<form onSubmit={updateUserInfo}>
				<div className="w-full flex mobiles:block">
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
							required
							label="Full name"
							value={`${formData.first_name} ${formData.last_name}`}
							disabled
							type="text"
						/>
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField required label="Email Address" value={formData.email} disabled type="email" />
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
							required
							label="Phone Number"
							value={formData.phone_number}
							type="tel"
							name="phone_number"
							onChange={(e) => handleChange(null, e)}
						/>
					</div>
				</div>

				<div className="w-full flex mobiles:block">
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField required label="Employees ID" type="text" />
					</div>
					<div className="w-1/3 mr-5">
						<InputField
							required
							label="BVN"
							onChange={(e) => handleChange('bankDetails', e)}
							type="number"
							name="bvn"
							value={formData.bankDetails?.bvn}
							// minLength="11"
							// maxLength="11"
						/>
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField
							required
							label="Location "
							name="location"
							value={formData.workDetails.location}
							onChange={(e) => handleChange('workDetails', e)}
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
					<Button buttonText="Upload Details" loading={submitting} />
				</div>
			</form>

			<div className="my-8">
				<div className="text-2xl my-4">Change Password</div>

				<form onSubmit={submitPasswordChange}>
					<div className="w-full flex mobiles:block">
						{/*
						<div className="w-1/3 mr-5 mobiles:w-full">
							
							<InputField
								required
								label="Your email"
								value={passwordForm.email}
								type="email"
								name="email"
								onChange={(e) => handlePasswordChange(null, e)}
							/>
							
						</div>
						*/}
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								required
								label="New Password"
								value={passwordForm.new_password}
								type="password"
								name="new_password"
								onChange={(e) => handlePasswordChange(null, e)}
							/>
						</div>
						<div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								required
								label="Confirm Password"
								value={passwordForm.confirm_password}
								type="password"
								name="confirm_password"
								onChange={(e) => handlePasswordChange(null, e)}
							/>
						</div>
					</div>
					<div className="mt-3">
						<Button loading={changingPassword} buttonText="Change Password" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default PersonalInfo;
