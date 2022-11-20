import LoginForm from '../components/LoginForm/LoginForm';
import { CiMountain1 } from 'react-icons/ci';
import { Container } from "react-bootstrap";
export default function Login(props) {
	const {
		setShowWelcomeModal,
	} = props;
	return (
		<Container>
			<h1 className="my-5">
				{' '}
				<CiMountain1 color="black" size={50} /> HTracker
			</h1>
			<LoginForm setLoggedIn={props.setLoggedIn} setUser={props.setUser} setShowWelcomeModal={setShowWelcomeModal}/>
		</Container>
	);
}
