/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { InputField } from '../../../components/Input';
import { userData } from '../../../utils/ApiRequests';

const BankingInfo = () => {
	const { id, bankDetails } = userData;

	return (
		<div className="px-8">
			<div className="text-2xl my-4">Banking Information</div>

			<form>
				<div className="w-full flex">
					<div className="w-1/3 mr-5">
						<InputField required label="Bank Name" value={bankDetails.bank_name} type="text" />
					</div>
					<div className="w-1/3 mr-5">
						<InputField required label=" Account Number " value={bankDetails.account_number} type="text" />
					</div>
					<div className="w-1/3 mr-5">
						<InputField required label=" Account Name " value={bankDetails.account_name} type="text" />
					</div>
				</div>
				<Button buttonText="Update Details" />
			</form>
		</div>
	);
};

export default BankingInfo;
