import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../API/api';

export default function EmailVerified(props) {
	let { token } = useParams();
	const navigate = useNavigate();
	console.log('token:' + token);
	useEffect(() => {
		const verifyEmail = async () => {
			try {
				await API.verifyEmail(token);
				props.setShowEmailVerificationSuccess(true);
				setTimeout(() => {
					props.setShowEmailVerificationSuccess(false);
				}, 2500);
				navigate('/login');
			} catch (err) {
				props.setShowEmailVerificationError(true);
				setTimeout(() => {
					props.setShowEmailVerificationError(false);
				}, 2500);
				navigate('/');
			}
		};
		verifyEmail();
	}, []);

	return <></>;
}
