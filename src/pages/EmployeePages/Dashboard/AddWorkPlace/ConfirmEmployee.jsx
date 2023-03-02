import isEmail from 'is-email';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/Button/Button';
import { InputField } from '../../../../components/Input';
import { ErrorMessage } from '../../../../components/Message/Message';
import { EmployeeIdContext } from '../../../../routes/EmployeeRoutes';
import { persistSelector } from '../../../../slices/persist';
import { employeeConfirmEmployeeId } from '../../../../utils/ApiRequests';

const ConfirmEmployee = () => {

  const {setEmployeeIdState} = useContext(EmployeeIdContext)

    const dispatch = useDispatch();
  const data = useSelector(persistSelector);

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

      setLoading(true);
      try {
        const {data} = await employeeConfirmEmployeeId({...formData});
        if(data.status) {
          setEmployeeIdState(formData.employee_id)
          history.push('/user/workplace/addworkplace')
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
      finally {
        setLoading(false)
      }

    console.log("formData")
    console.log(formData)
  };
  return (
    <>

        <div className="mobiles:p-0 flex flex-col mobiles:block mobiles:mt-20 mobiles:h-0 h-full justify-center mobiles:w-full auth_container mx-auto">
            <h1 className="text-[21px] md:text-3xl font-bold uppercase">
             Enter Employee ID
            </h1>
                {error && (
             <ErrorMessage
            title="Error"
            message="An error occurred. Please ensure your email and password is correct."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${!error && "mt-[46px]"}`}>
            <InputField
              label="Enter Employee ID for OTP request"
              type="text"
              name="employee_id"
              placeholder="e.g malign23"
              // errors={errors?.email ?? false}
              {...register("employee_id", {
                required: true,
                // validate: (value) =>
                //   isEmail(value) || "Please enter a valid employee id",
              })}
            />
          </div>
          <div className="flex justify-between items-center text-sm md:text-base">
            <div className="signUp__submit-btn flex justify-end">
              <Button type="submit" buttonText="Next" loading={loading}  />
            </div>
          </div>
        </form>
      </div>

    </>
  )
}

export default ConfirmEmployee