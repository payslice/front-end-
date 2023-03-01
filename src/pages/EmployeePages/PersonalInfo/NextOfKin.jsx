import React from 'react'
import { Button } from '../../../components/Button/Button';
import { InputField, SelectInput } from '../../../components/Input'
import { userData } from '../../../utils/ApiRequests';

const NextOfKin = () => {
    const { id, nokDetails } = userData;
    const relationship = [
        { id: 0, name: "Parent", value: "parent" },
        { id: 1, name: "Sibling", value: "sibling" },
        { id: 2, name: "Spouse", value: "spouse" },
        { id: 3, name: "Child", value: "child" },
        { id: 4, name: "Others", value: "others" },
      ];
  return (
    <div className="px-8">
    <div className="text-2xl my-4">KYC</div>

    <form>
        <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="First Name" value={nokDetails?.first_name} type="text" />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="Last Name" value={nokDetails?.last_name} type="text" />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="Home Address" value={nokDetails?.home_address} type="text" />
            </div>
        </div>

        <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="Phone number" value={nokDetails?.phone_number} type="tel" />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
                {/* <InputField required label="Profile Picture" value={kycDetails?.profile_picture} type="text" /> */}
                <SelectInput 
                    label= "Relationship"
                    required
                    options={relationship}
                />
            </div>
        </div>
        <Button buttonText="Update Details" />
    </form>
</div>
  )
}

export default NextOfKin
