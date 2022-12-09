import {
	Row,
	Col,
	Container,
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	Button
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import API from '../../API/api';

export default function SignupForm(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [role, setRole] = useState(0);
	const [password, setPassword] = useState('');
	const [confPassword, setConfPassword] = useState('');
	const [email, setEmail] = useState('');
	const [validated, setValidated] = useState(false);
	const navigate = useNavigate();
	const [roles, setRoles] = useState([]);
	const [errServer, setErrServer] = useState(false);
	const [err, setErr] = useState(false);
	const [errMessage, setErrMessage] = useState('');

	useEffect(() => {
		const loadRoles = () => {
			API.getRoles()
				.then((list) => {
					return list.map((item) => {
						return {
							label: item.description,
							value: item.id
						};
					});
				})
				.then((newList) => {
					setRoles(newList);
				});
		};
		loadRoles();
	}, []);

	const signUp = async (hiker) => {
		try {
			await API.register(hiker);
			props.setShowRegistrationSuccess(true);
			setTimeout(() => {
				props.setShowRegistrationSuccess(false);
			}, 2500);
			return true;
		} catch (err) {
			setErrServer(true);
			console.log(err);
			const errMessage = JSON.parse(err).error;
			if (errMessage === undefined) {
				setErrMessage('Server error');
			} else {
				setErrMessage(errMessage);
			}
			setTimeout(() => {
				setErrServer(false);
			}, 2500);
			return false;
		}
	};

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		const hiker = { name, surname, id_role: role, password, email };
		let valid = true;

		event.preventDefault();
		if (role === 0) {
			valid = false;
		}
		if (form.checkValidity() === false || !valid) {
			event.stopPropagation();
			if (password !== confPassword) {
				setErr(true);
				event.stopPropagation();
				setTimeout(() => {
					setErr(false);
				}, 2500);
			}
		} else {
			if (password !== confPassword) {
				setErr(true);
				event.stopPropagation();
				setTimeout(() => {
					setErr(false);
				}, 2500);
			} else {
				signUp(hiker)
					.then((val) => {
						return val;
					})
					.then((val) => {
						if (val) {
							navigate('/login');
						}
					});
			}
		}
		setValidated(true);
	};

	return (
		<Container>
			<Row>
				<Col xs={{ span: 12 }} md={{ span: 4, offset: 4 }}>
					<Form noValidate onSubmit={handleSubmit} validated={validated}>
						<FormGroup className="mb-3">
							<FormLabel className={styles.title}>Name</FormLabel>
							<FormControl
								className={styles.formGroup}
								type="text"
								placeholder="Name"
								value={name}
								onChange={(event) => setName(event.target.value)}
								required
							></FormControl>
							<Form.Control.Feedback type="invalid">
								Insert a name
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel className={styles.title}>Surname</FormLabel>
							<FormControl
								className={styles.formGroup}
								type="text"
								placeholder="Surname"
								value={surname}
								onChange={(event) => setSurname(event.target.value)}
								required
							></FormControl>
							<Form.Control.Feedback type="invalid">
								Insert a username
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel className={styles.title}>Role</FormLabel>
							<Select
								className={`${styles.customSelect} ${
									validated && role === 0 && styles.invalid
								} ${validated && role !== 0 && styles.valid}`}
								classNamePrefix="select"
								placeholder="Select a role"
								defaultValue={role}
								name="role"
								isSearchable={true}
								options={roles}
								onChange={(event) => {
									setRole(event.value);
								}}
							/>
							{validated && role === 0 && (
								<div className={styles.feedbackContainer}>
									<span className={styles.feedback}>
										Please select a valid role
									</span>
								</div>
							)}
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel className={styles.title}>Password</FormLabel>
							<FormControl
								className={styles.formGroup}
								type="password"
								placeholder="Password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								minLength={8}
								maxLength={30}
							></FormControl>
							<Form.Control.Feedback type="invalid">
								Password must be between 8 and 30 characters long
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel className={styles.title}>Confirm Password</FormLabel>
							<FormControl
								className={styles.formGroup}
								type="password"
								placeholder="Confirm Password"
								value={confPassword}
								onChange={(event) => setConfPassword(event.target.value)}
								required
								minLength={8}
								maxLength={30}
							></FormControl>
							{err ? (
								<p className="text-danger">Password doesn't match</p>
							) : null}
						</FormGroup>
						<FormGroup className="mb-3">
							<FormLabel className={styles.title}>Email</FormLabel>
							<FormControl
								className={styles.formGroup}
								type="email"
								placeholder="Email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
							></FormControl>
							<Form.Control.Feedback type="invalid">
								Please enter a valid email
							</Form.Control.Feedback>
						</FormGroup>
						{errServer ? <p className="text-danger">{errMessage}</p> : null}
						<Button className={styles.button} type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
			<Row className="pb-5">
				<Col>
					<div className={styles.goToLoginContainer}>
						<span>Already registered? </span>
						<Link to="/login" className={styles.link}>
							Log in
						</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
