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
					<div className="text-2xl font-semibold">Link account Details with MONO </div>
					<p className="max-w-md mt-2 text-gray-400">
						Companies who connect at least two bank account have chances of full payroll support.
					</p>
					<p className="max-w-md mt-2 text-gray-400">Mono doesn't have access to move your funds.</p>

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
