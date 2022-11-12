import LoginForm from '../components/LoginForm/LoginForm';

export default function Login(props) {
	return (
		<>
			<h1 className="my-5">HTracker</h1>
			<LoginForm setLoggedIn={props.setLoggedIn} />
		</>
	);
}
