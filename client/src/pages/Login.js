import LoginForm from '../components/LoginForm/LoginForm';
import { CiMountain1 } from 'react-icons/ci';
export default function Login(props) {
	return (
		<>
			<h1 className="my-5">
				{' '}
				<CiMountain1 color="black" size={50} /> HTracker
			</h1>
			<LoginForm setLoggedIn={props.setLoggedIn} setUser={props.setUser} />
		</>
	);
}
