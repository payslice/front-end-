/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { InputField } from '../../../components/Input';
import { userData } from '../../../utils/ApiRequests';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const BankingInfo = () => {
	const { id, bankDetails } = userData;

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
			<div className="text-2xl my-4">Banking Information</div>

			<form>
				<div className="w-full block md:flex">
					<div className="w-full md:w-1/3 mr-5">
						<InputField required label="Bank Name" value={bankDetails?.bank_name} type="text" />
					</div>
					<div className="w-full md:w-1/3 mr-5">
						<InputField required label=" Account Number " value={bankDetails?.account_number} type="text" />
					</div>
					<div className="w-full md:w-1/3 mr-5">
						<InputField required label=" Account Name " value={bankDetails?.account_name} type="text" />
					</div>
				</div>
				<Button buttonText="Update Details" />
			</form>
		</div>
	);
};

export default BankingInfo;
