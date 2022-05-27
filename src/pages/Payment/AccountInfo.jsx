/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BackButton } from '../../components/BackButton';
import { generatePaymentCode, getSinglePayment, saveTransaction } from '../../utils/ApiRequests';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { useRouteMatch } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Input';
import { toCurrency, truncateString } from '../../utils/helpers';
import Select from 'react-select';

const AccountInfo = () => {
	const [paymentCode, setPaymentCode] = useState();
	const { params } = useRouteMatch();
	const [submitting, setSubmitting] = useState(false);
	const [paymentInfo, setPaymentInfo] = useState();

	useEffect(() => {
		const getPaymentCode = async () => {
			try {
				const res = await generatePaymentCode();
				setPaymentCode(res.data.payload.data);
			} catch (error) {
				toast.error('Cannot get transaction narration code');
			}
		};

		const getPaymentinfo = async () => {
			try {
				const response = await getSinglePayment(params.id);

				setPaymentInfo(response.data.payload.paymentLogs);
			} catch (error) {
				toast.error("Can't get payment info");
			}
		};
		getPaymentCode();
		getPaymentinfo();
	}, [params.id]);

	const makePayment = async () => {
		setSubmitting(true);
		const payload = {
			payment_id: params.id,
			transaction_code: paymentCode,
			amount: paymentInfo?.amount_remaining,
			payment_type: 'full_payment',
			mode_of_payment: 'transfer',
		};
		try {
			const res = await saveTransaction(payload);

			setSubmitting(false);
		} catch (error) {
			toast.error('An error occurred while logging payment');
			setSubmitting(false);
		}
	};
	const accountInfo = {
		accountName: 'Sterling Bank',
		bankName: 'Payslice Limited',
		accountNumber: '0086269848',
	};

	return (
		<>
			<BackButton />
			<div className="text-2xl mb-10">Account Information</div>

			<div className="bg-gray-100 flex justify-between w-max rounded px-5 py-2">
				<div className="mr-5">Payments ID : {truncateString(params.id, 8)}</div>
				<div className="mr-5">
					Month:{' '}
					{`
          ${new Date(paymentInfo?.updated_at).toLocaleString('default', {
						month: 'long',
					})}
          ${new Date(paymentInfo?.updated_at).getFullYear()}
          `}
				</div>
				<div className="mr-5">Amount: {toCurrency(paymentInfo?.amount_remaining)} </div>
				{/* <div className="mr-5">Due Date NGN 500,000</div> */}
			</div>

			<div className="mt-10 border rounded border-gray-200">
				<div className="flex border-b-2 border-gray-200 px-8 py-4 justify-between">
					<div className="text-2xl">Your payslice wallet</div>
					<MdKeyboardArrowDown className="my-auto" />
				</div>
				<div className="content p-8 flex justify-between">
					<div>
						<div className="font-normal">Kindly Transfer into the account Below</div>
						<div className="info">
							<span className="font-bold ">Bank Name: </span>
							{accountInfo.bankName}
						</div>
						<div className="info">
							<span className="font-bold ">Account Name: </span>
							{accountInfo.accountName}
						</div>
						<div className="info">
							<span className="font-bold ">Account Number: </span>
							{accountInfo.accountNumber}
							<CopyToClipboard text={accountInfo.accountNumber} onCopy={() => toast.success('copied')}>
								<span className="bg-gray-100 p-1 cursor-pointer mx-3 rounded">Copy </span>
							</CopyToClipboard>
						</div>
					</div>
					<div className="w-1/2">
						<div className="font-normal text-red-500 mb-3">N.B use code as your narration during transfer</div>
						<div className="border px-4 py-2 rounded w-max">
							{paymentCode ? paymentCode : 'Generating payment code...'}
						</div>
					</div>
				</div>
			</div>

			<div className="flex mobiles:block justify-center my-8 border rounded border-gray-200 px-8 py-4 ">
				{/* <div className="w-1/3">
          <InputField
            label="Amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>

        <div className="w-1/3 mr-5 mt-5 mobiles:w-full">
          <label htmlFor="" className="font-light text-normal">
            Currency
          </label>
          <Select
            name="currency"
            options={[
              { label: "Part payment", value: "half_payment" },
              { label: "Full Payment", value: "full_payment" },
            ]}
            className="bg-gray-100 mt-2 custom-select-input"
            placeholder={"Select option"}
            onChange={(val) => {
              const { value } = val;

              setPaymentOption(value);
            }}
          />
        </div> */}

				<div className="w-1/3">
					<Button className="my-4" buttonText="I have made payment" loading={submitting} onClick={makePayment} />
				</div>
			</div>
			{/* <div className="flex my-8 border rounded border-gray-200 px-8 py-4 justify-between">
        <div className="text-2xl">Direct Debit (add card)</div>
        <MdKeyboardArrowDown className="my-auto" />
      </div> */}
		</>
	);
};

export default AccountInfo;
