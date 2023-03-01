import React from 'react'
import { Button } from '../../../components/Button/Button';
import { InputField, SelectInput } from '../../../components/Input';
import { userData } from '../../../utils/ApiRequests';





const Kyc = () => {
    
    const { id, kycDetails } = userData;
    const maritalStatus = [
        { id: 0, name: "Single", value: "single" },
        { id: 1, name: "Married", value: "married" },
        { id: 2, name: "Divorced", value: "divorced" },
        { id: 3, name: "Widowed", value: "widowed" },
        { id: 4, name: "Separated", value: "separated" },
      ];

    const idType = [
        { id: 0, name: "NIN", value: "nin" },
        { id: 1, name: "PVC", value: "pvc" },
        { id: 1, name: "Passport", value: "passport" },
      ];

  return (
    <div className="px-8">
			<div className="text-2xl my-4">KYC</div>

			<form>
				<div className="w-full flex mobiles:block">
					<div className="w-1/3 mr-5 mobiles:w-full">
						{/* <InputField required label="Marital Status" value={kycDetails?.marital_status} type="text" /> */}
                        <SelectInput
                            label="Marital Status"
                            required
                            options={maritalStatus}
                        />
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField required label=" Address" value={kycDetails?.address} type="text" />
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						{/* <InputField required label="ID Type" value={kycDetails?.id_type} type="text" /> */}
                        <SelectInput 
                            label= "ID Type"
                            required
                            options={idType}
                        />
					</div>
				</div>

                <div className="w-full flex mobiles:block">
                    <div className="w-1/3 mr-5 mobiles:w-full">
						<InputField required label="Upload ID" value={kycDetails?.file} type="file" />
					</div>
					<div className="w-1/3 mr-5 mobiles:w-full">
						<InputField required label="Profile Picture" value={kycDetails?.profile_picture} type="file" />
					</div>
                </div>
				<Button buttonText="Update Details" />
			</form>
		</div>
  )
}

export default Kyc
