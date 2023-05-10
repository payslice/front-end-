import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../../../components/Button/Button';
import { InputField } from '../../../components/Input'
import { userData } from '../../../utils/ApiRequests';
import { saveNextOfKinEmployee } from '../../../utils/ApiRequests';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const relationshipData = [
    { id: 3420, name: "Parent", value: "parents" },
    { id: 14235, name: "Sibling", value: "sibling" },
    { id: 254235, name: "Spouse", value: "spouse" },
    { id: 223453, name: "Child", value: "child" },
    { id: 42534, name: "Others", value: "others" },
];


const NextOfKin = () => {
    const { id, nokDetails } = userData;

    const {register, handleSubmit} = useForm()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (onSubmit) => {

            console.log(onSubmit)
            console.log("onSubmit")
            setLoading(true)
            try {
                const {data} = await saveNextOfKinEmployee(onSubmit)
                if(data.status === 200) {
                    toast.success(data.message)
                    setLoading(false)
                }
                else {
                    toast.error(data.message)
                    setLoading(false)
                }
            }
            catch(error) {
                setLoading(false)
                console.log("error")
                console.log(error)
            }
    }


  return (
    <div className="px-8">
        <Link to="/user/dashboard">
				<div className="lg:hidden flex mt-5">
				<svg className="mt-12" style={{marginTop: '5px'}} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z" fill="#737A91"/>
				</svg>
				<span className="font-normal text-base pl-5" style={{}} >
					Go back
				</span>
				</div>
        
      		</Link>
    <div className="text-2xl my-4">Next of Kin</div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="First Name" {...register('first_name', {required: true})} value={nokDetails?.first_name} type="text" />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="Last Name" {...register('last_name', {required: true})} value={nokDetails?.last_name} type="text" />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="Home Address"  {...register('home_address', {required: true})} value={nokDetails?.home_address} type="text" />
            </div>
        </div>

        <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField required label="Phone number" {...register('phone_number', {required: true})} value={nokDetails?.phone_number} type="tel" />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
                {/* <SelectInput 
                //     label= "Relationship"
                //     required
                //     {...register('relationship', {required: true})}
                //     options={relationship}
                // />
                */}
                <div className='mt-5'>
                    <label className="text-normal text-sm md:text-base font-medium relative">Relationship 
                    <span
                        style={{ color: 'red', width: '40px', marginLeft: '20px', marginTop: '-2px' }}
                        className="absolute text-3xl md:text-5xl w-10 md:ml-5 -mt-0.5 text-rose-600"
                    >
                        *
                    </span>
                </label>
                    <div className="select-pay mb-5 mt-2">
                        <select
                            {...register('relationship', {required: true})}
                            name="relationship"
                            className="bg-gray-100 px-5 py-5 w-full rounded"
                        >
                            <option value=""></option>
                            {relationshipData.map(({id, name, value}) => (
                                <option value={value} key={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <Button buttonText="Update Details" loading={loading}  />
    </form>
</div>
  )
}

export default NextOfKin
