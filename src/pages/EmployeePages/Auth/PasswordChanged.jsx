import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as CheckIcon } from '../../../assets/svgs/check.svg';
import { Button } from '../../../components/Button/Button';

export const PasswordChanged = () => {
	return (
		<>
			<div className="flex flex-col h-full justify-center mobiles:w-full mobiles:block mobiles:mt-20 mobiles:p-0 mobiles:h-0 text-center mx-auto">
				<h1 className="text-[36px] text-primary font-bold uppercase">Your password has been changed</h1>
				<CheckIcon className="my-[66.6px] mx-auto" />
				<div className="text-gray-500 font-semibold text-lg capitalize">
					Sign to your account in with your new password
				</div>
				<div className="text-gray-500 text-sm mt-3">
					<Link to="/login">
						<Button buttonText="Login" />
					</Link>
				</div>
			</div>
		</>
	);
};
