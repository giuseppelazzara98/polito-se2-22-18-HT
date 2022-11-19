import SignupForm from '../components/SignupForm/SignupForm';
import { Container } from "react-bootstrap";

export default function Signup(props) {
	return (
		<>
			<Container>
				<h1 className="my-5">HTracker</h1>
				<SignupForm />
			</Container>
		</>
	);
}
