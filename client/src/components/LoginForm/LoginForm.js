import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import API from '../../API/api';
import styles from './index.module.scss';

export default function LoginForm(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	// login function, passed as props to loginForm
	const login = async (credentials) => {
		try {
			const user = await API.logIn(credentials);
			props.setLoggedIn(true);
			props.setUser(user);
			return true;
		} catch (err) {
			return false;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = { username, password };
		login(credentials)
			.then((val) => {
				val ? setErr(false) : setErr(true);
				return val;
			})
			.then((val) => {
				if (val) {
					navigate('/');
				}
			});
	};

	return (
		<>
			<Row>
				<Col xs={{span: 12}} md={{ span: 4, offset: 4 }}>
					<Form onSubmit={handleSubmit}>
						<FloatingLabel label="Email" controlId="Email" className="my-5">
							<Form.Control
							    className={styles.customInsert}
								type="email"
								placeholder="email@example.com"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								required={true}
							/>
						</FloatingLabel>
						<FloatingLabel
							label="Password"
							controlId="password"
							className="my-5"
						>
							<Form.Control
								className={styles.customInsert}
								type="password"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								placeholder="Password"
								required={true}
								minLength={8}
							/>
						</FloatingLabel>
						{err ? (
							<p className="text-danger">Wrong Email or/and password</p>
						) : null}
						<Button className={styles.button} size="lg" type="submit">
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
}
