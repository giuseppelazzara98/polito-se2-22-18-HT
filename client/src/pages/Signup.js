import SignupForm from '../components/SignupForm/SignupForm';
import { Container } from "react-bootstrap";
import { CiMountain1 } from 'react-icons/ci';

export default function Signup(props) {
	return (
		<>
			<Container>
				<h1 className="my-5">
				{' '}
				<CiMountain1 color="black" size={50} /> HTracker
			</h1>
				<SignupForm />
			</Container>
		</>
	);
}
