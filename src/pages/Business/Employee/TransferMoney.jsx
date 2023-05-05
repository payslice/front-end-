import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, PasswordInput, SelectInput } from "../../../components/Input";
import { businessTransferMoney, getAccountNameApi, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { listBanks } from "../../../utils/banksapi";


const TransferMoney = () => {
        const [submitting, setSubmitting] = useState(false);
        const [accountNameLoading, setaccountNameLoading] = useState(false);
        const [success, setSuccess] = useState(false);
	const [bank, setBank] = useState();
	const [account_number, setAccount_number] = useState();
 

        const history = useHistory()
        
        const { register, handleSubmit } = useForm();

        const onSubmit = async (formData) => {

                setSubmitting(true);

                try {
                        const {data} = await businessTransferMoney({...formData, bank_code:  bank?.code});
                        
                        if(data.status){
                                history.push("/business/dashboard")
                                toast.success(data.message)
                                setSubmitting(false);
                        }
                        else {
                                toast.error(data.message)
                                setSubmitting(false);
                        }

                } catch (error) {
                        setSubmitting(false);

                        error &&
                        toast.error(
                        error.response.data.payload?.data?.errors?.amount[0] ||
                                error.response.data.payload.data.message ||
                                error.response.data.payload.data
                        );

                        setSuccess(false);
                }
        };

        const getAccountName = useCallback( async () => {
                setaccountNameLoading(true);

                try {
                        const {data} = await getAccountNameApi({bank_code: bank?.code, account_number});
                        console.log(data)
                        
                        if(data.status){
                                toast.success(data.message)
                                setaccountNameLoading(false);
                        }
                        else {
                                toast.error(data.message)
                                setaccountNameLoading(false);
                        }

                } catch (error) {
                        setaccountNameLoading(false);

                        error &&
                        toast.error(
                        error.response.data.payload?.data?.errors?.amount[0] ||
                                error.response.data.payload.data.message ||
                                error.response.data.payload.data
                        );

                        setSuccess(false);
                }
        }, [history, account_number, bank])

        useEffect(() => {
                console.log("entered the useEffect statement")
                console.log("bank ", bank?.code, "account_number.length", account_number?.length)
                if(bank?.code && account_number?.length === 10){
                        console.log("entered the if statement")
                        getAccountName()
                }

                // return () => getAccountName()

        },[bank,account_number ])

        return (
                <>
                <div
                        className="w-full mt-10 flex justify-center font-bold withdraww"
                        style={{ color: "rgba(17, 17, 17, 0.6)" }}>

                        <div className="relative">
                        <Link to="/business/wallets">
                                <div className="absolute right-36 flex" style={{ width: "90px" }}>
                                <svg
                                className="mt-12"
                                style={{ marginTop: "5px" }}
                                width="8"
                                height="13"
                                viewBox="0 0 8 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z"
                                fill="#737A91"
                                />
                                </svg>
                                <span className="font-normal text-base pl-5" style={{}}>
                                Go back
                                </span>
                                </div>
                        </Link>
                        </div>

                        <div className="w-full md:w-1/2">
                        <Link to="/business/wallets">
                                <div className="lg:hidden flex mb-12">
                                <svg
                                className="mt-12"
                                style={{ marginTop: "5px" }}
                                width="8"
                                height="13"
                                viewBox="0 0 8 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z"
                                fill="#737A91"
                                />
                                </svg>
                                <span className="font-normal text-base pl-5" style={{}}>
                                Go back
                                </span>
                                </div>
                        </Link>

                        <div className="text-2xl font-semibold mb-6 capitalize text-black">
                                Transfer Money
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                                <InputField
                                        type="number"
                                        label="Balance"
                                        {...register("balance")}
                                        // value={amount}
                                        placeholder="120,000"
                                        // required
                                />

                                <InputField
                                        type="number"
                                        label="Amount"
                                        placeholder="NGN 130,000"
                                        {...register("amount")}
                                        // required
                                />
                                <SelectInput
                                        name="bank_name"
                                        label="Bank Name "
                                        options={listBanks}
                                        selectedValue={bank}
                                        setSelectedValue={setBank}
                                        required
                                />
                                
                                <div className="grid grid-cols-2 gap-4">
                                        <InputField
                                                type="number"
                                                label="Account Number"
                                                className=""
                                                value={account_number}
                                                onChange={(e) => setAccount_number(e.target.value)}
                                                // {...register("account_number")}
                                        />

                                        <InputField
                                                type="text"
                                                label="Account Name"
                                                disabled
                                                {...register("account_name")}
                                        />
                                </div>
                        
                                <InputField
                                        type="text"
                                        label="Narration"
                                        placeholder="Simple Description of Payment"
                                        {...register("description")}
                                        // required
                                />

                                <PasswordInput
                                        type="text"
                                        label="Enter Password"
                                        placeholder="********"
                                        {...register("description")}
                                        // required
                                />
                        
                                <Button
                                        buttonText="Make Payments"
                                        fullwidth
                                        loading={submitting}
                                        type="submit"
                                        className="py-5 mt-5"
                                />
                        </form>
                        {success && (
                                <SuccessMessage
                                title="Success"
                                message="Your request has been sent, you'll get a response from us soon."
                                />
                        )}
                        </div>
                </div>
                </>
        );
}

export default TransferMoney
