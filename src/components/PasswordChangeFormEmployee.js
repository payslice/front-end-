import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { changePasswordEmployee } from "../utils/ApiRequests";
import { Button } from "./Button/Button";
import { InputField } from "./Input"



export const PasswordChangeFormEmployee = () => {

        const {register, handleSubmit} = useForm()
        
	const [changingPasswordLoading, setPasswordChangingLoading] = useState(false);

        const onSubmit = async (formData) => {
		console.log("formData")
		console.log(formData)
		// console.log("JSON.formData")
		// console.log(JSON.stringify(formData))
		setPasswordChangingLoading(true);
		try {
			await changePasswordEmployee(formData);
			setPasswordChangingLoading(false);
			toast.success('Password changed successfull');
		} catch (error) {
			setPasswordChangingLoading(false);
			toast.error('An error occurred');
                        console.log(error)
		}
	};

        return (
                
				<form key={2} onSubmit={handleSubmit(onSubmit)}>
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
                                                        label="Password"
                                                        // value={passwordForm.new_password}
                                                        {...register('old_password', {required: true})}
                                                        type="password"
                                                        name="old_password"
                                                        // onChange={(e) => handlePasswordChange(null, e)}
                                                />
                                        </div>
                                        <div className="w-1/3 mr-5 mobiles:w-full">
                                                <InputField
                                                        required
                                                        label="New Password"
                                                        // value={passwordForm.confirm_password}
                                                        {...register('password', {required: true})}
                                                        type="password"
                                                        name="password"
                                                        // onChange={(e) => handlePasswordChange(null, e)}
                                                />
                                        </div>
                                        <div className="w-1/3 mr-5 mobiles:w-full">
                                                <InputField
                                                        required
                                                        label="Confirm Password"
                                                        // value={passwordForm.confirm_password}
                                                        {...register('confirm_password', {required: true})}
                                                        type="password"
                                                        name="confirm_password"
                                                        // onChange={(e) => handlePasswordChange(null, e)}
                                                />
                                        </div>
                                </div>
                                <div className="mt-3">
                                        <Button loading={changingPasswordLoading} buttonText="Change Password" />
                                </div>
                        </form>
        )
}