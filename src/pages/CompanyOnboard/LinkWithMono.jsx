import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import OnboardSuccess from './OnboardSuccess';
import { useMono } from 'react-mono-js';

const LinkWithMono = () => {
	const [linked, setLinked] = useState(false);

	const handleMono = useMono({
		public_key: `${process.env.REACT_APP_MONO_PUBLIC_KEY}`,
	});

	return (
		<div>
			{!linked ? (
				<>
					<div className="text-xl font-medium max-w-[474px]">
						STRATEGIC PARTNERSHIP BETWEEN PAYSLICE AND YOUR COMPANY (ABOVE)
					</div>
					<p className="max-w-[712px] text-base font-medium mt-6 text-gray-500 leading-relaxed">
						THIS PAYROLL MANAGEMENT SERVICE AGREEMENT (“Agreement”) is made and entered <br /> into as of
						_________________ (“Effective Date”), by and between <br /> PAYSLICE NIGERIA LIMITED, a company duly
						incorporated under the relevant laws of the Federal Republic of Nigeria, with its registered address at,
						[The Hampton Hills, T.Y. Danjuma, Dideolu Estate, off Ligali Ayorinde, Victoria Island, Lagos.] (“the
						Service Provider”) of the first part <br /> AND <br /> YOUR COMPANY , a Company/Business Name duly
						incorporated under the relevant laws of the Federal Republic of Nigeria, with its registered address at,
						[ADDRESS] [“The Company”] of Both the Service Provider and the Company shall collectively be referred to as
						“Parties”. WHEREAS, 1. The Service Provider has conceptualized Payslice Solutions (the “Solution”), which
						leverages on technology to provide payroll solutions in the Human Resources vertical in Nigeria and
						elsewhere. 2. The Service Provider’s Solution will provide working capital on demand to Companies signed on
						to the Service Provider’s platform and grants access to credit to such company to cover Payroll and other
						operational costs. 3. The Company has expressed willingness to subscribe to the Solution and has now agreed
						alongside the Service Provider to be bound by the letters and provision of this agreement.
					</p>

					<div className="signUp__submit-btn mt-20 flex justify-start">
						<Button
							type="submit"
							buttonText="Connect Bank"
							onClick={() => {
								handleMono({
									onClose: () => null,
									onSuccess: (response) => {
										// console.log(response.code);
										setLinked(true);
									},
								});
							}}
						/>
					</div>
					<div className="my-8 cursor-pointer " onClick={() => setLinked(true)}>
						{`Skip this process`}
					</div>
				</>
			) : (
				<OnboardSuccess />
			)}
		</div>
	);
};

export default LinkWithMono;
