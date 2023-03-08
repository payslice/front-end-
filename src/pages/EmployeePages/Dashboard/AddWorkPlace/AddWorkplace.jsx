import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { Button } from '../../../../components/Button/Button'
import { InputField } from '../../../../components/Input'
import { ErrorMessage } from '../../../../components/Message/Message'
import { EmployeeIdContext } from '../../../../routes/EmployeeRoutes'
import { persistSelector } from '../../../../slices/persist'
import { employeeAddWorkPlace } from '../../../../utils/ApiRequests'


const AddWorkPlace = () => {

  const dispatch = useDispatch();
  const data = useSelector(persistSelector);

  const {employeeIdState} = useContext(EmployeeIdContext)

  console.log("emailRecievedContext userotp")
  console.log(employeeIdState)

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const onSubmit = async (formData) => {
    
    console.log("formData useFOrm")
    console.log(formData)

    try {
          setLoading(true)
          const {data} = await employeeAddWorkPlace({...formData, employee_id: employeeIdState})

          if (data.status) {
            history.push("/user/dashboard");
            toast.success(data.message)
          }
          else {
            toast.error(data.message)
          }
          console.log(data)
    }
    catch(err) {
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
        <div className="mobiles:p-0 flex flex-col mobiles:block mobiles:mt-20 mobiles:h-0 h-full justify-center mobiles:w-full auth_container mx-auto">
        <h1 className="text-[21px] md:text-3xl font-bold uppercase">
        Confirm Employee Info
        </h1>
        {error && (
          <ErrorMessage
            title="Error"
            message="An error occurred. Please ensure your input value is correct."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${!error && "mt-[46px]"}`}>
            <InputField
              label="Enter OTP"
              type="text"
              name="otp"
              placeholder="e.g sdf3e34"
              {...register('otp', {
                required: true
              })}
              required
            />
          </div>
          <div>
            <p> Please enter the OTP sent to your work email </p>
          </div>
          <br />
          <div className="flex justify-between items-center text-sm md:text-base">
            <div className="signUp__submit-btn flex justify-end">
              <Button type="submit" buttonText="Submit" loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddWorkPlace
